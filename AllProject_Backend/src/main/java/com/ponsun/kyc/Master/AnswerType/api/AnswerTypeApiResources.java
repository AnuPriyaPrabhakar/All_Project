package com.ponsun.kyc.Master.AnswerType.api;

import com.ponsun.kyc.Master.AnswerType.data.AnswerTypeData;
import com.ponsun.kyc.Master.AnswerType.domain.AnswerType;
import com.ponsun.kyc.Master.AnswerType.request.CreateAnswerTypeRequest;
import com.ponsun.kyc.Master.AnswerType.services.AnswerTypeReadService;
import com.ponsun.kyc.Master.AnswerType.services.AnswerTypeWriteService;
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
@RequestMapping("/api/v1/AnswerType")
@Tag(name = "AnswerTypeApiResources")
public class AnswerTypeApiResources {

    private final AnswerTypeWriteService answerTypeWriteService;
    private final AnswerTypeReadService answerTypeReadService;

    @PostMapping("/CreateAnswerTypeRequest")
    public Response createAnswerList(@RequestBody CreateAnswerTypeRequest createAnswerTypeRequest) {
        Response response = this.answerTypeWriteService.createAnswerList(createAnswerTypeRequest);
        return response;
    }

    @GetMapping("/answer/{id}")
    public AnswerType fetchAnswerById(@PathVariable(name = "id") Integer id) {
        return this.answerTypeReadService.fetchAnswerTypeById(id);
    }

    @GetMapping("/{questionId}/Answers")
    public List<AnswerTypeData> getAllAnswers(@PathVariable(name = "questionId") Integer questionId,
                                              @RequestParam(name = "subQuestionId") Integer subQuestionId) {
        return this.answerTypeReadService.fetchSubQuesAnswerData(questionId, subQuestionId);
    }
}

//    @GetMapping("/{id}/Answers")
//    public List<AnswerTypeData> getAllSubQuesAnswerData(@PathVariable(name = "questionId") Integer questionId,
//                                              @RequestParam(name = "id") Integer id) {
//        return this.answerTypeReadService.fetchSubQuesAnswerData(questionId, id);
//    }
//    @GetMapping("/{questionId}/Answers")
//    public List<AnswerTypeData> getAllAnswers(@PathVariable(name = "questionId") Integer questionId,
//                                              @RequestParam(name = "subQuestionId") Integer subQuestionId) {
//        return this.answerTypeReadService.fetchAnswerData(questionId, subQuestionId);
//    }