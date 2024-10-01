package com.ponsun.kyc.letterHeadUpload.domain;


import com.ponsun.kyc.common.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LetterHeadUploadRepository extends JpaRepository<LetterHeadUpload,Integer> {

    Optional<LetterHeadUpload> findByBranchIdAndStatus(Integer branchId, Status status);

}
