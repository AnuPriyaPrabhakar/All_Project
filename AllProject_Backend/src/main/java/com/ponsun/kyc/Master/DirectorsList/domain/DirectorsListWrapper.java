package com.ponsun.kyc.Master.DirectorsList.domain;



import com.ponsun.kyc.Master.DirectorsList.request.AbstractDirectorsListRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DirectorsListWrapper extends AbstractDirectorsListRequest {
    private final DirectorsListRepository directorsListRepository;
    @Transactional
    public DirectorsList findOneWithNotFoundDetection(final Integer id){
        return this.directorsListRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("DirectorsList Not found" + id));
    }
    @Transactional
    public List<DirectorsList> findKycIdNotFoundDetection(final Integer kycId){
        return this.directorsListRepository.findByKycId(kycId);
    }

    @Override
    public String toString(){ return super.toString();}
}
