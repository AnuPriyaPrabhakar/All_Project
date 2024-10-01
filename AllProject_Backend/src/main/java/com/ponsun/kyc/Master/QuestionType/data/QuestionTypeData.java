package com.ponsun.kyc.Master.QuestionType.data;

import lombok.Data;

@Data
public class QuestionTypeData {
    private Integer id;
    private Integer accountTypeId;
    private Integer applicationTypeId;
    private Integer ansTypeId;
    private String name;
    private Integer nameField;
    private Integer orderNo;
    private Integer multiQuestion;
    private String description;
    private Integer uid;
    private Integer euid;

    public QuestionTypeData(Integer id, Integer accountTypeId, Integer applicationTypeId,Integer ansTypeId, String name,Integer nameField,Integer orderNo,Integer multiQuestion,String description, Integer uid, Integer euid) {
        this.id = id;
        this.accountTypeId = accountTypeId;
        this.applicationTypeId = applicationTypeId;
        this.ansTypeId = ansTypeId;
        this.name = name;
        this.nameField=nameField;
        this.orderNo=orderNo;
        this.multiQuestion=multiQuestion;
        this.description=description;
        this.uid = uid;
        this.euid = euid;
    }
    public static QuestionTypeData newInstance(Integer id, Integer accountTypeId, Integer applicationTypeId,Integer ansTypeId, String name,Integer nameField,Integer orderNo,Integer multiQuestion,String description, Integer uid, Integer euid){
        return new QuestionTypeData(id,accountTypeId,applicationTypeId,ansTypeId,name,nameField,orderNo,multiQuestion,description,uid,euid);
    }
}
