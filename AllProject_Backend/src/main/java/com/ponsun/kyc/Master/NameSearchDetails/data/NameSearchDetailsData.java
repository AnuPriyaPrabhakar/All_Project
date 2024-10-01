package com.ponsun.kyc.Master.NameSearchDetails.data;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class NameSearchDetailsData {
    private Integer id;
    private String question;
    private String answer;
    private Integer kycId;
    private Integer uid;
    private Integer euid;

    public NameSearchDetailsData(final Integer id,final String question,final String answer,final Integer kycId,final Integer uid,final Integer euid){
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.kycId = kycId;
        this.uid = uid;
        this.euid = euid;
    }
    public static NameSearchDetailsData newInstance(final Integer id,final String question,final String answer,final Integer kycId,final Integer uid,final Integer euid){
        return new NameSearchDetailsData(id,question,answer,kycId,uid,euid);
    }
}
