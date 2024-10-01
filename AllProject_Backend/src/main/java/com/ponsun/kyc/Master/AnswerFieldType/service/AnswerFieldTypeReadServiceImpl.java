package com.ponsun.kyc.Master.AnswerFieldType.service;

import com.ponsun.kyc.Master.AnswerFieldType.domain.AnswerFieldType;
import com.ponsun.kyc.Master.AnswerFieldType.domain.AnswerFieldTypeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
public class AnswerFieldTypeReadServiceImpl  implements AnswerFieldTypeReadService{

    private final AnswerFieldTypeRepository answerFieldTypeRepository;
    @Override
    public List<AnswerFieldType> fetchAll(){
        return this.answerFieldTypeRepository.findAll();
    }
}
