package com.ponsun.kyc.AlgorithamFile.service;

import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class AlgorithamFileDownloadUtil {
    private final JdbcTemplate jdbcTemplate;
    private final String baseRoot = "D:\\uploadImages";
    private Path foundFile;

    public AlgorithamFileDownloadUtil(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Resource getCompanyFileAsResource(String imageName, Integer pathId) throws IOException {
        String resolvedRootDirectory = getResolvedRootDirectory(pathId);
        Path root = Paths.get(baseRoot, resolvedRootDirectory);

        Optional<Path> file = Files.list(root)
                .filter(f -> FilenameUtils.removeExtension(f.getFileName().toString()).equals(imageName))
                .findFirst();
        if (file.isPresent()) {
            foundFile = file.get();
            return new UrlResource(foundFile.toUri());
        }
        return null;
    }

    private String getResolvedRootDirectory(Integer pathId) {
        switch (pathId) {
            case 1:
                return "Kyc\\kyc\\";
            case 2:
                return "Kyc\\SAN\\";
            case 3:
                return "Kyc\\CRM\\";
            case 4:
                return "Kyc\\Adverse Media\\";
            default:
                throw new IllegalArgumentException("Invalid pathId");
        }
    }
}
//    public Resource getCompanyFileAsResource(String imageName, Integer pathId) throws IOException {
//        String resolvedRootDirectory = getResolvedRootDirectory(pathId);
//        Path root = Paths.get(baseRoot, resolvedRootDirectory);
//
//        Optional<Path> file = Files.list(root)
//                .filter(f -> FilenameUtils.removeExtension(f.getFileName().toString()).equals(imageName))
//                .findFirst();
//
//        if (file.isPresent()) {
//            foundFile = file.get();
//            return new UrlResource(foundFile.toUri());
//        }
//
//        return null;
//    }
//
//    private String getResolvedRootDirectory(Integer pathId) {
//        switch (pathId) {
//            case 1:
//                return "Kyc\\kyc\\";
//            case 2:
//                return "Kyc\\SAN\\";
//            case 3:
//                return "Kyc\\CRM\\";
//            case 4:
//                return "Kyc\\Adverse Media\\";
//            default:
//                throw new IllegalArgumentException("Invalid pathId");
//        }
//    }



