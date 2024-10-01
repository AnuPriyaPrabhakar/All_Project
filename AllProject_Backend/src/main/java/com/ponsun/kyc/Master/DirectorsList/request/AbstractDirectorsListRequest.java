package com.ponsun.kyc.Master.DirectorsList.request;

import lombok.Data;

@Data
public class AbstractDirectorsListRequest {
    private Integer id;
    private Integer authorityId;
    private Integer kycId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String pan;
    private Integer nationality;
    private Integer citizenship;
    private Integer domicile;
    private Integer isDirector;
    private Integer isShareHolders;
    private Integer uid;
    private Integer euid;
    private Integer isScreening;
}
