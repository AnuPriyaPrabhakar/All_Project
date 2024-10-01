package com.ponsun.kyc.Master.DirectorsList.data;

import com.ponsun.kyc.Master.DirectorsList.request.CreateDirectorsListRequest;
import com.ponsun.kyc.Master.DirectorsSignAuthority.request.CreateDirectorsSignAuthorityRequest;
import lombok.Data;

import java.util.List;

@Data
public class DirectorListDto {
    private CreateDirectorsSignAuthorityRequest createDirectorsSignAuthorityRequests;
    private List<CreateDirectorsListRequest> createDirectorsListRequest;

    public DirectorListDto(CreateDirectorsSignAuthorityRequest createDirectorsSignAuthorityRequests, List<CreateDirectorsListRequest> createDirectorsListRequest) {
        this.createDirectorsSignAuthorityRequests = createDirectorsSignAuthorityRequests;
        this.createDirectorsListRequest = createDirectorsListRequest;
    }

    public DirectorListDto() {

    }

    public static DirectorListDto newInstance(CreateDirectorsSignAuthorityRequest createDirectorsSignAuthorityRequests, List<CreateDirectorsListRequest> createDirectorsListRequest){
        return new DirectorListDto(createDirectorsSignAuthorityRequests,createDirectorsListRequest);
    }
}
