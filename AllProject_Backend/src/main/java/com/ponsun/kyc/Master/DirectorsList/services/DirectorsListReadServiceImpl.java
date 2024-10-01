package com.ponsun.kyc.Master.DirectorsList.services;

import com.ponsun.kyc.Master.DirectorsList.data.DirectorListGetDto;
import com.ponsun.kyc.Master.DirectorsList.data.DirectorsListData;
import com.ponsun.kyc.Master.DirectorsList.domain.DirectorsList;
import com.ponsun.kyc.Master.DirectorsList.domain.DirectorsListRepository;
import com.ponsun.kyc.Master.DirectorsList.domain.DirectorsListWrapper;
import com.ponsun.kyc.Master.DirectorsList.rowmapper.DirectorsListRowMapper;
import com.ponsun.kyc.Master.DirectorsSignAuthority.data.DirectorsSignAuthorityData;
import com.ponsun.kyc.Master.DirectorsSignAuthority.service.DirectorsSignAuthorityReadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DirectorsListReadServiceImpl implements DirectorsListReadService {
    private final JdbcTemplate jdbcTemplate;
    private final DirectorsListRowMapper directorsListRowMapper;
    private final DirectorsListWrapper directorsListWrapper;
    private final DirectorsListRepository directorsListRepository;
    private final DirectorsSignAuthorityReadService authorityReadService;

    @Override
    public DirectorsList fetchDirectorsListById(Integer id) {
        return this.directorsListRepository.findById(id).get();
    }

    @Override
    public List<DirectorsList> fetchAllDirectorsList() {
        return this.directorsListRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<DirectorsListData> fetchAllDirectorsList(Integer kycId) {
        Map<String, Object> parameters = new HashMap<>();
        final DirectorsListRowMapper rowMapper = new DirectorsListRowMapper();
        String Qry = "SELECT " + rowMapper.tableSchema();
        String whereClause = " WHERE kycId=? AND  isDirector=1 AND STATUS='A'";
        Qry = Qry + whereClause;
        final List<DirectorsListData> directorsListData = jdbcTemplate.query(Qry, new Object[]{kycId}, directorsListRowMapper);
        return directorsListData;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DirectorsListData> fetchAllShareHolders(Integer kycId) {
        Map<String, Object> parameters = new HashMap<>();
        final DirectorsListRowMapper rowMapper = new DirectorsListRowMapper();
        String Qry = "SELECT " + rowMapper.tableSchema();
        String whereClause = " WHERE kycId=? AND  isShareHolders=1 AND STATUS='A'";
        Qry = Qry + whereClause;
        final List<DirectorsListData> directorsListData = jdbcTemplate.query(Qry, new Object[]{kycId}, directorsListRowMapper);
        return directorsListData;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DirectorListGetDto> fetchAllDirAuthList(Integer kycId) {

        List<DirectorsSignAuthorityData> signAuthorityList = authorityReadService.fetchAllSignAuthorityData(kycId);
        List<DirectorsListData> directors = fetchAllDirectorsList(kycId);
        List<DirectorsListData> shareholders = fetchAllShareHolders(kycId);

        // Create a new DirectorListGetDto instance
        DirectorListGetDto dto = new DirectorListGetDto();

        dto.setDirectorAuthList(signAuthorityList);
        dto.setDirectorsList(directors);
        dto.setShareholdersList(shareholders);

        // Create a list to hold the DTOs
        List<DirectorListGetDto> directorListGetDtos = new ArrayList<>();
        directorListGetDtos.add(dto);

        // Return the list of DirectorListGetDto
        return directorListGetDtos;
    }
}

