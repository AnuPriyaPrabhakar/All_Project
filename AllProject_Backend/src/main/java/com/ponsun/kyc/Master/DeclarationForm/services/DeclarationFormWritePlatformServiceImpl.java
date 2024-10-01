package com.ponsun.kyc.Master.DeclarationForm.services;

import com.ponsun.kyc.Master.DeclarationForm.data.DeclarationFormData;
import com.ponsun.kyc.Master.DeclarationForm.request.CreateDeclarationFormRequest;
import com.ponsun.kyc.Master.DeclarationForm.domain.DeclarationForm;
import com.ponsun.kyc.Master.DeclarationForm.data.DeclarationFormValidator;
import com.ponsun.kyc.Master.DeclarationForm.domain.DeclarationFormRepository;
import com.ponsun.kyc.Master.DeclarationForm.domain.DeclarationFormWrapper;
import com.ponsun.kyc.Master.DeclarationForm.request.UpdateDeclarationFormRequest;
import com.ponsun.kyc.Master.DeclarationForm.rowmapper.DeclarationFormRowMapper;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
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
public class DeclarationFormWritePlatformServiceImpl implements DeclarationFormWritePlatformService {
    private final DeclarationFormRepository declarationFormRepository;
    private final DeclarationFormWrapper declarationFormWrapper;
    private final DeclarationFormValidator declarationFormValidator;
    private final DeclarationFormRowMapper declarationFormRowMapper;
    private final JdbcTemplate jdbcTemplate;



    @Override
    @Transactional
    public Response createDeclarationForm(CreateDeclarationFormRequest createDeclarationFormRequest) {
        try {
            Integer kycId = createDeclarationFormRequest.getKycId();
            this.deActivate(kycId, createDeclarationFormRequest.getUid());

            final DeclarationForm declarationForm = DeclarationForm.create(createDeclarationFormRequest);
            this.declarationFormRepository.saveAndFlush(declarationForm);

            return Response.of(declarationForm.getId());
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    public List<DeclarationFormData> fetchAllDeclarationFormData(Integer kycId) {
        final DeclarationFormRowMapper rowMapper = new DeclarationFormRowMapper();
        String Qry = "SELECT " + rowMapper.tableSchema();
        String whereClause = " WHERE a.kycId = ?  AND a.STATUS = 'A'";
        Qry = Qry + whereClause;
        final List<DeclarationFormData> DeclarationFormDataList = jdbcTemplate.query(Qry, declarationFormRowMapper,
                new Object[]{kycId}
        );
        return DeclarationFormDataList;
    }

    @Override
    @Transactional
    public Response updateDeclarationForm(Integer id, UpdateDeclarationFormRequest updateDeclarationFormRequest) {
        try {
            final DeclarationForm declarationForm = this.declarationFormWrapper.findOneWithNotFoundDetection(id);
            declarationForm.update(updateDeclarationFormRequest);
            this.declarationFormRepository.saveAndFlush(declarationForm);
            return Response.of(Long.valueOf(declarationForm.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response deActivate(Integer kycId, Integer euid) {
        try {
            List<DeclarationForm> declarationForms = this.declarationFormWrapper.findKycIdNotFoundDetection(kycId);
            Response response = null;
            for (DeclarationForm declarationForm : declarationForms) {
                declarationForm.setEuid(euid);
                declarationForm.setStatus(Status.DELETE);
                declarationForm.setUpdatedAt(LocalDateTime.now());
                response = Response.of(declarationForm.getId());
            }
            return response;
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
}
