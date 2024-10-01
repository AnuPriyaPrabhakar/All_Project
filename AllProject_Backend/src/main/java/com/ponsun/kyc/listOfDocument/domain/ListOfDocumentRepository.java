package com.ponsun.kyc.listOfDocument.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ListOfDocumentRepository extends JpaRepository<ListOfDocument, Integer> {
    Optional<ListOfDocument> findById(Integer id);

    List<ListOfDocument> findByKycId(Integer kycId);
}


