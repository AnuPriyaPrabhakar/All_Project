package com.ponsun.kyc.Master.EntityScore.request;

import lombok.Data;

@Data
public class AbstractEntityScoreRequest {
    private Integer id;
    private String name;
    private Double score;
}
