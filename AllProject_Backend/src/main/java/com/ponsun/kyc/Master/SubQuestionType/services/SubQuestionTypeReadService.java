package com.ponsun.kyc.Master.SubQuestionType.services;
import com.ponsun.kyc.Master.SubQuestionType.data.SubQuestionTypeData;
import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionType;
import java.util.List;

public interface SubQuestionTypeReadService {
    SubQuestionType fetchSubQuestionById(Integer id);
    List<SubQuestionType>fetchAllSubQuestion(Integer questionId);

}
