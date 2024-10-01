package com.ponsun.kyc.letterHeadUpload.service;


import com.ponsun.kyc.letterHeadUpload.domain.LetterHeadUpload;
import com.ponsun.kyc.letterHeadUpload.domain.LetterHeadUploadRepository;
import com.ponsun.kyc.letterHeadUpload.domain.LetterHeadUploadWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class LetterHeadUploadReadServiceImpl implements LetterHeadUploadReadService {
    private final LetterHeadUploadWrapper letterHeadUploadRepositoryWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final LetterHeadUploadRepository letterHeadUploadRepository;

    @Override
    public LetterHeadUpload fetchLetterHeadUploadById(Integer id){
        return this.letterHeadUploadRepository.findById(id).get();
    }
    @Override
    public List<LetterHeadUpload> fetchAllLetterHeadUpload() { return this.letterHeadUploadRepository.findAll();}
}
