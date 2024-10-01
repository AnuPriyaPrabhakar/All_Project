package com.ponsun.kyc.Master.SubQuestionType.domain;
import com.ponsun.kyc.Master.ApplicantFormDetails.domain.ApplicantFormDetails;
import com.ponsun.kyc.Master.SubQuestionType.data.SubQuestionTypeData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SubQuestionTypeRepository extends JpaRepository<SubQuestionType, Integer> {
    List<SubQuestionType> findByQuestionId(Integer questionId);

}
