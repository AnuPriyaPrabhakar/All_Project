package com.ponsun.kyc.Master.AnswerFieldType.domain;


import com.ponsun.kyc.Master.AnswerFieldType.request.CreateAnswerFieldTypeRequest;
import com.ponsun.kyc.Master.AnswerFieldType.request.UpdateAnswerFieldTypeRequest;
import com.ponsun.kyc.Master.AnswerType.domain.AnswerType;
import com.ponsun.kyc.Master.AnswerType.request.CreateAnswerTypeRequest;
import com.ponsun.kyc.Master.AnswerType.request.UpdateAnswerTypeRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_config_answer_field_type")
public class AnswerFieldType extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;

    public static AnswerFieldType create(final CreateAnswerFieldTypeRequest request) {
        final AnswerFieldType answerFieldType = new AnswerFieldType();
        answerFieldType.setName(request.getName());
        answerFieldType.setEuid(request.getEuid());
        answerFieldType.setUid(request.getUid());
        answerFieldType.onCreate();
        answerFieldType.setStatus(Status.ACTIVE);
        return answerFieldType;
    }

    public void update(final UpdateAnswerFieldTypeRequest request) {
        this.setName(request.getName());
        this.setEuid(request.getEuid());
        this.setUid(request.getUid());
        this.onUpdate();
        this.setStatus(Status.ACTIVE);
    }
}

