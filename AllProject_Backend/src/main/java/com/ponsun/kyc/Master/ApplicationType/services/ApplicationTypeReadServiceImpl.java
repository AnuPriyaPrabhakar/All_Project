package com.ponsun.kyc.Master.ApplicationType.services;

import com.ponsun.kyc.Master.ApplicationType.domain.ApplicationType;
import com.ponsun.kyc.Master.ApplicationType.domain.ApplicationTypeRepository;
import com.ponsun.kyc.Master.ApplicationType.domain.ApplicationTypeWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationTypeReadServiceImpl implements ApplicationTypeReadService {
    private final ApplicationTypeWrapper applicationTypeWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final ApplicationTypeRepository applicationTypeRepository;

    @Override
    public ApplicationType fetchApplicationFormById(Integer id){
        return this.applicationTypeRepository.findById(id).get();
    }
    @Override
    public List<ApplicationType> fetchAllApplicationForm(){
        return this.applicationTypeRepository.findAll();
    }


}
