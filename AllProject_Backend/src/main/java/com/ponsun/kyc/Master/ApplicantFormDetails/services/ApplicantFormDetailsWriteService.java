package com.ponsun.kyc.Master.ApplicantFormDetails.services;

import com.ponsun.kyc.Master.ApplicantFormDetails.request.CreateApplicantFormDetailsRequest;
import com.ponsun.kyc.Master.ApplicantFormDetails.request.UpdateApplicantFormDetailsRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

public interface ApplicantFormDetailsWriteService {
    Response createFormDetailsList(CreateApplicantFormDetailsRequest createApplicantFormDetailsRequest);

    Response updateFormDetailsList(Integer id, UpdateApplicantFormDetailsRequest UpdateApplicantFormDetailsRequest);

    Response deActivate(Integer kycId, Integer euid);


}
