package com.ponsun.kyc.Master.PepScore.rowmapper;
import com.ponsun.kyc.Master.PepScore.data.PepScoreData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
@Data
@Service
@Slf4j
public class PepScoreRowMapper implements RowMapper<PepScoreData> {
    private final String schema;

    public PepScoreRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_config_account_type at ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("at.id as id, ");
        builder.append("at.name as name, ");
        builder.append("at.score as score");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public PepScoreData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final String name = rs.getString("name");
        final Double score = rs.getDouble("score");

        return new PepScoreData(id, name, score);
    }
}