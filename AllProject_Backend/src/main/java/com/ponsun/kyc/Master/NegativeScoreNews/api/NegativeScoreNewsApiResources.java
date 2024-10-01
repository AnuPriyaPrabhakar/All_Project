package com.ponsun.kyc.Master.NegativeScoreNews.api;
import com.ponsun.kyc.Master.NegativeScoreNews.domain.NegativeScoreNews;
import com.ponsun.kyc.Master.NegativeScoreNews.services.NegativeScoreNewsReadService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/NegativeScoreNews")
@Tag(name = "NegativeScoreNewsApiResources")
public class NegativeScoreNewsApiResources {
    private final NegativeScoreNewsReadService negativeScoreNewsReadService;


    @GetMapping
    public List<NegativeScoreNews> fetchAllNegativeScore() {
        return this.negativeScoreNewsReadService.fetchAllNegativeScore();
    }

    @GetMapping("/{id}")
    public NegativeScoreNews fetchNegativeScoreById(@PathVariable(name = "id") Integer id) {
        return this.negativeScoreNewsReadService.fetchNegativeScoreById(id);
    }
}
