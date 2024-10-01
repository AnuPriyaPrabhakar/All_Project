package com.ponsun.kyc.Master.NameSearch.domain;

import com.ponsun.kyc.Master.NameSearch.Request.AbstractNameSearchRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class NameSearchWrapper extends AbstractNameSearchRequest {
    private final NameSearchRepository nameSearchRepository;
    @Transactional
    public NameSearch findOneWithNotFoundDetection(final Integer id){
        return this.nameSearchRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("NameSearch Not found " + id) );
    }
    @Override
    public String toString(){
        return super.toString();
    }
}
