package com.ponsun.kyc.Master.ApplicantFormDetails.data;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ApplicantFormDetailsData {
    private Integer id;
    private Integer kycId;
    private Integer accountTypeId;
    private Integer applicationTypeId;
    private Integer questionId;
    private Integer subQuestionId;
    private Integer ansTypeId;
    private Integer ansId;
    private Integer isSubAnswer;
    private String answer;
    private Double score;
    private Integer uid;
    private Integer euid;
    private Integer isScreening;


    public ApplicantFormDetailsData(Integer id, Integer kycId, Integer accountTypeId, Integer applicationTypeId, Integer questionId,Integer subQuestionId, Integer ansTypeId,Integer ansId,Integer isSubAnswer, String answer,Double score, Integer uid, Integer euid , Integer isScreening) {
        this.id = id;
        this.kycId = kycId;
        this.accountTypeId = accountTypeId;
        this.applicationTypeId = applicationTypeId;
        this.questionId = questionId;
        this.subQuestionId=subQuestionId;
        this.ansTypeId = ansTypeId;
        this.ansId=ansId;
        this.isSubAnswer= isSubAnswer;
        this.answer = answer;
        this.score=score;
        this.uid = uid;
        this.euid = euid;
        this.isScreening = isScreening;

    }
    public static ApplicantFormDetailsData newInstance(Integer id, Integer kycId, Integer accountTypeId, Integer applicationTypeId, Integer questionId,Integer subQuestionId, Integer ansTypeId,Integer ansId,Integer isSubAnswer, String answer,Double score, Integer uid, Integer euid , Integer isScreening){
        return new ApplicantFormDetailsData(id,kycId,accountTypeId,applicationTypeId,questionId,subQuestionId,ansTypeId,ansId,isSubAnswer,answer,score,uid,euid,isScreening);
    }
}
