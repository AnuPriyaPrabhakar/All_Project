package com.ponsun.kyc.Master.DirectorsSignAuthority.service;

import com.ponsun.kyc.Master.DirectorsSignAuthority.data.DirectorsSignAuthorityValidatior;
import com.ponsun.kyc.Master.DirectorsSignAuthority.domain.DirectorsSignAuthority;
import com.ponsun.kyc.Master.DirectorsSignAuthority.domain.DirectorsSignAuthorityRepository;
import com.ponsun.kyc.Master.DirectorsSignAuthority.domain.DirectorsSignAuthorityWrapper;
import com.ponsun.kyc.Master.DirectorsSignAuthority.request.CreateDirectorsSignAuthorityRequest;
import com.ponsun.kyc.Master.DirectorsSignAuthority.request.UpdateDirectorsSignAuthorityRequest;
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
public class DirectorsSignAuthorityWriteServiceImpl implements DirectorsSignAuthorityWriteService {
    private final DirectorsSignAuthorityRepository repository;
    private final DirectorsSignAuthorityWrapper wrapper;
    private final DirectorsSignAuthorityValidatior validatior;

    @Transactional
    @Override
    public Response createSignAuthority(CreateDirectorsSignAuthorityRequest createDirectorsSignAuthorityRequest) {
        try {
            this.validatior.validateSaveSignAuthority(createDirectorsSignAuthorityRequest);
            final DirectorsSignAuthority directorsSignAuthority = DirectorsSignAuthority.create(createDirectorsSignAuthorityRequest);//entity
            this.repository.saveAndFlush(directorsSignAuthority);
            return Response.of(directorsSignAuthority.getId());
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());

        }
    }

    @Transactional
    @Override
    public Response updateSignAuthority(Integer id, UpdateDirectorsSignAuthorityRequest updateDirectorsSignAuthorityRequest) {
        try {
            this.validatior.validateUpdateSignAuthority(updateDirectorsSignAuthorityRequest);
            final DirectorsSignAuthority directorsSignAuthority = this.wrapper.findOneWithNotFoundDetection(id);
            directorsSignAuthority.update(updateDirectorsSignAuthorityRequest);
            this.repository.saveAndFlush(directorsSignAuthority);
            return Response.of(Long.valueOf(directorsSignAuthority.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Transactional
    @Override
    public Response deActivate(Integer kycId, Integer euid) {

        try {
            List<DirectorsSignAuthority> directorsSignAuthorities = this.wrapper.findKycIdNotFoundDetection(kycId);
            Response response = null;
            for (DirectorsSignAuthority signAuthority : directorsSignAuthorities) {
                signAuthority.setEuid(euid);
                signAuthority.setStatus(Status.DELETE);
                signAuthority.setUpdatedAt(LocalDateTime.now());
            }
            repository.saveAllAndFlush(directorsSignAuthorities);

            return response;
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

}
