package com.ponsun.kyc.Master.QuestionType.dto;


import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class QuestionPayload {
    private QuestionDto questionDto;
}
