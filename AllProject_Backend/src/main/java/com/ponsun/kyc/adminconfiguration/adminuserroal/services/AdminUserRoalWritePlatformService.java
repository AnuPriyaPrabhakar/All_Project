package com.ponsun.kyc.adminconfiguration.adminuserroal.services;


import com.ponsun.kyc.adminconfiguration.adminuserroal.request.CreateAdminUserRoalRequest;
import com.ponsun.kyc.adminconfiguration.adminuserroal.request.UpdateAdminUserRoalRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

public interface AdminUserRoalWritePlatformService {
    Response createAdminUserRoal(CreateAdminUserRoalRequest createAdminUserRoalRequest);
    Response updateAdminUserRoal(Integer id, UpdateAdminUserRoalRequest updateAdminUserRoalRequest);

    Response deactive(Integer id, Integer euid);

    Response blockAdminUserRoal(Integer id);
    Response unblockAdminUserRoal(Integer id);
}