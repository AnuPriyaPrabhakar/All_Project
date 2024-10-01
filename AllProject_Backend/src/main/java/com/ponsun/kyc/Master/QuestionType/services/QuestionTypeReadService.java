package com.ponsun.kyc.Master.QuestionType.services;

import com.ponsun.kyc.Master.QuestionType.domain.QuestionType;
import com.ponsun.kyc.Master.QuestionType.dto.QuestionPayload;

import java.util.List;

public interface QuestionTypeReadService {
    QuestionType fetchQuestionTypeById(Integer id);
    List<QuestionPayload> fetchAllQuestionType(Integer applicationTypeId, Integer accountTypeId);

    QuestionType fetchQuestionType(Integer id);


}
