package com.ponsun.kyc.Master.AccountType.data;

import com.ponsun.kyc.Master.AccountType.request.CreateAccountTypeRequest;
import com.ponsun.kyc.Master.AccountType.request.UpdateAccountTypeRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AccountTypeValidator {
    public void validateSaveApplicationConfigType(final CreateAccountTypeRequest request) {
        if (request.getId() == null || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }
    public void validateUpdateApplicationConfigType(final UpdateAccountTypeRequest request) {
        if (request.getId() == null || request.getId().equals("")) {
            throw new EQAS_KYC_ApplicationException("id parameter required");
        }
    }

}
