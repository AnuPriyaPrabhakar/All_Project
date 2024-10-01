package com.ponsun.kyc.Master.ApplicantForm.domain;

import com.ponsun.kyc.Master.ApplicantForm.request.AbstractApplicantFormRequest;;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApplicantFormWrapper extends AbstractApplicantFormRequest {
    private final ApplicantFormRepository applicantFormRepository;
    @Transactional
    public ApplicantForm findOneWithNotFoundDetection(final Integer id){
        return this.applicantFormRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("ApplicantForm Not found " + id) );
    }

    @Transactional
    public Optional<ApplicantForm> findKycIdNotFoundDetection(final Integer kycId){
        return this.applicantFormRepository.findById(kycId);
    }
    @Override
    public String toString(){
        return super.toString();
    }

}
