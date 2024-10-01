package com.ponsun.kyc.Master.NameSearch.api;

import com.ponsun.kyc.Master.ApplicantForm.KycData.KycFormPayLoad;
import com.ponsun.kyc.Master.NameSearch.data.NameSearchData;
import com.ponsun.kyc.Master.NameSearch.services.NameSearchReadService;
import com.ponsun.kyc.Master.QuestionType.services.QuestionTypeReadService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/NameSearch")
@Tag(name = "NameSearchApiResources")
public class NameSearchApiResources {

    private final NameSearchReadService nameSearchReadService;
    @GetMapping("/KycFormNameSearch/{kycId}")
    public List<NameSearchData> fetchAllNameSearch(@RequestParam Integer kycId) {
        return this.nameSearchReadService.fetchAllNameSearch(kycId);
    }
}
