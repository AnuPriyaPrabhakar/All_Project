package com.ponsun.kyc.Master.DeclarationForm.rowmapper;



import com.ponsun.kyc.Master.DeclarationForm.data.DeclarationFormData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
@Data
@Service
@Slf4j
public class DeclarationFormRowMapper implements RowMapper<DeclarationFormData> {
    private final String schema;
    public DeclarationFormRowMapper(){
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" FROM kyc_declaration_form a ");
        this.schema = builder.toString();
    }
    public String tableSchema(){
        final StringBuilder builder = new StringBuilder(200);
        builder.append("a.id as id, ");
        builder.append("a.kycId as kycId, ");
        builder.append("a.memberName as memberName, ");
        builder.append("a.registeredPlace as registeredPlace ,");
        builder.append("a.din as din, ");
        builder.append("a.date as date, ");
        builder.append("a.place as place, ");
        builder.append("a.authorizeName as authorizeName, ");
        builder.append("a.authorizeDesignation as authorizeDesignation, ");
        builder.append("a.uid as uid, ");
        builder.append("a.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }
    @Override
    public DeclarationFormData mapRow(ResultSet rs, int rowNum) throws SQLException{
        final Integer id = rs.getInt("id");
        final Integer kycId = rs.getInt("kycId");
        final String memberName = rs.getString("memberName");
        final String registeredPlace = rs.getString("registeredPlace");
        final String din = rs.getString("din");
        final String date = rs.getString("date");
        final String  place = rs.getString("place");
        final String  authorizeName = rs.getString("authorizeName");
        final String authorizeDesignation = rs.getString("authorizeDesignation");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        return new DeclarationFormData(id,kycId,memberName,registeredPlace,din,date,place,authorizeName,authorizeDesignation,uid,euid);
    }
}
