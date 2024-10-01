package com.ponsun.kyc.Master.ApplicantFormDetails.api;

import com.ponsun.kyc.Master.ApplicantFormDetails.request.UpdateApplicantFormDetailsRequest;
import com.ponsun.kyc.Master.ApplicantFormDetails.services.ApplicantFormDetailsReadService;
import com.ponsun.kyc.Master.ApplicantFormDetails.services.ApplicantFormDetailsWriteService;
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
@RequestMapping("/api/v1/ApplicantFormDetails")
@Tag(name = "ApplicantFormDetailsApiResources")
public class ApplicantFormDetailsApiResources {
    private final ApplicantFormDetailsWriteService applicantFormDetailsWriteService;
    private final ApplicantFormDetailsReadService applicantFormDetailsReadService;

    @PutMapping("/deActivate/{id}")
    public Response deActivate(@RequestParam Integer kycId, @RequestParam Integer euid){
        Response response = this.applicantFormDetailsWriteService.deActivate(kycId, euid);
        return response;
    }

    @PutMapping("/{id}")
    public Response deActivate(@RequestParam Integer id, @RequestBody UpdateApplicantFormDetailsRequest UpdateApplicantFormDetailsReques){
        Response response = this.applicantFormDetailsWriteService.updateFormDetailsList(id, UpdateApplicantFormDetailsReques);
        return response;
    }

    @GetMapping("/Score")
    public List<Double> getScore(@RequestParam Integer id) {
        return this.applicantFormDetailsReadService.getScore(id);
    }

}

//    @GetMapping("/AveScore")
//    public Double getAverageScore(@RequestParam Integer id) {
//        return this.applicantFormDetailsReadService.getAverageScore(id);
//    }//