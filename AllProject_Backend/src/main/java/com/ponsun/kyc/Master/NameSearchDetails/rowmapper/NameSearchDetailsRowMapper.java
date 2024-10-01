package com.ponsun.kyc.Master.NameSearchDetails.rowmapper;

import com.ponsun.kyc.Master.NameSearchDetails.data.NameSearchDetailsData;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class NameSearchDetailsRowMapper implements RowMapper<NameSearchDetailsData> {
    private final String schema;

    public NameSearchDetailsRowMapper(){
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_search_details sd");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("sd.id as id");
        builder.append("sd.question as question");
        builder.append("sd.answer as answer");
        builder.append("sd.kycId as kycId");
        builder.append("sd.uid as uid");
        builder.append("sd.euid as euid");
        builder.append(this.schema);
        return builder.toString();
    }
    @Override
    public NameSearchDetailsData mapRow(ResultSet rs,int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final String question = rs.getString("question");
        final String answer = rs.getString("answer");
        final Integer kycId = rs.getInt("kycId");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        return new NameSearchDetailsData(id,question,answer,kycId,uid,euid);
    }

}
