package com.ponsun.kyc.AlgorithamFile.domain;

import com.ponsun.kyc.AlgorithamFile.request.CreateAlgorithamFileStorageRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_algoritham_document")

public class AlgorithamFileStorage extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "kycId")
    private Integer kycId;

    @Column(name = "documentType")
    private String documentType;

    @Column(name = "pathId")
    private Integer pathId;

    @Column(name = "url")
    private String url;

    public static AlgorithamFileStorage create(final CreateAlgorithamFileStorageRequest createFileStorageRequest){
        final AlgorithamFileStorage algorithamFileStorage = new AlgorithamFileStorage();

       algorithamFileStorage.setKycId(createFileStorageRequest.getKycId());
       algorithamFileStorage.setUrl(createFileStorageRequest.getUrl());
       algorithamFileStorage.setDocumentType(createFileStorageRequest.getDocumentType());
       algorithamFileStorage.setPathId(createFileStorageRequest.getPathId());
       algorithamFileStorage.setStatus(Status.ACTIVE);
        return algorithamFileStorage;
    }


//    public String getName() {
//        return this.name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getUrl() {
//        return this.url;
//    }
//
//    public void setUrl(String url) {
//        this.url = url;
//    }
//
//    public long getId() {
//        return this.id;
//    }
}
