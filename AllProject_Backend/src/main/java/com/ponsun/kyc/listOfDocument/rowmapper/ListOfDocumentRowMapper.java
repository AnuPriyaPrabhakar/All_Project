package com.ponsun.kyc.listOfDocument.rowmapper;


import com.ponsun.kyc.listOfDocument.data.ListOfDocumentData;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ListOfDocumentRowMapper implements RowMapper<ListOfDocumentData> {
    private final String schema;
    public ListOfDocumentRowMapper(){
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_list_of_Document kld");
        this.schema = builder.toString();
    }
    public  String tableSchema(){
        final StringBuilder builder = new StringBuilder(200);
        builder.append("kld.id as id");
        builder.append("kld.kycId as kycId");
        builder.append("kld.pep as pep");
        builder.append("kld.ispepcheck as ispepcheck");
        builder.append("kld.san as san");
        builder.append("kld.issancheck sa issancheck");
        builder.append("kld.crm as crm");
        builder.append("kld.iscrmcheck as iscrmcheck");
        builder.append("kld.adverse_media as adverse_media");
        builder.append("kld.isadverse_check as isadverse_check");
        builder.append("kld.checkId as checkId");
        builder.append("kld.uid as uid");
        builder.append("kld.euid as euid");
        builder.append(this.schema);
        return builder.toString();
    }
    @Override
    public ListOfDocumentData mapRow(ResultSet rs, int rowNum) throws SQLException{
        final Integer id = rs.getInt("id");
        final Integer kycId = rs.getInt("kycId");
        final Integer pep = rs.getInt("pep");
        final Integer ispepcheck = rs.getInt("ispepcheck");
        final Integer san = rs.getInt("san");
        final Integer issancheck = rs.getInt("issancheck");
        final Integer crm =rs.getInt("crm");
        final Integer iscrmcheck = rs.getInt("iscrmcheck");
        final Integer adverse_media = rs.getInt("adverse_media");
        final Integer isadverse_check = rs.getInt("isadverse_check");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        return new ListOfDocumentData(id,kycId,pep,ispepcheck,san,issancheck,crm,iscrmcheck,adverse_media,isadverse_check,uid,euid);
    }
}
