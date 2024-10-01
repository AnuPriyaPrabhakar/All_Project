package com.ponsun.kyc.Master.AccountType.request;

import lombok.Data;

@Data
public class AbstractAccountTypeRequest {
    private Integer id;
    private Integer applicationTypeId;
    private String name;
    private Integer uid;
    private Integer euid;
}
