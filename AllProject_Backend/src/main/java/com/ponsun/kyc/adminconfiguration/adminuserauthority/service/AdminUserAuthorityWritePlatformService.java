package com.ponsun.kyc.adminconfiguration.adminuserauthority.service;


import com.ponsun.kyc.adminconfiguration.adminuserauthority.request.CreateAdminUserAuthorityRequest;
import com.ponsun.kyc.adminconfiguration.adminuserauthority.request.UpdateAdminUserAuthorityRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

public interface AdminUserAuthorityWritePlatformService {
    Response createAdminUserAuthority(CreateAdminUserAuthorityRequest createAdminUserAuthorityRequest);
    Response updateAdminUserAuthority(Integer id, UpdateAdminUserAuthorityRequest updateAdminUserAuthorityRequest);
    Response blockAdminUserAuthority(Integer id);
    Response unblockAdminUserAuthority(Integer id);
}
