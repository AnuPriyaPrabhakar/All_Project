package com.ponsun.kyc.Master.AccountType.domain;

import com.ponsun.kyc.Master.AccountType.request.CreateAccountTypeRequest;
import com.ponsun.kyc.Master.AccountType.request.UpdateAccountTypeRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_config_account_type")
public class AccountType extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "applicationTypeId")
    private Integer applicationTypeId;

    @Column(name = "name")
    private String name;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;

    public static AccountType create(final CreateAccountTypeRequest request){
        final AccountType accountType = new AccountType();
        accountType.setId(request.getId());
        accountType.setApplicationTypeId(request.getApplicationTypeId());
        accountType.setName(request.getName());
        accountType.setEuid(request.getEuid());
        accountType.setUid(request.getUid());
        accountType.onCreate();
        accountType.setStatus(Status.ACTIVE);
        return accountType;
    }
    public void update(final UpdateAccountTypeRequest request) {
        this.setId(request.getId());
        this.setApplicationTypeId(request.getApplicationTypeId());
        this.setName(request.getName());
        this.setEuid(request.getEuid());
        this.setUid(request.getUid());
        this.onUpdate();
        this.setStatus(Status.ACTIVE);
    }
}
