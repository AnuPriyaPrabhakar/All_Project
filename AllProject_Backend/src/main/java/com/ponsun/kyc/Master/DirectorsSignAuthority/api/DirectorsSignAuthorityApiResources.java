package com.ponsun.kyc.Master.DirectorsSignAuthority.api;

import com.ponsun.kyc.Master.DirectorsSignAuthority.data.DirectorsSignAuthorityData;
import com.ponsun.kyc.Master.DirectorsSignAuthority.domain.DirectorsSignAuthority;
import com.ponsun.kyc.Master.DirectorsSignAuthority.request.CreateDirectorsSignAuthorityRequest;
import com.ponsun.kyc.Master.DirectorsSignAuthority.request.UpdateDirectorsSignAuthorityRequest;
import com.ponsun.kyc.Master.DirectorsSignAuthority.service.DirectorsSignAuthorityReadService;
import com.ponsun.kyc.Master.DirectorsSignAuthority.service.DirectorsSignAuthorityWriteService;
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
@RequestMapping("/api/v1/DirectorsSignAuthority")
@Tag(name = "DirectorsSignAuthorityApiResources")
public class DirectorsSignAuthorityApiResources {

    private final DirectorsSignAuthorityReadService readService;
    private final DirectorsSignAuthorityWriteService writeService;

    @PostMapping("/CreateApplicationFormRequest")
    public Response createSignAuthority(@RequestBody CreateDirectorsSignAuthorityRequest createDirectorsSignAuthorityRequest){
        Response response = this.writeService.createSignAuthority(createDirectorsSignAuthorityRequest);
        return response;
    }
    @PutMapping("/{id}")
    public Response updateSignAuthority(@PathVariable Integer id, @RequestBody UpdateDirectorsSignAuthorityRequest updateDirectorsSignAuthorityRequest){
        Response response = this.writeService.updateSignAuthority(id, updateDirectorsSignAuthorityRequest);
        return response;
    }
    @GetMapping("/{id}")
    public DirectorsSignAuthority fetchSignAuthorityById(@PathVariable(name = "id")Integer id) {
        return this.readService.fetchSignAuthorityById(id);
    }

    @GetMapping
    public List<DirectorsSignAuthority> fetchAll(){return this.readService.fetchAllSignAuthority();}

    @GetMapping("/signAuthority/{kycId}")
    public List<DirectorsSignAuthorityData> fetchAllSignAuthorityData(@RequestParam Integer kycId) {
        return this.readService.fetchAllSignAuthorityData(kycId);
    }
    @PutMapping("/deactive/{id}")
    public Response deActivate(@RequestParam Integer kycId, @RequestParam Integer euid){
        Response response = this.writeService.deActivate(kycId,euid);
        return response;
    }
}