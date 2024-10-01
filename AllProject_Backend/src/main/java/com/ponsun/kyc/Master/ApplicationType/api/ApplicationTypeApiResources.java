package com.ponsun.kyc.Master.ApplicationType.api;

import com.ponsun.kyc.Master.ApplicationType.domain.ApplicationType;
import com.ponsun.kyc.Master.ApplicationType.request.CreateApplicationTypeRequest;
import com.ponsun.kyc.Master.ApplicationType.request.UpdateApplicationTypeRequest;
import com.ponsun.kyc.Master.ApplicationType.services.ApplicationTypeReadService;
import com.ponsun.kyc.Master.ApplicationType.services.ApplicationTypeWriteSerice;
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
@RequestMapping("/api/v1/ApplicationType")
@Tag(name = "ApplicationTypeApiResources")
public class ApplicationTypeApiResources {
    private final ApplicationTypeWriteSerice applicationTypeWriteSerice;
    private final ApplicationTypeReadService applicationTypeReadService;

    @PostMapping("/CreateApplicationFormRequest")
    public Response createApplicationFormList(@RequestBody CreateApplicationTypeRequest createApplicationFormRequest){
        Response response = this.applicationTypeWriteSerice.createApplicationFormList(createApplicationFormRequest);
        return response;
    }
    @PutMapping("/{id}")
    public Response updateApplicationFormList(@PathVariable Integer id, @RequestBody UpdateApplicationTypeRequest updateApplicationFormRequest){
        Response response = this.applicationTypeWriteSerice.updateApplicationFormList(id, updateApplicationFormRequest);
        return response;
    }
    @GetMapping("/{id}")
    public ApplicationType fetchApplicationFormById(@PathVariable(name = "id")Integer id) {
        return this.applicationTypeReadService.fetchApplicationFormById(id);
    }

    @GetMapping
    public List<ApplicationType> fetchAll(){return this.applicationTypeReadService.fetchAllApplicationForm();}


}
