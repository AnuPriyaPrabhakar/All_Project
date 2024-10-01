package com.ponsun.kyc.Master.ApplicantForm.dto;

import com.ponsun.kyc.Master.ApplicantFormDetails.data.ApplicantFormDetailsData;
import lombok.Data;

import java.util.List;

@Data
public class ApplicantFormDto {
    private Integer id;
    private String name;
    private Integer numberOfPrint;
    private Integer isCompleted;
    private List<ApplicantFormDetailsData>applicantFormDetailsData;

    public ApplicantFormDto(Integer id, String name, Integer numberOfPrint,Integer isCompleted, List<ApplicantFormDetailsData> applicantFormDetailsData) {
        this.id = id;
        this.name = name;
        this.numberOfPrint = numberOfPrint;
        this.isCompleted = isCompleted;
        this.applicantFormDetailsData = applicantFormDetailsData;
    }
    public static ApplicantFormDto newInstance(Integer id, String name, Integer numberOfPrint, Integer isCompleted,List<ApplicantFormDetailsData> applicantFormDetailsData){
        return new ApplicantFormDto(id,name,numberOfPrint,isCompleted,applicantFormDetailsData);
    }
}
