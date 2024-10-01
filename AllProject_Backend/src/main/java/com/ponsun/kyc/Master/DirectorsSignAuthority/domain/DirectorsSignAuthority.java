package com.ponsun.kyc.Master.DirectorsSignAuthority.domain;

import com.ponsun.kyc.Master.DirectorsSignAuthority.request.CreateDirectorsSignAuthorityRequest;
import com.ponsun.kyc.Master.DirectorsSignAuthority.request.UpdateDirectorsSignAuthorityRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_board_directors_sign_authority")
public class DirectorsSignAuthority extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "kycId")
    private Integer kycId;

    @Column(name = "name")
    private String name;

    @Column(name = "designation")
    private String designation;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;

    public static DirectorsSignAuthority create(final CreateDirectorsSignAuthorityRequest createDirectorsSignAuthorityRequest){
        final DirectorsSignAuthority directorsSignAuthority = new DirectorsSignAuthority();
        directorsSignAuthority.setKycId(createDirectorsSignAuthorityRequest.getKycId());
        directorsSignAuthority.setName(createDirectorsSignAuthorityRequest.getName());
        directorsSignAuthority.setDesignation(createDirectorsSignAuthorityRequest.getDesignation());
        directorsSignAuthority.setUid(createDirectorsSignAuthorityRequest.getUid());
        directorsSignAuthority.setEuid(createDirectorsSignAuthorityRequest.getEuid());
        directorsSignAuthority.onCreate();
        directorsSignAuthority.setStatus(Status.ACTIVE);
        return directorsSignAuthority;
    }

    public void update(final UpdateDirectorsSignAuthorityRequest request){
        this.setKycId(request.getKycId());
        this.setName(request.getName());
        this.setDesignation(request.getDesignation());
        this.setUid(request.getUid());
        this.setEuid(request.getEuid());
        this.onCreate();
        this.setStatus(Status.ACTIVE);
    }
}
