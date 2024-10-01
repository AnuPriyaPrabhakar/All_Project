package com.ponsun.kyc.Master.ApplicantFormDetails.data;

import com.ponsun.kyc.Master.ApplicantFormDetails.request.CreateApplicantFormDetailsRequest;
import com.ponsun.kyc.Master.ApplicantFormDetails.request.UpdateApplicantFormDetailsRequest;
import com.ponsun.kyc.Master.ApplicationType.request.CreateApplicationTypeRequest;
import com.ponsun.kyc.Master.ApplicationType.request.UpdateApplicationTypeRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ApplicantFormDetailsValidator {
    public void validateSaveApplicantFormDetails(final CreateApplicantFormDetailsRequest request) {
        if (request.getSubQuestionId()== null || request.getSubQuestionId().equals("")) {
            throw new EQAS_KYC_ApplicationException("SubQuestionId parameter required");
        }
    }
    public void validateUpdateApplicantFormDetails(final UpdateApplicantFormDetailsRequest request) {
        if (request.getId() == null || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }
}
