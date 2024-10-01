package com.ponsun.kyc.listOfDocument.services;

import com.ponsun.kyc.listOfDocument.domain.ListOfDocument;
import com.ponsun.kyc.listOfDocument.domain.ListOfDocumentRepository;
import com.ponsun.kyc.listOfDocument.domain.ListOfDocumentRepositoryWrapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
public class ListOfDocumentReadPlatformServiceImpl implements ListOfDocumentReadPlatformService {
    private final ListOfDocumentRepositoryWrapper listOfDocumentRepositoryWrapper;
    private final JdbcTemplate jdbcTemplate;
    private final ListOfDocumentRepository listOfDocumentRepository;

    @Override
    public ListOfDocument fetchListOfDocumentById(Integer id){
        return this.listOfDocumentRepository.findById(id).get();
    }
    @Override
    public List<ListOfDocument> fetchAllListOfDocument() { return this.listOfDocumentRepository.findAll();}
}
