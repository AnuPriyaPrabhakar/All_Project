package com.ponsun.kyc.Master.ApplicantForm.rowmapper;

import com.ponsun.kyc.Master.ApplicantForm.KycData.KycFormFeildData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class KycFormFeildRowMapper implements RowMapper<KycFormFeildData> {
    private final String schema;

    public KycFormFeildRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" FROM kyc_applicant_form_details a,kyc_config_question_type b ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("b.id AS id,a.subQuestionId AS subQuestionId,b.name AS name,b.description AS description,b.multiQuestion AS multiQuestion,b.orderNo AS orderNo");

        builder.append(this.schema);
        return builder.toString();

    }
    @Override
    public KycFormFeildData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer subQuestionId= rs.getInt("subQuestionId");
        final String name = rs.getString("name");
        final String description = rs.getString("description");
        final Integer multiQuestion = rs.getInt("multiQuestion");
        final Integer orderNo = rs.getInt("orderNo");
        return new KycFormFeildData(id,subQuestionId,name,description,multiQuestion,orderNo);

    }
}