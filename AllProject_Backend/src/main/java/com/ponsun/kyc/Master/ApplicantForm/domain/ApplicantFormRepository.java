package com.ponsun.kyc.Master.ApplicantForm.domain;

import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicantFormRepository extends JpaRepository<ApplicantForm,Integer> {

//    List<ApplicantForm> findByKycId(Integer kycId);

}
