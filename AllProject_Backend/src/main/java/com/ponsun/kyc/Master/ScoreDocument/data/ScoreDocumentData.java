package com.ponsun.kyc.Master.ScoreDocument.data;

import lombok.Data;

@Data
public class ScoreDocumentData {
    private Integer id;
    private Integer riskScoreCalculationId;
    private String pep;
    private String negativeMedia;
    private Integer uid;
    private Integer euid;

    public ScoreDocumentData(Integer id, Integer riskScoreCalculationId, String pep, String negativeMedia, Integer uid, Integer euid) {
        this.id = id;
        this.riskScoreCalculationId = riskScoreCalculationId;
        this.pep = pep;
        this.negativeMedia = negativeMedia;
        this.uid = uid;
        this.euid = euid;
    }
    public static ScoreDocumentData newInstance(Integer id, Integer riskScoreCalculationId, String pep, String negativeMedia, Integer uid, Integer euid){
        return new ScoreDocumentData(id,riskScoreCalculationId,pep,negativeMedia,uid,euid);
    }
}
