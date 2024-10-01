package com.ponsun.kyc.Master.ClientView.request;

import lombok.Data;

@Data
public class AbstractClientViewRequest {
    private Integer kycId;
    private String name;
    private String date;
}
