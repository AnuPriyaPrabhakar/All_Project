package com.ponsun.kyc.AlgorithamFile.request;

import lombok.Data;

@Data
public class AbstractAlgorithamFileStorageRequest {

    private Integer id;
    private Integer kycId;
    private String documentType;
    private Integer pathId;
    private String dt;
    private String url;
}
