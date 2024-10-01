package com.ponsun.kyc.Master.NameSearch.data;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class NameSearchData {
    private Integer screeningType;
    private Integer kycId;
    private String question;
    private String answer;
    private Integer applicantFormId;

    public NameSearchData (Integer screeningType,Integer kycId,String question, String answer ,  Integer applicantFormId) {
        this.kycId = kycId;
        this.screeningType = screeningType;
        this.question = question;
        this.answer = answer;
        this.applicantFormId = applicantFormId;
    }
    public static NameSearchData newInstance (Integer screeningType,Integer kycId,String question, String answer ,  Integer applicantFormId) {
        return new NameSearchData(screeningType , kycId , question,answer ,applicantFormId );
    }
}
