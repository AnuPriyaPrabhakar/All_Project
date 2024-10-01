package com.ponsun.kyc.Master.QuestionType.domain;

import com.ponsun.kyc.Master.QuestionType.request.CreateQuestionTypeRequest;
import com.ponsun.kyc.Master.QuestionType.request.UpdateQuestionTypeRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_config_question_type")
public class QuestionType extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "accountTypeId")
    private Integer accountTypeId;

    @Column(name = "applicationTypeId")
    private Integer applicationTypeId;

    @Column(name = "ansTypeId")
    private Integer ansTypeId;

    @Column(name = "name")
    private String name;

    @Column(name = "nameField")
    private Integer nameField;

    @Column(name = "orderNo")
    private Integer orderNo;

    @Column(name = "multiQuestion")
    private Integer multiQuestion;

    @Column(name = "description")
    private String description;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;

    public static QuestionType create(final CreateQuestionTypeRequest request) {
        final QuestionType questionType = new QuestionType();
        questionType.setId(request.getId());
        questionType.setAccountTypeId(request.getAccountTypeId());
        questionType.setApplicationTypeId(request.getApplicationTypeId());
        questionType.setAnsTypeId(request.getAnsTypeId());
        questionType.setName(request.getName());
        questionType.setNameField(request.getNameField());
        questionType.setOrderNo(request.getOrderNo());
        questionType.setMultiQuestion(request.getMultiQuestion());
        questionType.setDescription(request.getDescription());
        questionType.setEuid(request.getEuid());
        questionType.setUid(request.getUid());
        questionType.onCreate();
        questionType.setStatus(Status.ACTIVE);
        return questionType;
    }

    public void update(final UpdateQuestionTypeRequest request) {
        this.setAccountTypeId(request.getAccountTypeId());
        this.setApplicationTypeId(request.getApplicationTypeId());
        this.setAnsTypeId(request.getAnsTypeId());
        this.setName(request.getName());
        this.setNameField(request.getNameField());
        this.setOrderNo(request.getOrderNo());
        this.setMultiQuestion(request.getMultiQuestion());
        this.setDescription(request.getDescription());
        this.setEuid(request.getEuid());
        this.setUid(request.getUid());
        this.onUpdate();
        this.setStatus(Status.ACTIVE);
    }
}