package com.ponsun.kyc.letterHeadUpload.domain;


import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import com.ponsun.kyc.letterHeadUpload.request.CreateLetterHeadUploadRequest;
import com.ponsun.kyc.letterHeadUpload.request.UpdateLetterHeadUploadRequest;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_letter_head_upload")
public class LetterHeadUpload extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "branchId")
    private Integer branchId;

    @Column(name = "pathId")
    private Integer pathId;

    @Column(name = "documentType")
    private String documentType;

    @Column(name = "url")
    private String url;

    @Column(name = "imageName")
    private String imageName;

    @Column(name = "euid")
    private Integer euid;

    @Column(name = "uid")
    private Integer uid;

    public static LetterHeadUpload create(CreateLetterHeadUploadRequest request) {
        final LetterHeadUpload letterHeadUpload = new LetterHeadUpload();
        letterHeadUpload.setBranchId(request.getBranchId());
        letterHeadUpload.setPathId(request.getPathId());
        letterHeadUpload.setDocumentType(request.getDocumentType());
        letterHeadUpload.setUrl(request.getUrl());
        letterHeadUpload.setEuid(request.getEuid());
        letterHeadUpload.setUid(request.getUid());
        letterHeadUpload.onCreate();
        letterHeadUpload.setStatus(Status.ACTIVE);
        return letterHeadUpload;
    }
    public void update(final UpdateLetterHeadUploadRequest request) {
        this.setBranchId(request.getBranchId());
        this.setEuid(request.getEuid());
        this.setUid(request.getUid());
        this.onUpdate();
        this.setStatus(Status.ACTIVE);
    }
}
