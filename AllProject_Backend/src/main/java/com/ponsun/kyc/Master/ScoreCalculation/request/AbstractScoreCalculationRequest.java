package com.ponsun.kyc.Master.ScoreCalculation.request;

import lombok.Data;

@Data
public class AbstractScoreCalculationRequest {
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
}
