package com.ponsun.kyc.Master.ApplicantFormDetails.services;

import com.ponsun.kyc.Master.ApplicantForm.domain.ApplicantForm;
import com.ponsun.kyc.Master.ApplicantFormDetails.domain.ApplicantFormDetails;

import java.util.List;

public interface ApplicantFormDetailsReadService {
    ApplicantFormDetails fetchFormDetailsById(Integer id);

    public List<Double> getScore(Integer id) ;

}
//    public Double getAverageScore(Integer id) ;