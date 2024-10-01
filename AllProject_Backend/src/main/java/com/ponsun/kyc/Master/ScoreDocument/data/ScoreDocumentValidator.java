package com.ponsun.kyc.Master.ScoreDocument.data;
import com.ponsun.kyc.Master.ScoreDocument.request.CreateScoreDocumentRequest;
import com.ponsun.kyc.Master.ScoreDocument.request.UpdateScoreDocumentRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ScoreDocumentValidator {
    public void validateSaveScoreDocument(final CreateScoreDocumentRequest request) {
        if (request.getRiskScoreCalculationId()== null || request.getRiskScoreCalculationId()== 0 ||request.getRiskScoreCalculationId().equals("")) {
            throw new EQAS_KYC_ApplicationException("riskScoreCalculationId parameter required");
        }
    }
    public void validateUpdateScoreDocument(final UpdateScoreDocumentRequest request) {
        if (request.getId() == null || request.getId()== 0 ||request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }
}

