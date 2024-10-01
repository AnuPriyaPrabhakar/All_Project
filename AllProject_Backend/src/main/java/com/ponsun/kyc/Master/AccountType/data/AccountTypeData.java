package com.ponsun.kyc.Master.AccountType.data;

import lombok.Data;

@Data
public class AccountTypeData {
    private Integer id;
    private Integer applicationTypeId;
    private String name;
    private Integer uid;
    private Integer euid;

    public AccountTypeData(final Integer id,Integer applicationTypeId, final String name , final Integer uid, final Integer euid){
        this.id = id;
        this.applicationTypeId = applicationTypeId;
        this.name = name;
        this.uid = uid;
        this.euid = euid;
    }
    public static AccountTypeData newInstance (final Integer id,Integer applicationTypeId, final String name , final Integer uid, final Integer euid){
        return new AccountTypeData(id,applicationTypeId, name,uid,euid);
    }
}
