package com.ponsun.kyc.letterHeadUpload.data;

import lombok.Data;

@Data
public class LetterHeadUploadData {
    private Integer id;
    private Integer branchId;
    private Integer pathId;
    private String documentType;
    private String url;
    private String imageName;
    private Integer uid;
    private Integer euid;

    public LetterHeadUploadData (final Integer id,final Integer branchId,final Integer pathId,final String documentType ,final String url,final String imageName,   final Integer uid, final Integer euid){
        this.id = id;
        this.branchId = branchId;
        this.pathId = pathId;
        this.documentType = documentType;
        this.url = url;
        this.imageName = imageName;
        this.uid = uid;
        this.euid = euid;
    }
    public static LetterHeadUploadData newInstance (final Integer id,final Integer branchId,final Integer pathId,final String documentType ,final String url, final String imageName ,  final Integer uid, final Integer euid){
        return new LetterHeadUploadData(id,branchId,pathId,documentType,url,imageName,uid,euid);
    }
}
