package com.ponsun.kyc.listOfDocument.domain;

import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import com.ponsun.kyc.listOfDocument.request.CreateListOfDocumentRequest;
import com.ponsun.kyc.listOfDocument.request.UpdateListOfDocumentRequest;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Entity
@Accessors(chain = true)
@Table(name="kyc_list_of_Document")
public class ListOfDocument extends BaseEntity {
    private static final long serialVersioUID = 1L;

    @Id
    @Column(name ="id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="kycId")
    private Integer kycId;

    @Column(name="pep")
    private Integer pep;

    @Column(name="ispepcheck")
    private Integer ispepcheck;

    @Column(name = "san")
    private Integer san;

    @Column(name = "issancheck")
    private Integer issancheck;

    @Column(name = "crm")
    private Integer crm;

    @Column(name = "iscrmcheck")
    private Integer iscrmcheck;

    @Column(name = "adverse_media")
    private Integer adverse_media;

    @Column(name = "isadverse_check")
    private Integer isadverse_check;

    @Column(name="uid")
    private Integer uid;

    @Column(name="euid")
    private Integer euid;


    public static ListOfDocument create(final CreateListOfDocumentRequest createListOfDocumentRequest){
        final ListOfDocument listOfDocument = new ListOfDocument();
        listOfDocument.setKycId(createListOfDocumentRequest.getKycId());
        listOfDocument.setPep(createListOfDocumentRequest.getPep());
        listOfDocument.setIspepcheck(createListOfDocumentRequest.getIspepcheck());
        listOfDocument.setSan(createListOfDocumentRequest.getSan());
        listOfDocument.setIssancheck(createListOfDocumentRequest.getIssancheck());
        listOfDocument.setCrm(createListOfDocumentRequest.getCrm());
        listOfDocument.setIscrmcheck(createListOfDocumentRequest.getIscrmcheck());
        listOfDocument.setAdverse_media(createListOfDocumentRequest.getAdverse_media());
        listOfDocument.setIsadverse_check(createListOfDocumentRequest.getIsadverse_check());

        listOfDocument.setUid(createListOfDocumentRequest.getUid());
        listOfDocument.setStatus(Status.ACTIVE);
        listOfDocument.setCreatedAt(LocalDateTime.now());
        return listOfDocument;
    }
    public void update(final UpdateListOfDocumentRequest updateListOfDocumentRequest){
        this.setKycId(updateListOfDocumentRequest.getKycId());
        this.setPep(updateListOfDocumentRequest.getPep());
        this.setIspepcheck(updateListOfDocumentRequest.getIspepcheck());
        this.setEuid(updateListOfDocumentRequest.getEuid());
        this.setStatus(Status.ACTIVE);
        this.setUpdatedAt(LocalDateTime.now());
    }
}
