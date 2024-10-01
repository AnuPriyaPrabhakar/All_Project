package com.ponsun.kyc.Master.ApplicantFormDetails.domain;

import com.ponsun.kyc.Master.ApplicantFormDetails.request.AbstractApplicantFormDetailsRequest;
import com.ponsun.kyc.Master.DirectorsList.domain.DirectorsList;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicantFormDetailsWrapper extends AbstractApplicantFormDetailsRequest {
    private final ApplicantFormDetailsRepository applicantFormDetailsRepository;

    @Transactional
    public ApplicantFormDetails findOneWithNotFoundDetection(final Integer id){
        return this.applicantFormDetailsRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("ApplicantFormDetails Not found " + id) );
    }

    @Transactional
    public List<ApplicantFormDetails> findKycIdNotFoundDetection(final Integer kycId){
        return this.applicantFormDetailsRepository.findByKycId(kycId);
    }

    @Override
    public String toString(){
        return super.toString();
    }

}
