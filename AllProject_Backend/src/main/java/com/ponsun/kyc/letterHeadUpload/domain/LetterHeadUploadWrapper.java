package com.ponsun.kyc.letterHeadUpload.domain;

import com.ponsun.kyc.letterHeadUpload.request.AbstractLetterHeadUploadRequest;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LetterHeadUploadWrapper extends AbstractLetterHeadUploadRequest {
    private final LetterHeadUploadRepository LetterHeadUploadRepository;
    @Transactional
    public LetterHeadUpload findOneWithNotFoundDetection(final Integer id){
        return this.LetterHeadUploadRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("LetterHeadUpload Not found "+id));
    }
    @Override
    public String toString() { return  super.toString();}

}
