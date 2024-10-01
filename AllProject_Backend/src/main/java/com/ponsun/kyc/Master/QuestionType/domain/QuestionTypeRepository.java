package com.ponsun.kyc.Master.QuestionType.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionTypeRepository extends JpaRepository<QuestionType,Integer> {
    List<QuestionType> findByApplicationTypeIdAndAccountTypeId(Integer applicationTypeId,Integer accountTypeId);
}
