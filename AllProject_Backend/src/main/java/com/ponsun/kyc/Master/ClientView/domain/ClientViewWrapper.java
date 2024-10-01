package com.ponsun.kyc.Master.ClientView.domain;

import com.ponsun.kyc.Master.ClientView.request.AbstractClientViewRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class ClientViewWrapper extends AbstractClientViewRequest {
    private final ClientViewRepository clientViewRepository;
    @Transactional
    public ClientView findOneWithNotFoundDetection(final Integer id){
        return this.clientViewRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("ClientView Not found " + id) );
    }
    @Override
    public String toString(){
        return super.toString();
    }
}
