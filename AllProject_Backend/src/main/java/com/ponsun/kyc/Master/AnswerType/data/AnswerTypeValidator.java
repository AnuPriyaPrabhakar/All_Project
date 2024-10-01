package com.ponsun.kyc.Master.AnswerType.data;

import com.ponsun.kyc.Master.AnswerType.request.CreateAnswerTypeRequest;
import com.ponsun.kyc.Master.AnswerType.request.UpdateAnswerTypeRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AnswerTypeValidator {
    public void validateSaveAnswer(final CreateAnswerTypeRequest request) {
        if (request.getId() == null || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }
    public void validateUpdateAnswer(final UpdateAnswerTypeRequest request) {
        if (request.getId() == null || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }

}
