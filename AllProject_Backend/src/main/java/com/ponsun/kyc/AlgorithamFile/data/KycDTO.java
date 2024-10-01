package com.ponsun.kyc.AlgorithamFile.data;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class KycDTO {
    private Integer[] kycId;
    private Integer kycDocId;
    private Integer SanDocId;
    private Integer crmCocId;
    private Integer AdverseMediaDocId;
    private Integer Iskyc;
    private Integer IsSan;
    private Integer IsCrm;
    private Integer IsAdverse;
    private Integer pathId;

    public KycDTO(Integer[] kycId,Integer kycDocId, Integer SanDocId, Integer crmCocId, Integer AdverseMediaDocId, Integer Iskyc, Integer IsSan, Integer IsCrm, Integer IsAdverse, Integer pathId) {
        this.kycId = kycId;
        this.kycDocId = kycDocId;
        this.SanDocId = SanDocId;
        this.crmCocId = crmCocId;
        this.AdverseMediaDocId = AdverseMediaDocId;
        this.Iskyc = Iskyc;
        this.IsSan  = IsSan;
        this.IsCrm = IsCrm;
        this.IsAdverse = IsAdverse;
        this.pathId = pathId;
    }
    public static KycDTO newInstance (Integer[] kycId,Integer kycDocId, Integer SanDocId, Integer crmCocId, Integer AdverseMediaDocId, Integer Iskyc, Integer IsSan, Integer IsCrm, Integer IsAdverse, Integer pathId) {
        return new KycDTO(kycId, kycDocId, SanDocId, crmCocId, AdverseMediaDocId, Iskyc, IsSan, IsCrm, IsAdverse, pathId);
    }
}
