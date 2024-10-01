package com.ponsun.kyc.Master.NegativeScoreNews.data;
import lombok.Data;

@Data
public class NegativeScoreNewsData {
    private Integer id;
    private String name;
    private Double score;

    public NegativeScoreNewsData(Integer id, String name, Double score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
    public static NegativeScoreNewsData newInstance(Integer id, String name, Double score){
        return new NegativeScoreNewsData(id,name,score);
    }

}
