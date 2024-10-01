package com.ponsun.kyc.Master.QuestionType.services;

import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeData;
import com.ponsun.kyc.Master.AnswerType.services.AnswerTypeReadService;
import com.ponsun.kyc.Master.QuestionType.domain.QuestionType;
import com.ponsun.kyc.Master.QuestionType.domain.QuestionTypeRepository;
import com.ponsun.kyc.Master.QuestionType.domain.QuestionTypeWrapper;
import com.ponsun.kyc.Master.QuestionType.dto.QuestionDto;
import com.ponsun.kyc.Master.QuestionType.dto.QuestionPayload;
import com.ponsun.kyc.Master.SubQuestionType.data.SubQuestionTypeData;
import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionType;
import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionTypeRepository;
import com.ponsun.kyc.Master.SubQuestionType.services.SubQuestionTypeReadService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
public class QuestionTypeReadServiceImpl implements QuestionTypeReadService{
    private final QuestionTypeWrapper questionTypeWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final QuestionTypeRepository questionTypeRepository;
    private final AnswerTypeReadService answerTypeReadService;
    private final SubQuestionTypeReadService subQuestionTypeReadService;
    private final SubQuestionTypeRepository subQuestionTypeRepository;


    @Override
    @Transactional
    public QuestionType fetchQuestionTypeById(Integer id){

        return this.questionTypeRepository.findById(id).get();
    }

    @Override
    @Transactional
    public List<QuestionPayload> fetchAllQuestionType(Integer applicationTypeId,Integer accountTypeId){

        List<QuestionType> quest    = this.questionTypeRepository.findByApplicationTypeIdAndAccountTypeId(applicationTypeId,accountTypeId);

        List<QuestionPayload> questionPayloadList = new ArrayList<>();//output

        for(QuestionType quest1: quest) {
            QuestionPayload questionPayload = new QuestionPayload();
            QuestionDto questionDto = new QuestionDto();

            questionDto.setId(quest1.getId());
            questionDto.setAccountTypeId(quest1.getAccountTypeId());
            questionDto.setApplicationTypeId(quest1.getApplicationTypeId());
            questionDto.setAnsTypeId(quest1.getAnsTypeId());
            questionDto.setName(quest1.getName());
//            questionDto.setNameField(quest1.getNameField());
            questionDto.setOrderNo(quest1.getOrderNo());
            questionDto.setMultiQuestion(quest1.getMultiQuestion());
            questionDto.setDescription(quest1.getDescription());

            ModelMapper modelMapper = new ModelMapper();
            List<SubQuestionTypeData> questionTypeDataList = new ArrayList<>();
            List<SubQuestionType> data1 =  subQuestionTypeReadService.fetchAllSubQuestion(quest1.getId());//getMultiQuestion 0 or 1

            for(SubQuestionType typeData: data1) {
                SubQuestionTypeData data2 = modelMapper.map(typeData, SubQuestionTypeData.class);

                List<AnswerTypeData> data       =  answerTypeReadService.fetchSubQuesAnswerData(quest1.getId(),typeData.getId());

//                SubQuestionTypeData subQuestionType = new SubQuestionTypeData();
                data2.setAnswerTypeData(data);
//                subQuestionType.setAnswerTypeData(data);

                questionTypeDataList.add(data2);
            }
            List<AnswerTypeData> data       =  answerTypeReadService.fetchSubQuesAnswerData(quest1.getId(),0);

            questionDto.setSubQuestionTypeData(questionTypeDataList);
            questionDto.setAnswerTypeData(data);

            questionPayload.setQuestionDto(questionDto);
            questionPayloadList.add(questionPayload);
        }

        return  questionPayloadList;
    }

    @Override
    @Transactional
    public QuestionType fetchQuestionType(Integer id) {
        return this.questionTypeRepository.findById(id).get();
    }
}
