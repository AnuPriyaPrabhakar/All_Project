package com.ponsun.kyc.Master.ScoreDocument.domain;
import com.ponsun.kyc.Master.ScoreDocument.request.AbstractScoreDocumentRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ScoreDocumentWrapper extends AbstractScoreDocumentRequest {
    private final ScoreDocumentRepository scoreDocumentRepository;
    @Transactional
    public ScoreDocument findOneWithNotFoundDetection(final Integer id){
        return this.scoreDocumentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("ScoreDocument Not found " + id) );
    }
    @Override
    public String toString(){
        return super.toString();
    }
}
