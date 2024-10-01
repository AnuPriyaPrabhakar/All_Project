package com.ponsun.kyc.adminconfiguration.adminuserroal.request;

import lombok.Data;

@Data
public class AbstractAdminUserRoalBaseRequest {
//  private Integer id;
    private String userType;
    private Boolean valid;
    private Integer uid;
    private Integer euid;

}
