package com.ponsun.kyc.Master.ScoreDocument.domain;
import com.ponsun.kyc.Master.ScoreDocument.request.CreateScoreDocumentRequest;
import com.ponsun.kyc.Master.ScoreDocument.request.UpdateScoreDocumentRequest;
import com.ponsun.kyc.common.entity.Status;
import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_risk_score_document")
public class ScoreDocument extends BaseEntity {
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "riskScoreCalculationId ")
    private Integer riskScoreCalculationId;

    @Column(name = "pep ")
    private String pep;

    @Column(name = "negativeMedia")
    private String negativeMedia;

    @Column(name = "uid")
    private Integer uid;

    @Column(name = "euid")
    private Integer euid;

    public static ScoreDocument create(CreateScoreDocumentRequest request) {
        final ScoreDocument scoreDocument = new ScoreDocument();
        scoreDocument.setId(request.getId());
        scoreDocument.setRiskScoreCalculationId(request.getRiskScoreCalculationId());
        scoreDocument.setPep(request.getPep());
        scoreDocument.setNegativeMedia(request.getNegativeMedia());
        scoreDocument.setEuid(request.getEuid());
        scoreDocument.setUid(request.getUid());
        scoreDocument.onCreate();
        scoreDocument.setStatus(Status.ACTIVE);
        return scoreDocument;
    }

    public void update(final UpdateScoreDocumentRequest request) {
        this.setId(request.getId());
        this.setRiskScoreCalculationId(request.getRiskScoreCalculationId());
        this.setPep(request.getPep());
        this.setNegativeMedia(request.getNegativeMedia());
        this.setEuid(request.getEuid());
        this.setUid(request.getUid());
        this.onUpdate();
        this.setStatus(Status.ACTIVE);
    }
}
