package com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.services;


import com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.data.AdminConfigModuleDetDataValidator;
import com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.domain.AdminConfigModuleDet;
import com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.domain.AdminConfigModuleDetRepository;
import com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.domain.AdminConfigModuleDetRepositoryWrapper;
import com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.request.CreateAdminConfigModuleDetRequest;
import com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.request.UpdateAdminConfigModuleDetRequest;
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
public class AdminConfigModuleDetWritePlatformServiceImpl implements AdminConfigModuleDetWritePlatformService  {

    private final AdminConfigModuleDetRepository adminconfigmoduledetRepository;
    private final AdminConfigModuleDetRepositoryWrapper adminConfigModuleDetRepositoryWrapper;
    private final AdminConfigModuleDetDataValidator moduleDetDataValidator;
    @Override
    @Transactional
    public Response createAdminConfigModuleDet(CreateAdminConfigModuleDetRequest createAdminConfigModuleDetRequest) {
        try {
            this.moduleDetDataValidator.validateSaveModuleDet(createAdminConfigModuleDetRequest);
            final AdminConfigModuleDet adminconfigmoduledet = AdminConfigModuleDet.create(createAdminConfigModuleDetRequest);//entity
            this.adminconfigmoduledetRepository.saveAndFlush(adminconfigmoduledet);
            return Response.of(Long.valueOf(adminconfigmoduledet.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response updateAdminConfigModuleDet(Integer id, UpdateAdminConfigModuleDetRequest updateAdminConfigModuleDetRequest) {
        try {
            this.moduleDetDataValidator.validateUpdateModuleDet(updateAdminConfigModuleDetRequest);
            final AdminConfigModuleDet moduleDet = this.adminConfigModuleDetRepositoryWrapper.findOneWithNotFoundDetection(id);
            moduleDet.update(updateAdminConfigModuleDetRequest);
            this.adminconfigmoduledetRepository.saveAndFlush(moduleDet);
            return Response.of(Long.valueOf(moduleDet.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

//    @Override
//    @Transactional
//    public Response deactive(Integer kycId, Integer euid){
//        try{
//            List<AdminConfigModuleDet> adminConfigModuleDetList = this.adminConfigModuleDetRepositoryWrapper.findOnekycIdWithNotFoundDetection(kycId);
//            Response response = null;
//            for (AdminConfigModuleDet adminConfigModuleDet : adminConfigModuleDetList) {
//                adminConfigModuleDet.setEuid(euid);
//                adminConfigModuleDet.setStatus(Status.ACTIVE);
//                adminConfigModuleDet.setUpdatedAt(LocalDateTime.now());
//                response = Response.of(adminConfigModuleDet.getId());
//            }
//            return response;
//        }catch (DataIntegrityViolationException e){
//            throw new EQAS_kyc_AppicationException(e.getMessage());
//        }
//    }

@Override
@Transactional
public Response blockAdminConfigModuleDet(Integer id) {
    try {
        final AdminConfigModuleDet adminConfigModuleDet = this.adminConfigModuleDetRepositoryWrapper.findOneWithNotFoundDetection(id);
        adminConfigModuleDet.setValid(false); // Set 'valid' to 0
        adminConfigModuleDet.setStatus(Status.DELETE); // Or set the appropriate status
        adminConfigModuleDet.setUpdatedAt(LocalDateTime.now());
        this.adminconfigmoduledetRepository.saveAndFlush(adminConfigModuleDet);
        return Response.of(Long.valueOf(id));
    } catch (DataIntegrityViolationException e) {
        throw new EQAS_KYC_ApplicationException(e.getMessage());
    }
}

    @Override
    @Transactional
    public Response unblockAdminConfigModuleDet(Integer id) {
        try {
            final AdminConfigModuleDet adminConfigModuleDet = this.adminConfigModuleDetRepositoryWrapper.findOneWithNotFoundDetection(id);
            adminConfigModuleDet.setValid(true); // Set 'valid' to 1
            adminConfigModuleDet.setStatus(Status.ACTIVE); // Or set the appropriate status
            adminConfigModuleDet.setUpdatedAt(LocalDateTime.now());
            this.adminconfigmoduledetRepository.saveAndFlush(adminConfigModuleDet);
            return Response.of(Long.valueOf(id));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
}

