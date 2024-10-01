package com.ponsun.kyc.Master.DeclarationForm.request;

import lombok.Data;

@Data
public class AbstractDeclarationFormRequest {
    private Integer id;
    private Integer kycId;
    private String memberName;
    private String registeredPlace;
    private String din;
    private String date;
    private String place;
    private String authorizeName;
    private  String authorizeDesignation;
    private Integer uid;
    private Integer euid;
}
