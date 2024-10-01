package com.ponsun.kyc.adminconfiguration.adminuserroal.services;


import com.ponsun.kyc.adminconfiguration.adminuserroal.domain.AdminUserRoal;
import com.ponsun.kyc.adminconfiguration.adminuserroal.domain.AdminUserRoalRepository;
import com.ponsun.kyc.adminconfiguration.adminuserroal.domain.AdminUserRoalRepositoryWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminUserRoalReadPlatformServiceImpl implements AdminUserRoalReadPlatformService {

    private final AdminUserRoalRepository adminUserRoalRepository;
    private final JdbcTemplate jdbcTemplate;
    private final AdminUserRoalRepositoryWrapper adminUserRoalRepositoryWrapper;

    @Override
    public AdminUserRoal fetchAdminUserRoalById(Integer id){return this.adminUserRoalRepository.findById(id).get();}
    @Override
    public List<AdminUserRoal> fetchAllAdminUserRoal(){return this.adminUserRoalRepository.findAll();}
}


