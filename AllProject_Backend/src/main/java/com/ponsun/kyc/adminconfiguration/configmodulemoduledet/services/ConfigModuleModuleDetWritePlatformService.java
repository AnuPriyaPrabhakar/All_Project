package com.ponsun.kyc.adminconfiguration.configmodulemoduledet.services;


import com.ponsun.kyc.adminconfiguration.configmodulemoduledet.data.ConfigModuleModuleDetData;

import java.util.List;

public interface ConfigModuleModuleDetWritePlatformService {
    List<ConfigModuleModuleDetData> fetchAllListofAlertData();
}
