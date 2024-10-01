package com.ponsun.kyc.Master.RiskScoreRange.services;
import com.ponsun.kyc.Master.ClientView.data.ClientViewData;
import com.ponsun.kyc.Master.ClientView.rowmapper.ClientViewRowMapper;
import com.ponsun.kyc.Master.NameSearch.data.NameSearchData;
import com.ponsun.kyc.Master.NameSearch.rowmapper.NameSearchRowMapper;
import com.ponsun.kyc.Master.RiskScoreRange.data.RiskScoreRangeData;
import com.ponsun.kyc.Master.RiskScoreRange.domain.RiskScoreRange;
import com.ponsun.kyc.Master.RiskScoreRange.domain.RiskScoreRangeRepository;
import com.ponsun.kyc.Master.RiskScoreRange.rowmapper.RiskScoreRangeRowMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class RiskScoreRangeReadServices implements RiskScoreRangeReadServiceImpl{

    private final JdbcTemplate jdbcTemplate;
    private final RiskScoreRangeRowMapper riskScoreRangeRowMapper;

    @Override
    public List<RiskScoreRangeData> fetchAllRiskScoreRange() {
        Map<String, Object> parameters = new HashMap<>();
        final RiskScoreRangeRowMapper rowMapper = new RiskScoreRangeRowMapper();
        String Qry = "SELECT " + rowMapper.tableSchema();
        String whereClause = " WHERE STATUS='A'";
        Qry = Qry + whereClause;
        final List<RiskScoreRangeData> riskScoreRangeData = jdbcTemplate.query(Qry,riskScoreRangeRowMapper);
        return riskScoreRangeData;
    }
}


