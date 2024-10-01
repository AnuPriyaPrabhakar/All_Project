package com.ponsun.kyc.Master.AnswerType.data;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class AnswerTypeData {
    private Integer id;
    private Integer questionId;
    private Integer subQuestionId;
    private Integer subAnswer;
    private String name;
    private Double score;
    private Integer uid;
    private Integer euid;

    public AnswerTypeData(Integer id, Integer questionId,Integer subQuestionId,Integer subAnswer, String name,double score, Integer uid, Integer euid) {
        this.id = id;
        this.questionId = questionId;
        this.subQuestionId = subQuestionId;
        this.subAnswer=subAnswer;
        this.name = name;
        this.score=score;
        this.uid = uid;
        this.euid = euid;
    }
    public static AnswerTypeData newInstance(Integer id, Integer questionId,Integer subQuestionId,Integer subAnswer, String name,double score, Integer uid, Integer euid){
        return new AnswerTypeData(id,questionId,subQuestionId,subAnswer,name,score,uid,euid);
    }
}
