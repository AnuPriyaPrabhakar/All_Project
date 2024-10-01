package com.ponsun.kyc.Master.ApplicantFormDetails.request;

import lombok.Data;

@Data
public class AbstractApplicantFormDetailsRequest {
    private Integer id;
    private Integer kycId;
    private Integer accountTypeId;
    private Integer applicationTypeId;
    private Integer questionId;
    private Integer subQuestionId;
    private Integer ansTypeId;
    private Integer ansId;
    private Integer isSubAnswer;
    private String answer;
    private Double score;
    private Integer uid;
    private Integer euid;
    private Integer isScreening;
}
