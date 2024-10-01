package com.ponsun.kyc.Master.NegativeScoreNews.services;
import com.ponsun.kyc.Master.NegativeScoreNews.domain.NegativeScoreNews;

import java.util.List;

public interface NegativeScoreNewsReadService {
    List<NegativeScoreNews> fetchAllNegativeScore();
    NegativeScoreNews fetchNegativeScoreById(Integer id);
}
