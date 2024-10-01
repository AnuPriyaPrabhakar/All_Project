package com.ponsun.kyc.Master.NameSearchDetails.domain;

import com.ponsun.kyc.Master.NameSearchDetails.request.CreateNameSearchDetailsRequest;
import com.ponsun.kyc.Master.NameSearchDetails.request.UpdateNameSearchDetailsRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

@Data
@Entity
@Accessors(chain = true)
@Table(name="kyc_search_details")
public class NameSearchDetails extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name="id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="question")
    private String question;

    @Column(name="answer")
    private String answer;

    @Column(name="kycId")
    private Integer kycId;

    @Column(name="uid")
    private Integer uid;

    @Column(name="euid")
    private Integer euid;

    public static NameSearchDetails create(final CreateNameSearchDetailsRequest createNameSearchDetailsRequest){
        final NameSearchDetails nameSearchDetails = new NameSearchDetails();
        nameSearchDetails.setQuestion(createNameSearchDetailsRequest.getQuestion());
        nameSearchDetails.setAnswer(createNameSearchDetailsRequest.getAnswer());
        nameSearchDetails.setKycId(createNameSearchDetailsRequest.getKycId());
        nameSearchDetails.setUid(createNameSearchDetailsRequest.getUid());
        nameSearchDetails.setStatus(Status.ACTIVE);
        nameSearchDetails.setCreatedAt(LocalDateTime.now());
        return nameSearchDetails;
    }

    public void update(final UpdateNameSearchDetailsRequest updateNameSearchDetailsRequest){
        this.setQuestion(updateNameSearchDetailsRequest.getQuestion());
        this.setAnswer(updateNameSearchDetailsRequest.getAnswer());
        this.setKycId(updateNameSearchDetailsRequest.getKycId());
        this.setEuid(updateNameSearchDetailsRequest.getEuid());
        this.setStatus(Status.ACTIVE);
        this.setUpdatedAt(LocalDateTime.now());
    }
}
