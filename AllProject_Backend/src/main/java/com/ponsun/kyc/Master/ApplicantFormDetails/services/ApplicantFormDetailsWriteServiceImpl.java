package com.ponsun.kyc.Master.ApplicantFormDetails.services;

import com.ponsun.kyc.Master.ApplicantFormDetails.data.ApplicantFormDetailsValidator;
import com.ponsun.kyc.Master.ApplicantFormDetails.domain.ApplicantFormDetails;
import com.ponsun.kyc.Master.ApplicantFormDetails.domain.ApplicantFormDetailsRepository;
import com.ponsun.kyc.Master.ApplicantFormDetails.domain.ApplicantFormDetailsWrapper;
import com.ponsun.kyc.Master.ApplicantFormDetails.request.CreateApplicantFormDetailsRequest;
import com.ponsun.kyc.Master.ApplicantFormDetails.request.UpdateApplicantFormDetailsRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicantFormDetailsWriteServiceImpl implements ApplicantFormDetailsWriteService{
    private final ApplicantFormDetailsRepository applicantFormDetailsRepository;
    private final ApplicantFormDetailsWrapper applicantFormDetailsWrapper;
    private final ApplicantFormDetailsValidator applicantFormDetailsValidator;

    @Override
    public Response createFormDetailsList(CreateApplicantFormDetailsRequest createApplicantFormDetailsRequest) {
        try {
            this.applicantFormDetailsValidator.validateSaveApplicantFormDetails(createApplicantFormDetailsRequest);
            ApplicantFormDetails applicantFormDetails = ApplicantFormDetails.create(createApplicantFormDetailsRequest);//entity
            applicantFormDetails=this.applicantFormDetailsRepository.saveAndFlush(applicantFormDetails);

            return Response.of(Long.valueOf(applicantFormDetails.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    public Response updateFormDetailsList(Integer id, UpdateApplicantFormDetailsRequest updateApplicantFormDetailsRequest) {
        try {
            this.applicantFormDetailsValidator.validateUpdateApplicantFormDetails(updateApplicantFormDetailsRequest);

            ApplicantFormDetails applicantFormDetails;

            if (updateApplicantFormDetailsRequest.getId() == null || updateApplicantFormDetailsRequest.getId() == 0) {
                applicantFormDetails = new ApplicantFormDetails();
            } else {
                applicantFormDetails = this.applicantFormDetailsRepository.findById(updateApplicantFormDetailsRequest.getId())
                        .orElseThrow(() -> new Exception("ApplicantFormDetails not found"));
            }

            // Update the applicant form details with the request data
            applicantFormDetails.update(updateApplicantFormDetailsRequest);

            // Save and flush the applicant form details
            applicantFormDetails = this.applicantFormDetailsRepository.saveAndFlush(applicantFormDetails);

            return Response.of(Long.valueOf(applicantFormDetails.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public Response deActivate(Integer kycId, Integer euid) {
        try {
            List<ApplicantFormDetails> applicantFormDetails = this.applicantFormDetailsWrapper.findKycIdNotFoundDetection(kycId);
            Response response = null;
            for (ApplicantFormDetails details : applicantFormDetails) {
                details.setEuid(euid);
                details.setStatus(Status.DELETE);
                details.setUpdatedAt(LocalDateTime.now());
                response = Response.of(details.getId());
            }
            this.applicantFormDetailsRepository.saveAllAndFlush(applicantFormDetails);
            return response;
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
}

