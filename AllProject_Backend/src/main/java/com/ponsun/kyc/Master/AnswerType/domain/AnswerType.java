package com.ponsun.kyc.Master.AnswerType.domain;

import com.ponsun.kyc.Master.AnswerType.request.CreateAnswerTypeRequest;
import com.ponsun.kyc.Master.AnswerType.request.UpdateAnswerTypeRequest;
import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionType;
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
@Table(name = "kyc_config_answer")
public class AnswerType extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "questionId")
    private Integer questionId;

    @Column(name = "subQuestionId")
    private Integer subQuestionId;

    @Column(name = "subAnswer")
    private Integer subAnswer;

    @Column(name = "name")
    private String name;

    @Column(name = "score")
    private Double score;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;

    public static AnswerType create(final CreateAnswerTypeRequest request) {
        final AnswerType answerType = new AnswerType();
        answerType.setId(request.getId());
        answerType.setQuestionId(request.getQuestionId());
        answerType.setSubQuestionId(request.getSubQuestionId());
        answerType.setSubAnswer(request.getSubAnswer());
        answerType.setName(request.getName());
        answerType.setName(request.getName());
        answerType.setEuid(request.getEuid());
        answerType.setUid(request.getUid());
        answerType.onCreate();
        answerType.setStatus(Status.ACTIVE);
        return answerType;
    }

    public void update(final UpdateAnswerTypeRequest request) {
        this.setId(request.getId());
        this.setQuestionId(request.getQuestionId());
        this.setSubQuestionId(request.getQuestionId());
        this.setSubAnswer(request.getSubAnswer());
        this.setName(request.getName());
        this.setScore(request.getScore());
        this.setEuid(request.getEuid());
        this.setUid(request.getUid());
        this.onUpdate();
        this.setStatus(Status.ACTIVE);
    }
}
