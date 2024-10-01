package com.ponsun.kyc.Master.EntityScore.rowmapper;

import com.ponsun.kyc.Master.EntityScore.data.EntityScoreData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class EntityScoreRowMapper implements RowMapper<EntityScoreData> {
    private final String schema;

    public EntityScoreRowMapper() {
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
    public EntityScoreData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final String name = rs.getString("name");
        final Double score = rs.getDouble("score");

        return new EntityScoreData(id, name, score);

    }
}