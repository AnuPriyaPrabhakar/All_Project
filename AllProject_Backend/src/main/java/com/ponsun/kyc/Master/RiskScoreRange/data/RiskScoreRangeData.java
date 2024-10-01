package com.ponsun.kyc.Master.RiskScoreRange.data;

import lombok.Data;

@Data
public class RiskScoreRangeData {
    private String risk_classification;
    private Double rangeFrm;
    private Double rangeTo;

    public RiskScoreRangeData(String risk_classification, Double rangeFrm, Double rangeTo) {
        this.risk_classification = risk_classification;
        this.rangeFrm = rangeFrm;
        this.rangeTo = rangeTo;
    }
    public static RiskScoreRangeData newInstance(String risk_classification, Double rangeFrm, Double rangeTo){
        return new RiskScoreRangeData(risk_classification,rangeFrm,rangeTo);
    }
}
