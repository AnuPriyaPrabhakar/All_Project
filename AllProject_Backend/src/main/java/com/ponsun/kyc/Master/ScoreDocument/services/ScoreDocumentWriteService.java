package com.ponsun.kyc.Master.ScoreDocument.services;
import com.ponsun.kyc.Master.ScoreCalculation.request.CreateScoreCalculationRequest;
import com.ponsun.kyc.Master.ScoreDocument.request.CreateScoreDocumentRequest;
import com.ponsun.kyc.Master.ScoreDocument.request.UpdateScoreDocumentRequest;
import com.ponsun.kyc.infrastructure.utils.Response;
import org.springframework.web.multipart.MultipartFile;

public interface ScoreDocumentWriteService {
    Response createScoreDocumentList(CreateScoreDocumentRequest createScoreDocumentRequest);
    Response updateScoreDocumentList(Integer id, UpdateScoreDocumentRequest updateScoreDocumentRequest);
    Response saveDocumentUpload(MultipartFile[] file, Integer kycId,Integer pathId,Integer scoreCalculationId);
}
