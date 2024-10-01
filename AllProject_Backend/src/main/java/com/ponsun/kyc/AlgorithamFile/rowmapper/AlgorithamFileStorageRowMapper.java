package com.ponsun.kyc.AlgorithamFile.rowmapper;

import com.ponsun.kyc.AlgorithamFile.data.AlgorithamFileStorageData;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AlgorithamFileStorageRowMapper implements RowMapper<AlgorithamFileStorageData> {


    private final String schema;

    public AlgorithamFileStorageRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_algoritham_document kad");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("kad.id as id");
        builder.append("kad.kycId as kycId");
        builder.append("kad.documentType as documentType");
        builder.append("kad.pathId as pathId");
        builder.append("kad.updated_at as dt");
        builder.append("kad.url as url");
        builder.append(this.schema);
        return builder.toString();
    }

    @Override
    public AlgorithamFileStorageData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer kycId = rs.getInt("kycId");
        final String documentType=rs.getString("documentType");
        final Integer pathId = rs.getInt("pathId");
        final String dt = rs.getString("dt");
        final String url =rs.getString("url");
        return new AlgorithamFileStorageData(id,kycId,documentType,pathId,dt,url);
    }
}
