package com.ponsun.kyc.adminconfiguration.adminuserroal.services;


import com.ponsun.kyc.adminconfiguration.adminuserroal.data.AdminUserRoalDataValidator;
import com.ponsun.kyc.adminconfiguration.adminuserroal.domain.AdminUserRoal;
import com.ponsun.kyc.adminconfiguration.adminuserroal.domain.AdminUserRoalRepository;
import com.ponsun.kyc.adminconfiguration.adminuserroal.domain.AdminUserRoalRepositoryWrapper;
import com.ponsun.kyc.adminconfiguration.adminuserroal.request.CreateAdminUserRoalRequest;
import com.ponsun.kyc.adminconfiguration.adminuserroal.request.UpdateAdminUserRoalRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j

public class AdminUserRoalWritePlatformServiceImpl implements AdminUserRoalWritePlatformService {
    private final AdminUserRoalRepository adminUserRoalRepository;
    private final AdminUserRoalRepositoryWrapper adminUserRoalRepositoryWrapper;
    private final AdminUserRoalDataValidator adminUserRoalDataValidator;

    @Transactional
    public Response createAdminUserRoal(CreateAdminUserRoalRequest createAdminUserRoalRequest) {
        try {
            this.adminUserRoalDataValidator.validateSaveAdminUserRoal(createAdminUserRoalRequest);
            final AdminUserRoal adminUserRoal = AdminUserRoal.create(createAdminUserRoalRequest);
            this.adminUserRoalRepository.saveAndFlush(adminUserRoal);
              return Response.of(Long.valueOf(adminUserRoal.getId()));

        } catch (DataIntegrityViolationException e) {
            log.error("Error creating AdminUserRoal: {}", e.getMessage(), e);
            throw new EQAS_KYC_ApplicationException("Error creating AdminUserRoal: " + e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response updateAdminUserRoal(Integer id, UpdateAdminUserRoalRequest updateAdminUserRoalRequest) {
        try {
            this.adminUserRoalDataValidator.validateUpdateAdminUserRoal(updateAdminUserRoalRequest);
            final AdminUserRoal adminUserRoal = this.adminUserRoalRepositoryWrapper.findOneWithNotFoundDetection(id);
            adminUserRoal.update(updateAdminUserRoalRequest);
            this.adminUserRoalRepository.saveAndFlush(adminUserRoal);
              return Response.of(Long.valueOf(adminUserRoal.getId()));

        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response deactive(Integer kycId, Integer euid){
        try{
            AdminUserRoal adminUserRoal = this.adminUserRoalRepositoryWrapper.findOneWithNotFoundDetection(kycId);
            adminUserRoal.setEuid(euid);
            adminUserRoal.setStatus(Status.ACTIVE);
            adminUserRoal.setUpdatedAt(LocalDateTime.now());

            return Response.of(Long.valueOf(adminUserRoal.getId()));
        }catch (DataIntegrityViolationException e){
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response blockAdminUserRoal(Integer id) {
        try {
            final AdminUserRoal adminUserRoal = this.adminUserRoalRepositoryWrapper.findOneWithNotFoundDetection(id);
            adminUserRoal.setValid(false);
            adminUserRoal.setStatus(Status.DELETE);
            adminUserRoal.setUpdatedAt(LocalDateTime.now());
            this.adminUserRoalRepository.saveAndFlush(adminUserRoal);
             return Response.of(Long.valueOf(id));

        }catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response unblockAdminUserRoal(Integer id){
       try {
           final AdminUserRoal adminUserRoal = this.adminUserRoalRepositoryWrapper.findOneWithNotFoundDetection(id);
           adminUserRoal.setValid(true);
           adminUserRoal.setStatus(Status.ACTIVE);
           adminUserRoal.setUpdatedAt(LocalDateTime.now());
           this.adminUserRoalRepository.saveAndFlush(adminUserRoal);
            return Response.of(Long.valueOf(id));

       } catch (DataIntegrityViolationException e){
           throw new EQAS_KYC_ApplicationException(e.getMessage());
       }
    }
}
