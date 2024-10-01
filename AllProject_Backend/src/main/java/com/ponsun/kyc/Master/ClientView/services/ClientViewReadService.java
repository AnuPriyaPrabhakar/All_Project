package com.ponsun.kyc.Master.ClientView.services;

import com.ponsun.kyc.Master.ClientView.data.ClientViewData;

import java.util.List;

public interface ClientViewReadService {

    List<ClientViewData> fetchAllClientView(String fromDate, String toDate);
    List<ClientViewData> fetchAllClientName();


}
