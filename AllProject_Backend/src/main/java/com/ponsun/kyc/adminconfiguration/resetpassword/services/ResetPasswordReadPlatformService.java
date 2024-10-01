package com.ponsun.kyc.adminconfiguration.resetpassword.services;

import com.ponsun.kyc.adminconfiguration.resetpassword.domain.ResetPassword;

import java.util.List;

public interface ResetPasswordReadPlatformService {
    ResetPassword fetchResetPasswordById(Integer id);
    List<ResetPassword> fetchAllResetPassword();


}
