package com.ponsun.kyc.Master.ApplicationType.data;

import lombok.Data;

@Data
public class ApplicationTypeData {
    private Integer id;
    private String name;
    private Integer euid;
    private Integer uid;

    public ApplicationTypeData(Integer id, String name, Integer euid, Integer uid) {
        this.id = id;
        this.name = name;
        this.euid = euid;
        this.uid = uid;
    }
    public static ApplicationTypeData newInstance(Integer id, String name, Integer euid, Integer uid){
        return new ApplicationTypeData(id,name,euid,uid);
    }
}
