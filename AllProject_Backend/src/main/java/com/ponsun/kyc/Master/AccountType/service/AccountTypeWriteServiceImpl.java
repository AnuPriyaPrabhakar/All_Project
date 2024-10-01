package com.ponsun.kyc.Master.AccountType.service;

import com.ponsun.kyc.Master.AccountType.data.AccountTypeData;
import com.ponsun.kyc.Master.AccountType.data.AccountTypeValidator;
import com.ponsun.kyc.Master.AccountType.domain.AccountType;
import com.ponsun.kyc.Master.AccountType.domain.AccountTypeRepository;
import com.ponsun.kyc.Master.AccountType.domain.AccountTypeWrapper;
import com.ponsun.kyc.Master.AccountType.request.CreateAccountTypeRequest;
import com.ponsun.kyc.Master.AccountType.request.UpdateAccountTypeRequest;
import com.ponsun.kyc.Master.AccountType.rowmapper.AccountTypeRowMapper;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountTypeWriteServiceImpl implements AccountTypeWriteService {
    private final AccountTypeRepository accountTypeRepository;
    private final AccountTypeWrapper accountTypeWrapper;
    private final AccountTypeValidator accountTypeValidator;
    private final AccountTypeRowMapper accountTypeRowMapper;
    private final JdbcTemplate jdbcTemplate;

    @Override
    @Transactional
    public Response createApplicationConfigTypeList(CreateAccountTypeRequest createApplicationConfigTypeRequest) {
        try {
            this.accountTypeValidator.validateSaveApplicationConfigType(createApplicationConfigTypeRequest);
            final AccountType configType = AccountType.create(createApplicationConfigTypeRequest);//entity
            this.accountTypeRepository.saveAndFlush(configType);
            return Response.of(Long.valueOf(configType.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Response updateApplicationConfigTypeList(Integer id, UpdateAccountTypeRequest updateApplicationConfigTypeRequest) {
        try {
            this.accountTypeValidator.validateUpdateApplicationConfigType(updateApplicationConfigTypeRequest);
            final AccountType configType = this.accountTypeWrapper.findOneWithNotFoundDetection(id);
            configType.update(updateApplicationConfigTypeRequest);
            this.accountTypeRepository.saveAndFlush(configType);
            return Response.of(Long.valueOf(configType.getId()));
        } catch (DataIntegrityViolationException e) {
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }

    @Override
    public List<AccountTypeData> fetchAllAccountTypeData(Integer applicationTypeId) {
        final AccountTypeRowMapper rowMapper = new AccountTypeRowMapper();
        String Qry = "SELECT " + rowMapper.tableSchema();
        String whereClause = " WHERE at.applicationTypeId = ?  AND at.STATUS = 'A'";
        Qry = Qry + whereClause;
        final List<AccountTypeData> accountTypeData = jdbcTemplate.query(Qry, accountTypeRowMapper,
                new Object[]{applicationTypeId}
        );
        return accountTypeData;
    }
}
