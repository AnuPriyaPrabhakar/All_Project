package com.ponsun.kyc.Master.DeclarationForm.data;


import com.ponsun.kyc.Master.DeclarationForm.request.CreateDeclarationFormRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
@Service
@Slf4j
public class DeclarationFormValidator {
    public void validateSaveDeclarationFormData(final CreateDeclarationFormRequest request) {
        if (request.getMemberName() == null || request.getMemberName().equals("")) {
            throw new EQAS_KYC_ApplicationException("MemberName parameter required");
        }
    }
}
