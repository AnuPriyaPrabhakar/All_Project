package com.ponsun.kyc.adminconfiguration.admingroup.services;


import com.ponsun.kyc.adminconfiguration.admingroup.request.CreateAdmingroupRequest;
import com.ponsun.kyc.adminconfiguration.admingroup.request.UpdateAdmingroupRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

public interface AdmingroupWritePlatformService {

    Response createAdmingroup(CreateAdmingroupRequest createAdmingroupRequest);
    Response updateAdmingroup(Integer id, UpdateAdmingroupRequest updateAdmingroupRequest);
    Response blockAdmingroup(Integer id);
    Response unblockAdmingroup(Integer id);


}
