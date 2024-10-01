package com.ponsun.kyc.Master.ApplicantFormDetails.domain;

import com.ponsun.kyc.Master.ApplicantFormDetails.request.CreateApplicantFormDetailsRequest;
import com.ponsun.kyc.Master.ApplicantFormDetails.request.UpdateApplicantFormDetailsRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_applicant_form_details")
public class ApplicantFormDetails extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "kycId ")
    private Integer kycId;

    @Column(name = "accountTypeId ")
    private Integer accountTypeId;

    @Column(name = "applicationTypeId")
    private Integer applicationTypeId;

    @Column(name = "questionId")
    private Integer questionId;

    @Column(name = "subQuestionId")
    private Integer subQuestionId;

    @Column(name = "ansTypeId")
    private Integer ansTypeId;

    @Column(name = "ansId")
    private Integer ansId;

    @Column(name = "isSubAnswer")
    private Integer isSubAnswer;

    @Column(name = "answer")
    private String answer;

    @Column(name = "score")
    private Double score;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;

    @Column(name = "isScreening")
    private Integer isScreening;

    public static ApplicantFormDetails create(CreateApplicantFormDetailsRequest request) {
        final ApplicantFormDetails applicantFormDetails = new ApplicantFormDetails();
        applicantFormDetails.setKycId(request.getKycId());
        applicantFormDetails.setAccountTypeId(request.getAccountTypeId());
        applicantFormDetails.setApplicationTypeId(request.getApplicationTypeId());
        applicantFormDetails.setQuestionId(request.getQuestionId());
        applicantFormDetails.setSubQuestionId(request.getSubQuestionId());
        applicantFormDetails.setAnsTypeId(request.getAnsTypeId());
        applicantFormDetails.setAnsId(request.getAnsId());
        applicantFormDetails.setIsSubAnswer(request.getIsSubAnswer());
        applicantFormDetails.setAnswer(request.getAnswer());
        applicantFormDetails.setScore(request.getScore());
        applicantFormDetails.setEuid(request.getEuid());
        applicantFormDetails.setIsScreening(request.getIsScreening());
        applicantFormDetails.setUid(request.getUid());
        applicantFormDetails.onCreate();
        applicantFormDetails.setStatus(Status.ACTIVE);
        return applicantFormDetails;
    }

    public ApplicantFormDetails update(final UpdateApplicantFormDetailsRequest request) {
        this.setId(request.getId());
        this.setKycId(request.getKycId());
        this.setAccountTypeId(request.getAccountTypeId());
        this.setApplicationTypeId(request.getApplicationTypeId());
        this.setQuestionId(request.getQuestionId());
        this.setSubQuestionId(request.getSubQuestionId());
        this.setAnsTypeId(request.getAnsTypeId());
        this.setAnsId(request.getAnsId());
        this.setIsSubAnswer(request.getIsSubAnswer());
        this.setAnswer(request.getAnswer());
        this.setScore(request.getScore());
        this.setEuid(request.getEuid());
        this.setUid(request.getUid());
        this.setIsScreening(request.getIsScreening());
        this.onUpdate();
        this.setStatus(Status.ACTIVE);
        return null;
    }
}