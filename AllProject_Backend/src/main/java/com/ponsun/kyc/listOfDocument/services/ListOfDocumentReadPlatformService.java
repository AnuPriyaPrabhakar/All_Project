package com.ponsun.kyc.listOfDocument.services;


import com.ponsun.kyc.listOfDocument.domain.ListOfDocument;

import java.util.List;
public interface ListOfDocumentReadPlatformService {
    List<ListOfDocument> fetchAllListOfDocument();
    ListOfDocument fetchListOfDocumentById(Integer id);

}
