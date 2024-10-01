package com.ponsun.kyc.FilesStorage.service;

import org.apache.commons.io.FilenameUtils;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;


@SpringBootApplication
public class FileDownloadUtil {

    private final String baseRoot = "D:\\uploadImages";
    private Path foundFile;

    //    public Resource getFileAsResource(String imgId) throws IOException {
//        String resolvedRootDirectory = "Kyc";
//        Path root = Paths.get(baseRoot, resolvedRootDirectory);
//
//        Path filePath = root.resolve(imgId);  // Save inside the "Kyc/{kycId}" folder
//
//        try {
//            Optional<Path> file = Files.list(root)
//                    .filter(f -> FilenameUtils.removeExtension(f.getFileName().toString()).equals(imgId))
//                    .findFirst();
//
//            if (file.isPresent()) {
//                return new UrlResource(file.get().toUri());
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
    public Resource getFileAsResource(String imgId, Integer kycId) throws IOException {
        String resolvedRootDirectory = "Kyc";
        Path root = Paths.get(baseRoot, resolvedRootDirectory);
        Path folderPath = root.resolve(kycId.toString());

        try {
            Optional<Path> file = Files.list(folderPath)
                    .filter(f -> f.getFileName().toString().startsWith(imgId))
                    .findFirst();

            if (file.isPresent()) {
                return new UrlResource(file.get().toUri());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
