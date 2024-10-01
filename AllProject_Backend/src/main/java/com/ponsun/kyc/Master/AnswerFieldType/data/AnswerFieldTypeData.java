package com.ponsun.kyc.Master.AnswerFieldType.data;
import lombok.Data;

@Data
public class AnswerFieldTypeData {
    private Integer id;
    private String name;
    private Integer uid;
    private Integer euid;

    public AnswerFieldTypeData(Integer id, String name, Integer uid, Integer euid) {
        this.id = id;
        this.name = name;
        this.uid = uid;
        this.euid = euid;
    }
    public static AnswerFieldTypeData newInstance (Integer id, String name, Integer uid, Integer euid){
        return new AnswerFieldTypeData(id,name,uid,euid);
    }
}
