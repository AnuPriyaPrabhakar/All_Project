package com.ponsun.kyc.Master.NameSearchDetails.api;

import com.ponsun.kyc.Master.NameSearchDetails.domain.NameSearchDetails;
import com.ponsun.kyc.Master.NameSearchDetails.request.CreateNameSearchDetailsRequest;
import com.ponsun.kyc.Master.NameSearchDetails.request.UpdateNameSearchDetailsRequest;
import com.ponsun.kyc.Master.NameSearchDetails.services.NameSearchDetailsReadPlatformService;
import com.ponsun.kyc.Master.NameSearchDetails.services.NameSearchDetailsWritePlatformService;
import com.ponsun.kyc.infrastructure.utils.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/NameSearchDetails")
@Tag(name ="NameSearchDetailsApiResource")
public class NameSearchDetailsApiResource {

    private final NameSearchDetailsWritePlatformService nameSearchDetailsWritePlatformService;
    private final NameSearchDetailsReadPlatformService nameSearchDetailsReadPlatformService;

    @PostMapping("/CreateNameSearchDetails")
    public Response saveNameSearchDetails(@RequestBody CreateNameSearchDetailsRequest createNameSearchDetailsRequest){
        Response response = this.nameSearchDetailsWritePlatformService.createNameSearchDetails(createNameSearchDetailsRequest);
        return response;
    }

    @GetMapping("/GetNameSearchDetails")
    public List<NameSearchDetails> fetchAll() {return this.nameSearchDetailsReadPlatformService.fetchAllNameSearchDetails();}

    @GetMapping("/{id}")
    public NameSearchDetails fetchNameSearchDetailsById(@PathVariable(name="id")Integer id){
        return this.nameSearchDetailsReadPlatformService.fetchNameSearchById(id);
    }
    @PutMapping("/{id}")
    public Response updateNameSearchDetails(@PathVariable Integer id, @RequestBody UpdateNameSearchDetailsRequest updateNameSearchDetailsRequest){
        Response response = this.nameSearchDetailsWritePlatformService.updateNameSearchDetails(id,updateNameSearchDetailsRequest);
        return response;
    }
}
