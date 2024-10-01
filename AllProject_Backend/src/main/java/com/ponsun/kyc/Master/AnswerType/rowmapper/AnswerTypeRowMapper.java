package com.ponsun.kyc.Master.AnswerType.rowmapper;

import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Service
@Slf4j
public class AnswerTypeRowMapper implements RowMapper<AnswerTypeData> {
    private final String schema;

    public AnswerTypeRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_config_answer kca ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("kca.id as id, ");
        builder.append("kca.questionId as questionId");
        builder.append("kca.subQuestionId as subQuestionId");
        builder.append("kca.subAnswer as subAnswer");
        builder.append("kca.name as name, ");
        builder.append("kca.score as score");
        builder.append("kca.uid as uid, ");
        builder.append("kca.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public AnswerTypeData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer questionId = rs.getInt("questionId");
        final Integer subQuestionId = rs.getInt("subQuestionId");
        final Integer subAnswer=rs.getInt("subAnswer");
        final String name = rs.getString("name");
        final Double score = rs.getDouble("score");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        return new AnswerTypeData(id,questionId,subQuestionId,subAnswer,name,score,uid,euid);
    }
}