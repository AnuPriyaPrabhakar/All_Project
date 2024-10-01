package com.ponsun.kyc.Master.ApplicationType.domain;

import com.ponsun.kyc.Master.ApplicationType.request.CreateApplicationTypeRequest;
import com.ponsun.kyc.Master.ApplicationType.request.UpdateApplicationTypeRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_config_application_type")
public class ApplicationType extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "euid")
    private Integer euid;

    @Column(name = "uid")
    private Integer uid;

    public static ApplicationType create(CreateApplicationTypeRequest request) {
        final ApplicationType applicationType = new ApplicationType();
        applicationType.setId(request.getId());
        applicationType.setName(request.getName());
        applicationType.setEuid(request.getEuid());
        applicationType.setUid(request.getUid());
        applicationType.onCreate();
        applicationType.setStatus(Status.ACTIVE);
        return applicationType;
    }

    public void update(final UpdateApplicationTypeRequest request) {
        this.setId(request.getId());
        this.setName(request.getName());
        this.setEuid(request.getEuid());
        this.setUid(request.getUid());
        this.onUpdate();
        this.setStatus(Status.ACTIVE);
    }

}
