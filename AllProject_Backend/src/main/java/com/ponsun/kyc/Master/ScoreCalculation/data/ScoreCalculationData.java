package com.ponsun.kyc.Master.ScoreCalculation.data;

import lombok.Data;

@Data
public class ScoreCalculationData {
    private Integer id;
    private Integer kycId;
    private Integer pepScoreId;
    private Integer negativeMediaId;
    private Integer entityId;
    private Double pepScore;
    private Double negativeMediaScore;
    private Double entityScore;
    private Double questionnairsScore;
    private Integer uid;
    private Integer euid;

    public ScoreCalculationData(Integer id, Integer kycId, Integer pepScoreId, Integer negativeMediaId, Integer entityId, Double pepScore, Double negativeMediaScore, Double entityScore, Double questionnairsScore, Integer uid, Integer euid) {
        this.id = id;
        this.kycId = kycId;
        this.pepScoreId = pepScoreId;
        this.negativeMediaId = negativeMediaId;
        this.entityId = entityId;
        this.pepScore = pepScore;
        this.negativeMediaScore = negativeMediaScore;
        this.entityScore = entityScore;
        this.questionnairsScore = questionnairsScore;
        this.uid = uid;
        this.euid = euid;
    }
    public static ScoreCalculationData newInstance(Integer id, Integer kycId, Integer pepScoreId, Integer negativeMediaId, Integer entityId, Double pepScore, Double negativeMediaScore, Double entityScore, Double questionnairsScore, Integer uid, Integer euid){
        return new ScoreCalculationData(id,kycId,pepScoreId,negativeMediaId,entityId,pepScore,negativeMediaScore,entityScore,questionnairsScore,uid,euid);
    }
}
