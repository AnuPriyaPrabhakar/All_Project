package com.ponsun.kyc.Master.NameSearchDetails.services;

import com.ponsun.kyc.Master.NameSearchDetails.domain.NameSearchDetails;
import com.ponsun.kyc.Master.NameSearchDetails.domain.NameSearchDetailsRepository;
import com.ponsun.kyc.Master.NameSearchDetails.domain.NameSearchDetailsRepositoryWrapper;
import com.ponsun.kyc.Master.NameSearchDetails.request.CreateNameSearchDetailsRequest;
import com.ponsun.kyc.Master.NameSearchDetails.request.UpdateNameSearchDetailsRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import com.ponsun.kyc.infrastructure.utils.Response;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NameSearchDetailsWritePlatformServiceImpl implements NameSearchDetailsWritePlatformService{
    private final NameSearchDetailsRepository nameSearchDetailsRepository;
    private final NameSearchDetailsRepositoryWrapper nameSearchDetailsRepositoryWrapper;
    private final JdbcTemplate jdbcTemplate;

    @Override
    @Transactional
    public Response createNameSearchDetails(CreateNameSearchDetailsRequest createNameSearchDetailsRequest){
        try{
            final NameSearchDetails nameSearchDetails = NameSearchDetails.create(createNameSearchDetailsRequest);
            this.nameSearchDetailsRepository.saveAndFlush(nameSearchDetails);
            return Response.of(Long.valueOf(nameSearchDetails.getId()));
        }catch(DataIntegrityViolationException e){
            throw new EQAS_KYC_ApplicationException(e.getMessage());
        }
    }
    @Override
    @Transactional
    public Response updateNameSearchDetails(Integer id, UpdateNameSearchDetailsRequest updateNameSearchDetailsRequest){
        try{
            final NameSearchDetails nameSearchDetails = this.nameSearchDetailsRepositoryWrapper.findOneWithNotFoundDetection(id);
            nameSearchDetails.update(updateNameSearchDetailsRequest);
            this.nameSearchDetailsRepository.saveAndFlush(nameSearchDetails);
            return Response.of(Long.valueOf(nameSearchDetails.getId()));
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }

}
