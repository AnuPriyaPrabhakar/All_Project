package com.ponsun.kyc.FilesStorage.request;

import lombok.Data;

@Data
public class AbstractFileStorageRequest {

    private Integer id;
    private Integer kycId;
    private Integer documentTypeId;
    private String documentType;
    private String dt;
    private String url;
}
