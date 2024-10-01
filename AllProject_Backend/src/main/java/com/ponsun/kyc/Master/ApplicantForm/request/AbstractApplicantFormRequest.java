package com.ponsun.kyc.Master.ApplicantForm.request;

import lombok.Data;

@Data
public class AbstractApplicantFormRequest {
    private Integer id;
    private String name;
    private Integer numberOfPrint;
    private Integer isCompleted;
    private Integer euid;
    private Integer uid;
}
