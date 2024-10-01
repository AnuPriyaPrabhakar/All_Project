package com.ponsun.kyc.Master.ApplicationType.request;

import lombok.Data;

@Data
public class AbstractApplicationTypeRequest {
    private Integer id;
    private String name;
    private Integer euid;
    private Integer uid;
}
