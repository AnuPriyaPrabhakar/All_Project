package com.ponsun.kyc.Master.AccountType.domain;

import com.ponsun.kyc.Master.AccountType.request.AbstractAccountTypeRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AccountTypeWrapper extends AbstractAccountTypeRequest {
    private final AccountTypeRepository accountTypeRepository;
    @Transactional
    public AccountType findOneWithNotFoundDetection(final Integer id){
        return this.accountTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("AccountType Not found" + id));
    }

    @Override
    public String toString(){ return super.toString();}
}

