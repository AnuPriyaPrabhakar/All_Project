package com.ponsun.kyc.Master.SubQuestionType.data;
import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeData;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
public class SubQuestionTypeData {
    private Integer id;
    private Integer applicationTypeId;
    private Integer accountTypeId;
    private Integer questionId;
    private String name;
    private Integer nameField;
    private Integer ansTypeId;
    private Integer orderNo;
    private Integer uid;
    private Integer euid;
    private List<AnswerTypeData> answerTypeData;

    public SubQuestionTypeData(Integer id, Integer applicationTypeId, Integer accountTypeId, Integer questionId, String name,Integer nameField, Integer ansTypeId, Integer orderNo, Integer uid, Integer euid, List<AnswerTypeData> answerTypeData) {
        this.id = id;
        this.applicationTypeId = applicationTypeId;
        this.accountTypeId = accountTypeId;
        this.questionId = questionId;
        this.name = name;
        this.nameField = nameField;
        this.ansTypeId = ansTypeId;
        this.orderNo = orderNo;
        this.uid = uid;
        this.euid = euid;
        this.answerTypeData = answerTypeData;
    }

    public static SubQuestionTypeData newInstance(Integer id, Integer applicationTypeId, Integer accountTypeId, Integer questionId, String name,Integer nameField, Integer ansTypeId, Integer orderNo, Integer uid, Integer euid, List<AnswerTypeData> answerTypeData){
    return new SubQuestionTypeData(id,applicationTypeId,accountTypeId,questionId,name,nameField,ansTypeId,orderNo,uid,euid,answerTypeData);    }
}
