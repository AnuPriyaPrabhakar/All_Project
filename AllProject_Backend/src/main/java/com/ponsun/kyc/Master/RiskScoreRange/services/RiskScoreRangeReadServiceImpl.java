package com.ponsun.kyc.Master.RiskScoreRange.services;
import com.ponsun.kyc.Master.RiskScoreRange.data.RiskScoreRangeData;
import java.util.List;

public interface RiskScoreRangeReadServiceImpl {

    List<RiskScoreRangeData> fetchAllRiskScoreRange();
}
