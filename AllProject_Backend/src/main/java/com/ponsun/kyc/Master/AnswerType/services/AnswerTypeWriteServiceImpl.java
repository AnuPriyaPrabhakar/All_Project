package com.ponsun.kyc.Master.AnswerType.services;

import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeValidator;
import com.ponsun.kyc.Master.AnswerType.domain.AnswerType;
import com.ponsun.kyc.Master.AnswerType.domain.AnswerTypeRepository;
import com.ponsun.kyc.Master.AnswerType.domain.AnswerTypeWrapper;
import com.ponsun.kyc.Master.AnswerType.request.CreateAnswerTypeRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnswerTypeWriteServiceImpl extends AnswerTypeWriteService {

    private final AnswerTypeRepository answerTypeRepository;
    private final AnswerTypeWrapper answerTypeWrapper;
    private final AnswerTypeValidator answerTypeValidator;

    @Override
    @Transactional
    public Response createAnswerList(CreateAnswerTypeRequest createAnswerTypeRequest) {
        try {
            this.answerTypeValidator.validateSaveAnswer(createAnswerTypeRequest);
            AnswerType answerType = AnswerType.create(createAnswerTypeRequest);//entity
            this.answerTypeRepository.saveAndFlush(answerType);
            return Response.of(Long.valueOf(answerType.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response deActivate(Integer questionId,Integer subQuestionId, Integer euid) {
        try {
            List<AnswerType> answerTypes = this.answerTypeWrapper.findQuestionIdNotFoundDetection(questionId,subQuestionId);
            Response response = null;
            for (AnswerType type : answerTypes) {
                type.setEuid(euid);
                type.setStatus(Status.DELETE);
                type.setUpdatedAt(LocalDateTime.now());
                response = Response.of(type.getId());
            }
            return response;
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response updateAnswerList(Integer id, Integer subQuesId) {
        try {
            final AnswerType answerType = this.answerTypeWrapper.findOneWithNotFoundDetection(id, subQuesId);
            this.answerTypeRepository.saveAndFlush(answerType);
            return Response.of(answerType.getId());
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
}
