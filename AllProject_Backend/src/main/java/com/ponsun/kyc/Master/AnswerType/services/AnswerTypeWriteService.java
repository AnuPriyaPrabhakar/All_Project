package com.ponsun.kyc.Master.AnswerType.services;

import com.ponsun.kyc.Master.AnswerType.request.CreateAnswerTypeRequest;
import com.ponsun.kyc.Master.SubQuestionType.request.CreateSubQuestionTypeRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import org.springframework.transaction.annotation.Transactional;

public abstract class AnswerTypeWriteService {

    public abstract Response createAnswerList(CreateAnswerTypeRequest createAnswerTypeRequest);

    public abstract Response deActivate(Integer questionId,Integer subQuestionId, Integer euid);

    public abstract Response updateAnswerList(Integer id, Integer subQuesId);
}
