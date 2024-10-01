package com.ponsun.kyc.AlgorithamFile.api;

import com.ponsun.kyc.AlgorithamFile.request.CreateAlgorithamFileStorageRequest;
import com.ponsun.kyc.AlgorithamFile.service.AlgorithamFileDownloadUtil;
import com.ponsun.kyc.AlgorithamFile.service.AlgorithmFileStorageWritePlatformService;
import com.ponsun.kyc.infrastructure.utils.Response;
import com.ponsun.kyc.listOfDocument.services.ListOfDocumentWritePlatformService;
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
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/v1/AlgorithamFileUpload")
@Tag(name = "AlgorithamFileUploadApiResource")
public class AlgorithamFileController {
    private final AlgorithmFileStorageWritePlatformService algorithmFileStorageWritePlatformService;
    private final AlgorithamFileDownloadUtil algorithamFileDownloadUtil;
    private final JdbcTemplate jdbcTemplate;
    private final ListOfDocumentWritePlatformService listOfDocumentWritePlatformService;

    private final String baseRoot = "D:\\uploadImages";
    private Path foundFile;

    @PostMapping("/CreateFileStorageRequest")
    public Response CreateFileStorageRequest(@RequestBody CreateAlgorithamFileStorageRequest createFileStorageRequest) {
        Response response = this.algorithmFileStorageWritePlatformService.createFileStorage(createFileStorageRequest);
        return response;
    }

    @PostMapping("/files/upload")
    public ResponseEntity<String> uploadFiles(@RequestParam("files") MultipartFile[] files,
                                              @RequestParam("kycId") Integer[] kycIds,
                                              @RequestParam("pathId") Integer[] pathIds,
                                              @RequestParam("isChecked") Integer[] isChecked) {
        List<String> messages = new ArrayList<>();
        Integer kycId = sumArray(kycIds);
        try {
            if (files.length != kycIds.length || files.length != pathIds.length || files.length != isChecked.length) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Number of files does not match number of parameters.");
            }
            Integer PepDocId = 0;
            Integer SanDocId = 0;
            Integer crmCocId = 0;
            Integer AdverseMediaDocId = 0;
            Integer IsPep = 0;
            Integer IsSan = 0;
            Integer IsCrm = 0;
            Integer IsAdverse = 0;

            int i;
            for (i = 0; i < files.length; i++) {
                Response response = this.algorithmFileStorageWritePlatformService.save(files[i], kycIds[i], pathIds[i], isChecked[i]);
                if (pathIds[i] == 1) {
                    PepDocId = (Integer) response.getId();
                    IsPep = isChecked[i];
                } else if (pathIds[i] == 2) {
                    SanDocId = (Integer) response.getId();
                    IsSan = isChecked[i];
                } else if (pathIds[i] == 3) {
                    crmCocId = (Integer) response.getId();
                    IsCrm = isChecked[i];
                } else if (pathIds[i] == 4) {
                    AdverseMediaDocId = (Integer) response.getId();
                    IsAdverse = isChecked[i];
                }
            }

            Response response = algorithmFileStorageWritePlatformService.getDocumentId(kycId, PepDocId, SanDocId, crmCocId, AdverseMediaDocId, IsPep, IsSan, IsCrm, IsAdverse);
            return ResponseEntity.ok(messages.toString());
        } catch (Exception e) {
            log.error("Error occurred while uploading files: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/downloadFiles/{imgId}/{pathId}")
    public ResponseEntity<?> downloadCompanyFiles(@PathVariable("imgId") Integer imgId, @PathVariable("pathId") Integer pathId) {
        Resource resource = null;
        try {
            resource = algorithamFileDownloadUtil.getCompanyFileAsResource(String.valueOf(imgId), pathId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        if (resource == null) {
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }

        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }

    public Integer sumArray(Integer[] array) {
        return Arrays.stream(array).reduce(0, Integer::sum);
    }
    @GetMapping("/getId/{kycId}")
    public List<String> getDocuments(@PathVariable Integer kycId) {
        String sql = "SELECT id, pathId FROM kyc_algoritham_document WHERE kycId = ? AND status = 'A'";
        List<Map<String, Object>> documentDetailsList = jdbcTemplate.queryForList(sql, kycId);
        List<String> documents = new ArrayList<>();

        for (Map<String, Object> documentDetails : documentDetailsList) {
            String id = documentDetails.get("id").toString();
            String pathId = documentDetails.get("pathId").toString();
            documents.add(id + "," + pathId);
        }
        System.out.println("documents" + documents);

        return documents;
    }

//        List<String> documentInfoList = getDocuments(kycId);

//        if (documentInfoList.isEmpty()) {
//            return new ResponseEntity<>("Files not found", HttpStatus.NOT_FOUND);
//        }

//        for (String documentInfo : documentInfoList) {
//            String[] docInfoArray = documentInfo.split(",");
//            Integer id = Integer.valueOf(docInfoArray[0]);
//            Integer pathId = Integer.valueOf(docInfoArray[1]);
//
//            System.out.println("id: " + id);
//            System.out.println("pathId: " + pathId);
//


//
//    @GetMapping("/downloadFile/{kycId}")
//    public ResponseEntity<?> downloadCompanyFile(@PathVariable("kycId") Integer kycId) {
//        List<String> documentInfoList = getDocuments(kycId);
//
//        if (documentInfoList.isEmpty()) {
//            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
//        }
//
//        String[] documentInfo = documentInfoList.get(0).split(",");
//        Integer id = Integer.valueOf(documentInfo[0]);
//        Integer pathId = Integer.valueOf(documentInfo[1]);
//        Resource resource = null;
//        System.out.println("Image "+id +"and "+pathId);
//
//        try {
//            resource = algorithamFileDownloadUtil.getCompanyFileAsResource(String.valueOf(id), pathId);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//
//        if (resource == null) {
//            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
//        }
//
//        String contentType = "application/octet-stream";
//        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(contentType))
//                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
//                .body(resource);
//    }
//
//    public List<String> getDocuments(Integer kycId) {
//        String sql = "SELECT id, pathId FROM kyc_algoritham_document WHERE kycId = ? AND status = 'A'";
//        List<Map<String, Object>> documentDetailsList = jdbcTemplate.queryForList(sql, kycId);
//        List<String> documents = new ArrayList<>();
//
//        for (Map<String, Object> documentDetails : documentDetailsList) {
//            String id = documentDetails.get("id").toString();
//            String pathId = documentDetails.get("pathId").toString();
//            documents.add(id + "," + pathId);
//        }
//        System.out.println("documents"+documents);
//        return documents;
//    }

}
