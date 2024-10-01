package com.ponsun.kyc.Master.SubQuestionType.domain;
import com.ponsun.kyc.Master.ApplicantFormDetails.domain.ApplicantFormDetails;
import com.ponsun.kyc.Master.SubQuestionType.request.AbstractSubQuestionTypeRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubQuestionTypeWrapper extends AbstractSubQuestionTypeRequest {
    private final SubQuestionTypeRepository subQuestionTypeRepository;
    @Transactional
    public SubQuestionType findOneWithNotFoundDetection(final Integer id){
        return this.subQuestionTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("SubQuestionType Not found " + id) );
    }

    @Transactional
    public List<SubQuestionType> findQuestionIdNotFoundDetection(final Integer kycId){
        return this.subQuestionTypeRepository.findByQuestionId(kycId);
    }
    @Override
    public String toString(){
        return super.toString();
    }
}
