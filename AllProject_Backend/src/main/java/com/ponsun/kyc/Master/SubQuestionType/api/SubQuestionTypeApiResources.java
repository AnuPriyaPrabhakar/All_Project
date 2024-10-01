package com.ponsun.kyc.Master.SubQuestionType.api;
import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeData;
import com.ponsun.kyc.Master.QuestionType.domain.QuestionType;
import com.ponsun.kyc.Master.QuestionType.dto.QuestionPayload;
import com.ponsun.kyc.Master.QuestionType.request.CreateQuestionTypeRequest;
import com.ponsun.kyc.Master.SubQuestionType.data.SubQuestionTypeData;
import com.ponsun.kyc.Master.SubQuestionType.domain.SubQuestionType;
import com.ponsun.kyc.Master.SubQuestionType.request.CreateSubQuestionTypeRequest;
import com.ponsun.kyc.Master.SubQuestionType.services.SubQuestionTypeReadService;
import com.ponsun.kyc.Master.SubQuestionType.services.SubQuestionTypeWriteService;
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
@RequestMapping("/api/v1/SubQuestionType")
@Tag(name = "SubQuestionTypeApiResources")
public class SubQuestionTypeApiResources {

    private final SubQuestionTypeWriteService subQuestionTypeWriteService;
    private final SubQuestionTypeReadService subQuestionTypeReadService;

    @PostMapping("/CreateSubQuestionTypeRequest")
    public Response createSubQuestionList(@RequestBody CreateSubQuestionTypeRequest createSubQuestionTypeRequest){
        Response response = this.subQuestionTypeWriteService.createSubQuestionList(createSubQuestionTypeRequest);
        return response;
    }

//    @GetMapping("/{id}")
//    public SubQuestionType fetchSubQuestionById(@PathVariable(name = "id")Integer id) {
//        return this.subQuestionTypeReadService.fetchSubQuestionById(id);
//    }

    @GetMapping("/{id}")
    public SubQuestionType fetchSubQuestionById(@PathVariable(name = "id")Integer id) {
        return this.subQuestionTypeReadService.fetchSubQuestionById(id);
    }

//    @GetMapping("/{questionId}")
//    public List<SubQuestionTypeData> GetAllSubQuestions(@PathVariable(name = "questionId") Integer questionId)
//    {return this.subQuestionTypeReadService.fetchAllSubQuestion(questionId);}


    @GetMapping("/{questionId}/subquestion")
    public List<SubQuestionType> GetAllSubQuestions(@PathVariable(name = "questionId") Integer questionId)
    {return this.subQuestionTypeReadService.fetchAllSubQuestion(questionId);
    }


}
