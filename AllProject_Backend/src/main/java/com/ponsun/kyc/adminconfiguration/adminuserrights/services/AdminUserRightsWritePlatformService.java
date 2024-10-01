package com.ponsun.kyc.adminconfiguration.adminuserrights.services;

import com.ponsun.kyc.adminconfiguration.adminuserrights.data.AdminUserRightsDTO;
import com.ponsun.kyc.adminconfiguration.adminuserrights.request.UpdateAdminUserRightsRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AdminUserRightsWritePlatformService {

    @Transactional
    List<String> createAdminUserRights(List<AdminUserRightsDTO> createAdminUserRightsRequests);

    Response updateAdminUserRights(Integer id, UpdateAdminUserRightsRequest updateAdminUserRightsRequest);

    Response blockAdminUserRights(Integer id);
    Response unblockAdminUserRights(Integer id);
}
