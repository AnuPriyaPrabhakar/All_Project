package com.ponsun.kyc.Master.SubQuestionType.services;
import com.ponsun.kyc.Master.QuestionType.domain.QuestionType;
import com.ponsun.kyc.Master.SubQuestionType.data.SubQuestionTypeData;
import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionType;
import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionTypeRepository;
import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionTypeWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
public class SubQuestionTypeReadServiceImpl implements SubQuestionTypeReadService{
    private final SubQuestionTypeWrapper subQuestionTypeWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final SubQuestionTypeRepository subQuestionTypeRepository;
    @Override
    @Transactional
    public SubQuestionType fetchSubQuestionById(Integer id){
        return this.subQuestionTypeRepository.findById(id).get();
    }
//    @Override
//    public SubQuestionType fetchSubQuestionById(Integer id){
//        return this.subQuestionTypeRepository.findById(id).get();
//    }


    @Override
    public List<SubQuestionType>fetchAllSubQuestion(Integer questionId){
        return this.subQuestionTypeRepository.findByQuestionId(questionId);
    }
}
