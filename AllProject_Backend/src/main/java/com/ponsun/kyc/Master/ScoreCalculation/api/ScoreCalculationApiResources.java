package com.ponsun.kyc.Master.ScoreCalculation.api;
import com.ponsun.kyc.Master.ScoreCalculation.request.CreateScoreCalculationRequest;
import com.ponsun.kyc.Master.ScoreCalculation.request.UpdateScoreCalculationRequest;
import com.ponsun.kyc.Master.ScoreCalculation.services.ScoreCalculationWriteService;
import com.ponsun.kyc.infrastructure.utils.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/ScoreCalculation")
@Tag(name = "ScoreCalculationApiResources")
public class ScoreCalculationApiResources {

    private final ScoreCalculationWriteService scoreCalculationWriteService;
    @PostMapping("/CreateScoreCalculationRequest")
    public Response createScoreCalculationList(@RequestBody CreateScoreCalculationRequest createScoreCalculationRequest){
        Response response = this.scoreCalculationWriteService.createScoreCalculationList(createScoreCalculationRequest);
        return response;
    }

//    @PutMapping("/{id}")
//    public Response updateScoreCalculationList(@PathVariable Integer id, @RequestBody UpdateScoreCalculationRequest updateScoreCalculationRequest){
//        Response response = this.scoreCalculationWriteService.updateScoreCalculationList(id, updateScoreCalculationRequest);
//        return response;
//    }

    @PutMapping("/{deActivate}")
    public Response deActivate(@RequestParam Integer kycId, @RequestParam Integer euid){
        Response response = this.scoreCalculationWriteService.deActivate(kycId, euid);
        return response;
    }
}
