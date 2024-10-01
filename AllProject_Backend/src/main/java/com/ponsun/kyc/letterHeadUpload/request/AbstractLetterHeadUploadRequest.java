package com.ponsun.kyc.letterHeadUpload.request;

import lombok.Data;

@Data
public class AbstractLetterHeadUploadRequest {
    private Integer id;
    private Integer branchId;
    private Integer pathId;
    private String documentType;
    private String url;
    private String imageName;
    private Integer uid;
    private Integer euid;

}
