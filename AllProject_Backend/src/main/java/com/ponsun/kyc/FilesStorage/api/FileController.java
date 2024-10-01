package com.ponsun.kyc.FilesStorage.api;

import com.ponsun.kyc.FilesStorage.request.CreateFileStorageRequest;
import com.ponsun.kyc.FilesStorage.service.FileDownloadUtil;
import com.ponsun.kyc.FilesStorage.service.FileStorageWritePlatformService;
import com.ponsun.kyc.infrastructure.utils.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.dao.EmptyResultDataAccessException;
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
import java.util.Collections;
import java.util.List;

@RestController
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RequestMapping("/api/v1/FileUpload")
@Tag(name = "FileUploadApiResource")
public class FileController {
    private final FileStorageWritePlatformService fileStorageWritePlatformService;
    private final FileDownloadUtil fileDownloadUtil;
    private final JdbcTemplate jdbcTemplate;

    private final String baseRoot = "D:\\uploadImages";
    private Path foundFile;

    @PostMapping("/CreateFileStorageRequest")
    public Response CreateFileStorageRequest(@RequestBody CreateFileStorageRequest createFileStorageRequest) {
        Response response = this.fileStorageWritePlatformService.createFileStorage(createFileStorageRequest);
        return response;
    }

    @PostMapping("/files/upload")
    public ResponseEntity<String> uploadFiles(@RequestParam("files") MultipartFile[] files,
                                              @RequestParam("kycId") Integer kycId,
                                              @RequestParam("documentTypeId") Integer documentTypeId) {
        List<String> messages = new ArrayList<>();
        try {

            //for (MultipartFile file : files) {
                fileStorageWritePlatformService.save( files, kycId, documentTypeId);
                messages.add(files.length + " [Successful]");
            //}
            return ResponseEntity.ok(messages.toString());
        } catch (Exception e) {
            log.error("Error occurred while uploading files: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/downloadFile/{kycId}/{documentTypeId}")
    public ResponseEntity<?> downloadFile(@PathVariable("kycId") Integer kycId, @PathVariable("documentTypeId") Integer documentTypeId) {
        try {
            List<Integer> imgId = getDocument(kycId, documentTypeId); // Change to List<Integer>

            System.out.println("getDocument" + imgId);

            if (imgId == null ) {
                return new ResponseEntity<>(" File not found ", HttpStatus.NOT_FOUND);
            }
            Integer firstImgId = imgId.get(0);
            Resource resource = fileDownloadUtil.getFileAsResource(firstImgId.toString(), kycId);


            if (resource == null) {
                return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
            }

            String contentType = "application/octet-stream";
            String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                    .body(resource);

        } catch (EmptyResultDataAccessException e) {
            log.error("No document found for kycId: " + kycId, e);
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            log.error("Error occurred while downloading the file: ", e);
            return ResponseEntity.internalServerError().body("Error occurred: " + e.getMessage());
        }
    }
    public List<Integer> getDocument(Integer kycId, Integer documentTypeId){
        String sql = "SELECT id FROM kyc_document WHERE documentTypeId = ? AND kycId = ? AND status = 'A' order by id desc";
        return jdbcTemplate.queryForList(sql, Integer.class, documentTypeId, kycId);
    }

    @GetMapping("/getDocuments/{kycId}")
    public List<Integer> getDocuments(@PathVariable Integer kycId, @RequestParam Integer documentTypeId) {
        return fileStorageWritePlatformService.getDocument(kycId, documentTypeId);
    }

    @GetMapping("/getdownloadFile/{kycId}/{documentTypeId}")
    public List<Integer>  getDocumentes(@PathVariable Integer kycId, @PathVariable Integer documentTypeId) {
        String sql = "SELECT id FROM kyc_document WHERE documentTypeId = ? AND kycId = ? AND status = 'A'";
        try {
            List<Integer> documentIds = jdbcTemplate.queryForList(sql, Integer.class, documentTypeId, kycId);
//            System.out.println("Documents retrieved for kycId: {} ,and documentTypeId: {} - Found: {}"+ kycId+" ,"+ documentTypeId+" ,"+ documentIds);
            return documentIds;
        } catch (EmptyResultDataAccessException e) {
//            System.out.println("No document found for kycId: {} and documentTypeId: {}"+ kycId+ documentTypeId+ e);
            return Collections.emptyList();
        }
    }

    @GetMapping("/AlldownloadFile/{kycId}/{imgId}")
    public ResponseEntity<?> downloadallFile(@PathVariable("kycId") Integer kycId,@PathVariable("imgId") Integer imgId) {
        try {

//            Resource resource = fileDownloadUtil.getFileAsResource(firstImgId.toString(), kycId);

            Resource resource = fileDownloadUtil.getFileAsResource(imgId.toString(),kycId);
            if (resource == null) {
                return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
            }

            String contentType = "application/octet-stream";
            String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                    .body(resource);


        } catch (IOException e) {
//            System.out.println("No document found for kycId: {} and documentTypeId: {}"+ kycId+ imgId+ e);
            log.error("Error occurred while downloading the file(s): ", e);
            return ResponseEntity.internalServerError().body("Error occurred: " + e.getMessage());
        }
    }
}

//  @PostMapping("/files/upload")
//  public ResponseEntity<String> uploadFiles(@RequestParam("files") MultipartFile[] files, @RequestParam("kycId") Integer kycId) {
//    List<String> messages = new ArrayList<>();
//    try {
//        for (MultipartFile file : files) {
//            fileStorageWritePlatformService.save(file, kycId);
//            messages.add(file.getOriginalFilename() + " [Successful]");
//        }
//        return ResponseEntity.ok(messages.toString());
//    } catch (Exception e) {
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
//    }
//}

//    @GetMapping("/downloadCompanyFile/{kycId}")
//    public ResponseEntity<?> downloadCompanyFile(@PathVariable("kycId") Integer kycId, String imageName, Integer pathId) {
//        FileDownloadUtil downloadUtil = new FileDownloadUtil();
//
//        Resource resource = null;
//        try {
//            resource = (Resource) downloadUtil.getCompanyFileAsResource(kycId,imageName,pathId);
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

//http://localhost:8094/api/v1/FileUpload/downloadFile/50/1
//http://localhost:8094/api/v1/FileUpload/files/upload