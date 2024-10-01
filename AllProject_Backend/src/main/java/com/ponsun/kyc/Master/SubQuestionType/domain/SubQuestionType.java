package com.ponsun.kyc.Master.SubQuestionType.domain;
import com.ponsun.kyc.Master.SubQuestionType.request.CreateSubQuestionTypeRequest;
import com.ponsun.kyc.Master.SubQuestionType.request.UpdateSubQuestionTypeRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_config_sub_question_type")
public class SubQuestionType extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "applicationTypeId")
    private Integer applicationTypeId;

    @Column(name = "accountTypeId")
    private Integer accountTypeId;

    @Column(name = "questionId")
    private Integer questionId;

    @Column(name = "name")
    private String name;

    @Column(name = "nameField")
    private Integer nameField;

    @Column(name = "ansTypeId")
    private Integer ansTypeId;

    @Column(name = "orderNo")
    private Integer orderNo;

//    @Column(name = "subQuestionId")
//    private Integer subQuestionId;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;


    public static SubQuestionType create(final CreateSubQuestionTypeRequest request) {
        final SubQuestionType subQuestionType = new SubQuestionType();
        subQuestionType.setId(request.getId());
        subQuestionType.setApplicationTypeId(request.getApplicationTypeId());
        subQuestionType.setAccountTypeId(request.getAccountTypeId());
        subQuestionType.setQuestionId(request.getQuestionId());
        subQuestionType.setName(request.getName());
        subQuestionType.setNameField(request.getNameField());
        subQuestionType.setAnsTypeId(request.getAnsTypeId());
        subQuestionType.setOrderNo(request.getOrderNo());
        //subQuestionType.setSubQuestionId(request.getSubQuestionId());
        subQuestionType.setEuid(request.getEuid());
        subQuestionType.setUid(request.getUid());
        subQuestionType.onCreate();
        subQuestionType.setStatus(Status.ACTIVE);
        return subQuestionType;
    }

    public void update(final UpdateSubQuestionTypeRequest request) {
        this.setId(request.getId());
        this.setApplicationTypeId(request.getApplicationTypeId());
        this.setAccountTypeId(request.getAccountTypeId());
        this.setQuestionId(request.getQuestionId());
        this.setName(request.getName());
        this.setNameField(request.getNameField());
        this.setAnsTypeId(request.getAnsTypeId());
        this.setOrderNo(request.getOrderNo());
        //this.setSubQuestionId(request.getSubQuestionId());
        this.setEuid(request.getEuid());
        this.setUid(request.getUid());
        this.onUpdate();
        this.setStatus(Status.ACTIVE);
    }
}
