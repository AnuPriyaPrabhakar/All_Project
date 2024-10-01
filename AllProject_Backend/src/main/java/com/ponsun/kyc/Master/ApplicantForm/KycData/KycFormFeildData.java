package com.ponsun.kyc.Master.ApplicantForm.KycData;

import lombok.Data;

@Data
public class KycFormFeildData {
    private Integer id;
    private Integer subQuestionId;
    private String name;
    private String description;
    private Integer multiQuestion;
    private Integer orderNo;

    public KycFormFeildData(Integer id,Integer subQuestionId, String name, String description, Integer multiQuestion, Integer orderNo) {
        this.id = id;
        this.subQuestionId=subQuestionId;
        this.name = name;
        this.description = description;
        this.multiQuestion = multiQuestion;
        this.orderNo = orderNo;
    }
    public static KycFormFeildData newInstance(Integer id,Integer subQuestionId, String name, String description, Integer multiQuestion, Integer orderNo){
        return new KycFormFeildData(id,subQuestionId,name,description,multiQuestion,orderNo);
    }
}
