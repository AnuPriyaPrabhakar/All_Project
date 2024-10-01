package com.ponsun.kyc.Master.AnswerType.domain;

import com.ponsun.kyc.Master.AnswerType.request.AbstractAnswerTypeRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnswerTypeWrapper extends AbstractAnswerTypeRequest {

    private final AnswerTypeRepository answerTypeRepository;
    @Transactional
    public AnswerType findOneWithNotFoundDetection(final Integer id, Integer subQuesId){
        return this.answerTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("AnswerType Not found " + id) );
    }

    public List<AnswerType> findQuestionIdNotFoundDetection(final Integer questionId,Integer subQuestionId){
        this.answerTypeRepository.findByQuestionIdAndSubQuestionId(questionId,subQuestionId);
        return null;
    }
    @Override
    public String toString(){
        return super.toString();
    }
}
