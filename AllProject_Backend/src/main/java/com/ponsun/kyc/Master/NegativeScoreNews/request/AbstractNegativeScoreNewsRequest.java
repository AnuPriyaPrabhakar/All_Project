package com.ponsun.kyc.Master.NegativeScoreNews.request;

import lombok.Data;

@Data
public class AbstractNegativeScoreNewsRequest {
    private Integer id;
    private String name;
    private Double score;

}
