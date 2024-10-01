package com.ponsun.kyc.adminconfiguration.adminuserroal.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminUserRoalRepository extends JpaRepository<AdminUserRoal, Integer> {
    Optional<AdminUserRoal> findById(Integer id);


}