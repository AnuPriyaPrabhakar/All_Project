package com.ponsun.kyc.Master.ApplicantForm.services;

import com.ponsun.kyc.Master.ApplicantForm.KycData.*;
import com.ponsun.kyc.Master.ApplicantForm.data.ApplicantFormData;
import com.ponsun.kyc.Master.ApplicantForm.domain.ApplicantForm;
import com.ponsun.kyc.Master.ApplicantForm.domain.ApplicantFormRepository;
import com.ponsun.kyc.Master.ApplicantForm.rowmapper.ApplicantFormRowMapper;
import com.ponsun.kyc.Master.ApplicantForm.rowmapper.KycAnswerRowMapper;
import com.ponsun.kyc.Master.ApplicantForm.rowmapper.KycFormFeildRowMapper;
import com.ponsun.kyc.Master.ApplicantForm.rowmapper.KycSubQueFormRowMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicantFormReadServiceImpl implements ApplicantFormReadService {
    private final JdbcTemplate jdbcTemplate;
    private final ApplicantFormRepository applicantFormRepository;
    private final KycFormFeildRowMapper kycFormFeildRowMapper;
    private final KycSubQueFormRowMapper kycSubQueFormRowMapper;
    private final KycAnswerRowMapper kycAnswerRowMapper;
    private final ApplicantFormRowMapper applicantFormRowMapper;

    @Override
    @Transactional
    public ApplicantForm fetchApplicantFormById(Integer id) {
        return this.applicantFormRepository.findById(id).get();
    }


    @Override
    public Integer getmaxNumberOfPrint(Integer id) {
        Integer numberOfPrint = 0;
        try {
            String sql = "SELECT numberOfPrint  FROM kyc_applicant_form where id=?";
            numberOfPrint = jdbcTemplate.queryForObject(sql, new Object[]{id}, Integer.class);
            return numberOfPrint;
        } catch (DataAccessException e) {
            System.err.println("Error getNumberOfPrint: " + e.getMessage());
            e.printStackTrace();
        }
        return numberOfPrint;
    }

    @Override
    public List<KycFormFeildData> fetchAllKycFormFeild(Integer kycId) {
        Map<String, Object> parameters = new HashMap<>();
        final KycFormFeildRowMapper rowMapper = new KycFormFeildRowMapper();
        String Qry = "SELECT " + rowMapper.tableSchema();
        String whereClause = " WHERE kycId=? AND a.questionId=b.id AND a.status='A' ";
        Qry = Qry + whereClause;
        final List<KycFormFeildData> kycFormFeildData = jdbcTemplate.query(Qry, new Object[]{kycId}, kycFormFeildRowMapper);
        return kycFormFeildData;
    }

    @Override
    public List<KycSubQueFormData> fetchAllKycSubQueForm(Integer kycId, Integer questionId) {
        Map<String, Object> parameters = new HashMap<>();
        final KycSubQueFormRowMapper rowMapper = new KycSubQueFormRowMapper();
        String Qry = rowMapper.tableSchema();
        String whereClause = " WHERE a.kycId=? AND a.questionId =? AND a.status='A' AND b.multiQuestion=1 ";
//        String whereClause = " WHERE kycId=? AND a.questionId =? AND a.questionId=b.id AND c.`questionId`=b.`id` AND a.status='A' AND b.multiQuestion=1 ";
        // "AND (a.subQuestionId IS NOT NULL OR a.subQuestionId!=0)";
        Qry = Qry + whereClause;
        final List<KycSubQueFormData> subQueFormData = jdbcTemplate.query(Qry, new Object[]{kycId, questionId}, kycSubQueFormRowMapper);
        return subQueFormData;
    }

    @Override
    public List<KycAnswerData> fetchAllKycAnswer(Integer kycId,Integer questionId,Integer subQuestionId) {
        Map<String, Object> parameters = new HashMap<>();
        final KycAnswerRowMapper rowMapper = new KycAnswerRowMapper();
        String Qry = "SELECT " + rowMapper.tableSchema();
        String whereClause = " WHERE kycId=? AND a.questionId =? AND subQuestionId =? AND a.questionId=b.id AND a.status='A' ";
        //  "AND a.subQuestionId IS NOT NULL OR a.subQuestionId!=0";
        Qry = Qry + whereClause;
        final List<KycAnswerData> answerData = jdbcTemplate.query(Qry, new Object[]{kycId,questionId,subQuestionId}, kycAnswerRowMapper);
        return answerData;
    }


    @Override
    public List<KycFormPayLoad> fetchAllKycForm(Integer kycId) {

        // Fetch all form fields
        List<KycFormFeildData> kycFormFeildDataList = fetchAllKycFormFeild(kycId);
        List<KycFormPayLoad> kycFormPayLoads = new ArrayList<>();

        // Iterate over each form field
        for (KycFormFeildData applicantForm : kycFormFeildDataList) {

            KycFormPayLoad kycFormPayLoad = new KycFormPayLoad();
            KycFormDto kycFormDto = new KycFormDto();
            Integer questionId = applicantForm.getId();

            List<KycSubQueFormData> kycSubQueFormDataList = new ArrayList<>();

            // Fetch sub-questions if multi-question is enabled
            if (applicantForm.getMultiQuestion() != 0) {
                kycSubQueFormDataList = fetchAllKycSubQueForm(kycId, questionId);

                // Iterate over each sub-question
                for (KycSubQueFormData kycSubQueFormData : kycSubQueFormDataList) {
                    Integer subQuestionId = kycSubQueFormData.getSubQuestionId();

                    // Fetch answers for each sub-question
                    List<KycAnswerData> kycAnswerData = new ArrayList<>();
                    if (subQuestionId != 0) {
                        kycAnswerData = fetchAllKycAnswer(kycId, questionId, subQuestionId);
                    }

                    kycSubQueFormData.setKycAnswerData(kycAnswerData);
                }
            }

            // Set basic form details
            kycFormDto.setId(applicantForm.getId());
            kycFormDto.setName(applicantForm.getName());
            kycFormDto.setDescription(applicantForm.getDescription());
            kycFormDto.setMultiQuestion(applicantForm.getMultiQuestion());

            // Fetch answers for the main question
            List<KycAnswerData> kycAnswerData = fetchAllKycAnswer(kycId, questionId, 0);
            kycFormDto.setKycSubQueFormData(kycSubQueFormDataList);
            kycFormDto.setKycAnswerData(kycAnswerData);

            // Set the DTO into the payload
            kycFormPayLoad.setKycFormDto(kycFormDto);

            // Add the payload to the list
            kycFormPayLoads.add(kycFormPayLoad);
        }

        return kycFormPayLoads;
    }



    @Override
    public List<ApplicantFormData> fetchAllApplicantFormData() {
        final ApplicantFormRowMapper rowMapper = new ApplicantFormRowMapper();
        String Qry = "SELECT " + rowMapper.tableSchema();
        String whereClause = " WHERE a.isCompleted = 0  AND a.STATUS = 'A'";
        Qry = Qry + whereClause;
        final List<ApplicantFormData> applicantFormData = jdbcTemplate.query(Qry, applicantFormRowMapper,
                new Object[]{}
        );
        return applicantFormData;
    }


}


