package com.ponsun.kyc.Master.ApplicationType.services;

import com.ponsun.kyc.Master.ApplicationType.request.CreateApplicationTypeRequest;
import com.ponsun.kyc.Master.ApplicationType.request.UpdateApplicationTypeRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

public interface ApplicationTypeWriteSerice {
    Response createApplicationFormList(CreateApplicationTypeRequest createApplicationFormRequest);
    Response updateApplicationFormList(Integer id, UpdateApplicationTypeRequest updateApplicationFormRequest);


}
