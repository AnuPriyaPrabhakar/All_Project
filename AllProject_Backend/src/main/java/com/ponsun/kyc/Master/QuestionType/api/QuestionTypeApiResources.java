package com.ponsun.kyc.Master.QuestionType.api;

import com.ponsun.kyc.Master.QuestionType.dto.QuestionPayload;
import com.ponsun.kyc.Master.QuestionType.services.QuestionTypeReadService;
import com.ponsun.kyc.Master.QuestionType.services.QuestionTypeWriteService;
import com.ponsun.kyc.Master.QuestionType.domain.QuestionType;
import com.ponsun.kyc.Master.QuestionType.request.CreateQuestionTypeRequest;
import com.ponsun.kyc.Master.QuestionType.request.UpdateQuestionTypeRequest;
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
@RequestMapping("/api/v1/QuestionType")
@Tag(name = "QuestionTypeApiResources")
public class QuestionTypeApiResources {
    private final QuestionTypeWriteService questionTypeWriteService;
    private final QuestionTypeReadService questionTypeReadService;

    @PostMapping("/CreateApplicationFormRequest")
    public Response createQuestionTypeList(@RequestBody CreateQuestionTypeRequest createQuestionTypeRequest){
        Response response = this.questionTypeWriteService.createQuestionTypeList(createQuestionTypeRequest);
        return response;
    }

    @PutMapping("/{id}/update")
    public Response updateQuestionTypeList(@PathVariable Integer id, @RequestBody UpdateQuestionTypeRequest updateQuestionTypeRequest){
        Response response = this.questionTypeWriteService.updateQuestionType(id, updateQuestionTypeRequest);
        return response;
    }

    @PutMapping("/{id}/deActivate")
    public Response updateQuestionTypeList(@PathVariable Integer id, @PathVariable Integer euid){
        Response response = this.questionTypeWriteService.deActivate(id, euid);
        return response;
    }

    @GetMapping("/{id}")
    public QuestionType fetchQuestionTypeById(@PathVariable(name = "id")Integer id) {
        return this.questionTypeReadService.fetchQuestionTypeById(id);
    }

    @GetMapping("/{applicationTypeId}/{accountTypeId}")
    public List<QuestionPayload> GetAllQuestions(@PathVariable(name = "applicationTypeId") Integer applicationTypeId, @PathVariable(name = "accountTypeId")Integer accountTypeId) {
        return this.questionTypeReadService.fetchAllQuestionType(applicationTypeId,accountTypeId);
    }
}
