package com.ponsun.kyc.Master.AccountType.api;

import com.ponsun.kyc.Master.AccountType.data.AccountTypeData;
import com.ponsun.kyc.Master.AccountType.domain.AccountType;
import com.ponsun.kyc.Master.AccountType.request.CreateAccountTypeRequest;
import com.ponsun.kyc.Master.AccountType.service.AccountTypeReadService;
import com.ponsun.kyc.Master.AccountType.service.AccountTypeWriteService;
import com.ponsun.kyc.Master.DeclarationForm.data.DeclarationFormData;
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
@RequestMapping("/api/v1/AccountType")
@Tag(name = "AccountTypeApiResources")
public class AccountTypeApiResources {
    private final AccountTypeWriteService accountTypeWriteService;
    private final AccountTypeReadService accountTypeReadService;

    @PostMapping("/CreateApplicationConfigTypeRequest")
    public Response createApplicationConfigTypeList(@RequestBody CreateAccountTypeRequest createApplicationConfigTypeRequest){
        Response response = this.accountTypeWriteService.createApplicationConfigTypeList(createApplicationConfigTypeRequest);
        return response;
    }
    @GetMapping("/{applicantTypeId}")
    public List<AccountType> getApplicantwiseAccountType(@PathVariable(name = "applicantTypeId") Integer typeId)
    {
        return this.accountTypeReadService.fetchAllApplicantwiseAccountType(typeId);
    }



//    @PutMapping("/{id}")
//    public Response updateApplicationConfigTypeList(@PathVariable Integer id, @RequestBody UpdateAccountTypeRequest updateApplicationConfigTypeRequest){
//        Response response = this.accountTypeWriteService.updateApplicationConfigTypeList(id, updateApplicationConfigTypeRequest);
//        return response;
//    }
//    @GetMapping("/{id}")
//    public AccountType fetchApplicationConfigTypeById(@PathVariable(name = "id")Integer id) {
//        return this.accountTypeReadService.fetchApplicationConfigTypeById(id);
//    }
//
//    @GetMapping
//    public List<AccountType> fetchAll(){return this.accountTypeReadService.fetchAllApplicationConfigType();}


}
