package com.ponsun.kyc.Master.DirectorsList.api;

import com.ponsun.kyc.Master.DirectorsList.data.DirectorListDto;
import com.ponsun.kyc.Master.DirectorsList.data.DirectorListGetDto;
import com.ponsun.kyc.Master.DirectorsList.data.DirectorsListData;
import com.ponsun.kyc.Master.DirectorsList.request.CreateDirectorsListRequest;
import com.ponsun.kyc.Master.DirectorsList.request.UpdateDirectorsListRequest;
import com.ponsun.kyc.Master.DirectorsList.services.DirectorsListReadService;
import com.ponsun.kyc.Master.DirectorsList.services.DirectorsListWritePlatformService;
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
@RequestMapping("/api/v1/DirectorsList")
@Tag(name = "DirectorsListApiResourcesTag")
public class DirectorsListApiResources {

    private final DirectorsListWritePlatformService directorsListWritePlatformService;
    private final DirectorsListReadService directorsListReadService;

    @PostMapping("/CreateDirectorsList")
    public Response createDirectorsList(@RequestBody DirectorListDto createDirectorsdtoRequest) {
        Response response = this.directorsListWritePlatformService.createDirectorsList(createDirectorsdtoRequest);
        return response;
    }

    @PutMapping("/UpdateDirectorsList")
    public Response UpdateDirectorsList(@RequestParam Integer id, @RequestBody UpdateDirectorsListRequest updateDirectorsListRequest) {
        Response response = this.directorsListWritePlatformService.updateDirectorsList(id, updateDirectorsListRequest);
        return response;
    }

    @GetMapping("/KycDirectorsList/{kycId}")
    public List<DirectorsListData> fetchAllDirectorsList(@RequestParam Integer kycId) {
        return this.directorsListReadService.fetchAllDirectorsList(kycId);
    }

    @GetMapping("/KycShareHolder/{kycId}")
    public List<DirectorsListData> fetchAllShareHolders(@RequestParam Integer kycId) {
        return this.directorsListReadService.fetchAllShareHolders(kycId);
    }
    @GetMapping("/DirAuthList/{kycId}")
    public List<DirectorListGetDto> fetchAllDirAuthList(@RequestParam Integer kycId) {
        return this.directorsListReadService.fetchAllDirAuthList(kycId);
    }

}
