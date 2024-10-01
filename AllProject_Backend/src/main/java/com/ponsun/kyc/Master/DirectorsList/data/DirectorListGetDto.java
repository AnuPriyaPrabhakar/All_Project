package com.ponsun.kyc.Master.DirectorsList.data;

import com.ponsun.kyc.Master.DirectorsSignAuthority.data.DirectorsSignAuthorityData;
import lombok.Data;

import java.util.List;
@Data
public class DirectorListGetDto {

    private List<DirectorsSignAuthorityData> directorAuthList;
    private List<DirectorsListData> directorsList;
    private List<DirectorsListData> shareholdersList;

    public DirectorListGetDto(List<DirectorsSignAuthorityData> directorAuthList, List<DirectorsListData> directorsList, List<DirectorsListData> shareholdersList) {
        this.directorAuthList = directorAuthList;
        this.directorsList = directorsList;
        this.shareholdersList = shareholdersList;
    }

    public DirectorListGetDto() {

    }

    public static DirectorListGetDto newInstance(List<DirectorsSignAuthorityData> directorAuthList, List<DirectorsListData> directorsList, List<DirectorsListData> shareholdersList){
        return new DirectorListGetDto(directorAuthList,directorsList,shareholdersList);
    }
}
