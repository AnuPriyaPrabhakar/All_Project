package com.ponsun.kyc.Master.QuestionType.services;

import com.ponsun.kyc.Master.QuestionType.request.CreateQuestionTypeRequest;
import com.ponsun.kyc.Master.QuestionType.request.UpdateQuestionTypeRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import org.springframework.transaction.annotation.Transactional;

public interface QuestionTypeWriteService {
    Response createQuestionTypeList(CreateQuestionTypeRequest createQuestionTypeRequest);
    //Response updateQuestionTypeList(Integer id, UpdateQuestionTypeRequest updateQuestionTypeRequest);
    Response updateQuestionTypeList(Integer id);
        Response updateQuestionType(Integer id, UpdateQuestionTypeRequest request);
    Response deActivate(Integer id, Integer euid);
}
