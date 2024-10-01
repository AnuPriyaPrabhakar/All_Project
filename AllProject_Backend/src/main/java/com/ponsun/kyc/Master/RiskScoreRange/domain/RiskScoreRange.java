package com.ponsun.kyc.Master.RiskScoreRange.domain;

import com.ponsun.kyc.infrastructure.baseentity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Entity
@Accessors(chain = true)
@Table(name = "kyc_config_risk_score_range")
public class RiskScoreRange extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id",nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "risk_classification")
    private String risk_classification;

    @Column(name = "rangeFrm")
    private Double rangeFrm;

    @Column(name = "rangeTo")
    private Double rangeTo;
}
