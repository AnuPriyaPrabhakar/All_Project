package com.ponsun.kyc.accessPermission.services;

import com.ponsun.kyc.accessPermission.data.AccessPermissionData;

import java.util.List;

public interface AccessPermissionWritePlatformService {
    List<AccessPermissionData> fetchAllAccessPermissionData(String uid);
}
