package com.ponsun.kyc.Master.SubQuestionType.rowmapper;
import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeData;
import com.ponsun.kyc.Master.SubQuestionType.data.SubQuestionTypeData;
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
public class SubQuestionTypeRowMapper implements RowMapper<SubQuestionTypeData> {
    private final String schema;

    public SubQuestionTypeRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_config_sub_question_type sqt ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("sqt.id as id ");
        builder.append("sqt.applicationTypeId as applicationTypeId");
        builder.append("sqt.accountTypeId as accountTypeId");
        builder.append("sqt.questionId as questionId");
        builder.append("sqt.name as name ");
        builder.append("sqt.nameField as nameField");
        builder.append("sqt.ansTypeId as ansTypeId");
        builder.append("sqt.orderNo as orderNo");
        builder.append("sqt.uid as uid, ");
        builder.append("sqt.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public SubQuestionTypeData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer applicationTypeId = rs.getInt("applicationTypeId");
        final Integer accountTypeId = rs.getInt("accountTypeId");
        final Integer questionId = rs.getInt("questionId");
        final String name = rs.getString("name");
        final Integer nameField = rs.getInt("nameField");
        final Integer ansTypeId = rs.getInt("ansTypeId");
        final Integer orderNo = rs.getInt("orderNo");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        List<AnswerTypeData> answerTypeData = new ArrayList<>();
        return new SubQuestionTypeData(id, applicationTypeId, accountTypeId, questionId, name,nameField, ansTypeId,orderNo, uid, euid,answerTypeData);

    }
}