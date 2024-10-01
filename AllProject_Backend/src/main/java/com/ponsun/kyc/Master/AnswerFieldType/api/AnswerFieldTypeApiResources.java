package com.ponsun.kyc.Master.AnswerFieldType.api;

import com.ponsun.kyc.Master.AnswerFieldType.domain.AnswerFieldType;
import com.ponsun.kyc.Master.AnswerFieldType.request.CreateAnswerFieldTypeRequest;
import com.ponsun.kyc.Master.AnswerFieldType.request.UpdateAnswerFieldTypeRequest;
import com.ponsun.kyc.Master.AnswerFieldType.service.AnswerFieldTypeReadService;
import com.ponsun.kyc.Master.AnswerFieldType.service.AnswerFieldTypeWriteService;
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
@RequestMapping("/api/v1/AnswerFieldType")
@Tag(name = "AnswerFieldTypeApiResources")
public class AnswerFieldTypeApiResources {

    private final AnswerFieldTypeReadService answerFieldTypeReadService;
    private final AnswerFieldTypeWriteService answerFieldTypeWriteService;

    @PostMapping("/saveAnswerFieldType")
    public Response createAnswerFieldType(@RequestBody CreateAnswerFieldTypeRequest createAnswerFieldTypeRequest) {
        Response response = this.answerFieldTypeWriteService.createAnswerFieldType(createAnswerFieldTypeRequest);
        return response;
    }

    @PutMapping("/updateAnswerFieldType")
    public Response updateAnswerFieldType(@RequestParam Integer id ,  @RequestBody UpdateAnswerFieldTypeRequest updateAnswerFieldTypeRequest) {
        Response response = this.answerFieldTypeWriteService.updateAnswerFieldType(id , updateAnswerFieldTypeRequest);
        return response;
    }
    @GetMapping("/{fetchAll}")
    public List<AnswerFieldType> fetchAll() {
        return this.answerFieldTypeReadService.fetchAll();
    }
}
