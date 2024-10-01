package com.ponsun.kyc.Master.QuestionType.dto;

import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeData;
import com.ponsun.kyc.Master.SubQuestionType.data.SubQuestionTypeData;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor

public class QuestionDto {
    private Integer id;
    private Integer accountTypeId;
    private Integer applicationTypeId;
    private Integer ansTypeId;
    private String name;
//    private Integer nameField;
    private Integer orderNo;
    private Integer multiQuestion;
    private String description;
    private List<SubQuestionTypeData> subQuestionTypeData;
    private List<AnswerTypeData> answerTypeData;



    public QuestionDto(Integer id, Integer accountTypeId, Integer applicationTypeId, Integer ansTypeId, String name,Integer nameField,Integer orderNo,Integer multiQuestion,String description,List<SubQuestionTypeData> subQuestionTypeData, List<AnswerTypeData> answerTypeData) {
        this.id = id;
        this.accountTypeId = accountTypeId;
        this.applicationTypeId = applicationTypeId;
        this.ansTypeId = ansTypeId;
        this.name = name;
//        this.nameField= nameField;
        this.orderNo=orderNo;
        this.multiQuestion=multiQuestion;
        this.description=description;
        this.subQuestionTypeData= subQuestionTypeData;
        this.answerTypeData = answerTypeData;
    }


    public static QuestionDto newInstance(Integer id, Integer accountTypeId, Integer applicationTypeId, Integer ansTypeId, String name,Integer nameField,Integer orderNo,Integer multiQuestion,String description,List<SubQuestionTypeData> subQuestionTypeData, List<AnswerTypeData> answerTypeData){
        return new QuestionDto(id,accountTypeId,applicationTypeId,ansTypeId,name,nameField,orderNo,multiQuestion,description,subQuestionTypeData,answerTypeData);
    }
}
