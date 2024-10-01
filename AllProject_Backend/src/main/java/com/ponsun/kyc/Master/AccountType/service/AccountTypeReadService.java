package com.ponsun.kyc.Master.AccountType.service;

import com.ponsun.kyc.Master.AccountType.domain.AccountType;

import java.util.List;

public interface AccountTypeReadService {
    AccountType fetchApplicationConfigTypeById(Integer id);
    List<AccountType> fetchAllApplicationConfigType();
    List<AccountType> fetchAllApplicantwiseAccountType(Integer typeId);

}
