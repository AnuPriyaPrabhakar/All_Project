package com.ponsun.kyc.listOfDocument.services;

import com.ponsun.kyc.infrastructure.utils.Response;
import com.ponsun.kyc.listOfDocument.request.CreateListOfDocumentRequest;
import com.ponsun.kyc.listOfDocument.request.UpdateListOfDocumentRequest;

public interface ListOfDocumentWritePlatformService {
    Response createListOfDocument(CreateListOfDocumentRequest createListOfDocumentRequest);

    Response updateListOfDocument(Integer id, UpdateListOfDocumentRequest updateListOfDocumentRequest);



}
