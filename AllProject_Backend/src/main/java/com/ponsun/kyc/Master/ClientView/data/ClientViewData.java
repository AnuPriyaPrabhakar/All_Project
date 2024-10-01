package com.ponsun.kyc.Master.ClientView.data;
import lombok.Data;

@Data
public class ClientViewData {
    private Integer kycId;
    private String name;
    private String date;

    public ClientViewData(Integer kycId, String name, String date) {
        this.kycId = kycId;
        this.name = name;
        this.date = date;
    }
    public static ClientViewData newInstance(Integer kycId, String name, String date){
        return new ClientViewData(kycId,name,date);
    }
}
