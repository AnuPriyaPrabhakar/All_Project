package com.ponsun.kyc.Master.AnswerFieldType.domain;

import com.ponsun.kyc.Master.AnswerFieldType.request.AbstractAnswerFieldTypeRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AnswerFieldTypeWrapper extends AbstractAnswerFieldTypeRequest {
    private final AnswerFieldTypeRepository AnswerFieldTypeRepository;
    @Transactional
    public AnswerFieldType findOneWithNotFoundDetection(final Integer id) {
        return this.AnswerFieldTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("AnswerFieldType Not found " + id));
    }
    @Override
    public String toString() {
        return super.toString();
    }

}

