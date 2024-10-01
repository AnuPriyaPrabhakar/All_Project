package com.ponsun.kyc.Master.PepScore.serices;
import com.ponsun.kyc.Master.PepScore.domain.PepScore;

import java.util.List;

public interface PepScoreReadService {
    List<PepScore> fetchAllPepScore();
    PepScore fetchPepScoreById(Integer id);
}
