package com.ponsun.kyc.Master.SubQuestionType.services;
import com.ponsun.kyc.Master.SubQuestionType.data.SubQuestionTypeValidator;
import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionType;
import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionTypeRepository;
import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionTypeWrapper;
import com.ponsun.kyc.Master.SubQuestionType.request.CreateSubQuestionTypeRequest;
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
public class SubQuestionTypeWriteServiceImpl implements SubQuestionTypeWriteService{
    private final SubQuestionTypeRepository subQuestionTypeRepository;
    private final SubQuestionTypeWrapper subQuestionTypeWrapper;
    private final SubQuestionTypeValidator subQuestionTypeValidator;

    @Override
    @Transactional
    public Response createSubQuestionList(CreateSubQuestionTypeRequest createSubQuestionTypeRequest) {
        try {
            this.subQuestionTypeValidator.validateSaveSubQuestion(createSubQuestionTypeRequest);
            SubQuestionType subQuestionType = SubQuestionType.create(createSubQuestionTypeRequest);//entity
            subQuestionType = this.subQuestionTypeRepository.saveAndFlush(subQuestionType);
            return Response.of(Long.valueOf(subQuestionType.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response deActivate(Integer questionId, Integer euid) {
        try {
            List<SubQuestionType> subQuestionTypes = this.subQuestionTypeWrapper.findQuestionIdNotFoundDetection(questionId);
            Response response = null;
            for (SubQuestionType type : subQuestionTypes) {
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
    public Response updateSubQuestionList(Integer id) {
        try {
            final SubQuestionType subQuestionType = this.subQuestionTypeWrapper.findOneWithNotFoundDetection(id);
            this.subQuestionTypeRepository.saveAndFlush(subQuestionType);
            return Response.of(subQuestionType.getId());
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
}
