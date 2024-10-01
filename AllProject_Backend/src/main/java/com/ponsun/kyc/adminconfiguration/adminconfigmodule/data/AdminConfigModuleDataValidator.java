package com.ponsun.kyc.adminconfiguration.adminconfigmodule.data;

import com.ponsun.kyc.adminconfiguration.adminconfigmodule.request.CreateAdminConfigModuleRequest;
import com.ponsun.kyc.adminconfiguration.adminconfigmodule.request.UpdateAdminConfigModuleRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AdminConfigModuleDataValidator {
    public void validateSaveAdminConfigModule(final CreateAdminConfigModuleRequest request) {
        if (request.getName() == null || request.getName().equals("")) {
            throw new EQAS_KYC_ApplicationException("AdminConfigModuleName parameter required");
        }
    }
    public void validateUpdateAdminConfigModule(final UpdateAdminConfigModuleRequest request) {
        if (request.getName() == null || request.getName().equals("")) {
            throw new EQAS_KYC_ApplicationException("AdminConfigModuleName parameter required");
        }
    }
}
