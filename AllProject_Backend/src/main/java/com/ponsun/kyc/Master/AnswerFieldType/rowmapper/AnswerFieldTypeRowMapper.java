package com.ponsun.kyc.Master.AnswerFieldType.rowmapper;

import com.ponsun.kyc.Master.AnswerFieldType.data.AnswerFieldTypeData;
import com.ponsun.kyc.Master.AnswerFieldType.domain.AnswerFieldType;
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
public class AnswerFieldTypeRowMapper implements RowMapper<AnswerFieldTypeData> {
    private final String schema;

    public AnswerFieldTypeRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_config_answer_field_type a ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("a.id as id, ");
        builder.append("a.name as name, ");
        builder.append("a.uid as uid, ");
        builder.append("a.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public AnswerFieldTypeData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final String name = rs.getString("name");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        return new AnswerFieldTypeData(id,name,uid,euid);
    }
}