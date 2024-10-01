package com.ponsun.kyc.adminconfiguration.configmodulemoduledet.api;

import com.ponsun.kyc.adminconfiguration.configmodulemoduledet.data.ConfigModuleModuleDetData;
import com.ponsun.kyc.adminconfiguration.configmodulemoduledet.services.ConfigModuleModuleDetWritePlatformService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/configmodulemoduledet")
@CrossOrigin(origins = "http://localhost:3000")
public class ConfigModuleModuleDetApiResource {
    private final ConfigModuleModuleDetWritePlatformService configModuleModuleDetWritePlatformService;

    public ConfigModuleModuleDetApiResource(ConfigModuleModuleDetWritePlatformService configModuleModuleDetWritePlatformService){
        this.configModuleModuleDetWritePlatformService = configModuleModuleDetWritePlatformService;

    }
    @GetMapping
    public List<ConfigModuleModuleDetData> fetchAll(){

        return this.configModuleModuleDetWritePlatformService.fetchAllListofAlertData();
    }
}
