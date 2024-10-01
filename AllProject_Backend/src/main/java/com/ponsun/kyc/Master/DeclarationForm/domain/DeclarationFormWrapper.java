package com.ponsun.kyc.Master.DeclarationForm.domain;



import com.ponsun.kyc.Master.DeclarationForm.request.AbstractDeclarationFormRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeclarationFormWrapper extends AbstractDeclarationFormRequest {
    private final DeclarationFormRepository declarationFormRepository;
    @Transactional
    public DeclarationForm findOneWithNotFoundDetection(final Integer id){
        return this.declarationFormRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("DeclarationForm Not found" + id));
    }
    @Transactional
    public List<DeclarationForm> findKycIdNotFoundDetection(final Integer kycId){
        return this.declarationFormRepository.findByKycId(kycId);
    }

    @Override
    public String toString(){ return super.toString();}
}
