package com.ponsun.kyc.adminconfiguration.adminuserauthority.data;

import com.ponsun.kyc.adminconfiguration.adminuserauthority.request.CreateAdminUserAuthorityRequest;
import com.ponsun.kyc.adminconfiguration.adminuserauthority.request.UpdateAdminUserAuthorityRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AdminUserAuthorityDataValidator {
    public void validateSaveAdminUserAuthority(final CreateAdminUserAuthorityRequest request){
        if (request.getRoleCode()==null || request.getRoleCode().equals("")){
            throw new EQAS_KYC_ApplicationException("AdminUserAuthorityRoleCode parameter required");
        }
        if (request.getRoleDescription()==null || request.getRoleDescription().equals("")){
            throw new EQAS_KYC_ApplicationException("AdminUserAuthorityRoleDescription parameter required");
        }
    }
    public void validateUpdateAdminUserAuthority(final UpdateAdminUserAuthorityRequest request){
        if (request.getRoleCode()==null || request.getRoleCode().equals("")){
            throw new EQAS_KYC_ApplicationException("AdminUserAuthorityRoleCode parameter required");
        }
        if (request.getRoleDescription()==null || request.getRoleDescription().equals("")){
            throw new EQAS_KYC_ApplicationException("AdminUserAuthorityRoleDescription parameter required");
        }
    }
}
