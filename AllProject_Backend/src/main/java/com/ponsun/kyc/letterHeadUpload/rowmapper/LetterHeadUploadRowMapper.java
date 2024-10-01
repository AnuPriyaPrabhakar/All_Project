package com.ponsun.kyc.letterHeadUpload.rowmapper;

import com.ponsun.kyc.letterHeadUpload.data.LetterHeadUploadData;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;

@Data
@Slf4j
@Service
public class LetterHeadUploadRowMapper implements RowMapper<LetterHeadUploadData> {
    private final String schema;

    public LetterHeadUploadRowMapper() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append(" FROM kyc_letter_head_upload a ");
        this.schema = builder.toString();
    }

    public String tableSchema() {
        final StringBuilder builder = new StringBuilder(200);
        builder.append("a.id as id, ");
        builder.append("a.branchId as branchId,");
        builder.append("a.pathId as pathId,");
        builder.append("a.documentType as documentType,");
        builder.append("a.url as url,");
        builder.append("a.imageName as imageName,");
        builder.append("a.uid as uid, ");
        builder.append("a.euid as euid ");
        builder.append(this.schema);
        return builder.toString();
    }
    @Override
    public LetterHeadUploadData mapRow(ResultSet rs, int rowNum) throws SQLException {
        final Integer id = rs.getInt("id");
        final Integer branchId = rs.getInt("branchId");
        final Integer pathId = rs.getInt("pathId");
        final String documentType = rs.getString("documentType");
        final String url = rs.getString("url");
        final String imageName = rs.getString("imageName");
        final Integer uid = rs.getInt("uid");
        final Integer euid = rs.getInt("euid");
        return new LetterHeadUploadData(id, branchId, pathId , documentType , url , imageName ,uid, euid);
    }
}
