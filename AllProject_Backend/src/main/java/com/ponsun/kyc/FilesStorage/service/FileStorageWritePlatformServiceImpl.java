package com.ponsun.kyc.FilesStorage.service;

import com.ponsun.kyc.FilesStorage.domain.FileStorage;
import com.ponsun.kyc.FilesStorage.domain.FileStorageRepository;
import com.ponsun.kyc.FilesStorage.request.CreateFileStorageRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileStorageWritePlatformServiceImpl implements FileStorageWritePlatformService {
    private final FileStorageRepository fileStorageRepository;
    private final JdbcTemplate jdbcTemplate;
    private FileStorageWritePlatformService fileStorageWritePlatformService;
    private final String baseRoot = "D:\\uploadImages";

    @Override
    @Transactional
    public Response createFileStorage(CreateFileStorageRequest createFileStorageRequest) {
        try {
            final FileStorage fileStorage = FileStorage.create(createFileStorageRequest);
            this.fileStorageRepository.saveAndFlush(fileStorage);
            Response response =  Response.of(fileStorage.getId());
            return response;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public void save(MultipartFile[] files, Integer kycId, Integer documentTypeId) {
        String resolvedRootDirectory = "";

        resolvedRootDirectory = "Kyc";

        Path root = Paths.get(baseRoot, resolvedRootDirectory);

        List<Integer> imgIdStr = getDocument(kycId, documentTypeId);

        if (imgIdStr.isEmpty()) {
            System.out.println("No documents found for kycId: " + kycId + " and documentTypeId: " + documentTypeId);
        } else {
            // Process the list of document IDs
            for (Integer id : imgIdStr) {
                updateFamilyDocument(id);
                System.out.println("Found document ID: " + id);
            }
        }

        try {
            Files.createDirectories(root);
            for (MultipartFile file : files) {
                String fileExtensions = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);

                String folderName = kycId.toString();
                Path folderPath = root.resolve(folderName);
                Files.createDirectories(folderPath);
                System.out.println("File saved: " + folderPath);

                CreateFileStorageRequest createFileStorageRequest = new CreateFileStorageRequest();
                createFileStorageRequest.setDocumentType(fileExtensions);
                createFileStorageRequest.setKycId(kycId);
                createFileStorageRequest.setDocumentTypeId(documentTypeId);
                createFileStorageRequest.setUrl(folderPath.toString());
                Response response = createFileStorage(createFileStorageRequest);

                Integer imageId = (Integer) response.getId();
                System.out.println("imageId: " + imageId);

                String filename = imageId + "." + fileExtensions;

                Path filePath = folderPath.resolve(filename);  // Save inside the "Kyc/{kycId}" folder
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                System.out.println("File saved with name: " + filename + " at path: " + filePath);

            //            Files.copy(file.getInputStream(), root.resolve(filename));
            //            System.out.println("filename: " + filename);
            }
        } catch (IOException e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("Filename already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }
    @Override
    public List<Integer> getDocument(Integer kycId, Integer documentTypeId) {
        String sql = "SELECT id FROM kyc_document WHERE documentTypeId = ? AND kycId = ? AND status = 'A'";
        try {
            //return jdbcTemplate.queryForObject(sql, String.class, documentTypeId, kycId);
            return jdbcTemplate.queryForList(sql, Integer.class, documentTypeId, kycId);
        } catch (EmptyResultDataAccessException e) {
            System.err.println("No document found for kycId: " + kycId + " and documentTypeId: " + documentTypeId);
            return new ArrayList<>(); // Return an empty list instead of null
        }
    }

    public void updateFamilyDocument(Integer imgId) {
        try {
            String sql = "update kyc_document set status = 'D', updated_at = NOW() WHERE id = ? AND status = 'A'";
            jdbcTemplate.update(sql, imgId);
        } catch (DataAccessException e) {
            System.err.println("Error updating the document: " + e.getMessage());
            e.printStackTrace();
        }
    }
}