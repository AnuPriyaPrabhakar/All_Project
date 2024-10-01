package com.ponsun.kyc.Master.RiskScoreRange.rowmapper;
import com.ponsun.kyc.Master.RiskScoreRange.data.RiskScoreRangeData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class RiskScoreRangeRowMapper implements RowMapper<RiskScoreRangeData> {
    private final String schema;

    public RiskScoreRangeRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" FROM `kyc_config_risk_score_range` ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" risk_classification,rangeFrm,rangeTo");

        builder.append(this.schema);
        return builder.toString();

    }

    @Override
    public RiskScoreRangeData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final String risk_classification = rs.getString("risk_classification");
        final Double rangeFrm = rs.getDouble("rangeFrm");
        final Double rangeTo = rs.getDouble("rangeTo");
        return new RiskScoreRangeData(risk_classification, rangeFrm, rangeTo);

    }
}