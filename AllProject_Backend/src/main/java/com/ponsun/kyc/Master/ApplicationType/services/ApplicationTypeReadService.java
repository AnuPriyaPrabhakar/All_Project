package com.ponsun.kyc.Master.ApplicationType.services;

import com.ponsun.kyc.Master.ApplicationType.domain.ApplicationType;

import java.util.List;

public interface ApplicationTypeReadService {
    ApplicationType fetchApplicationFormById(Integer id);
    List<ApplicationType> fetchAllApplicationForm();
}
