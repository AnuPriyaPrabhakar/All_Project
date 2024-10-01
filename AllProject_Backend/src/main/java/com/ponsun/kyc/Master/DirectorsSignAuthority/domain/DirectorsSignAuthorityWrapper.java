package com.ponsun.kyc.Master.DirectorsSignAuthority.domain;

import com.ponsun.kyc.Master.DirectorsList.domain.DirectorsList;
import com.ponsun.kyc.Master.DirectorsSignAuthority.request.AbstractDirectorsSignAuthorityRequest;

import com.ponsun.kyc.Master.ScoreCalculation.domain.ScoreCalculation;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DirectorsSignAuthorityWrapper extends AbstractDirectorsSignAuthorityRequest {
    private final DirectorsSignAuthorityRepository repository;

    @Transactional
    public DirectorsSignAuthority findOneWithNotFoundDetection(final Integer id){
        return this.repository.findById(id).orElseThrow(() -> new EntityNotFoundException("DirectorsSignAuthority Not found " + id));
    }

    @Transactional
    public List<DirectorsSignAuthority> findKycIdNotFoundDetection(final Integer kycId){
        return this.repository.findByKycId(kycId);
    }
    @Override
    public String toString(){ return super.toString();}

}
