package com.ponsun.kyc.Master.ApplicantForm.services;

import com.ponsun.kyc.Master.ApplicantForm.dto.ApplicantFormPayload;
import com.ponsun.kyc.Master.ApplicantForm.request.UpdateApplicantFormRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import jakarta.transaction.Transactional;;

import java.util.List;


public interface ApplicantFormWriteService {
    Response createApplicantFormList(ApplicantFormPayload formPayload);
    Response updateApplicantForm(Integer id,ApplicantFormPayload applicantFormPayloads);

    @Transactional
    Response updateApplicantForm(Integer id);

    Response deActivate(Integer kycId, Integer euid);

    Response updateIsCompleted(Integer id, String status);
}
