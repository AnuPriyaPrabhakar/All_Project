package com.ponsun.kyc.Master.NameSearchDetails.domain;

import com.ponsun.kyc.Master.NameSearchDetails.request.AbstractNameSearchDetailsRequest;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NameSearchDetailsRepositoryWrapper extends AbstractNameSearchDetailsRequest {
    private final NameSearchDetailsRepository nameSearchDetailsRepository;

    @Transactional
    public NameSearchDetails findOneWithNotFoundDetection(final Integer id){
        return this.nameSearchDetailsRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("NameSearchDetails Not found "+id));
    }

    @Override
    public String toString() {return super.toString();}
}
