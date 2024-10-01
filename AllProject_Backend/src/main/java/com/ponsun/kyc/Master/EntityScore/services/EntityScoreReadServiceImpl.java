package com.ponsun.kyc.Master.EntityScore.services;

import com.ponsun.kyc.Master.EntityScore.domain.EntityScore;
import com.ponsun.kyc.Master.EntityScore.domain.EntityScoreRepository;
import com.ponsun.kyc.Master.EntityScore.domain.EntityScoreWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EntityScoreReadServiceImpl implements EntityScoreReadService {
    private final EntityScoreWrapper entityScoreWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final EntityScoreRepository entityScoreRepository;

    @Override
    public List<EntityScore> fetchAllEntityScore() {
            return this.entityScoreRepository.findAll();

    }

    @Override
    public EntityScore fetchEntityScoreById(Integer id) {
        return this.entityScoreRepository.findById(id).get();
    }
}