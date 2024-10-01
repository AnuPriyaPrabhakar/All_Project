package com.ponsun.kyc.Master.NameSearchDetails.services;

import com.ponsun.kyc.Master.NameSearchDetails.domain.NameSearchDetails;
import com.ponsun.kyc.Master.NameSearchDetails.domain.NameSearchDetailsRepository;
import com.ponsun.kyc.Master.NameSearchDetails.domain.NameSearchDetailsRepositoryWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NameSearchDetailsReadPlatformServiceImpl implements NameSearchDetailsReadPlatformService{
    private final NameSearchDetailsRepositoryWrapper nameSearchDetailsRepositoryWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final NameSearchDetailsRepository nameSearchDetailsRepository;

    @Override
    public NameSearchDetails fetchNameSearchById(Integer id){
        return this.nameSearchDetailsRepository.findById(id).get();
    }
    @Override
    public List<NameSearchDetails> fetchAllNameSearchDetails(){return this.nameSearchDetailsRepository.findAll();}
}
