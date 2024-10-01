package com.ponsun.kyc.adminconfiguration.adminuserroal.data;

import com.ponsun.kyc.adminconfiguration.adminuserroal.request.CreateAdminUserRoalRequest;
import com.ponsun.kyc.adminconfiguration.adminuserroal.request.UpdateAdminUserRoalRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AdminUserRoalDataValidator {
    public void validateSaveAdminUserRoal(final CreateAdminUserRoalRequest request) {
        if (request.getUserType() == null || request.getUserType().equals("")) {
            throw new EQAS_KYC_ApplicationException("AdminUserRoalName parameter required");
        }
    }
    public void validateUpdateAdminUserRoal(final UpdateAdminUserRoalRequest request) {
        if (request.getUserType() == null || request.getUserType().equals("")) {
            throw new EQAS_KYC_ApplicationException("AdminUserRoalName parameter required");
        }
    }
}
