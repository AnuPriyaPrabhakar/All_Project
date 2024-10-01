package com.ponsun.kyc.Master.ApplicationType.rowmapper;

import com.ponsun.kyc.Master.ApplicationType.data.ApplicationTypeData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
@Data
@Service
@Slf4j
public class ApplicationTypeRowMapper implements RowMapper<ApplicationTypeData> {
    private final String schema;

    public ApplicationTypeRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_config_application_type aty ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("aty.id as id, ");
        builder.append("aty.name as name, ");
        builder.append("aty.uid as uid, ");
        builder.append("aty.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public ApplicationTypeData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final String name = rs.getString("name");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        return new ApplicationTypeData(id, name, euid, uid);

    }
}