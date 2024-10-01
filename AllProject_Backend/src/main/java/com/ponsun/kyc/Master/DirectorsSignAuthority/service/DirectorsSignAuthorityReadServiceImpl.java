package com.ponsun.kyc.Master.DirectorsSignAuthority.service;

import com.ponsun.kyc.Master.DirectorsSignAuthority.data.DirectorsSignAuthorityData;
import com.ponsun.kyc.Master.DirectorsSignAuthority.domain.DirectorsSignAuthority;
import com.ponsun.kyc.Master.DirectorsSignAuthority.domain.DirectorsSignAuthorityRepository;
import com.ponsun.kyc.Master.DirectorsSignAuthority.domain.DirectorsSignAuthorityWrapper;
import com.ponsun.kyc.Master.DirectorsSignAuthority.rowmapper.DirectorsSignAuthorityRowMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DirectorsSignAuthorityReadServiceImpl implements DirectorsSignAuthorityReadService {
    private final DirectorsSignAuthorityWrapper wrapper;
    private final JdbcTemplate jdbcTemplate;
    private final DirectorsSignAuthorityRepository repository;
    private final DirectorsSignAuthorityRowMapper rowMapper;

    @Override
    public List<DirectorsSignAuthority> fetchAllSignAuthority() { return this.repository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public DirectorsSignAuthority fetchSignAuthorityById(Integer id) {return this.repository.findById(id).get();
    }

    @Override
    @Transactional(readOnly = true)
    public List<DirectorsSignAuthorityData> fetchAllSignAuthorityData(Integer kycId) {

            final DirectorsSignAuthorityRowMapper rowMapper = new DirectorsSignAuthorityRowMapper();
            String Qry = "SELECT " + rowMapper.tableSchema();
            String whereClause = " WHERE kycId=? AND STATUS='A'";
            Qry = Qry + whereClause;
            final List<DirectorsSignAuthorityData> signAuthorityData = jdbcTemplate.query(Qry, new Object[]{kycId}, rowMapper);
            return signAuthorityData;
        }
}

