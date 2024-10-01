package com.ponsun.kyc.Master.DirectorsSignAuthority.data;

import com.ponsun.kyc.Master.DirectorsSignAuthority.request.CreateDirectorsSignAuthorityRequest;
import com.ponsun.kyc.Master.DirectorsSignAuthority.request.UpdateDirectorsSignAuthorityRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class DirectorsSignAuthorityValidatior {
    public void validateSaveSignAuthority(final CreateDirectorsSignAuthorityRequest request) {
        if (request.getName() == null || request.getName().equals("")) {
            throw new EQAS_KYC_ApplicationException("name parameter required");
        }
    }
    public void validateUpdateSignAuthority(final UpdateDirectorsSignAuthorityRequest request) {
        if (request.getName() == null || request.getName().equals("")) {
            throw new EQAS_KYC_ApplicationException("name parameter required");
        }
    }
}
