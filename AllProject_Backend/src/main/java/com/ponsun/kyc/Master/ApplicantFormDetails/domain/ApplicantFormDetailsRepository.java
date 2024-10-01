package com.ponsun.kyc.Master.ApplicantFormDetails.domain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicantFormDetailsRepository extends JpaRepository<ApplicantFormDetails,Integer> {

    List<ApplicantFormDetails> findByKycId(Integer kycId);
}
