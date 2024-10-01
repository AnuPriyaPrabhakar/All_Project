package com.ponsun.kyc.adminconfiguration.AdminUser.data;

import com.ponsun.kyc.adminconfiguration.AdminUser.request.CreateUserRequest;
import com.ponsun.kyc.adminconfiguration.AdminUser.request.UpdateUserRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserDataValidator {

    public void validateSaveModuleDet(final CreateUserRequest request) {
        if (request.getFullName() == null || request.getFullName().equals("")) {
            throw new EQAS_KYC_ApplicationException("ModuleName parameter required");
        }
    }
    public void validateUpdateModuleDet(final UpdateUserRequest request) {
        if (request.getFullName() == null || request.getFullName().equals("")) {
            throw new EQAS_KYC_ApplicationException("ModuleName parameter required");
        }
    }
}
