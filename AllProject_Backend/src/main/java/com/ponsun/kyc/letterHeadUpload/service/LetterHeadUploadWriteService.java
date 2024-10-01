package com.ponsun.kyc.letterHeadUpload.service;

import com.ponsun.kyc.infrastructure.utils.Response;
import com.ponsun.kyc.letterHeadUpload.request.CreateLetterHeadUploadRequest;
import com.ponsun.kyc.letterHeadUpload.request.UpdateLetterHeadUploadRequest;
import org.springframework.web.multipart.MultipartFile;

public interface LetterHeadUploadWriteService {
    Response createLetterHeadUpload(CreateLetterHeadUploadRequest createLetterHeadUploadRequest);
    void save(MultipartFile file, Integer branchId);
}
