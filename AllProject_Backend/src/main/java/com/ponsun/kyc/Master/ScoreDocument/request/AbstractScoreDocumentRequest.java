package com.ponsun.kyc.Master.ScoreDocument.request;

import lombok.Data;

@Data
public class AbstractScoreDocumentRequest {
    private Integer id;
    private Integer riskScoreCalculationId;
    private String pep;
    private String negativeMedia;
    private Integer uid;
    private Integer euid;
}
