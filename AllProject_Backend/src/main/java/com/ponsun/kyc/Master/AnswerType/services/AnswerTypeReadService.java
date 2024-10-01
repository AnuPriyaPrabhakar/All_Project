package com.ponsun.kyc.Master.AnswerType.services;

import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeData;
import com.ponsun.kyc.Master.AnswerType.domain.AnswerType;

import java.util.List;

public interface AnswerTypeReadService {
    AnswerType fetchAnswerTypeById(Integer id);
    List<AnswerTypeData>fetchAnswerData(Integer questionId, Integer subQuestionId);

    List<AnswerTypeData>fetchSubQuesAnswerData(Integer questionId,Integer subQuestionId);
}

//    List<AnswerTypeData>fetchAllAnswerData(Integer questionId,Integer isMultiQuestion);
//,Integer subQuesId