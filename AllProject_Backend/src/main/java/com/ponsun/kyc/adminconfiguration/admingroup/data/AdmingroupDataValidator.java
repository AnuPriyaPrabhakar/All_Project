package com.ponsun.kyc.adminconfiguration.admingroup.data;

import com.ponsun.kyc.adminconfiguration.admingroup.request.CreateAdmingroupRequest;
import com.ponsun.kyc.adminconfiguration.admingroup.request.UpdateAdmingroupRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AdmingroupDataValidator {
    public void validateSaveAdmingroup(final CreateAdmingroupRequest request) {
        if (request.getName() == null || request.getName().equals("")) {
            throw new EQAS_KYC_ApplicationException("ModuleName parameter required");
        }
    }
    public void validateUpdateAdmingroup(final UpdateAdmingroupRequest request) {
        if (request.getName() == null || request.getName().equals("")) {
            throw new EQAS_KYC_ApplicationException("ModuleName parameter required");
        }
    }
}
