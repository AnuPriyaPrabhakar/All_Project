package com.ponsun.kyc.Master.QuestionType.data;

import com.ponsun.kyc.Master.QuestionType.request.CreateQuestionTypeRequest;
import com.ponsun.kyc.Master.QuestionType.request.UpdateQuestionTypeRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class QuestionTypeValidator {
    public void validateSaveQuestionType(final CreateQuestionTypeRequest request) {
        if (request.getId() == null || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }
    public void validateUpdateQuestionType(final UpdateQuestionTypeRequest request) {
        if (request.getId() == null || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }
}
