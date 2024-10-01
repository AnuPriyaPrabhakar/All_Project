package com.ponsun.kyc.FilesStorage.service;

import com.ponsun.kyc.FilesStorage.request.CreateFileStorageRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileStorageWritePlatformService {
    Response createFileStorage(CreateFileStorageRequest createFileStorageRequest);
    void save(MultipartFile[] file, Integer kycId ,Integer documentTypeId);
    List<Integer> getDocument(Integer kycId, Integer documentTypeId);


}
