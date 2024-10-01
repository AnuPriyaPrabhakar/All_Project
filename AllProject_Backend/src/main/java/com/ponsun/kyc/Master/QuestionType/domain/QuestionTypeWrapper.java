package com.ponsun.kyc.Master.QuestionType.domain;

import com.ponsun.kyc.Master.QuestionType.request.AbstractQuestionTypeRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QuestionTypeWrapper extends AbstractQuestionTypeRequest {
    private final QuestionTypeRepository questionTypeRepository;
    @Transactional
    public QuestionType findOneWithNotFoundDetection(final Integer id){
        return this.questionTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("QuestionType Not found " + id) );
    }
    @Override
    public String toString(){
        return super.toString();
    }
}
