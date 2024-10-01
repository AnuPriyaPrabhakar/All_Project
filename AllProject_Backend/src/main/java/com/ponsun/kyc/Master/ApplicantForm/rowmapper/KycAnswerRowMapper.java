package com.ponsun.kyc.Master.ApplicantForm.rowmapper;

import com.ponsun.kyc.Master.ApplicantForm.KycData.KycAnswerData;
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
public class KycAnswerRowMapper implements RowMapper<KycAnswerData> {

    private final String schema;

    public KycAnswerRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" FROM kyc_applicant_form_details a,kyc_config_question_type b ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("a.answer As answer,");
        builder.append("a.score As score");

        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public KycAnswerData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final String answer = rs.getString("answer");
        final double score = rs.getDouble("score");

        return new KycAnswerData(answer,score);

    }
}