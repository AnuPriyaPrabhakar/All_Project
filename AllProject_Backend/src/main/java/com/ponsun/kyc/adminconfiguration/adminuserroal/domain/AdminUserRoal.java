package com.ponsun.kyc.adminconfiguration.adminuserroal.domain;

import com.ponsun.kyc.adminconfiguration.adminuserroal.request.CreateAdminUserRoalRequest;
import com.ponsun.kyc.adminconfiguration.adminuserroal.request.UpdateAdminUserRoalRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;


@Data
@Entity
@Table(name = "admin_user_roal")
public class AdminUserRoal extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "userType")
    private String userType;

    @Column(name = "valid")
    private Boolean valid;


    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;


    public static AdminUserRoal create (final CreateAdminUserRoalRequest createAdminUserRoalRequest) {
        final AdminUserRoal adminUserRoal = new AdminUserRoal();
            adminUserRoal.setUserType(createAdminUserRoalRequest.getUserType());
            adminUserRoal.setValid(createAdminUserRoalRequest.getValid());
            adminUserRoal.setUid(createAdminUserRoalRequest.getUid());
            adminUserRoal.setStatus(Status.ACTIVE);
            adminUserRoal.setCreatedAt(LocalDateTime.now());
            return adminUserRoal;
    }
    public void update(final UpdateAdminUserRoalRequest updateAdminUserRoalRequest){
       this.setUserType(updateAdminUserRoalRequest.getUserType());
       this.setValid(updateAdminUserRoalRequest.getValid());
       this.setEuid(updateAdminUserRoalRequest.getEuid());
       this.setStatus(Status.ACTIVE);
       this.setUpdatedAt(LocalDateTime.now());
}

//public void deactive(final Integer euid){
//        this.setEuid(euid);
//        this.setStatus(Status.DELETE);
//        this.onUpdate();
//}
}

