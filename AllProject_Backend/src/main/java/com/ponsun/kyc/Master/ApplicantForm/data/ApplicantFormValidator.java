package com.ponsun.kyc.Master.ApplicantForm.data;

import com.ponsun.kyc.Master.ApplicantForm.request.CreateApplicantFormRequest;
import com.ponsun.kyc.Master.ApplicantForm.request.UpdateApplicantFormRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ApplicantFormValidator {
    public void validateSaveApplicantForm(final CreateApplicantFormRequest request) {
        if (request.getId() == null || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }
    public void validateUpdateApplicantForm(final UpdateApplicantFormRequest request) {
        if (request.getId() == null || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }

}
