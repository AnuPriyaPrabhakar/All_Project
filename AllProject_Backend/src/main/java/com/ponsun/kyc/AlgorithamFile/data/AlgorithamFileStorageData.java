package com.ponsun.kyc.AlgorithamFile.data;

import lombok.Data;

@Data
public class AlgorithamFileStorageData {

    private Integer id;
    private Integer kycId;
    private String documentType;
    private Integer pathId;
    private String dt;
    private String url;

    public AlgorithamFileStorageData(final Integer id, final Integer kycId, final String documentType, final Integer pathId, final String dt, final String url ) {
        this.id=id;
        this.kycId=kycId;
        this.documentType=documentType;
        this.pathId=pathId;
        this.dt=dt;
        this.url=url;
    }
    public static AlgorithamFileStorageData newInstance(final Integer id, final Integer kycId, final String documentType, final Integer pathId, final String dt, final String url ) {
        return new AlgorithamFileStorageData(id,kycId,documentType,pathId,dt,url);
    }
}

