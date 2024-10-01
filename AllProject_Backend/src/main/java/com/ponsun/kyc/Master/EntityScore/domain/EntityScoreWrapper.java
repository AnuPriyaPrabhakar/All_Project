package com.ponsun.kyc.Master.EntityScore.domain;

import com.ponsun.kyc.Master.EntityScore.request.AbstractEntityScoreRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EntityScoreWrapper extends AbstractEntityScoreRequest {

    private final EntityScoreRepository entityScoreRepository;
    @Transactional
    public EntityScore findOneWithNotFoundDetection(final Integer id){
        return this.entityScoreRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("EntityScore Not found " + id) );
    }
    @Override
    public String toString(){
        return super.toString();
    }
}
