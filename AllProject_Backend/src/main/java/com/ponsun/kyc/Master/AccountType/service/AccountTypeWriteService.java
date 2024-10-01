package com.ponsun.kyc.Master.AccountType.service;

import com.ponsun.kyc.Master.AccountType.data.AccountTypeData;
import com.ponsun.kyc.Master.AccountType.request.CreateAccountTypeRequest;
import com.ponsun.kyc.Master.AccountType.request.UpdateAccountTypeRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

import java.util.List;

public interface AccountTypeWriteService {
    Response createApplicationConfigTypeList(CreateAccountTypeRequest createApplicationConfigTypeRequest);
    Response updateApplicationConfigTypeList(Integer id, UpdateAccountTypeRequest updateApplicationConfigTypeRequest);
    List<AccountTypeData> fetchAllAccountTypeData(Integer applicationTypeId);
}
