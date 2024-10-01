package com.ponsun.kyc.Master.DeclarationForm.services;

import com.ponsun.kyc.Master.DeclarationForm.data.DeclarationFormData;
import com.ponsun.kyc.Master.DeclarationForm.request.CreateDeclarationFormRequest;
import com.ponsun.kyc.Master.DeclarationForm.request.UpdateDeclarationFormRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import jakarta.transaction.Transactional;

import java.util.List;

public interface DeclarationFormWritePlatformService {
    Response createDeclarationForm(CreateDeclarationFormRequest createDeclarationFormRequest);

    List<DeclarationFormData> fetchAllDeclarationFormData(Integer kycId);

    Response updateDeclarationForm(Integer id, UpdateDeclarationFormRequest updateDeclarationFormRequest);

    Response deActivate(Integer kycId, Integer euid);
}
