package com.ponsun.kyc.Master.EntityScore.services;

import com.ponsun.kyc.Master.EntityScore.domain.EntityScore;
import java.util.List;

public interface EntityScoreReadService {
    List<EntityScore> fetchAllEntityScore();
    EntityScore fetchEntityScoreById(Integer id);
}
