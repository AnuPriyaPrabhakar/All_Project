package com.ponsun.kyc.Master.AnswerType.domain;

import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerTypeRepository extends JpaRepository<AnswerType, Integer> {
    List<AnswerTypeData> findByQuestionIdAndSubQuestionId(Integer questionId, Integer subQuestionId);

//    List<AnswerTypeData> findByQuestionIdAndSubQuestionId(Integer questionId, Integer subQuestionId);
//    List<AnswerTypeData> findByQuestionIdAndSubQuestionId(Integer questionId,Integer subQuesId);


//    List<AnswerTypeData> findByQuestionIdAndAnswerId(Integer questionId, Integer id);
}
