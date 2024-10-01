package com.ponsun.kyc.FilesStorage.domain;

import com.ponsun.kyc.FilesStorage.request.CreateFileStorageRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_document")

public class FileStorage extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "kycId")
    private Integer kycId;

    @Column(name = "documentType")
    private String documentType;

    @Column(name = "documentTypeId")
    private Integer documentTypeId;

    @Column(name = "url")
    private String url;

    public static FileStorage create(final CreateFileStorageRequest createFileStorageRequest){
        final FileStorage fileStorage = new FileStorage();

       fileStorage.setKycId(createFileStorageRequest.getKycId());
        fileStorage.setDocumentTypeId(createFileStorageRequest.getDocumentTypeId());
       fileStorage.setUrl(createFileStorageRequest.getUrl());
       fileStorage.setDocumentType(createFileStorageRequest.getDocumentType());
       fileStorage.setStatus(Status.ACTIVE);
        return fileStorage;
    }
}
