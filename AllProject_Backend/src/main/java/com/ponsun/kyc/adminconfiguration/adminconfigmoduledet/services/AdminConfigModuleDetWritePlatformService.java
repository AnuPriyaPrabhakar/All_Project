package com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.services;


import com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.request.CreateAdminConfigModuleDetRequest;
import com.ponsun.kyc.adminconfiguration.adminconfigmoduledet.request.UpdateAdminConfigModuleDetRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

public interface AdminConfigModuleDetWritePlatformService {
    Response createAdminConfigModuleDet(CreateAdminConfigModuleDetRequest createAdminConfigModuleDetRequest);
    Response updateAdminConfigModuleDet(Integer id, UpdateAdminConfigModuleDetRequest updateAdminConfigModuleDetRequest);

//    Response deactive(Integer id, Integer euid);
    Response blockAdminConfigModuleDet(Integer id);
    Response unblockAdminConfigModuleDet(Integer id);
}
