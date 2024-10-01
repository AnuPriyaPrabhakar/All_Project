package com.ponsun.kyc.Master.ScoreDocument.rowmapper;
import com.ponsun.kyc.Master.ScoreDocument.data.ScoreDocumentData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class ScoreDocumentRowMapper implements RowMapper<ScoreDocumentData> {
    private final String schema;

    public ScoreDocumentRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_risk_score_document krsd ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("krsd.id as id, ");
        builder.append("krsd.riskScoreCalculationId as riskScoreCalculationId");
        builder.append("krsd.pep as pep");
        builder.append("krsd.negativeMedia as negativeMedia");
        builder.append("krsd.uid as uid, ");
        builder.append("krsd.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public ScoreDocumentData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer riskScoreCalculationId = rs.getInt("riskScoreCalculationId");
        final String pep = rs.getString("pep");
        final String negativeMedia = rs.getString("negativeMedia");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        return new ScoreDocumentData(id, riskScoreCalculationId, pep, negativeMedia, uid, euid);
    }
}