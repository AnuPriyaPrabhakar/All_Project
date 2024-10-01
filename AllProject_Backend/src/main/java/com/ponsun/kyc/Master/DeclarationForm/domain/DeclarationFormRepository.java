package com.ponsun.kyc.Master.DeclarationForm.domain;

import com.ponsun.kyc.Master.DirectorsList.domain.DirectorsList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeclarationFormRepository extends JpaRepository<DeclarationForm,Integer> {
    Optional<DeclarationForm> findById(Integer id);
    List<DeclarationForm> findByKycId(Integer cmsId);
}