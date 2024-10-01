package com.ponsun.kyc.Master.PepScore.data;
import lombok.Data;

@Data
public class PepScoreData {
    private Integer id;
    private String name;
    private Double score;

    public PepScoreData(Integer id, String name, Double score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
    public static PepScoreData newInstance(Integer id, String name, Double score){
        return new PepScoreData(id,name,score);
    }

}
