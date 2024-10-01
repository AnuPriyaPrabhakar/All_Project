package com.ponsun.kyc.Master.DirectorsSignAuthority.service;

import com.ponsun.kyc.Master.DirectorsSignAuthority.request.CreateDirectorsSignAuthorityRequest;
import com.ponsun.kyc.Master.DirectorsSignAuthority.request.UpdateDirectorsSignAuthorityRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

public interface DirectorsSignAuthorityWriteService {

    Response createSignAuthority(CreateDirectorsSignAuthorityRequest createDirectorsSignAuthorityRequest);
    Response updateSignAuthority(Integer id, UpdateDirectorsSignAuthorityRequest updateDirectorsSignAuthorityRequest);
    Response deActivate(Integer kycId, Integer euid);

}
