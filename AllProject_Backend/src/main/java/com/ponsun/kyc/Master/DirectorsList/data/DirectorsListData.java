package com.ponsun.kyc.Master.DirectorsList.data;

import com.ponsun.kyc.Master.DirectorsList.request.CreateDirectorsListRequest;
import com.ponsun.kyc.Master.DirectorsSignAuthority.request.CreateDirectorsSignAuthorityRequest;
import lombok.Data;

import java.util.List;

@Data
public class DirectorsListData {
    private String firstName;
    private String middleName;
    private String lastName;
    private String pan;
    private String nationality;
    private String citizenship;
    private String domicile;
    private Integer authorityId;


    public DirectorsListData(String firstName, String middleName, String lastName, String pan, String nationality, String citizenship, String domicile,Integer authorityId) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.pan = pan;
        this.nationality = nationality;
        this.citizenship = citizenship;
        this.domicile = domicile;
        this.authorityId=authorityId;
    }

    public DirectorsListData(CreateDirectorsSignAuthorityRequest createDirectorsSignAuthorityRequests, List<CreateDirectorsListRequest> createDirectorsListRequest) {
    }


    public static DirectorsListData newInstance(String firstName, String middleName, String lastName, String pan, String nationality, String citizenship, String domicile,Integer authorityId){
        return new DirectorsListData(firstName,middleName,lastName,pan,nationality,citizenship,domicile,authorityId);
    }
}
