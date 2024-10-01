package com.ponsun.kyc.Master.SubQuestionType.services;
import com.ponsun.kyc.Master.SubQuestionType.request.CreateSubQuestionTypeRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import org.springframework.transaction.annotation.Transactional;

public interface SubQuestionTypeWriteService {
    Response createSubQuestionList(CreateSubQuestionTypeRequest createSubQuestionTypeRequest);
    Response deActivate(Integer questionId, Integer euid);
    Response updateSubQuestionList(Integer id);
}
