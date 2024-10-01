package com.ponsun.kyc.letterHeadUpload.api;


import com.ponsun.kyc.letterHeadUpload.service.LetterHeadUploadGet;
import com.ponsun.kyc.letterHeadUpload.service.LetterHeadUploadReadService;
import com.ponsun.kyc.letterHeadUpload.service.LetterHeadUploadWriteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/LetterHeadUpload")
@Tag(name ="LetterHeadUploadApiResource")
public class LetterHeadUploadApiResources {
    private final LetterHeadUploadWriteService letterHeadUploadWriteService;
    private final LetterHeadUploadReadService letterHeadUploadReadService;
    private final LetterHeadUploadGet letterHeadUploadGet;
    private final JdbcTemplate jdbcTemplate;
    @PostMapping("/files/upload")
    public ResponseEntity<String> uploadFiles(@RequestParam("files") MultipartFile[] files,
                                              @RequestParam("branchId") Integer branchId) {
        List<String> messages = new ArrayList<>();
        try {
            for (MultipartFile file : files) {
                try {
                    letterHeadUploadWriteService.save(file, branchId);
                    messages.add(file.getOriginalFilename() + " [Successful]");
                } catch (Exception e) {
                    log.error("Error occurred while uploading file: " + file.getOriginalFilename(), e);
                    messages.add(file.getOriginalFilename() + " [Failed: " + e.getMessage() + "]");
                }
            }
            return ResponseEntity.ok(messages.toString());
        } catch (Exception e) {
            log.error("Unexpected error occurred while uploading files: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred: " + e.getMessage());
        }
    }


    @GetMapping("/view/{branchId}")
    public ResponseEntity<Resource> viewFile(@PathVariable Integer branchId) {
        try {
            Resource resource = letterHeadUploadGet.getFileAsResource(branchId);

            if (resource == null) {
                return ResponseEntity.notFound().build();
            }

            String contentType = "application/octet-stream";
            if (resource.getFilename().endsWith(".pdf")) {
                contentType = "application/pdf";
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
