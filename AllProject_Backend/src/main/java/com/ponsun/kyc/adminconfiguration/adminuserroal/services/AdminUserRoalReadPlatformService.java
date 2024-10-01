package com.ponsun.kyc.adminconfiguration.adminuserroal.services;

import com.ponsun.kyc.adminconfiguration.adminuserroal.domain.AdminUserRoal;

import java.util.List;

public interface AdminUserRoalReadPlatformService {
    AdminUserRoal fetchAdminUserRoalById(Integer id);
    List<AdminUserRoal> fetchAllAdminUserRoal();
}