package com.ponsun.kyc.Master.NameSearch.rowmapper;

import com.ponsun.kyc.Master.ApplicantForm.KycData.KycFormFeildData;
import com.ponsun.kyc.Master.NameSearch.data.NameSearchData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class NameSearchRowMapper implements RowMapper<NameSearchData> {
    private final String schema;

    public NameSearchRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" FROM kyc_applicant_form_details a,kyc_config_question_type b ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" 1 AS screeningType, a.id AS applicantFormId , a.kycId, b.name AS question, a.answer ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public NameSearchData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer screeningType = rs.getInt("screeningType");
        final Integer kycId = rs.getInt("kycId");
        final String question = rs.getString("question");
        final String answer = rs.getString("answer");
        final Integer applicantFormId = rs.getInt("applicantFormId");
        return new NameSearchData(screeningType, kycId, question, answer, applicantFormId);
    }
}
