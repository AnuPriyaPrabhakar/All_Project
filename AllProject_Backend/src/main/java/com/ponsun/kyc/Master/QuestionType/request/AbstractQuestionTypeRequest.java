package com.ponsun.kyc.Master.QuestionType.request;

import lombok.Data;

@Data
public class AbstractQuestionTypeRequest {
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
}
