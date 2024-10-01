package com.ponsun.kyc.Master.DirectorsSignAuthority.service;
import com.ponsun.kyc.Master.DirectorsSignAuthority.data.DirectorsSignAuthorityData;
import com.ponsun.kyc.Master.DirectorsSignAuthority.domain.DirectorsSignAuthority;

import java.util.List;

public interface DirectorsSignAuthorityReadService {

    List<DirectorsSignAuthority> fetchAllSignAuthority();
    DirectorsSignAuthority fetchSignAuthorityById(Integer id);
    List<DirectorsSignAuthorityData> fetchAllSignAuthorityData(Integer kycId);

}
