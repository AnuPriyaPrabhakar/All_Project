package com.ponsun.kyc.adminconfiguration.adminuserroal.data;

import lombok.Data;

@Data
public class AdminUserRoalData {
    private Integer id;
    private String userType;
    private Boolean valid;
    private Integer uid;
    private Integer euid;


    public AdminUserRoalData(final Integer id, final String userType, final Boolean valid, final Integer uid, final Integer euid){
        this.id = id;
        this.userType = userType;
        this.valid = valid;
        this.uid = uid;
        this.euid = euid;
    }

    public static AdminUserRoalData newInstance (final Integer id, final String userType, final Boolean valid, final Integer uid, final Integer euid) {
        return new AdminUserRoalData(id,userType,valid,uid,euid);
    }
}


