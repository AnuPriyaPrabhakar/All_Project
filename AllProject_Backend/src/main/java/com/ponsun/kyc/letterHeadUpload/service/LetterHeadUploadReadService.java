package com.ponsun.kyc.letterHeadUpload.service;

import com.ponsun.kyc.letterHeadUpload.domain.LetterHeadUpload;

import java.util.List;

public interface LetterHeadUploadReadService {
    List<LetterHeadUpload> fetchAllLetterHeadUpload();

    LetterHeadUpload fetchLetterHeadUploadById(Integer id);
}
