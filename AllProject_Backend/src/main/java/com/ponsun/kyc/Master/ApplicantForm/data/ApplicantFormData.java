package com.ponsun.kyc.Master.ApplicantForm.data;

import com.ponsun.kyc.Master.ApplicationType.data.ApplicationTypeData;
import lombok.Data;

@Data
public class ApplicantFormData {
    private Integer id;
    private String name;
    private Integer numberOfPrint;
    private Integer isCompleted;
    private Integer euid;
    private Integer uid;

    public ApplicantFormData(Integer id, String name,Integer numberOfPrint,Integer isCompleted, Integer euid, Integer uid) {
        this.id = id;
        this.name = name;
        this.numberOfPrint=numberOfPrint;
        this.isCompleted = isCompleted;
        this.euid = euid;
        this.uid = uid;
    }

    public static ApplicantFormData newInstance(Integer id, String name,Integer numberOfPrint,Integer isCompleted, Integer euid, Integer uid) {
        return new ApplicantFormData(id,name,numberOfPrint,isCompleted, euid, uid);
    }
}