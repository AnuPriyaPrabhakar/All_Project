package com.ponsun.kyc.Master.DeclarationForm.api;

import com.ponsun.kyc.Master.DeclarationForm.data.DeclarationFormData;
import com.ponsun.kyc.Master.DeclarationForm.domain.DeclarationForm;
import com.ponsun.kyc.Master.DeclarationForm.request.CreateDeclarationFormRequest;
import com.ponsun.kyc.Master.DeclarationForm.request.UpdateDeclarationFormRequest;
import com.ponsun.kyc.Master.DeclarationForm.services.DeclarationFormReadPlatformService;
import com.ponsun.kyc.Master.DeclarationForm.services.DeclarationFormWritePlatformService;
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
@RequestMapping("/api/v1/DeclarationForm")
@Tag(name = "DeclarationFormApiResource")
public class DeclarationFormApiResources {
    private final DeclarationFormWritePlatformService declarationFormWritePlatformService;
    private final DeclarationFormReadPlatformService declarationFormReadPlatformService;

    @PostMapping("/CreateDeclarationFormRequest")
    public Response saveDeclarationForm(@RequestBody CreateDeclarationFormRequest createDeclarationFormRequest) {
        Response response = this.declarationFormWritePlatformService.createDeclarationForm(createDeclarationFormRequest);
        return response;
    }

    @GetMapping
    public List<DeclarationForm> fetchAll() {
        return this.declarationFormReadPlatformService.fetchAllDeclarationForm();
    }

    @GetMapping("/{id}")
    public DeclarationForm fetchDeclarationFormById(@PathVariable(name = "id") Integer id) {
        return this.declarationFormReadPlatformService.fetchDeclarationFormById(id);
    }

    @PutMapping("/{id}/deActivate")
    public Response deActivate(@RequestParam Integer kycId, @RequestParam Integer euid) {
        Response response = this.declarationFormWritePlatformService.deActivate(kycId, euid);
        return response;
    }

    @GetMapping("/DeclarationFormData/{kycId}")
    public List<DeclarationFormData> getDeclarationForm(@PathVariable Integer kycId) {
        return this.declarationFormWritePlatformService.fetchAllDeclarationFormData(kycId);
    }


    @PutMapping("/{id}/Update")
    public Response updateDeclarationForm(@RequestParam Integer id, @RequestBody UpdateDeclarationFormRequest updateDeclarationFormRequest) {
        Response response = this.declarationFormWritePlatformService.updateDeclarationForm(id, updateDeclarationFormRequest);
        return response;
    }


}
