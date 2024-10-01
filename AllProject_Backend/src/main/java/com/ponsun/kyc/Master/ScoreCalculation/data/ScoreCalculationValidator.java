package com.ponsun.kyc.Master.ScoreCalculation.data;
import com.ponsun.kyc.Master.ScoreCalculation.request.CreateScoreCalculationRequest;
import com.ponsun.kyc.Master.ScoreCalculation.request.UpdateScoreCalculationRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ScoreCalculationValidator {
    public void validateSaveScoreCalculation(final CreateScoreCalculationRequest request) {
        if (request.getKycId()== null || request.getKycId() == 0 || request.getKycId().equals("")) {
            throw new EQAS_KYC_ApplicationException("kycId parameter required");
        }
    }
    public void validateUpdateScoreCalculation(final UpdateScoreCalculationRequest request) {
        if (request.getId() == null || request.getId() == 0 || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
        if (request.getKycId()== null || request.getKycId() == 0 || request.getKycId().equals("")) {
            throw new EQAS_KYC_ApplicationException("kycId parameter required");
        }
    }
}
