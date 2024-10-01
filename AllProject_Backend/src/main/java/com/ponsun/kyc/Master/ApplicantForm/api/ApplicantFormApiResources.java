package com.ponsun.kyc.Master.ApplicantForm.api;

import com.ponsun.kyc.Master.ApplicantForm.KycData.KycFormFeildData;
import com.ponsun.kyc.Master.ApplicantForm.KycData.KycFormPayLoad;
import com.ponsun.kyc.Master.ApplicantForm.KycData.KycSubQueFormData;
import com.ponsun.kyc.Master.ApplicantForm.data.ApplicantFormData;
import com.ponsun.kyc.Master.ApplicantForm.dto.ApplicantFormPayload;
import com.ponsun.kyc.Master.ApplicantForm.services.ApplicantFormReadService;
import com.ponsun.kyc.Master.ApplicantForm.services.ApplicantFormWriteService;
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
@RequestMapping("/api/v1/ApplicantForm")
@Tag(name = "ApplicantFormApiResources")
public class ApplicantFormApiResources {
    private final ApplicantFormWriteService applicantFormWriteService;
    private final ApplicantFormReadService applicantFormReadService;

    @PostMapping("/CreateApplicantFormRequest")
    public Response createApplicantFormList(@RequestBody ApplicantFormPayload payload){
        return this.applicantFormWriteService.createApplicantFormList(payload);
    }
    @PutMapping("/{id}")
    public Response updateApplicantForm(@PathVariable Integer id,@RequestBody ApplicantFormPayload applicantFormPayloads){
        Response response = this.applicantFormWriteService.updateApplicantForm(id,applicantFormPayloads);
        return response;
    }

    @GetMapping("/KycForm")
    public List<KycFormPayLoad> fetchAllKycForm(@RequestParam Integer kycId) {
        return this.applicantFormReadService.fetchAllKycForm(kycId);
    }
    @GetMapping("/PrintNumber")
    public Integer getmaxNumberOfPrint(@RequestParam Integer id) {
        return this.applicantFormReadService.getmaxNumberOfPrint(id);
    }

    @GetMapping("/isCompleted")
    public List<ApplicantFormData> fetchAllApplicantFormData() {
        return this.applicantFormReadService.fetchAllApplicantFormData();
    }

    @PutMapping("/applicantForm/{id}/status")
    public Response updateStatus(@RequestParam Integer id, @RequestParam String status) {
        Response response = this.applicantFormWriteService.updateIsCompleted(id, status);
        return response;
    }

}


//    @GetMapping("/KycFormfeild")
//    public List<KycFormFeildData> fetchAllKycFormFeild(@RequestParam Integer kycId) {
//        return this.applicantFormReadService.fetchAllKycFormFeild(kycId);
//    }

//    @GetMapping("/KycSubQue")
//    public List<KycSubQueFormData> fetchAllKycSubQueForm(@RequestParam Integer kycId,@RequestParam Integer questionId) {
//        return this.applicantFormReadService.fetchAllKycSubQueForm(kycId,questionId);
//    }