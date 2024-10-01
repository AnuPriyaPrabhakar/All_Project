package com.ponsun.kyc.Master.DirectorsList.services;

import com.ponsun.kyc.Master.DirectorsList.data.DirectorListDto;
import com.ponsun.kyc.Master.DirectorsList.request.UpdateDirectorsListRequest;
import com.ponsun.kyc.infrastructure.utils.Response;

public interface DirectorsListWritePlatformService {
    Response createDirectorsList(DirectorListDto createDirectorsdtoRequest);

    Response updateDirectorsList(Integer id, UpdateDirectorsListRequest updateDirectorsListRequest);

    Response deActivate(Integer kycId, Integer euid);

}
