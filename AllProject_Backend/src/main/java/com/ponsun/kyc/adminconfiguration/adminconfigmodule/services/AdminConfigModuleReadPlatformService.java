package com.ponsun.kyc.adminconfiguration.adminconfigmodule.services;

import com.ponsun.kyc.adminconfiguration.adminconfigmodule.domain.AdminConfigModule;

import java.util.List;

public interface AdminConfigModuleReadPlatformService {
    AdminConfigModule fetchAdminConfigModuleById(Integer id);
    List<AdminConfigModule> fetchAllAdminConfigModule();
}