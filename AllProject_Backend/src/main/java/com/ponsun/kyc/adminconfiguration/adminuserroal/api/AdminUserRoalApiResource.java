package com.ponsun.kyc.adminconfiguration.adminuserroal.api;


import com.ponsun.kyc.adminconfiguration.adminuserroal.domain.AdminUserRoal;
import com.ponsun.kyc.adminconfiguration.adminuserroal.request.CreateAdminUserRoalRequest;
import com.ponsun.kyc.adminconfiguration.adminuserroal.request.UpdateAdminUserRoalRequest;
import com.ponsun.kyc.adminconfiguration.adminuserroal.services.AdminUserRoalReadPlatformServiceImpl;
import com.ponsun.kyc.adminconfiguration.adminuserroal.services.AdminUserRoalWritePlatformServiceImpl;
import com.ponsun.kyc.infrastructure.utils.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("api/v1/adminRoal")
@Tag(name="AdminUserRoalApiResource")
public class AdminUserRoalApiResource {

    private final AdminUserRoalWritePlatformServiceImpl adminUserRoalWritePlatformService;
    private final AdminUserRoalReadPlatformServiceImpl adminUserRoalReadPlatformService;

    @PostMapping("/createAdminRoal")
    public Response saveAdminUserRoal(@RequestBody CreateAdminUserRoalRequest createAdminUserRoalRequest) {
        log.debug("START saveAdminUserRoal request body {}",createAdminUserRoalRequest);
        Response response = this.adminUserRoalWritePlatformService.createAdminUserRoal(createAdminUserRoalRequest);
        log.debug("START saveAdminUserRoal response",response);
        return response;
    }
    @GetMapping
    public List<AdminUserRoal> fetchAll(){
        return this.adminUserRoalReadPlatformService.fetchAllAdminUserRoal();
    }

    @GetMapping("/{id}")
    public AdminUserRoal fetchAdminUserRoalById (@PathVariable  Integer id) {
        return this.adminUserRoalReadPlatformService.fetchAdminUserRoalById(id);
    }
    @PutMapping("/{id}")
    public Response updateAdminUserRoal(@PathVariable Integer id, @RequestBody UpdateAdminUserRoalRequest updateAdminUserRoalRequest) {
        log.debug("START updateAdminUserRoal request body {}",updateAdminUserRoalRequest);
        Response response = this.adminUserRoalWritePlatformService.updateAdminUserRoal(id, updateAdminUserRoalRequest);
        log.debug("START updateAdminUserRoal response",response);
        return response;
    }


    @PutMapping("/deactive/{id}")
    public Response deactive(@PathVariable Integer id, Integer euid) {
        Response response = this.adminUserRoalWritePlatformService.deactive(id, euid);
        return response;
    }


    @PutMapping("/block/{id}")
    public Response blockAdminUserRoal(@PathVariable Integer id){
        Response response = this.adminUserRoalWritePlatformService.blockAdminUserRoal(id);
        return response;
}

@PutMapping("/unblock/{id}")
    public Response unblockAdminUserRoal(@PathVariable Integer id){
        Response response = this.adminUserRoalWritePlatformService.unblockAdminUserRoal(id);
        return response;
}

}

