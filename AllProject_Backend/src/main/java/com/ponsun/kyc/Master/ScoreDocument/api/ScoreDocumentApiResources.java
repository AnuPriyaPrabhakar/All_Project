package com.ponsun.kyc.Master.ScoreDocument.api;
import com.ponsun.kyc.Master.ScoreCalculation.domain.ScoreCalculation;
import com.ponsun.kyc.Master.ScoreCalculation.domain.ScoreCalculationRepository;
import com.ponsun.kyc.Master.ScoreCalculation.request.CreateScoreCalculationRequest;
import com.ponsun.kyc.Master.ScoreCalculation.services.ScoreCalculationWriteService;
import com.ponsun.kyc.Master.ScoreDocument.request.CreateScoreDocumentRequest;
import com.ponsun.kyc.Master.ScoreDocument.request.UpdateScoreDocumentRequest;
import com.ponsun.kyc.Master.ScoreDocument.services.ScoreDocumentWriteService;
import com.ponsun.kyc.infrastructure.utils.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/ScoreDocument")
@Tag(name = "ScoreDocumentApiResources")
public class ScoreDocumentApiResources {
    private final ScoreDocumentWriteService scoreDocumentWriteService;
    private final ScoreCalculationWriteService scoreCalculationWriteService;
    private final ScoreCalculationRepository scoreCalculationRepository;
    private final String baseRoot = "D:\\uploadImages";
    private Path foundFile;

    @PostMapping("/CreateScoreDocumentRequest")
    public Response createScoreDocumentList(@RequestBody CreateScoreDocumentRequest createScoreDocumentRequest) {
        Response response = this.scoreDocumentWriteService.createScoreDocumentList(createScoreDocumentRequest);
        return response;
    }

    @PutMapping("/{id}")
    public Response updateScoreDocumentList(@PathVariable Integer id, @RequestBody UpdateScoreDocumentRequest updateScoreDocumentRequest) {
        Response response = this.scoreDocumentWriteService.updateScoreDocumentList(id, updateScoreDocumentRequest);
        return response;
    }

    @PostMapping("/files/upload")
    public ResponseEntity<String> uploadFiles(@RequestParam("files") MultipartFile[] files,
                                              @RequestParam("kycId") Integer kycIds,
                                              @RequestParam("pathId") Integer[] pathId,
                                              @RequestPart("createScoreCalculationRequest") CreateScoreCalculationRequest createScoreCalculationRequest
    ) {

        List<String> messages = new ArrayList<>();

        try {
            System.out.println("createScoreCalculationRequest"+createScoreCalculationRequest);

            ScoreCalculation scoreCalculation   = ScoreCalculation.create(createScoreCalculationRequest);
            scoreCalculation                    = this.scoreCalculationRepository.saveAndFlush(scoreCalculation);
            Integer scoreCalculationId          = scoreCalculation.getId();

            if (files != null && files.length > 0 && pathId != null && pathId.length == files.length) {
                for (int i = 0; i < files.length; i++) {
                    System.out.println("MultipartFile"+files[i]);
                    System.out.println("pathId"+pathId[i]);
                    if (files[i] != null) {

                        scoreDocumentWriteService.saveDocumentUpload(new MultipartFile[]{files[i]}, kycIds,pathId[i],scoreCalculationId);
                        messages.add(files[i].getOriginalFilename() + " [Successful]");
                    }

                        messages.add(files[i].getOriginalFilename() + " [Successful]");
                    }
                }
                return ResponseEntity.ok(messages.toString());
//            }
        } catch (Exception e) {
            log.error("Error occurred while uploading files: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

}