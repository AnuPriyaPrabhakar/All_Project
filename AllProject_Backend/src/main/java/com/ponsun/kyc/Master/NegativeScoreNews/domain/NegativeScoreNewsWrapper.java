package com.ponsun.kyc.Master.NegativeScoreNews.domain;
import com.ponsun.kyc.Master.NegativeScoreNews.request.AbstractNegativeScoreNewsRequest;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
public class NegativeScoreNewsWrapper extends AbstractNegativeScoreNewsRequest {

    private final NegativeScoreNewsRepository newsRepository;
    @Transactional
    public NegativeScoreNews findOneWithNotFoundDetection(final Integer id){
        return this.newsRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("NegativeScoreNews Not found " + id) );
    }
    @Override
    public String toString(){
        return super.toString();
    }
}
