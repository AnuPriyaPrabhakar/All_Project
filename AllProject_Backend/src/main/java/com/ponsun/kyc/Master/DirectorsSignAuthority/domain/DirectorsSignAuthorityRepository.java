package com.ponsun.kyc.Master.DirectorsSignAuthority.domain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DirectorsSignAuthorityRepository extends JpaRepository<DirectorsSignAuthority,Integer> {

    List<DirectorsSignAuthority> findByKycId(Integer kycId);

}
