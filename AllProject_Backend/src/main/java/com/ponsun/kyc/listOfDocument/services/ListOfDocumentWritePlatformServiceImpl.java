package com.ponsun.kyc.listOfDocument.services;

import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionType;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import com.ponsun.kyc.listOfDocument.data.ListOfDocumentDataValidator;
import com.ponsun.kyc.listOfDocument.domain.ListOfDocument;
import com.ponsun.kyc.listOfDocument.domain.ListOfDocumentRepository;
import com.ponsun.kyc.listOfDocument.domain.ListOfDocumentRepositoryWrapper;
import com.ponsun.kyc.listOfDocument.request.CreateListOfDocumentRequest;
import com.ponsun.kyc.listOfDocument.request.UpdateListOfDocumentRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ListOfDocumentWritePlatformServiceImpl implements ListOfDocumentWritePlatformService {

    private final ListOfDocumentRepository listOfDocumentRepository;
    private final ListOfDocumentRepositoryWrapper listOfDocumentRepositoryWrapper;
    private final ListOfDocumentDataValidator listOfDocumentDataValidator;
    private final JdbcTemplate jdbcTemplate;

    @Override
    @Transactional
    public Response createListOfDocument(CreateListOfDocumentRequest createListOfDocumentRequest){
        try {
            final ListOfDocument configType = ListOfDocument.create(createListOfDocumentRequest);
            this.listOfDocumentRepository.saveAndFlush(configType);
            return Response.of(Long.valueOf(configType.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response updateListOfDocument(Integer id, UpdateListOfDocumentRequest updateListOfDocumentRequest){
        try{
            //this.listOfDocumentDataValidator.validateUpdateListOfDocument(updateListOfDocumentRequest);
            final ListOfDocument listOfDocument = this.listOfDocumentRepositoryWrapper.findOneWithNotFoundDetection(id);
            listOfDocument.update(updateListOfDocumentRequest);
            this.listOfDocumentRepository.saveAndFlush(listOfDocument);
            return  Response.of(Long.valueOf(listOfDocument.getId()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
