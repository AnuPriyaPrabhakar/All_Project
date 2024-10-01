package com.ponsun.kyc.Master.ScoreCalculation.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreCalculationRepository extends JpaRepository<ScoreCalculation,Integer> {
    List<ScoreCalculation> findByKycId(Integer kycId);
}
