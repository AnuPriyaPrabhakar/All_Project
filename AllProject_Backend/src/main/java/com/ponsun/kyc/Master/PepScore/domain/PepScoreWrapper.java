package com.ponsun.kyc.Master.PepScore.domain;

import com.ponsun.kyc.Master.PepScore.request.AbstractPepScoreRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PepScoreWrapper extends AbstractPepScoreRequest {
    private final PepScoreRepository pepScoreRepository;
    @Transactional
    public PepScore findOneWithNotFoundDetection(final Integer id){
        return this.pepScoreRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("PepScore Not found " + id) );
    }
    @Override
    public String toString(){
        return super.toString();
    }

}
