package com.ponsun.kyc.adminconfiguration.AdminUser.rowmapper;

import com.ponsun.kyc.adminconfiguration.AdminUser.data.UserData;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;


public class UserRowMapper implements RowMapper<UserData> {
    private final String schema;

    public UserRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM admin_users au ");
        this.schema = builder.toString();
    }

    public String schema() {
        return this.schema;
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("au.id as id, ");
        builder.append("au.userName as userName, ");
        builder.append("au.password as password, ");
        builder.append("au.admin_grp as adminGroup, ");
        builder.append("au.full_name as fullName, ");
        builder.append("au.dob as dob, ");
        builder.append("au.sex as genderId, ");
        builder.append("au.marital_status as maritalStatusId, ");
        builder.append("au.dom as dom, ");
        builder.append("au.is_msg_displayed as msgDisplayed, ");
        builder.append("au.is_superUser as superUser, ");
        builder.append("au.role as role, ");
        builder.append("au.is_admin as admin, ");
        builder.append("au.email as email, ");
        builder.append("au.phno as phoneNo, ");
        builder.append("au.validFrm as validFrm, ");
        builder.append("au.validTo as validTo, ");
        builder.append("au.org_id as orgId, ");
        builder.append("au.valid as valid, ");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public UserData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final String userName = rs.getString("userName");
        final String password = rs.getString("password");
        final String adminGroup = rs.getString("adminGroup");
        final String fullName  = rs.getString("fullName");
        final String dob = rs.getString("dob");
        final Integer genderId = rs.getInt("genderId");
        final Integer maritalStatusId = rs.getInt("maritalStatusId");
        final String dom = rs.getString("dom");
        final Integer msgDisplayed = rs.getInt("msgDisplayed");
        final Boolean superUser = rs.getBoolean("superUser");
        final String role = rs.getString("role");
        final Integer admin = rs.getInt("admin");
        final String phoneNo = rs.getString("phoneNo");
        final String email = rs.getString("email");
        final String validFrm = rs.getString("validFrm");
        final String validTo = rs.getString("validTo");
        final Boolean valid = rs.getBoolean("valid");
        final Integer orgId = rs.getInt("orgId");
        final Integer uid = rs.getInt("uid");
        return new UserData(id,userName,password,adminGroup,fullName,dob,genderId,maritalStatusId,dom,msgDisplayed,superUser,role,admin,phoneNo,email,validFrm,validTo,valid,orgId,uid);
    }
}
