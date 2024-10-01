package com.ponsun.kyc.Master.DirectorsSignAuthority.rowmapper;

import com.ponsun.kyc.Master.DirectorsSignAuthority.data.DirectorsSignAuthorityData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class DirectorsSignAuthorityRowMapper implements RowMapper<DirectorsSignAuthorityData> {
    private final String schema;

    public DirectorsSignAuthorityRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" FROM `kyc_board_directors_sign_authority` a ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("a.id as id, ");
        builder.append("a.kycId as kycId, ");
        builder.append("a.name as name, ");
        builder.append("a.designation as designation ,");
        builder.append("a.uid as uid, ");
        builder.append("a.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public DirectorsSignAuthorityData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer kycId = rs.getInt("kycId");
        final String name = rs.getString("name");
        final String designation = rs.getString("designation");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");

        return new DirectorsSignAuthorityData(id, kycId, name, designation, uid, euid);

    }
}