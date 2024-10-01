package com.ponsun.kyc.adminconfiguration.admingroup.services;

import com.ponsun.kyc.adminconfiguration.admingroup.domain.Admingroup;

import java.util.List;

public interface AdmingroupReadPlatformService {
    Admingroup fetchAdmingroupById(Integer id);
    List<Admingroup> fetchAllAdmingroup();



}