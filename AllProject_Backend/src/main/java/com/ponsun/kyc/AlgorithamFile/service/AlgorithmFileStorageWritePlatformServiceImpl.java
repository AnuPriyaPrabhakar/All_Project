package com.ponsun.kyc.AlgorithamFile.service;

import com.ponsun.kyc.AlgorithamFile.domain.AlgorithamFileStorage;
import com.ponsun.kyc.AlgorithamFile.domain.AlgorithamFileStorageRepository;
import com.ponsun.kyc.AlgorithamFile.request.CreateAlgorithamFileStorageRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import com.ponsun.kyc.listOfDocument.request.CreateListOfDocumentRequest;
import com.ponsun.kyc.listOfDocument.services.ListOfDocumentWritePlatformService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.DataSource;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
@Slf4j
public class AlgorithmFileStorageWritePlatformServiceImpl implements AlgorithmFileStorageWritePlatformService {
    private final JdbcTemplate jdbcTemplate;
    private final DataSource dataSource;
    private final AlgorithamFileStorageRepository algorithamFileStorageRepository;
    private final ListOfDocumentWritePlatformService listOfDocumentWritePlatformService;
    private final String baseRoot = "D:\\uploadImages";
    @Override
    @Transactional
    public Response createFileStorage(CreateAlgorithamFileStorageRequest createAlgorithamFileStorageRequest) {
        try {
            final AlgorithamFileStorage algorithamFileStorage = AlgorithamFileStorage.create(createAlgorithamFileStorageRequest);
            this.algorithamFileStorageRepository.saveAndFlush(algorithamFileStorage);
            Response response = Response.of(algorithamFileStorage.getId());
            return response;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @Override
    @Transactional
    public Response save(MultipartFile file, Integer kycId, Integer pathId, Integer checkId) {

        String resolvedRootDirectory = "";

        if (pathId == 1) {
            resolvedRootDirectory = "Kyc\\kyc";
        } else if (pathId == 2) {
            resolvedRootDirectory = "Kyc\\SAN";
        } else if (pathId == 3) {
            resolvedRootDirectory = "Kyc\\CRM";
        } else if (pathId == 4) {
            resolvedRootDirectory = "Kyc\\Adverse Media";
        }

        Integer imgId = kycId;
        Path root = Paths.get(baseRoot, resolvedRootDirectory);
        updateFamilyDocument(imgId);
        Integer imageId = null;
        try {
            Files.createDirectories(root);
            String fileExtensions = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
            String folderName = kycId.toString();
            Path folderPath = root.resolve(folderName);
            Files.createDirectories(folderPath);

            CreateAlgorithamFileStorageRequest createAlgorithamFileStorageRequest = new CreateAlgorithamFileStorageRequest();
            createAlgorithamFileStorageRequest.setDocumentType(fileExtensions);
            createAlgorithamFileStorageRequest.setKycId(kycId);
            createAlgorithamFileStorageRequest.setPathId(pathId);
            createAlgorithamFileStorageRequest.setUrl(folderPath.toString());

            Response response = createFileStorage(createAlgorithamFileStorageRequest);

            imageId = (Integer) response.getId();
            String filename = imageId + "." + fileExtensions;
            Files.copy(file.getInputStream(), root.resolve(filename));
            return response;
        } catch (IOException e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("Filename already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response getDocumentId(Integer kycIds, Integer PepDocId, Integer SanDocId, Integer crmCocId, Integer AdverseMediaDocId, Integer IsPep, Integer IsSan, Integer IsCrm, Integer IsAdverse) {

        CreateListOfDocumentRequest request = new CreateListOfDocumentRequest();

        request.setKycId(kycIds);
        request.setPep(PepDocId);
        request.setSan(SanDocId);
        request.setCrm(crmCocId);
        request.setAdverse_media(AdverseMediaDocId);

        request.setIspepcheck(IsPep);
        request.setIssancheck(IsSan);
        request.setIscrmcheck(IsCrm);
        request.setIsadverse_check(IsAdverse);

        this.listOfDocumentWritePlatformService.createListOfDocument(request);

        Response response = new Response();
        return response;
    }
    public void updateFamilyDocument(Integer imgId) {
        try {
            String sql = " update kyc_algoritham_document set status = 'D', updated_at = NOW() WHERE id = ? AND status = 'A'";
            jdbcTemplate.update(sql, imgId);
        } catch (DataAccessException e) {
            System.err.println("Error updating the document: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

//        @Override
//        @Transactional
//    public Response save(MultipartFile file, Integer kycId, Integer pathId, Integer checkId) {
//        String resolvedRootDirectory = "";
//        if (pathId == 1) {
//            resolvedRootDirectory = "Kyc\\kyc";
//        } else if (pathId == 2) {
//            resolvedRootDirectory = "Kyc\\SAN";
//        } else if (pathId == 3) {
//            resolvedRootDirectory = "Kyc\\CRM";
//        } else if (pathId == 4) {
//            resolvedRootDirectory = "Kyc\\Adverse Media";
//        }
//        Integer imgId = kycId;
//        Path root = Paths.get(baseRoot, resolvedRootDirectory);
//        updateFamilyDocument(imgId);
//        Integer imageId = null;
//        try {
//            Files.createDirectories(root);
//            String fileExtensions = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
//            String folderName = kycId.toString();
//            Path folderPath = root.resolve(folderName);
//            Files.createDirectories(folderPath);
//
//            CreateAlgorithamFileStorageRequest createAlgorithamFileStorageRequest = new CreateAlgorithamFileStorageRequest();
//            createAlgorithamFileStorageRequest.setDocumentType(fileExtensions);
//            createAlgorithamFileStorageRequest.setKycId(kycId);
//            createAlgorithamFileStorageRequest.setPathId(pathId);
//            createAlgorithamFileStorageRequest.setUrl(folderPath.toString());
//
//            Response response = createFileStorage(createAlgorithamFileStorageRequest);
//
//            imageId = (Integer) response.getId();
//            String filename = imageId + "." + fileExtensions;
//            Files.copy(file.getInputStream(), root.resolve(filename));
//            return response;
//        } catch (IOException e) {
//            if (e instanceof FileAlreadyExistsException) {
//                throw new RuntimeException("Filename already exists.");
//            }
//            throw new RuntimeException(e.getMessage());
//        }
//
//    }
//    @Override
//    public void save(MultipartFile file, Integer kycId, Integer pathId, Integer checkId) {
//        String resolvedRootDirectory = resolveRootDirectory(pathId);
//        Integer imgId = kycId;
//        Path root = Paths.get(baseRoot, resolvedRootDirectory);
//        updateFamilyDocument(imgId);
//        Integer imageId = null;
//        try {
//            Files.createDirectories(root);
//            String fileExtensions = getFileExtension(file);
//            String folderName = kycId.toString();
//            Path folderPath = root.resolve(folderName);
//            Files.createDirectories(folderPath);
//            CreateAlgorithamFileStorageRequest createAlgorithamFileStorageRequest = new CreateAlgorithamFileStorageRequest();
//            createAlgorithamFileStorageRequest.setDocumentType(fileExtensions);
//            createAlgorithamFileStorageRequest.setKycId(kycId);
//            createAlgorithamFileStorageRequest.setPathId(pathId);
//            createAlgorithamFileStorageRequest.setUrl(folderPath.toString());
//            Response response = createFileStorage(createAlgorithamFileStorageRequest);
//            imageId = (Integer) response.getId();
//
//            String filename = imageId + "." + fileExtensions;
//            Files.copy(file.getInputStream(), folderPath.resolve(filename));
//
//            getValue(kycId, pathId, imageId, checkId);
//
//        } catch (IOException e) {
//            if (e instanceof FileAlreadyExistsException) {
//                throw new RuntimeException("Filename already exists.");
//            }
//            throw new RuntimeException(e.getMessage());
//        } catch (SQLException e) {
//            throw new RuntimeException("Database error: " + e.getMessage());
//        }
//    }
//    private String resolveRootDirectory(Integer pathId) {
//        switch (pathId) {
//            case 1:
//                return "Kyc\\kyc";
//            case 2:
//                return "Kyc\\SAN";
//            case 3:
//                return "Kyc\\CRM";
//            case 4:
//                return "Kyc\\Adverse Media";
//            default:
//                throw new IllegalStateException("Unexpected value: " + pathId);
//        }
//    }
//    private String getFileExtension(MultipartFile file) {
//        return file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
//    }
//    public void getValue(Integer kycId, Integer pathId, Integer imageId, Integer checkId) throws SQLException {
//        StringBuilder output = new StringBuilder();
//        output.append("getvalivu ").append(kycId).append(" ").append(pathId).append(" ").append(imageId).append(" ").append(checkId).append(" ");
//        try (Connection connection = dataSource.getConnection()) {
//            ListOfDocumentData listOfDocumentData = getByKycId(connection, kycId);
//            switch (pathId) {
//                case 1:
//                    listOfDocumentData.setkyc(imageId);
//                    listOfDocumentData.setIskyccheck(checkId);
//                    break;
//                case 2:
//                    listOfDocumentData.setSan(imageId);
//                    listOfDocumentData.setIssancheck(checkId);
//                    break;
//                case 3:
//                    listOfDocumentData.setCrm(imageId);
//                    listOfDocumentData.setIscrmcheck(checkId);
//                    break;
//                case 4:
//                    listOfDocumentData.setAdverse_media(imageId);
//                    listOfDocumentData.setIsadverse_check(checkId);
//                    break;
//                default:
//                    throw new IllegalStateException("Unexpected value: " + pathId);
//            }
//            saveAggregatedRecord(connection, listOfDocumentData);
//        }
//    }
//    public ListOfDocumentData getByKycId(Connection connection, Integer kycId) throws SQLException {
//        String query = "SELECT * FROM kyc_list_of_document WHERE kycId = ?";
//        ListOfDocumentData list = new ListOfDocumentData();
//        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
//            preparedStatement.setInt(1, kycId);
//            try (ResultSet resultSet = preparedStatement.executeQuery()) {
//                if (resultSet.next()) {
//                    list.setKycId(resultSet.getInt("kycId"));
//                    list.setkyc(resultSet.getObject("kyc") != null ? resultSet.getInt("kyc") : null);
//                    list.setIskyccheck(resultSet.getObject("iskyccheck") != null ? resultSet.getInt("iskyccheck") : null);
//                    list.setSan(resultSet.getObject("san") != null ? resultSet.getInt("san") : null);
//                    list.setIssancheck(resultSet.getObject("issancheck") != null ? resultSet.getInt("issancheck") : null);
//                    list.setCrm(resultSet.getObject("crm") != null ? resultSet.getInt("crm") : null);
//                    list.setIscrmcheck(resultSet.getObject("iscrmcheck") != null ? resultSet.getInt("iscrmcheck") : null);
//                    list.setAdverse_media(resultSet.getObject("adverse_media") != null ? resultSet.getInt("adverse_media") : null);
//                    list.setIsadverse_check(resultSet.getObject("isadverse_check") != null ? resultSet.getInt("isadverse_check") : null);
//                } else {
//                    list.setKycId(kycId);
//                }
//            }
//        }
//        return list;
//    }
//    public void saveAggregatedRecord(Connection connection, ListOfDocumentData listOfDocumentData) throws SQLException {
//        String updateQuery = "UPDATE kyc_list_of_document SET kyc = ?, iskyccheck = ?, san = ?, issancheck = ?, crm = ?, iscrmcheck = ?, adverse_media = ?, isadverse_check = ?, updated_at = CASE WHEN kycId = ? THEN updated_at ELSE ? END WHERE kycId = ?";
//        String insertQuery = "INSERT INTO kyc_list_of_document (kycId, kyc, iskyccheck, san, issancheck, crm, iscrmcheck, adverse_media, isadverse_check, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//        Timestamp currentTime = Timestamp.from(Instant.now());
//        try (PreparedStatement updateStatement = connection.prepareStatement(updateQuery)) {
//            updateStatement.setObject(1, listOfDocumentData.getkyc());
//            updateStatement.setObject(2, listOfDocumentData.getIskyccheck());
//            updateStatement.setObject(3, listOfDocumentData.getSan());
//            updateStatement.setObject(4, listOfDocumentData.getIssancheck());
//            updateStatement.setObject(5, listOfDocumentData.getCrm());
//            updateStatement.setObject(6, listOfDocumentData.getIscrmcheck());
//            updateStatement.setObject(7, listOfDocumentData.getAdverse_media());
//            updateStatement.setObject(8, listOfDocumentData.getIsadverse_check());
//            updateStatement.setInt(9, listOfDocumentData.getKycId());
//            updateStatement.setTimestamp(10, currentTime);
//            updateStatement.setInt(11, listOfDocumentData.getKycId());
//
//            int rowsAffected = updateStatement.executeUpdate();
//
//            if (rowsAffected == 0) {
//                try (PreparedStatement insertStatement = connection.prepareStatement(insertQuery)) {
//                    insertStatement.setInt(1, listOfDocumentData.getKycId());
//                    insertStatement.setObject(2, listOfDocumentData.getkyc());
//                    insertStatement.setObject(3, listOfDocumentData.getIskyccheck());
//                    insertStatement.setObject(4, listOfDocumentData.getSan());
//                    insertStatement.setObject(5, listOfDocumentData.getIssancheck());
//                    insertStatement.setObject(6, listOfDocumentData.getCrm());
//                    insertStatement.setObject(7, listOfDocumentData.getIscrmcheck());
//                    insertStatement.setObject(8, listOfDocumentData.getAdverse_media());
//                    insertStatement.setObject(9, listOfDocumentData.getIsadverse_check());
//                    insertStatement.setTimestamp(10, currentTime);
//                    insertStatement.setTimestamp(11, currentTime);
//                    insertStatement.executeUpdate();
//                }
//            }
//        }
//    }