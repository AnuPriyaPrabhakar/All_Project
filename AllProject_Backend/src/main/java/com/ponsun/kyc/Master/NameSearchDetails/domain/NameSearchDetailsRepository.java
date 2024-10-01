package com.ponsun.kyc.Master.NameSearchDetails.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NameSearchDetailsRepository extends JpaRepository<NameSearchDetails,Integer> {
    Optional<NameSearchDetails> findById(Integer id);
    List<NameSearchDetails> findByKycId(Integer KycId);
}
