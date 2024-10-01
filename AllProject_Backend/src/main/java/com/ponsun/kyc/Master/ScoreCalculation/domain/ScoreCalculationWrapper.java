package com.ponsun.kyc.Master.ScoreCalculation.domain;

import com.ponsun.kyc.Master.DeclarationForm.domain.DeclarationForm;
import com.ponsun.kyc.Master.ScoreCalculation.request.AbstractScoreCalculationRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScoreCalculationWrapper extends AbstractScoreCalculationRequest {
    private final ScoreCalculationRepository scoreCalculationRepository;
    @Transactional
    public ScoreCalculation findOneWithNotFoundDetection(final Integer id){
        return this.scoreCalculationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("ScoreCalculation Not found " + id) );
    }

    @Transactional
    public List<ScoreCalculation> findKycIdNotFoundDetection(final Integer kycId){
        return this.scoreCalculationRepository.findByKycId(kycId);
    }


    @Override
    public String toString(){
        return super.toString();
    }

}
