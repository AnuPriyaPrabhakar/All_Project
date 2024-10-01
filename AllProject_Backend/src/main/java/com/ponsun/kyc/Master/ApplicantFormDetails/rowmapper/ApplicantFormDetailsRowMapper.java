package com.ponsun.kyc.Master.ApplicantFormDetails.rowmapper;

import com.ponsun.kyc.Master.ApplicantFormDetails.data.ApplicantFormDetailsData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class ApplicantFormDetailsRowMapper implements RowMapper<ApplicantFormDetailsData> {

    private final String schema;

    public ApplicantFormDetailsRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_applicant_form_details kafd ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("kafd.id as id, ");
        builder.append("kafd.kycId as kycId,");
        builder.append("kafd.accountTypeId as accountTypeId,");
        builder.append("kafd.applicationTypeId as applicationTypeId,");
        builder.append("kafd.questionId as questionId,");
        builder.append("kafd.subQuestionId as subQuestionId,");
        builder.append("kafd.ansTypeId as ansTypeId,");
        builder.append("kafd.ansId as ansId,");
        builder.append("kafd.isSubAnswer as isSubAnswer,");
        builder.append("kafd.answer as answer, ");
        builder.append("kafd.score as score");
        builder.append("kafd.uid as uid, ");
        builder.append("kafd.euid as euid ,");
        builder.append("kafd.isScreening as isScreening ");
        builder.append(this.schema);
        return builder.toString();
    }


    @Override
    public ApplicantFormDetailsData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer kycId = rs.getInt("kycId");
        final Integer accountTypeId = rs.getInt("accountTypeId");
        final Integer applicationTypeId = rs.getInt("applicationTypeId");
        final Integer questionId = rs.getInt("questionId");
        final Integer subQuestionId = rs.getInt("subQuestionId");
        final Integer ansTypeId = rs.getInt("ansTypeId");
        final Integer ansId = rs.getInt("ansId");
        final Integer isSubAnswer = rs.getInt("isSubAnswer");
        final String answer = rs.getString("answer");
        final Double score = rs.getDouble("score");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        final Integer isScreening = rs.getInt("isScreening");
        return new ApplicantFormDetailsData(id, kycId, accountTypeId, applicationTypeId, questionId, subQuestionId, ansTypeId, ansId, isSubAnswer, answer, score, uid, euid, isScreening);

    }
}