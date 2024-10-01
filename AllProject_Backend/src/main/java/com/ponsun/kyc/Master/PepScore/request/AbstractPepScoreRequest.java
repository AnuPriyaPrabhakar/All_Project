package com.ponsun.kyc.Master.PepScore.request;

import lombok.Data;

@Data
public class AbstractPepScoreRequest {
    private Integer id;
    private String name;
    private Double score;
}
