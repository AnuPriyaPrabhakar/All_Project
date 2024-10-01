package com.ponsun.kyc.Master.ScoreCalculation.services;

import com.ponsun.kyc.Master.ScoreCalculation.data.ScoreCalculationValidator;
import com.ponsun.kyc.Master.ScoreCalculation.domain.ScoreCalculation;
import com.ponsun.kyc.Master.ScoreCalculation.domain.ScoreCalculationRepository;
import com.ponsun.kyc.Master.ScoreCalculation.domain.ScoreCalculationWrapper;
import com.ponsun.kyc.Master.ScoreCalculation.request.CreateScoreCalculationRequest;
import com.ponsun.kyc.Master.ScoreCalculation.request.UpdateScoreCalculationRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScoreCalculationWriteServiceImpl implements ScoreCalculationWriteService {
    private final ScoreCalculationRepository scoreCalculationRepository;
    private final ScoreCalculationWrapper scoreCalculationWrapper;
    private final ScoreCalculationValidator scoreCalculationValidator;

    @Override
    @Transactional
    public Response createScoreCalculationList(CreateScoreCalculationRequest createScoreCalculationRequest) {
        try {
            Integer kycId = createScoreCalculationRequest.getKycId();
            this.deActivate(kycId, createScoreCalculationRequest.getUid());

            final ScoreCalculation scoreCalculation = ScoreCalculation.create(createScoreCalculationRequest);
            this.scoreCalculationRepository.saveAndFlush(scoreCalculation);


//            if (kycId == 0) {
//                kycId = scoreCalculation.getId();
//                scoreCalculation.setKycId(kycId);
//                scoreCalculation = this.scoreCalculationRepository.saveAndFlush(scoreCalculation);
//            } else {
//                this.deActivate(kycId, scoreCalculation.getEuid());
//                scoreCalculation.setStatus(Status.ACTIVE);
//                scoreCalculation = this.scoreCalculationRepository.saveAndFlush(scoreCalculation);
//            }

            return Response.of(scoreCalculation.getId());
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response updateScoreCalculationList(Integer id, UpdateScoreCalculationRequest updateApplicationConfigTypeRequest) {
        try {
            this.scoreCalculationValidator.validateUpdateScoreCalculation(updateApplicationConfigTypeRequest);
            final ScoreCalculation scoreCalculation = this.scoreCalculationWrapper.findOneWithNotFoundDetection(id);
            scoreCalculation.update(updateApplicationConfigTypeRequest);
            this.scoreCalculationRepository.saveAndFlush(scoreCalculation);
            return Response.of(Long.valueOf(scoreCalculation.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response deActivate(Integer kycId, Integer euid) {
        try {
            List<ScoreCalculation> scoreCalculations = this.scoreCalculationWrapper.findKycIdNotFoundDetection(kycId);
            Response response = null;
            for (ScoreCalculation scoreCalculation : scoreCalculations) {
                scoreCalculation.setEuid(euid);
                scoreCalculation.setStatus(Status.DELETE);
                scoreCalculation.setUpdatedAt(LocalDateTime.now());
                response = Response.of(scoreCalculation.getId());
            }
            return response;
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
}
