package com.ponsun.kyc.Master.AccountType.service;

import com.ponsun.kyc.Master.AccountType.domain.AccountType;
import com.ponsun.kyc.Master.AccountType.domain.AccountTypeRepository;
import com.ponsun.kyc.Master.AccountType.domain.AccountTypeWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountTypeReadServiceImpl implements AccountTypeReadService {
    private final AccountTypeWrapper accountTypeWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final AccountTypeRepository accountTypeRepository;

    @Override
    public AccountType fetchApplicationConfigTypeById(Integer id){
        return this.accountTypeRepository.findById(id).get();
    }
    @Override
    public List<AccountType> fetchAllApplicationConfigType(){
        return this.accountTypeRepository.findAll();
    }

    @Override
    public List<AccountType> fetchAllApplicantwiseAccountType(Integer typeId) {
        return this.accountTypeRepository.findByApplicationTypeId(typeId);

    }

}
