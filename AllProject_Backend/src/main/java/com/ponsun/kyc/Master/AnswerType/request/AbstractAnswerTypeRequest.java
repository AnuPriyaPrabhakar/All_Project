package com.ponsun.kyc.Master.AnswerType.request;

import lombok.Data;

@Data
public class AbstractAnswerTypeRequest {
    private Integer id;
    private Integer questionId;
    private Integer subQuestionId;
    private Integer subAnswer;
    private String name;
    private Double score;
    private Integer uid;
    private Integer euid;
}
