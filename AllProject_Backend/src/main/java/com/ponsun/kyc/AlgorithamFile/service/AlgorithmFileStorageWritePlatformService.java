package com.ponsun.kyc.AlgorithamFile.service;

import com.ponsun.kyc.AlgorithamFile.request.CreateAlgorithamFileStorageRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import org.springframework.web.multipart.MultipartFile;

public interface AlgorithmFileStorageWritePlatformService {
    Response createFileStorage(CreateAlgorithamFileStorageRequest createFileStorageRequest);
    Response save(MultipartFile file, Integer kycId,Integer pathId,Integer checkId);
    Response getDocumentId(Integer kycIds, Integer kycDocId, Integer SanDocId, Integer crmCocId, Integer AdverseMediaDocId, Integer Iskyc, Integer IsSan, Integer IsCrm, Integer IsAdverse);

}
