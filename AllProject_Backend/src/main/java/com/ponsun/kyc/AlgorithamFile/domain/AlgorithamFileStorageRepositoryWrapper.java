package com.ponsun.kyc.AlgorithamFile.domain;

import com.ponsun.kyc.AlgorithamFile.request.AbstractAlgorithamFileStorageRequest;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
@Component
public class AlgorithamFileStorageRepositoryWrapper extends AbstractAlgorithamFileStorageRequest {
    private final AlgorithamFileStorageRepository algorithamFileStorageRepository;

    public AlgorithamFileStorageRepositoryWrapper(AlgorithamFileStorageRepository algorithamFileStorageRepository) {
        this.algorithamFileStorageRepository = algorithamFileStorageRepository;
    }

    @Transactional
    public AlgorithamFileStorage findOneWithNotFoundDetection(final Integer id) {
        return this.algorithamFileStorageRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("FileStorage Not found " + id));
    }

    @Override
    public String toString() {
        return super.toString();
    }
}
