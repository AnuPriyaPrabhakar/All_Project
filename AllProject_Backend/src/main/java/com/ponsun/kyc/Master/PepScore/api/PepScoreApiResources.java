package com.ponsun.kyc.Master.PepScore.api;
import com.ponsun.kyc.Master.PepScore.domain.PepScore;
import com.ponsun.kyc.Master.PepScore.serices.PepScoreReadService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/PepScore")
@Tag(name = "PepScoreApiResources")
public class PepScoreApiResources {
    private final PepScoreReadService pepScoreReadService;

    @GetMapping
    public List<PepScore> fetchAllPepScore() {
        return this.pepScoreReadService.fetchAllPepScore();
    }

    @GetMapping("/{id}")
    public PepScore fetchPepScoreById(@PathVariable(name = "id") Integer id) {
        return this.pepScoreReadService.fetchPepScoreById(id);
    }
}
