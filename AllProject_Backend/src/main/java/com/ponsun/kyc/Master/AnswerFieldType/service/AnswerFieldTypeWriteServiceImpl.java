package com.ponsun.kyc.Master.AnswerFieldType.service;

import com.ponsun.kyc.Master.AnswerFieldType.domain.AnswerFieldType;
import com.ponsun.kyc.Master.AnswerFieldType.domain.AnswerFieldTypeRepository;
import com.ponsun.kyc.Master.AnswerFieldType.domain.AnswerFieldTypeWrapper;
import com.ponsun.kyc.Master.AnswerFieldType.request.CreateAnswerFieldTypeRequest;
import com.ponsun.kyc.Master.AnswerFieldType.request.UpdateAnswerFieldTypeRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnswerFieldTypeWriteServiceImpl implements AnswerFieldTypeWriteService {

    private final AnswerFieldTypeRepository answerFieldTypeRepository;
    private final AnswerFieldTypeWrapper answerFieldTypeWrapper;

    @Override
    @Transactional
    public Response createAnswerFieldType(CreateAnswerFieldTypeRequest createAnswerFieldTypeRequest) {
        try {
            final AnswerFieldType answerFieldType = AnswerFieldType.create(createAnswerFieldTypeRequest);
            this.answerFieldTypeRepository.saveAndFlush(answerFieldType);
            return Response.of(Long.valueOf(answerFieldType.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response updateAnswerFieldType(Integer id, UpdateAnswerFieldTypeRequest updateAnswerFieldTypeRequest) {
        try {
            final AnswerFieldType answerFieldType = this.answerFieldTypeWrapper.findOneWithNotFoundDetection(id);
            answerFieldType.update(updateAnswerFieldTypeRequest);
            this.answerFieldTypeRepository.saveAndFlush(answerFieldType);
            return Response.of(answerFieldType.getId());
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
}
