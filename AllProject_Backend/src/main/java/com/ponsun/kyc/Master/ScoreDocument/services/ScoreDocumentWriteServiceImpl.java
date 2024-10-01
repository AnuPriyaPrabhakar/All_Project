package com.ponsun.kyc.Master.ScoreDocument.services;

import com.ponsun.kyc.Master.ScoreCalculation.data.ScoreCalculationValidator;
import com.ponsun.kyc.Master.ScoreCalculation.domain.ScoreCalculation;
import com.ponsun.kyc.Master.ScoreCalculation.domain.ScoreCalculationRepository;
import com.ponsun.kyc.Master.ScoreCalculation.request.CreateScoreCalculationRequest;
import com.ponsun.kyc.Master.ScoreCalculation.services.ScoreCalculationWriteService;
import com.ponsun.kyc.Master.ScoreDocument.data.ScoreDocumentValidator;
import com.ponsun.kyc.Master.ScoreDocument.domain.ScoreDocument;
import com.ponsun.kyc.Master.ScoreDocument.domain.ScoreDocumentRepository;
import com.ponsun.kyc.Master.ScoreDocument.domain.ScoreDocumentWrapper;
import com.ponsun.kyc.Master.ScoreDocument.request.CreateScoreDocumentRequest;
import com.ponsun.kyc.Master.ScoreDocument.request.UpdateScoreDocumentRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScoreDocumentWriteServiceImpl implements ScoreDocumentWriteService {
    private final ScoreDocumentRepository scoreDocumentRepository;
    private final ScoreDocumentWrapper scoreDocumentWrapper;
    private final ScoreDocumentValidator scoreDocumentValidator;
    private final ScoreCalculationValidator scoreCalculationValidator;
    private final ScoreCalculationRepository scoreCalculationRepository;
    private final ScoreCalculationWriteService scoreCalculationWriteService;
    private final String baseRoot = "D:\\uploadImages\\Risk";

    @Override
    @Transactional
    public Response createScoreDocumentList(CreateScoreDocumentRequest createScoreDocumentRequest) {
        try {
            this.scoreDocumentValidator.validateSaveScoreDocument(createScoreDocumentRequest);
            ScoreDocument scoreDocument = ScoreDocument.create(createScoreDocumentRequest);//entity
            scoreDocument = this.scoreDocumentRepository.saveAndFlush(scoreDocument);

            return Response.of(Integer.valueOf(scoreDocument.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response updateScoreDocumentList(Integer id, UpdateScoreDocumentRequest updateScoreDocumentRequest) {
        try {
            this.scoreDocumentValidator.validateUpdateScoreDocument(updateScoreDocumentRequest);
            final ScoreDocument scoreDocument = this.scoreDocumentWrapper.findOneWithNotFoundDetection(id);
            scoreDocument.update(updateScoreDocumentRequest);
            this.scoreDocumentRepository.saveAndFlush(scoreDocument);
            return Response.of(Long.valueOf(scoreDocument.getId()));

        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response saveDocumentUpload(MultipartFile[] files, Integer kycId,Integer pathId, Integer scoreCalculationId){
        Integer imgId = kycId;
        Path root = Paths.get(baseRoot);

        try {
            Files.createDirectories(root);
            for (Integer i = 0; i < files.length; i++)
            {
                String fileExtensions = files[i].getOriginalFilename().substring(files[i].getOriginalFilename().lastIndexOf(".") + 1);
                String folderName = kycId.toString();
                Path folderPath = root.resolve(folderName);
                Files.createDirectories(folderPath);

                CreateScoreDocumentRequest scoreDocumentRequest = new CreateScoreDocumentRequest();
                scoreDocumentRequest.setRiskScoreCalculationId(scoreCalculationId);
                scoreDocumentRequest.setPep(fileExtensions);
                scoreDocumentRequest.setNegativeMedia(String.valueOf(pathId));
                Response response = createScoreDocumentList(scoreDocumentRequest);

                Integer imageId = (Integer) response.getId();
                System.out.println("imageId: "+imageId);

                String filename = imageId + "." + fileExtensions;
                Files.copy(files[i].getInputStream(), root.resolve(filename));
                System.out.println("filename: "+filename);
            }
            Response response=null;
            return response;
        } catch (IOException e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("Filename already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }
}