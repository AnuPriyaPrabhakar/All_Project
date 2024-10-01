package com.ponsun.kyc.adminconfiguration.resetpassword.services;

import com.ponsun.kyc.adminconfiguration.resetpassword.domain.ResetPassword;
import com.ponsun.kyc.adminconfiguration.resetpassword.domain.ResetPasswordRepository;
import com.ponsun.kyc.adminconfiguration.resetpassword.domain.ResetPasswordRepositoryWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResetPasswordReadPlatformServiceImpl implements ResetPasswordReadPlatformService {
    private final ResetPasswordRepositoryWrapper resetpasswordRepositoryWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final ResetPasswordRepository resetpasswordRepository;
    @Override
    public ResetPassword fetchResetPasswordById(Integer id){
        return this.resetpasswordRepository.findById(id).get();
    }
    @Override
    public List<ResetPassword> fetchAllResetPassword(){
        return this.resetpasswordRepository.findAll();
    }
}

