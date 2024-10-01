package com.ponsun.kyc.Master.NameSearchDetails.services;

import com.ponsun.kyc.Master.NameSearchDetails.domain.NameSearchDetails;

import java.util.List;
public interface NameSearchDetailsReadPlatformService {
    List<NameSearchDetails> fetchAllNameSearchDetails();
    NameSearchDetails fetchNameSearchById(Integer id);
}
