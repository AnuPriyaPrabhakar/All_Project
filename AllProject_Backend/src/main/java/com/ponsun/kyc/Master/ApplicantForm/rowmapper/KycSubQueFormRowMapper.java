package com.ponsun.kyc.Master.ApplicantForm.rowmapper;

import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeData;
import com.ponsun.kyc.Master.ApplicantForm.KycData.KycAnswerData;
import com.ponsun.kyc.Master.ApplicantForm.KycData.KycSubQueFormData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Data
@Service
@Slf4j
public class KycSubQueFormRowMapper implements RowMapper<KycSubQueFormData> {
    private final String schema;

    public KycSubQueFormRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" FROM kyc_applicant_form_details a ")
                .append("INNER JOIN kyc_config_question_type b ON a.questionId = b.id ")
                .append("INNER JOIN kyc_config_sub_question_type c ON b.id = c.questionId ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("SELECT DISTINCT ")
                .append("b.id AS id, ")
                .append("c.id AS subQuestionId, ")
                .append("c.name AS name, ")
                .append("b.description AS description, ")
                .append("b.multiQuestion AS multiQuestion, ")
                .append("c.orderNo AS orderNo ");

        builder.append(this.schema);
        return builder.toString();
    }


//    public KycSubQueFormRowMapper() {
//        final StringBuilder builder = new StringBuilder(200);
//        builder.append(" FROM kyc_applicant_form_details a,kyc_config_question_type b, kyc_config_sub_question_type c ");
//        this.schema = builder.toString();
//    }
//
//    public String tableSchema() {
//        final StringBuilder builder = new StringBuilder(200);
//        builder.append("b.id AS id,c.id AS subQuestionId,c.name AS NAME,b.description AS description,b.multiQuestion AS multiQuestion,c.orderNo AS orderNo");
//
//        builder.append(this.schema);
//        return builder.toString();
//
//    }


    @Override
    public KycSubQueFormData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer subQuestionId = rs.getInt("subQuestionId");
        final String name = rs.getString("name");
        final String description = rs.getString("description");
        final Integer multiQuestion = rs.getInt("multiQuestion");
        final Integer orderNo = rs.getInt("orderNo");
        List<KycAnswerData> kycAnswerData = new ArrayList<>();
        return new KycSubQueFormData(id, subQuestionId, name, description, multiQuestion, orderNo,kycAnswerData);


    }
}