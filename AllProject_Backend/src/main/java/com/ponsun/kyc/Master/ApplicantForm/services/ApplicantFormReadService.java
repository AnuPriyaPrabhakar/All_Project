package com.ponsun.kyc.Master.ApplicantForm.services;

import com.ponsun.kyc.Master.ApplicantForm.KycData.KycAnswerData;
import com.ponsun.kyc.Master.ApplicantForm.KycData.KycFormFeildData;
import com.ponsun.kyc.Master.ApplicantForm.KycData.KycFormPayLoad;
import com.ponsun.kyc.Master.ApplicantForm.KycData.KycSubQueFormData;
import com.ponsun.kyc.Master.ApplicantForm.data.ApplicantFormData;
import com.ponsun.kyc.Master.ApplicantForm.domain.ApplicantForm;

import java.util.List;

public interface ApplicantFormReadService {
    ApplicantForm fetchApplicantFormById(Integer id);

    public Integer getmaxNumberOfPrint(Integer id) ;

    List <KycFormFeildData> fetchAllKycFormFeild(Integer kycId);

    List<KycSubQueFormData>fetchAllKycSubQueForm(Integer kycId,Integer questionId);

    List <KycAnswerData> fetchAllKycAnswer(Integer kycId,Integer questionId,Integer subQuestionId);


    List<KycFormPayLoad> fetchAllKycForm(Integer kycId);

    List<ApplicantFormData> fetchAllApplicantFormData();
}
