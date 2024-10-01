package com.ponsun.kyc.adminconfiguration.adminuserrights.domain;

import com.ponsun.kyc.adminconfiguration.adminuserrights.data.AdminUserRightsDTO;
import com.ponsun.kyc.adminconfiguration.adminuserrights.request.UpdateAdminUserRightsRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "admin_user_rights")
public class AdminUserRights extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "uid")
    private String uid;

    @Column(name = "mod_id")
    private Integer modId;

    @Column(name = "mod_det_id")
    private Integer modDetId;

    @Column(name = "ent_uid")
    private Integer entUid;


    @Column(name = "valid")
    private Boolean valid;

    @Column(name = "euid")
    private Integer euid;


    public static AdminUserRights Bulkcreate(final AdminUserRightsDTO createAdminUserRightsRequest) {
        final AdminUserRights adminUserRights = new AdminUserRights();

        adminUserRights.setUid(createAdminUserRightsRequest.getUid());
        adminUserRights.setModId(Integer.parseInt(createAdminUserRightsRequest.getModId()));
        adminUserRights.setModDetId(Integer.parseInt(createAdminUserRightsRequest.getModDetId()));
        adminUserRights.setEntUid(Integer.parseInt(createAdminUserRightsRequest.getEntUid()));
        adminUserRights.setValid(Boolean.parseBoolean(String.valueOf(createAdminUserRightsRequest.getValid())));
        adminUserRights.setStatus(Status.ACTIVE);
        adminUserRights.setCreatedAt(LocalDateTime.now());
        return adminUserRights;
    }


    public void update(final UpdateAdminUserRightsRequest updateAdminUserRightsRequest){
        this.setUid(updateAdminUserRightsRequest.getUid());
        this.setModId(updateAdminUserRightsRequest.getModId());
        this.setModDetId(updateAdminUserRightsRequest.getModDetId());
        this.setEntUid(updateAdminUserRightsRequest.getEntUid());
        //adminUserRights.setDt(createAdminUserRightsRequest.getDt());
        this.setValid(updateAdminUserRightsRequest.getValid());
        this.setEuid(updateAdminUserRightsRequest.getEuid());
        this.setStatus(Status.ACTIVE);
        this.setUpdatedAt(LocalDateTime.now());
    }
    public void deactive(final UpdateAdminUserRightsRequest updateAdminUserRightsRequest){
        this.setEuid(updateAdminUserRightsRequest.getEuid());
        this.onUpdate();
        this.setStatus(Status.DELETE);
    }
}
