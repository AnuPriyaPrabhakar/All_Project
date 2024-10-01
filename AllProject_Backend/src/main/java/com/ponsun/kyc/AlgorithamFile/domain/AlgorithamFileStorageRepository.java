package com.ponsun.kyc.AlgorithamFile.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlgorithamFileStorageRepository extends JpaRepository<AlgorithamFileStorage, Integer> {

    Optional<AlgorithamFileStorage> findById(Integer id);

//    @Transactional
//    public void saveDocument(createFileStorage document) {
//        // Perform validation checks before saving
//        if (document.getKycId() == null) {
//            throw new IllegalArgumentException("KYC ID cannot be null");
//        }
//
//        // Check for duplicate KYC IDs
//        if (documentRepository.existsByKycId(document.getKycId())) {
//            throw new IllegalArgumentException("KYC ID already exists: " + document.getKycId());
//        }
//
//        // Save the document
//        documentRepository.save(document);
}
