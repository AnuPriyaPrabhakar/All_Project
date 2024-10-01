package com.ponsun.kyc.Master.ScoreCalculation.services;
import com.ponsun.kyc.Master.ScoreCalculation.request.CreateScoreCalculationRequest;
import com.ponsun.kyc.Master.ScoreCalculation.request.UpdateScoreCalculationRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import org.springframework.transaction.annotation.Transactional;

public interface ScoreCalculationWriteService {
    Response createScoreCalculationList(CreateScoreCalculationRequest createScoreCalculationRequest);
    Response updateScoreCalculationList(Integer id, UpdateScoreCalculationRequest updateScoreCalculationRequest);

    @Transactional
    Response deActivate(Integer kycId, Integer euid);
}
