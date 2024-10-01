package com.ponsun.kyc.adminconfiguration.AdminUser.api;

import com.ponsun.kyc.adminconfiguration.AdminUser.domain.User;
import com.ponsun.kyc.adminconfiguration.AdminUser.request.CreateUserRequest;
import com.ponsun.kyc.adminconfiguration.AdminUser.request.UpdateUserRequest;
import com.ponsun.kyc.adminconfiguration.AdminUser.services.UserReadPlatformService;
import com.ponsun.kyc.adminconfiguration.AdminUser.services.UserWritePlatformService;
import com.ponsun.kyc.infrastructure.utils.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@Tag(name = "UserApiResource")
public class UserApiResource {

    private final UserWritePlatformService userWritePlatformService;
    private final UserReadPlatformService userReadPlatformService;

    @PostMapping("/createUserRequest")
    public Response saveUser(@RequestBody CreateUserRequest createUserRequest) {
        log.debug("START saveUser request body {}",createUserRequest);
        Response response = this.userWritePlatformService.createUser(createUserRequest);
        log.debug("START saveUser response",response);
        return response;
    }

    @GetMapping
    public List<User> fetchAll() {
        return this.userReadPlatformService.fetchAllUsers();
    }

    @GetMapping("/{id}")
    public User fetchUserById(@PathVariable(name = "id") Integer id) {
        return this.userReadPlatformService.fetchUserById(id);
    }

    @PutMapping("/{id}")
    public Response updateUser(@PathVariable Integer id, @RequestBody UpdateUserRequest updateUserRequest) {
        log.debug("START updateUser request body {}",updateUserRequest);
        Response response = this.userWritePlatformService.updateUser(id, updateUserRequest);
        log.debug("START updateUser response",response);
        return response;
    }

    @PutMapping("/{id}/block")
    public Response blockUser(@PathVariable Integer id) {
        Response response = this.userWritePlatformService.blockUser(id);
        return response;
    }

    @PutMapping("/{id}/unblock")
    public Response unblockUser(@PathVariable Integer id) {
        Response response = this.userWritePlatformService.unblockUser(id);
        return response;
    }
}
