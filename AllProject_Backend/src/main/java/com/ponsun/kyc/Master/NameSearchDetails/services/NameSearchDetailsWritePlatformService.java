package com.ponsun.kyc.Master.NameSearchDetails.services;

import com.ponsun.kyc.Master.NameSearchDetails.request.CreateNameSearchDetailsRequest;
import com.ponsun.kyc.Master.NameSearchDetails.request.UpdateNameSearchDetailsRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

public interface NameSearchDetailsWritePlatformService {
    Response createNameSearchDetails(CreateNameSearchDetailsRequest createNameSearchDetailsRequest);
    Response updateNameSearchDetails(Integer id, UpdateNameSearchDetailsRequest updateNameSearchDetailsRequest);
}
