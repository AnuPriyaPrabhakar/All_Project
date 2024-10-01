package com.ponsun.kyc.Master.AnswerType.services;

import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeData;
import com.ponsun.kyc.Master.AnswerType.domain.AnswerType;
import com.ponsun.kyc.Master.AnswerType.domain.AnswerTypeRepository;
import com.ponsun.kyc.Master.AnswerType.domain.AnswerTypeWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnswerTypeReadServiceImpl implements AnswerTypeReadService {
    private final AnswerTypeWrapper answerTypeWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final AnswerTypeRepository answerTypeRepository;


    @Override
    public AnswerType fetchAnswerTypeById(Integer id) {
        return this.answerTypeRepository.findById(id).get();
    }

    @Override
    public List<AnswerTypeData> fetchAnswerData(Integer questionId, Integer subQuestionId) {
        return answerTypeRepository.findByQuestionIdAndSubQuestionId(questionId, subQuestionId);
    }

    @Override
    public List<AnswerTypeData> fetchSubQuesAnswerData(Integer questionId,Integer subQuesId) {
        return this.answerTypeRepository.findByQuestionIdAndSubQuestionId(questionId,subQuesId);
    }

}
