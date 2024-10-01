package com.ponsun.kyc.Master.ApplicantForm.rowmapper;

import com.ponsun.kyc.Master.ApplicantForm.data.ApplicantFormData;
import com.ponsun.kyc.Master.ApplicationType.data.ApplicationTypeData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
@Data
@Service
@Slf4j
public class ApplicantFormRowMapper implements RowMapper<ApplicantFormData> {
    private final String schema;

    public ApplicantFormRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_applicant_form a ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("a.id as id, ");
        builder.append("a.name as name, ");
        builder.append("a.numberOfPrint as numberOfPrint ,");
        builder.append("a.isCompleted as isCompleted, ");
        builder.append("a.uid as uid, ");
        builder.append("a.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public ApplicantFormData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final String name = rs.getString("name");
        final Integer numberOfPrint = rs.getInt("numberOfPrint");
        final Integer isCompleted = rs.getInt("isCompleted");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        return new ApplicantFormData(id, name,numberOfPrint, isCompleted,euid, uid);
    }
}