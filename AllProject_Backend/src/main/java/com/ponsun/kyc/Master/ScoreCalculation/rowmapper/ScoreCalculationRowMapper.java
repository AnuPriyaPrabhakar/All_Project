package com.ponsun.kyc.Master.ScoreCalculation.rowmapper;
import com.ponsun.kyc.Master.ScoreCalculation.data.ScoreCalculationData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class ScoreCalculationRowMapper implements RowMapper<ScoreCalculationData> {
    private final String schema;

    public ScoreCalculationRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_risk_score_calculation krsc ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("krsc.id as id, ");
        builder.append("krsc.kycId as kycId");
        builder.append("krsc.pepScoreId as pepScoreId");
        builder.append("krsc.negativeMediaId as negativeMediaId");
        builder.append("krsc.entityId as entityId");
        builder.append("krsc.pepScore as pepScore");
        builder.append("krsc.negativeMediaScore as negativeMediaScore");
        builder.append("krsc.entityScore as entityScore");
        builder.append("krsc.questionnairsScore as questionnairsScore");
        builder.append("krsc.uid as uid, ");
        builder.append("krsc.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public ScoreCalculationData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer kycId = rs.getInt("kycId");
        final Integer pepScoreId = rs.getInt("pepScoreId");
        final Integer negativeMediaId = rs.getInt("negativeMediaId");
        final Integer entityId = rs.getInt("entityId");
        final Double pepScore = rs.getDouble("pepScore");
        final Double negativeMediaScore = rs.getDouble("negativeMediaScore");
        final Double entityScore = rs.getDouble("entityScore");
        final Double questionnairsScore = rs.getDouble("questionnairsScore");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        return new ScoreCalculationData(id, kycId, pepScoreId, negativeMediaId, entityId, pepScore, negativeMediaScore, entityScore, questionnairsScore, uid, euid);

    }
}