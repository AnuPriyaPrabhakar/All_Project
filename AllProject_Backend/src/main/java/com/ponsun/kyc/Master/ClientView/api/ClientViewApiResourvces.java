package com.ponsun.kyc.Master.ClientView.api;

import com.ponsun.kyc.Master.ClientView.data.ClientViewData;
import com.ponsun.kyc.Master.ClientView.services.ClientViewReadService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/ClientView")
@Tag(name = "ClientViewApiResourvces")
public class ClientViewApiResourvces {
    private  final ClientViewReadService clientViewReadService;

    @GetMapping("/ClientView")
    public List<ClientViewData> fetchAllClientView(@RequestParam String fromDate , @RequestParam String toDate ){
        return this.clientViewReadService.fetchAllClientView(fromDate , toDate);}

    @GetMapping("/ClientName")
    public List<ClientViewData> fetchAllClientName(){
        return this.clientViewReadService.fetchAllClientName();}

}
