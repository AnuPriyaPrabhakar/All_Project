package com.ponsun.kyc.Master.DirectorsList.services;

import com.ponsun.kyc.Master.DirectorsList.data.DirectorListDto;
import com.ponsun.kyc.Master.DirectorsList.data.DirectorListGetDto;
import com.ponsun.kyc.Master.DirectorsList.data.DirectorsListData;
import com.ponsun.kyc.Master.DirectorsList.domain.DirectorsList;
import com.ponsun.kyc.Master.DirectorsSignAuthority.data.DirectorsSignAuthorityData;
import com.ponsun.kyc.Master.NameSearch.data.NameSearchData;

import java.util.List;

public interface DirectorsListReadService {
    List<DirectorsList> fetchAllDirectorsList();
    DirectorsList fetchDirectorsListById(Integer id);
    List<DirectorsListData> fetchAllDirectorsList(Integer kycId);
    List<DirectorsListData> fetchAllShareHolders(Integer kycId);
    List<DirectorListGetDto> fetchAllDirAuthList(Integer kycId);

}
