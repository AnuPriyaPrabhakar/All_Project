package com.ponsun.kyc.Master.ApplicantForm.KycData;

import lombok.Data;
@Data

public class KycAnswerData {
    private String answer;
    private double score;

    public KycAnswerData(String answer, double score) {
        this.answer = answer;
        this.score= score;
    }
    public static KycAnswerData newInstance(String answer, double score){
        return new KycAnswerData(answer,score);
    }
}
