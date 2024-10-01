package com.ponsun.kyc.Master.SubQuestionType.request;

import lombok.Data;

@Data
public class AbstractSubQuestionTypeRequest {
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
}
