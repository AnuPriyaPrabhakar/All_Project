package com.ponsun.kyc.listOfDocument.data;

import com.ponsun.kyc.listOfDocument.request.CreateListOfDocumentRequest;
import com.ponsun.kyc.listOfDocument.request.UpdateListOfDocumentRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ListOfDocumentDataValidator {
    public void validateSaveListOfDocument(final CreateListOfDocumentRequest request){
        if(request.getKycId() == null || request.getKycId().equals("")){
        }
        throw new RuntimeException("Error validateSaveListOfDocument");
    }
    public void validateUpdateListOfDocument(final UpdateListOfDocumentRequest request){
        if(request.getKycId() == null || request.getKycId().equals("")){
        }
        throw new RuntimeException("Error validateUpdateListOfDocument");
    }

}
