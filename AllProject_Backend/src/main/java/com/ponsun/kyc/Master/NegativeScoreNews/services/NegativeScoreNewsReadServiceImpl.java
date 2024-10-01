package com.ponsun.kyc.Master.NegativeScoreNews.services;
import com.ponsun.kyc.Master.NegativeScoreNews.domain.NegativeScoreNews;
import com.ponsun.kyc.Master.NegativeScoreNews.domain.NegativeScoreNewsRepository;
import com.ponsun.kyc.Master.NegativeScoreNews.domain.NegativeScoreNewsWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NegativeScoreNewsReadServiceImpl implements NegativeScoreNewsReadService {
    private final NegativeScoreNewsWrapper negativeScoreNewsWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final NegativeScoreNewsRepository negativeScoreNewsRepository;

    @Override
    public List<NegativeScoreNews> fetchAllNegativeScore() {

        { return this.negativeScoreNewsRepository.findAll();}
    }

    @Override
    public NegativeScoreNews fetchNegativeScoreById(Integer id) {
        return this.negativeScoreNewsRepository.findById(id).get();
    }
}
