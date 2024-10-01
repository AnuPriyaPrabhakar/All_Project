package com.ponsun.kyc.listOfDocument.request;

import lombok.Data;

@Data
public class AbstractListOfDocumentRequest {
    private Integer id;
    private Integer kycId;
    private Integer pep;
    private Integer ispepcheck;
    private Integer san;
    private Integer issancheck;
    private Integer crm;
    private Integer iscrmcheck;
    private Integer adverse_media;
    private Integer isadverse_check;
    private Integer uid;
    private Integer euid;
}

