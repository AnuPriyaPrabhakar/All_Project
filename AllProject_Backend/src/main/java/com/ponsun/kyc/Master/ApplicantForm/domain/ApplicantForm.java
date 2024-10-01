package com.ponsun.kyc.Master.ApplicantForm.domain;

import com.ponsun.kyc.Master.ApplicantForm.request.CreateApplicantFormRequest;
import com.ponsun.kyc.Master.ApplicantForm.request.UpdateApplicantFormRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_applicant_form")
public class ApplicantForm extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "numberOfPrint")
    private Integer numberOfPrint;

    @Column(name = "isCompleted")
    private Integer isCompleted;

    @Column(name = "euid")
    private Integer euid;

    @Column(name = "uid")
    private Integer uid;

    public static ApplicantForm create(CreateApplicantFormRequest request) {
        final ApplicantForm applicantForm = new ApplicantForm();
        applicantForm.setName(request.getName());
        applicantForm.setNumberOfPrint(request.getNumberOfPrint());
        applicantForm.setIsCompleted(request.getIsCompleted());
        applicantForm.setEuid(request.getEuid());
        applicantForm.setUid(request.getUid());
        applicantForm.onCreate();
        applicantForm.setStatus(Status.ACTIVE);
        return applicantForm;
    }

    public ApplicantForm update(final UpdateApplicantFormRequest request) {
        this.setId(request.getId());
        this.setName(request.getName());
        this.setNumberOfPrint(request.getNumberOfPrint());
        this.setIsCompleted(request.getIsCompleted());
        this.setEuid(request.getEuid());
        this.setUid(request.getUid());
        this.onUpdate();
        this.setStatus(Status.ACTIVE);
        return null;
    }
}
