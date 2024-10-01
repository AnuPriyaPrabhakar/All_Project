package com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminConfigModuleDetRepository extends JpaRepository<AdminConfigModuleDet, Integer>{
    Optional<AdminConfigModuleDet> findById(Integer id);

//    List<AdminConfigModuleDet> findBykycId(Integer kycId);
}