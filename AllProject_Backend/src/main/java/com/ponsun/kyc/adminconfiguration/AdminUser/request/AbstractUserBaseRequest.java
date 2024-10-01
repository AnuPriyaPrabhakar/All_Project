package com.ponsun.kyc.adminconfiguration.AdminUser.request;

import lombok.Data;

import java.time.LocalDate;
@Data
public abstract class AbstractUserBaseRequest {
    private Integer id;
    private String userName;
    private String password;
    private String adminGroup;
    private String fullName;
    private LocalDate dob;
    private Integer genderId;
    private Integer maritalStatusId;
    private LocalDate dom;
    private Integer msgDisplayed;
    private Boolean superUser;
    private String role;
    private Integer admin;
    private String email;
    private String phoneNo;
    private LocalDate validFrm;
    private LocalDate validTo;
    private Boolean valid;
    private Integer orgId;
    private Integer uid;

}
