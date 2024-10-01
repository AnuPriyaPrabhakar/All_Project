package com.ponsun.kyc.Master.ScoreCalculation.domain;
import com.ponsun.kyc.Master.ScoreCalculation.request.CreateScoreCalculationRequest;
import com.ponsun.kyc.Master.ScoreCalculation.request.UpdateScoreCalculationRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_risk_score_calculation")
public class ScoreCalculation extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "kycId ")
    private Integer kycId;

    @Column(name = "pepScoreId ")
    private Integer pepScoreId;

    @Column(name = "negativeMediaId")
    private Integer negativeMediaId;

    @Column(name = "entityId")
    private Integer entityId;

    @Column(name = "pepScore")
    private Double pepScore;

    @Column(name = "negativeMediaScore")
    private Double negativeMediaScore;

    @Column(name = "entityScore")
    private Double entityScore;

    @Column(name = "questionnairsScore")
    private Double questionnairsScore;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;

    public static ScoreCalculation create(CreateScoreCalculationRequest request) {
        final ScoreCalculation scoreCalculation = new ScoreCalculation();
        //scoreCalculation.setId(request.getId());
        scoreCalculation.setKycId(request.getKycId());
        scoreCalculation.setPepScoreId(request.getPepScoreId());
        scoreCalculation.setNegativeMediaId(request.getNegativeMediaId());
        scoreCalculation.setEntityId(request.getEntityId());
        scoreCalculation.setPepScore(request.getPepScore());
        scoreCalculation.setNegativeMediaScore(request.getNegativeMediaScore());
        scoreCalculation.setEntityScore(request.getEntityScore());
        scoreCalculation.setQuestionnairsScore(request.getQuestionnairsScore());
        scoreCalculation.setEuid(request.getEuid());
        scoreCalculation.setUid(request.getUid());
        scoreCalculation.onCreate();
        scoreCalculation.setStatus(Status.ACTIVE);
        return scoreCalculation;
    }

    public void update(final UpdateScoreCalculationRequest request) {
        //this.setId(request.getId());
        this.setKycId(request.getKycId());
        this.setPepScoreId(request.getPepScoreId());
        this.setNegativeMediaId(request.getNegativeMediaId());
        this.setEntityId(request.getEntityId());
        this.setPepScore(request.getPepScore());
        this.setNegativeMediaScore(request.getNegativeMediaScore());
        this.setEntityScore(request.getEntityScore());
        this.setQuestionnairsScore(request.getQuestionnairsScore());
        this.setEuid(request.getEuid());
        this.setUid(request.getUid());
        this.onUpdate();
        this.setStatus(Status.ACTIVE);
    }
}