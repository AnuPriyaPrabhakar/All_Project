package com.ponsun.kyc.Master.DeclarationForm.services;


import com.ponsun.kyc.Master.DeclarationForm.domain.DeclarationForm;
import com.ponsun.kyc.Master.DeclarationForm.domain.DeclarationFormRepository;
import com.ponsun.kyc.Master.DeclarationForm.domain.DeclarationFormWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeclarationFormReadPlatformServiceImpl implements DeclarationFormReadPlatformService {
    private final DeclarationFormWrapper declarationFormWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final DeclarationFormRepository declarationFormRepository;
    @Override
    public DeclarationForm fetchDeclarationFormById(Integer id){
        return this.declarationFormRepository.findById(id).get();
    }
    @Override
    public List<DeclarationForm> fetchAllDeclarationForm()
    { return this.declarationFormRepository.findAll();}
}

