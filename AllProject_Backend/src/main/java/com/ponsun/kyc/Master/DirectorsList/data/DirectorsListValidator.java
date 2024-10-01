package com.ponsun.kyc.Master.DirectorsList.data;


import com.ponsun.kyc.Master.DirectorsList.request.CreateDirectorsListRequest;
import com.ponsun.kyc.infrastructure.exceptions.EQAS_KYC_ApplicationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class DirectorsListValidator {
    public void validateSaveDirectorsListData(final CreateDirectorsListRequest request) {
        if (request.getFirstName() == null || request.getFirstName().equals("") && (request.getKycId() == null || request.getKycId().equals(""))) {
            throw new EQAS_KYC_ApplicationException("FirstName and KycId parameter required");
        }
    }
//    public void validateSaveKycId(final CreateDirectorsListRequest request) {
//        if (request.getKycId() == null || request.getKycId().equals("")) {
//            throw new EQAS_KYC_ApplicationException("KycId parameter required");
//        }
//    }
}
