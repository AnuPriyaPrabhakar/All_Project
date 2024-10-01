package com.ponsun.kyc.letterHeadUpload.data;

import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.letterHeadUpload.request.CreateLetterHeadUploadRequest;
import com.ponsun.kyc.letterHeadUpload.request.UpdateLetterHeadUploadRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LetterHeadUploadValidator {
    public void validateSaveLetterHeadUpload(final CreateLetterHeadUploadRequest request) {
        if (request.getBranchId() == null || request.getBranchId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }
    public void validateUpdateLetterHeadUpload(final UpdateLetterHeadUploadRequest request) {
        if (request.getBranchId() == null || request.getBranchId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }

}
