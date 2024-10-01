package com.ponsun.kyc.Master.ClientView.rowmapper;

import com.ponsun.kyc.Master.ClientView.data.ClientViewData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class ClientViewRowMapper implements RowMapper<ClientViewData> {
    private final String schema;

    public ClientViewRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" FROM `kyc_applicant_form` a,`kyc_applicant_form_details` b ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" a.id AS kycId,b.`answer` AS NAME,DATE(a.created_at) AS DATE");

        builder.append(this.schema);
        return builder.toString();

    }

    @Override
    public ClientViewData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer kycId = rs.getInt("kycId");
        final String name = rs.getString("name");
        final String date = rs.getString("date");

        return new ClientViewData(kycId, name, date);

    }
}