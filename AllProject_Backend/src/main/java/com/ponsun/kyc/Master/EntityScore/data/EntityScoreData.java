package com.ponsun.kyc.Master.EntityScore.data;
import lombok.Data;

@Data
public class EntityScoreData {
    private Integer id;
    private String name;
    private Double score;

    public EntityScoreData(Integer id, String name, Double score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
    public static EntityScoreData newInstance(Integer id, String name, Double score){
        return new EntityScoreData(id,name,score);
    }

}
