package com.ponsun.kyc.adminconfiguration.adminuserauthority.service;

import com.ponsun.kyc.adminconfiguration.adminuserauthority.domain.AdminUserAuthority;

import java.util.List;

public interface AdminUserAuthorityReadPlatformService {
    AdminUserAuthority fetchAdminUserAuthorityById (Integer id);
    List<AdminUserAuthority> fetchAllAdminUserAuthority();
}
