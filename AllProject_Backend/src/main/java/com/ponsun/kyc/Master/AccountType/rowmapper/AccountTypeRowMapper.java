package com.ponsun.kyc.Master.AccountType.rowmapper;

import com.ponsun.kyc.Master.AccountType.data.AccountTypeData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class AccountTypeRowMapper implements RowMapper<AccountTypeData> {
    private final String schema;

    public AccountTypeRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_config_account_type at ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("at.id as id, ");
        builder.append("at.applicationTypeId as applicationTypeId");
        builder.append("at.name as name, ");
        builder.append("at.uid as uid, ");
        builder.append("at.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public AccountTypeData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer applicationTypeId = rs.getInt("applicationTypeId");
        final String name = rs.getString("name");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        return new AccountTypeData(id,applicationTypeId, name, uid, euid);
    }
}