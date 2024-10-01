package com.ponsun.kyc.Master.PepScore.serices;

import com.ponsun.kyc.Master.PepScore.domain.PepScore;
import com.ponsun.kyc.Master.PepScore.domain.PepScoreRepository;
import com.ponsun.kyc.Master.PepScore.domain.PepScoreWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class PepScoreReadServiceImpl implements PepScoreReadService{
    private final PepScoreWrapper pepScoreWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final PepScoreRepository pepScoreRepository;

    @Override
    public List<PepScore> fetchAllPepScore() {
        { return this.pepScoreRepository.findAll();}    }

    @Override
    public PepScore fetchPepScoreById(Integer id) {
        return this.pepScoreRepository.findById(id).get();
    }
}
