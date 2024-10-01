package com.ponsun.kyc.Master.ApplicationType.domain;

import com.ponsun.kyc.Master.ApplicationType.request.AbstractApplicationTypeRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ApplicationTypeWrapper extends AbstractApplicationTypeRequest {
    private final ApplicationTypeRepository applicationTypeRepository;
    @Transactional
    public ApplicationType findOneWithNotFoundDetection(final Integer id){
        return this.applicationTypeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("ApplicationType Not found " + id) );
    }
    @Override
    public String toString(){
        return super.toString();
    }

}
