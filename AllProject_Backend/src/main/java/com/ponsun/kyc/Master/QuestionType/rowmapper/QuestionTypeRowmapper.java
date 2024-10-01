package com.ponsun.kyc.Master.QuestionType.rowmapper;
import com.ponsun.kyc.Master.QuestionType.data.QuestionTypeData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class QuestionTypeRowmapper implements RowMapper<QuestionTypeData> {
    private final String schema;

    public QuestionTypeRowmapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_config_question_type qt ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("qt.id as id ");
        builder.append("qt.accountTypeId as accountTypeId");
        builder.append("qt.applicationTypeId as applicationTypeId");
        builder.append("qt.ansTypeId as ansTypeId");
        builder.append("qt.name as name ");
        builder.append("qt.nameField as nameField");
        builder.append("qt.orderNo as orderNo");
        builder.append("qt.multiQuestion as multiQuestion");
        builder.append("qt.description as description");
        builder.append("qt.uid as uid ");
        builder.append("qt.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public QuestionTypeData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer accountTypeId = rs.getInt("accountTypeId");
        final Integer applicationTypeId = rs.getInt("applicationTypeId");
        final Integer ansTypeId = rs.getInt("ansTypeId");
        final String name = rs.getString("name");
        final Integer nameField = rs.getInt("nameField");
        final Integer orderNo = rs.getInt("orderNo");
        final Integer multiQuestion = rs.getInt("multiQuestion");
        final String description = rs.getString("description");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");

        return new QuestionTypeData(id,accountTypeId,applicationTypeId,ansTypeId,name,nameField,orderNo,multiQuestion,description,uid,euid);


    }
}