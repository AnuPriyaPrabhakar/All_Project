package com.ponsun.kyc.Master.AccountType.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountTypeRepository extends JpaRepository<AccountType,Integer> {
    List<AccountType> findByApplicationTypeId(Integer applicationTypeId);
}
