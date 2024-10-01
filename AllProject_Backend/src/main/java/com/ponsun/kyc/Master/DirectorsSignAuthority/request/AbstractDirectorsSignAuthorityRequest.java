package com.ponsun.kyc.Master.DirectorsSignAuthority.request;

import lombok.Data;

@Data
public class AbstractDirectorsSignAuthorityRequest {
    private Integer id;
    private Integer kycId;
    private String name;
    private String designation;
    private Integer uid;
    private Integer euid;
}
