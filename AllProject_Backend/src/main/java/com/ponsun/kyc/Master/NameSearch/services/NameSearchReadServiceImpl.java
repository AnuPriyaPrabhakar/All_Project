package com.ponsun.kyc.Master.NameSearch.services;

import com.ponsun.kyc.Master.NameSearch.data.NameSearchData;
import com.ponsun.kyc.Master.NameSearch.domain.NameSearch;
import com.ponsun.kyc.Master.NameSearch.domain.NameSearchRepository;
import com.ponsun.kyc.Master.NameSearch.rowmapper.NameSearchRowMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class NameSearchReadServiceImpl implements NameSearchReadService{
    private final JdbcTemplate jdbcTemplate;
    private final NameSearchRepository nameSearchRepository;
    private final NameSearchRowMapper nameSearchRowMapper;

    @Override
    @Transactional
    public NameSearch fetchNameSearchById(Integer id) {
        return this.nameSearchRepository.findById(id).get();
    }

    @Override
    public List<NameSearchData> fetchAllNameSearch(Integer kycId) {
        Map<String, Object> parameters = new HashMap<>();
        final NameSearchRowMapper rowMapper = new NameSearchRowMapper();
        String Qry = "SELECT " + rowMapper.tableSchema();
        String whereClause = " WHERE a.questionId = b.id AND a.kycId = ? AND a.status = 'A' AND b.nameField = 1 AND a.subQuestionId = 0 AND a.isScreening = 0  " +
                 " UNION " +
                 " SELECT 2 AS screeningType,a.id,a.`kycId`,b.name,a.answer  " +
                 " FROM kyc_applicant_form_details a,kyc_config_sub_question_type b  " +
                 " WHERE kycId=? AND a.questionId=b.id AND a.status='A' AND b.nameField=1 AND a.`subQuestionId`!=0 AND a.isScreening = 0  " +
                 " UNION" +
                 " SELECT 3 AS screeningType,a.id,a.`kycId`,'Director' AS Director ,CONCAT(firstName,' ',middleName,' ',lastName) FROM `kyc_board_directors_list` a WHERE kycId=? AND  isDirector=1 AND a.isScreening = 0" +
                 " UNION" +
                 " SELECT 4 AS screeningType,a.id,a.`kycId`,'ShareHolders' AS ShareHolders,CONCAT(firstName,' ',middleName,' ',lastName) FROM `kyc_board_directors_list` a WHERE kycId=? AND  isShareHolders=1 AND a.isScreening = 0";
        Qry = Qry + whereClause;
        final List<NameSearchData> nameSearchData = jdbcTemplate.query(Qry, new Object[]{kycId,kycId,kycId,kycId}, nameSearchRowMapper);
        return nameSearchData;
    }

}
