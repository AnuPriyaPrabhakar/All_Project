package com.ponsun.kyc.Master.DirectorsList.rowmapper;

import com.ponsun.kyc.Master.DirectorsList.data.DirectorsListData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class DirectorsListRowMapper implements RowMapper<DirectorsListData> {
    private final String schema;

    public DirectorsListRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" FROM `kyc_board_directors_list` ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" firstName,middleName,lastName,pan,nationality,citizenship,domicile,authorityId");

        builder.append(this.schema);
        return builder.toString();

    }

    @Override
    public DirectorsListData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final String firstName = rs.getString("firstName");
        final String middleName = rs.getString("middleName");
        final String lastName = rs.getString("lastName");
        final String pan = rs.getString("pan");
        final String nationality = rs.getString("nationality");
        final String citizenship = rs.getString("citizenship");
        final String domicile = rs.getString("domicile");
        final Integer authorityId=rs.getInt("authorityId");

        return new DirectorsListData(firstName, middleName, lastName, pan, nationality, citizenship, domicile,authorityId);

    }
}