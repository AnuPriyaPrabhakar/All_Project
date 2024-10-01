package com.ponsun.kyc.Master.DirectorsSignAuthority.data;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class DirectorsSignAuthorityData {
    private Integer id;
    private Integer kycId;
    private String name;
    private String designation;
    private Integer uid;
    private Integer euid;

    public DirectorsSignAuthorityData(Integer id, Integer kycId, String name, String designation, Integer uid, Integer euid) {
        this.id = id;
        this.kycId = kycId;
        this.name = name;
        this.designation = designation;
        this.uid = uid;
        this.euid = euid;
    }
    public static DirectorsSignAuthorityData newInstance(Integer id, Integer kycId, String name, String designation, Integer uid, Integer euid){
        return new DirectorsSignAuthorityData(id,kycId,name,designation,uid,euid);
    }

}
