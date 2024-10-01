package com.ponsun.kyc.Master.EntityScore.api;

import com.ponsun.kyc.Master.EntityScore.domain.EntityScore;
import com.ponsun.kyc.Master.EntityScore.services.EntityScoreReadService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/EntityScore")
@Tag(name = "EntityScoreApiResources")
public class EntityScoreApiResources {
    private final EntityScoreReadService entityScoreReadService;

    @GetMapping
    public List<EntityScore> fetchAllEntityScore() {
        return this.entityScoreReadService.fetchAllEntityScore();
    }

    @GetMapping("/{id}")
    public EntityScore fetchEntityScoreById(@PathVariable(name = "id") Integer id) {
        return this.entityScoreReadService.fetchEntityScoreById(id);
    }
}
