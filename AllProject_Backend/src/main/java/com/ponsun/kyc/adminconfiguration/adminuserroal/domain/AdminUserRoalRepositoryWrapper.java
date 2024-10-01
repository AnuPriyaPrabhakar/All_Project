package com.ponsun.kyc.adminconfiguration.adminuserroal.domain;

import com.ponsun.kyc.adminconfiguration.adminuserroal.request.AbstractAdminUserRoalBaseRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminUserRoalRepositoryWrapper extends AbstractAdminUserRoalBaseRequest {
    private final AdminUserRoalRepository adminUserRoalRepository;

    @Transactional
    public AdminUserRoal findOneWithNotFoundDetection (final Integer id) {
        return this.adminUserRoalRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("AdminUserRoal Not found " + id));
    }
    @Override
    public String toString(){ return super.toString();}
}

