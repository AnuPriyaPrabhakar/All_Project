package com.ponsun.kyc.listOfDocument.data;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ListOfDocumentData {
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


    public ListOfDocumentData(final Integer id, final Integer kycId,final Integer pep,final Integer ispepcheck,final Integer san,final Integer issancheck,final Integer crm, final Integer iscrmcheck, final Integer adverse_media,final Integer isadverse_check, final Integer uid, final Integer euid){
        this.id = id;
        this.kycId = kycId;
        this.pep=pep;
        this.ispepcheck=ispepcheck;
        this.san=san;
        this.issancheck=issancheck;
        this.crm = crm;
        this.iscrmcheck = iscrmcheck;
        this.adverse_media = adverse_media;
        this.isadverse_check = isadverse_check;
        this.uid = uid;
        this.euid = euid;
    }
    public static ListOfDocumentData newInstance(final Integer id, final Integer kycId,final Integer pep,final Integer ispepcheck,final Integer san,final Integer issancheck,final Integer crm, final Integer iscrmcheck, final Integer adverse_media,final Integer isadverse_check, final Integer uid, final Integer euid){
        return new ListOfDocumentData(id,kycId,pep,ispepcheck,san,issancheck,crm,iscrmcheck,adverse_media,isadverse_check,uid,euid);
    }

}
