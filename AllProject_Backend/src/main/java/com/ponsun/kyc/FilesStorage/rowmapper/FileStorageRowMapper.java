package com.ponsun.kyc.FilesStorage.rowmapper;

import com.ponsun.kyc.FilesStorage.data.FileStorageData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Slf4j
public class FileStorageRowMapper implements RowMapper<FileStorageData> {
    private final String schema;
    public FileStorageRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("FROM kyc_document kd");
        this.schema = builder.toString();
    }
    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("kd.id as id");
        builder.append("kd.kycId as kycId");
        builder.append("kd.documentTypeId as documentTypeId");
        builder.append("kd.documentType as documentType");
        builder.append("kd.updated_at as dt");
        builder.append("kd.url as url");
        builder.append(this.schema);
        return builder.toString();
    }
    @Override
    public FileStorageData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer kycId = rs.getInt("kycId");
        final Integer documentTypeId = rs.getInt("documentTypeId");
        final String documentType=rs.getString("documentType");
        final String dt = rs.getString("dt");
        final String url =rs.getString("url");
        return new FileStorageData(id,kycId,documentTypeId,documentType,dt,url);
    }
}
