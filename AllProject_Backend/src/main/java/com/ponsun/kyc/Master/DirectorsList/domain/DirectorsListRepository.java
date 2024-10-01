package com.ponsun.kyc.Master.DirectorsList.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DirectorsListRepository extends JpaRepository<DirectorsList,Integer> {
    Optional<DirectorsList> findById(Integer id);
    List<DirectorsList> findByKycId(Integer kycId);
}