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
@Table(name = "kyc_applicant_form_log")
public class ApplicantFormLog extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name="kycId")
//    private ApplicantForm applicantForm;

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

    public static ApplicantFormLog create(CreateApplicantFormRequest request, ApplicantForm applicantForm) {
        final ApplicantFormLog applicantFormLog = new ApplicantFormLog();
//        applicantFormLog.setApplicantForm(applicantForm);
        applicantFormLog.setName(request.getName());
        applicantFormLog.setNumberOfPrint(request.getNumberOfPrint());
        applicantFormLog.setIsCompleted(request.getIsCompleted());
        applicantFormLog.setEuid(request.getEuid());
        applicantFormLog.setUid(request.getUid());
        applicantFormLog.onCreate();
        applicantFormLog.setStatus(Status.ACTIVE);
        return applicantFormLog;
    }

    public ApplicantFormLog update(final UpdateApplicantFormRequest request) {
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
