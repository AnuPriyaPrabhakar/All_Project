package com.ponsun.kyc.letterHeadUpload.service;

import com.ponsun.kyc.FilesStorage.request.CreateFileStorageRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import com.ponsun.kyc.letterHeadUpload.data.LetterHeadUploadValidator;
import com.ponsun.kyc.letterHeadUpload.domain.LetterHeadUpload;
import com.ponsun.kyc.letterHeadUpload.domain.LetterHeadUploadRepository;
import com.ponsun.kyc.letterHeadUpload.domain.LetterHeadUploadWrapper;
import com.ponsun.kyc.letterHeadUpload.request.CreateLetterHeadUploadRequest;
import com.ponsun.kyc.letterHeadUpload.request.UpdateLetterHeadUploadRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class LetterHeadUploadWriteServiceImpl implements LetterHeadUploadWriteService {

    private final LetterHeadUploadRepository letterHeadUploadRepository;
    private final LetterHeadUploadWrapper letterHeadUploadRepositoryWrapper;
    private final LetterHeadUploadValidator letterHeadUploadDataValidator;
    private final JdbcTemplate jdbcTemplate;
    private final String baseRoot = "D:\\uploadImages";

    @Override
    @Transactional
    public Response createLetterHeadUpload(CreateLetterHeadUploadRequest createLetterHeadUploadRequest) {
        try {
            this.letterHeadUploadDataValidator.validateSaveLetterHeadUpload(createLetterHeadUploadRequest);
            final LetterHeadUpload letterHeadUpload = LetterHeadUpload.create(createLetterHeadUploadRequest);
            this.letterHeadUploadRepository.saveAndFlush(letterHeadUpload);
            return Response.of(letterHeadUpload.getId());
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public void save(MultipartFile file, Integer branchId) {
        String resolvedRootDirectory = "letterhead";
        Path root = Paths.get(baseRoot, resolvedRootDirectory);

        updateLetterHeadUpload(branchId);

        try {
            Files.createDirectories(root);

            String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
            String originalFilename = file.getOriginalFilename();
            String folderName = fileExtension;
            Path folderPath = root.resolve(folderName);
            Files.createDirectories(folderPath);

            String filename = generateUniqueFilename(folderPath, originalFilename);
            Files.copy(file.getInputStream(), folderPath.resolve(filename));

            LetterHeadUpload letterHead = new LetterHeadUpload();
            letterHead.setImageName(filename);
            letterHead.setStatus(Status.ACTIVE);
            letterHead.setDocumentType(fileExtension);
            letterHead.setBranchId(branchId);
            letterHead.setUrl(folderPath.resolve(filename).toString());
            letterHeadUploadRepository.save(letterHead);

        } catch (IOException e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("Filename already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }

    private String generateUniqueFilename(Path folderPath, String originalFilename) throws IOException {
        String filenameWithoutExtension = FilenameUtils.removeExtension(originalFilename);
        String fileExtension = FilenameUtils.getExtension(originalFilename);
        String newFilename = originalFilename;
        Path filePath = folderPath.resolve(newFilename);
        int counter = 1;

        while (Files.exists(filePath)) {
            newFilename = filenameWithoutExtension + "_" + counter + "." + fileExtension;
            filePath = folderPath.resolve(newFilename);
            counter++;
        }

        return newFilename;
    }

    public void updateLetterHeadUpload(Integer branchId) {
        try {
            String sql = "UPDATE kyc_letter_head_upload SET status = 'D', updated_at = NOW() WHERE branchId = ? AND status = 'A'";
            jdbcTemplate.update(sql, branchId);
        } catch (DataAccessException e) {
            System.err.println("Error updating the document: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

