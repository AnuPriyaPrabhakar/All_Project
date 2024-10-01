package com.ponsun.kyc.letterHeadUpload.service;

import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.letterHeadUpload.domain.LetterHeadUpload;
import com.ponsun.kyc.letterHeadUpload.domain.LetterHeadUploadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.core.ApplicationContext;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@SpringBootApplication
public class LetterHeadUploadGet {
    private LetterHeadUploadRepository letterHeadUploadRepository;
    private final String baseRoot = "D:\\uploadImages";
    private Path foundFile;

    @Autowired
    public LetterHeadUploadGet(LetterHeadUploadRepository letterHeadUploadRepository) {
        this.letterHeadUploadRepository = letterHeadUploadRepository;
    }

    public Resource getFileAsResource(Integer branchId) throws IOException {
        String resolvedRootDirectory = "letterhead";
        Path root = Paths.get(baseRoot, resolvedRootDirectory);
        Optional<LetterHeadUpload> letterHead = letterHeadUploadRepository.findByBranchIdAndStatus(branchId, Status.ACTIVE);

        if (letterHead.isPresent()) {
            String filename = letterHead.get().getImageName();
            String fileExtension = letterHead.get().getDocumentType(); // Get document type
            Path filePath = root.resolve(fileExtension).resolve(filename); // Resolve path based on document type
            if (Files.exists(filePath)) {
                return new UrlResource(filePath.toUri());
            }
        }
        return null;
    }
}

