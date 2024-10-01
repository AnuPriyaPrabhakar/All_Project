package com.ponsun.kyc.Master.DeclarationForm.services;

import com.ponsun.kyc.Master.DeclarationForm.domain.DeclarationForm;

import java.util.List;

public interface DeclarationFormReadPlatformService {
    List<DeclarationForm> fetchAllDeclarationForm();
    DeclarationForm fetchDeclarationFormById(Integer id);
}
