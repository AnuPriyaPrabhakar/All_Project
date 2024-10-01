package com.ponsun.kyc.Master.ApplicationType.services;

import com.ponsun.kyc.Master.ApplicationType.data.ApplicationTypeValidator;
import com.ponsun.kyc.Master.ApplicationType.domain.ApplicationType;
import com.ponsun.kyc.Master.ApplicationType.domain.ApplicationTypeRepository;
import com.ponsun.kyc.Master.ApplicationType.domain.ApplicationTypeWrapper;
import com.ponsun.kyc.Master.ApplicationType.request.CreateApplicationTypeRequest;
import com.ponsun.kyc.Master.ApplicationType.request.UpdateApplicationTypeRequest;
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
public class ApplicationTypeWriteSericeImpl implements ApplicationTypeWriteSerice {
    private final ApplicationTypeRepository applicationTypeRepository;
    private final ApplicationTypeWrapper applicationTypeWrapper;
    private final ApplicationTypeValidator applicationTypeValidator;

    @Override
    @Transactional
    public Response createApplicationFormList(CreateApplicationTypeRequest createApplicationFormRequest) {
        try {
            this.applicationTypeValidator.validateSaveApplicationForm(createApplicationFormRequest);
            final ApplicationType applicationType = ApplicationType.create(createApplicationFormRequest);//entity
            this.applicationTypeRepository.saveAndFlush(applicationType);
            return Response.of(Long.valueOf(applicationType.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response updateApplicationFormList(Integer id, UpdateApplicationTypeRequest updateApplicationFormRequest) {
        try {
            this.applicationTypeValidator.validateUpdateApplicationForm(updateApplicationFormRequest);
            final ApplicationType applicationType = this.applicationTypeWrapper.findOneWithNotFoundDetection(id);
            applicationType.update(updateApplicationFormRequest);
            this.applicationTypeRepository.saveAndFlush(applicationType);
            return Response.of(Long.valueOf(applicationType.getId()));

        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

}
