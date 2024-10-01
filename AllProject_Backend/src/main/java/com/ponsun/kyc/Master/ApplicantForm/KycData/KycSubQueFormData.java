package com.ponsun.kyc.Master.ApplicantForm.KycData;

import lombok.Data;

import java.util.List;

@Data
public class KycSubQueFormData {
    private Integer id;
    private Integer subQuestionId;
    private String name;
    private String description;
    private Integer multiQuestion;
    private Integer orderNo;
    private List<KycAnswerData> kycAnswerData;
    public KycSubQueFormData(Integer id,Integer subQuestionId, String name, String description, Integer multiQuestion, Integer orderNo,List<KycAnswerData> kycAnswerData) {
        this.id = id;
        this.subQuestionId=subQuestionId;
        this.name = name;
        this.description = description;
        this.multiQuestion = multiQuestion;
        this.orderNo = orderNo;
        this.kycAnswerData=kycAnswerData;
    }
    public static KycSubQueFormData newInstance(Integer id,Integer subQuestionId, String name, String description, Integer multiQuestion, Integer orderNo,List<KycAnswerData> kycAnswerData){
        return new KycSubQueFormData(id,subQuestionId,name,description,multiQuestion,orderNo,kycAnswerData);
    }
}
