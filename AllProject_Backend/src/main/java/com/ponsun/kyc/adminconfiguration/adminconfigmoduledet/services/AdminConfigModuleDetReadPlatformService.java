package com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.services;

import com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.domain.AdminConfigModuleDet;

import java.util.List;

public interface AdminConfigModuleDetReadPlatformService {

    AdminConfigModuleDet fetchAdminConfigModuleDetById(Integer id);
    List <AdminConfigModuleDet> fetchAllAdminConfigModuleDet();
}
