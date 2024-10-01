package com.ponsun.kyc.Master.ApplicantForm.domain;

import com.ponsun.kyc.Master.ApplicantForm.request.AbstractApplicantFormRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

;

@Service
@RequiredArgsConstructor
public class ApplicantFormLogWrapper extends AbstractApplicantFormRequest {
    private final ApplicantFormLogRepository applicantFormLogRepository;
    @Transactional
    public ApplicantFormLog findOneWithNotFoundDetection(final Integer id){
        return this.applicantFormLogRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("ApplicantForm Not found " + id) );
    }

    @Transactional
    public Optional<ApplicantFormLog> findKycIdNotFoundDetection(final Integer kycId){
        return this.applicantFormLogRepository.findById(kycId);
    }
    @Override
    public String toString(){
        return super.toString();
    }

}
