package com.ponsun.kyc.adminconfiguration.adminuserroal.romapper;

import com.ponsun.kyc.adminconfiguration.adminuserroal.data.AdminUserRoalData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j

public class AdminUserRoalRowMapper implements RowMapper<AdminUserRoalData> {
    private final String schema;

    public AdminUserRoalRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM admin_user_roal ar ");
        this.schema = builder.toString();
    }
    public String schema() { return this.schema; }
    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("ar.id as id");
        builder.append("ar.userType as userType");
        builder.append("ar.valid as valid");
        builder.append("ar.uid as uid");
        builder.append("ar.euid as euid");
        builder.append(this.schema);
        return builder.toString();
    }
        @Override

        public AdminUserRoalData mapRow(ResultSet rs , int rowNum) throws SQLException {
            final Integer id = rs.getInt("id");
            final String userType = rs.getString("userType");
            final Boolean valid = rs.getBoolean("valid");
            final Integer uid = rs.getInt("uid");
            final Integer euid = rs.getInt("euid");
            return AdminUserRoalData.newInstance(id,userType,valid,uid,euid);
        }
    }
