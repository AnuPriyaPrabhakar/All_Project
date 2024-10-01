package com.ponsun.kyc.adminconfiguration.resetpassword.services;

import com.ponsun.kyc.adminconfiguration.resetpassword.request.CreateResetPasswordRequest;
import com.ponsun.kyc.adminconfiguration.resetpassword.request.UpdateResetPasswordRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

public interface ResetPasswordWritePlatformService {
     Response createResetPassword(CreateResetPasswordRequest createResetPasswordRequest);
     Response updateResetPassword(Integer id, UpdateResetPasswordRequest updateResetPasswordRequest);
    Response blockResetPassword(Integer id);
    Response unblockResetPassword(Integer id);
}
