package com.ponsun.kyc.Master.ApplicantForm.KycData;

import lombok.Data;

import java.util.List;

@Data
public class KycFormDto {
    private Integer id;
    private Integer subQuestionId;
    private String name;
    private String description;
    private Integer multiQuestion;
    private Integer orderNo;
    private List<KycSubQueFormData> kycSubQueFormData;
    private List<KycAnswerData> kycAnswerData;

    public KycFormDto(Integer id, Integer subQuestionId, String name, String description, Integer multiQuestion, Integer orderNo, List<KycSubQueFormData> kycSubQueFormData,List<KycAnswerData> kycAnswerData) {
        this.id = id;
        this.subQuestionId = subQuestionId;
        this.name = name;
        this.description = description;
        this.multiQuestion = multiQuestion;
        this.orderNo = orderNo;
        this.kycSubQueFormData = kycSubQueFormData;
        this.kycAnswerData = kycAnswerData;
    }
    public KycFormDto() {
    }
    public static KycFormDto newInstance(Integer id, Integer subQuestionId, String name, String description, Integer multiQuestion, Integer orderNo, List<KycSubQueFormData> kycSubQueFormData,List<KycAnswerData> kycAnswerData){
        return new KycFormDto(id,subQuestionId,name,description,multiQuestion,orderNo,kycSubQueFormData,kycAnswerData);
    }

}
