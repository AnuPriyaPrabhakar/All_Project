package com.ponsun.kyc.Master.ApplicantFormDetails.services;
import com.ponsun.kyc.Master.ApplicantFormDetails.domain.ApplicantFormDetails;
import com.ponsun.kyc.Master.ApplicantFormDetails.domain.ApplicantFormDetailsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicantFormDetailsReadServiceImpl implements ApplicantFormDetailsReadService{
    private final JdbcTemplate jdbcTemplate;
    private final ApplicantFormDetailsRepository applicantFormDetailsRepository;
    @Override
    public ApplicantFormDetails fetchFormDetailsById(Integer id) {
        return this.applicantFormDetailsRepository.findById(id).get();
    }

    @Override
    public List <Double> getScore(Integer id) {
        List<Double> score = new ArrayList<>();

        try {
            String sql = " SELECT (SUM(score) / 100) * 40 AS calculated_score" +
                    " FROM kyc_applicant_form_details" +
                    " WHERE kycId = ? AND STATUS = 'A'";
            score = jdbcTemplate.queryForList(sql, new Object[]{id}, Double.class);

        } catch (DataAccessException e) {
            System.err.println("Error getScore: " + e.getMessage());
            e.printStackTrace();
        }
        return score;
    }
}



//    @Override
//    public Double getAverageScore(Integer id) {
//        Double Score = 0.0;
//        try {
//            String sql = " SELECT AVG(avg_value) AS average_value " +
//                    " FROM (SELECT (a.score + b.score) / 2 AS avg_value " +
//                    " FROM kyc_applicant_form_details a " +
//                    " JOIN kyc_config_answer b ON a.id = b.id WHERE a.id = ?) AS subquery";
//            Score = jdbcTemplate.queryForObject(sql, new Object[]{id}, Double.class);
//            return Score;
//        } catch (DataAccessException e) {
//            System.err.println("Error getAverageScore: " + e.getMessage());
//            e.printStackTrace();
//        }
//        return Score;
//    }