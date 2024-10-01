package com.ponsun.kyc.Master.RiskScoreRange.api;

import com.ponsun.kyc.Master.RiskScoreRange.data.RiskScoreRangeData;
import com.ponsun.kyc.Master.RiskScoreRange.domain.RiskScoreRange;
import com.ponsun.kyc.Master.RiskScoreRange.services.RiskScoreRangeReadServices;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/RiskScoreRange")
@Tag(name = "RiskScoreRangeApiResources")
public class RiskScoreRangeApiResources {
    private final RiskScoreRangeReadServices riskScoreRangeReadServices;

    @GetMapping("/ScoreRange")
    public List<RiskScoreRangeData> fetchAllRiskScoreRange() {
        return this.riskScoreRangeReadServices.fetchAllRiskScoreRange();
    }
}
