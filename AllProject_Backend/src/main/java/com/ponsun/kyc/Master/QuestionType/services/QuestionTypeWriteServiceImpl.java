package com.ponsun.kyc.Master.QuestionType.services;

import com.ponsun.kyc.Master.QuestionType.data.QuestionTypeValidator;
import com.ponsun.kyc.Master.QuestionType.domain.QuestionType;
import com.ponsun.kyc.Master.QuestionType.domain.QuestionTypeRepository;
import com.ponsun.kyc.Master.QuestionType.domain.QuestionTypeWrapper;
import com.ponsun.kyc.Master.QuestionType.dto.QuestionDto;
import com.ponsun.kyc.Master.QuestionType.dto.QuestionPayload;
import com.ponsun.kyc.Master.QuestionType.request.CreateQuestionTypeRequest;
import com.ponsun.kyc.Master.QuestionType.request.UpdateQuestionTypeRequest;
import com.ponsun.kyc.Master.SubQuestionType.data.SubQuestionTypeData;
import com.ponsun.kyc.Master.SubQuestionType.request.CreateSubQuestionTypeRequest;
import com.ponsun.kyc.Master.SubQuestionType.services.SubQuestionTypeWriteService;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j

public class QuestionTypeWriteServiceImpl implements QuestionTypeWriteService {
    private final QuestionTypeRepository questionTypeRepository;
    private final QuestionTypeWrapper questionTypeWrapper;
    private final QuestionTypeValidator questionTypeValidator;
    private final SubQuestionTypeWriteService subQuestionTypeWriteService;
    private final QuestionPayload questionPayload;
    @Override
    @Transactional
    public Response createQuestionTypeList(CreateQuestionTypeRequest createQuestionTypeRequest) {
        try {
            QuestionDto questionDto = questionPayload.getQuestionDto();
            ModelMapper modelMapper = new ModelMapper();

            this.questionTypeValidator.validateSaveQuestionType(createQuestionTypeRequest);
            QuestionType questionType = QuestionType.create(createQuestionTypeRequest);
            questionType.setStatus(Status.ACTIVE);
            questionType = this.questionTypeRepository.saveAndFlush(questionType);

            Integer MultipleQuestionId = questionType.getMultiQuestion();
            QuestionType questionTypes = new QuestionType();

            if (MultipleQuestionId == 0) {
                questionTypes = this.questionTypeRepository.saveAndFlush(questionTypes);
                MultipleQuestionId = questionTypes.getId();
            } else {
                this.updateQuestionTypeList(MultipleQuestionId);
                this.subQuestionTypeWriteService.deActivate(MultipleQuestionId, questionTypes.getUid());
            }

            List<SubQuestionTypeData> subQuestionTypeDataList = questionDto.getSubQuestionTypeData();
            for (SubQuestionTypeData detailsData : subQuestionTypeDataList) {
                CreateSubQuestionTypeRequest subQuestionTypeRequest = modelMapper.map(detailsData, CreateSubQuestionTypeRequest.class);
                subQuestionTypeRequest.setQuestionId(MultipleQuestionId);
                Response response = this.subQuestionTypeWriteService.createSubQuestionList(subQuestionTypeRequest);
            }

            Response response = Response.of(MultipleQuestionId);
            return response;
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response updateQuestionTypeList(Integer id) {
        try {
            //this.questionTypeValidator.validateUpdateQuestionType(updateQuestionTypeRequest);
            final QuestionType questionType = this.questionTypeWrapper.findOneWithNotFoundDetection(id);
            //questionType.update(updateQuestionTypeRequest);
            this.questionTypeRepository.saveAndFlush(questionType);
            return Response.of(Long.valueOf(questionType.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response updateQuestionType(Integer id , UpdateQuestionTypeRequest request) {
        try {
            this.questionTypeValidator.validateUpdateQuestionType(request);
            final QuestionType questionType = this.questionTypeWrapper.findOneWithNotFoundDetection(id);
            questionType.update(request);
            this.questionTypeRepository.saveAndFlush(questionType);
            return Response.of(Long.valueOf(questionType.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response deActivate(Integer id, Integer euid) {
        try {
            QuestionType questionType = this.questionTypeWrapper.findOneWithNotFoundDetection(id);
            questionType.setStatus(Status.DELETE);
            questionType.setUpdatedAt(LocalDateTime.now());
            this.questionTypeRepository.save(questionType);
            return Response.of(questionType.getId());
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
}