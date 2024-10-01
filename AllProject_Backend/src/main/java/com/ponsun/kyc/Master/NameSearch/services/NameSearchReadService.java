package com.ponsun.kyc.Master.NameSearch.services;

import com.ponsun.kyc.Master.NameSearch.data.NameSearchData;
import com.ponsun.kyc.Master.NameSearch.domain.NameSearch;

import java.util.List;

public interface NameSearchReadService {
    NameSearch fetchNameSearchById(Integer id);
    List<NameSearchData> fetchAllNameSearch(Integer kycId);
}
