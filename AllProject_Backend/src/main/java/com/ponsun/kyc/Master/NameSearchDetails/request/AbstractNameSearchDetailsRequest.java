package com.ponsun.kyc.Master.NameSearchDetails.request;

import lombok.Data;

@Data
public class AbstractNameSearchDetailsRequest {
    private Integer id;
    private String question;
    private String answer;
    private Integer kycId;
    private Integer uid;
    private Integer euid;
}
