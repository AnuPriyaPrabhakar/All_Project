package com.ponsun.kyc.adminconfiguration.adminuserrights.services;

import com.ponsun.kyc.adminconfiguration.adminuserrights.domain.AdminUserRights;

import java.util.List;

public interface AdminUserRightsReadPlatformService {

    AdminUserRights fetchAdminUserRightsById (Integer id);
    List<AdminUserRights> fetchAllAdminUserRights();
}
