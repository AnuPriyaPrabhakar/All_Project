package com.ponsun.kyc.Master.DeclarationForm.data;

import com.ponsun.kyc.Master.DirectorsList.data.DirectorsListData;
import lombok.Data;

@Data
public class DeclarationFormData {
    private Integer id;
    private Integer kycId;
    private String memberName;
    private String registeredPlace;
    private String din;
    private String date;
    private String place;
    private String authorizeName;
    private String authorizeDesignation;
    private Integer uid;
    private Integer euid;

    public DeclarationFormData (final Integer id,final Integer kycId, final String memberName,final String registeredPlace, final String din,
                              final String date, final String place, final String authorizeName,final String authorizeDesignation, final Integer uid, final Integer euid){
        this.id = id;
        this.kycId = kycId;
        this.memberName = memberName;
        this.registeredPlace = registeredPlace;
        this.din = din;
        this.date = date;
        this.place = place;
        this.authorizeName = authorizeName;
        this.authorizeDesignation = authorizeDesignation;
        this.uid = uid;
        this.euid = euid;
    }
    public static DeclarationFormData newInstance (final Integer id,final Integer kycId, final String memberName,final String registeredPlace, final String din,
                                                   final String date, final String place, final String authorizeName,final String authorizeDesignation, final Integer uid, final Integer euid){
        return new DeclarationFormData(id, kycId,memberName,registeredPlace,din,date,place,authorizeName,authorizeDesignation,uid,euid);
    }
}
