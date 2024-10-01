package com.ponsun.kyc.Master.SubQuestionType.data;

import com.ponsun.kyc.Master.QuestionType.request.CreateQuestionTypeRequest;
import com.ponsun.kyc.Master.QuestionType.request.UpdateQuestionTypeRequest;
import com.ponsun.kyc.Master.SubQuestionType.request.CreateSubQuestionTypeRequest;
import com.ponsun.kyc.Master.SubQuestionType.request.UpdateSubQuestionTypeRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SubQuestionTypeValidator {
    public void validateSaveSubQuestion(final CreateSubQuestionTypeRequest request) {
        if (request.getId() == null || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }
    public void validateUpdateSubQuestion(final UpdateSubQuestionTypeRequest request) {
        if (request.getId() == null || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }

}
