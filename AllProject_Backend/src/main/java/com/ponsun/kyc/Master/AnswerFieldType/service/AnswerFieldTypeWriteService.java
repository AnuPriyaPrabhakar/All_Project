package com.ponsun.kyc.Master.AnswerFieldType.service;


import com.ponsun.kyc.Master.AnswerFieldType.request.CreateAnswerFieldTypeRequest;
import com.ponsun.kyc.Master.AnswerFieldType.request.UpdateAnswerFieldTypeRequest;
import com.ponsun.kyc.Master.AnswerType.request.CreateAnswerTypeRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

public interface AnswerFieldTypeWriteService {
    Response createAnswerFieldType(CreateAnswerFieldTypeRequest createAnswerFieldTypeRequest);
    Response updateAnswerFieldType(Integer id, UpdateAnswerFieldTypeRequest updateAnswerFieldTypeRequest);

}
