package com.ponsun.kyc.adminconfiguration.AdminUser.services;


import com.ponsun.kyc.adminconfiguration.AdminUser.domain.User;

import java.util.List;

public interface UserReadPlatformService {

    User fetchUserById(Integer id);
    List<User> fetchAllUsers();
}
