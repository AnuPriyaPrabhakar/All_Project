package com.ponsun.kyc.Master.ClientView.services;

import com.ponsun.kyc.Master.ClientView.data.ClientViewData;
import com.ponsun.kyc.Master.ClientView.rowmapper.ClientViewRowMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClientViewReadServiceImpl implements ClientViewReadService{
    private final JdbcTemplate jdbcTemplate;
    private final ClientViewRowMapper clientViewRowMapper;

    @Override
    public List<ClientViewData> fetchAllClientView(String fromDate, String toDate) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("fromDate", fromDate);
        parameters.put("toDate", toDate);
        final ClientViewRowMapper rowMapper = new ClientViewRowMapper();
        String Qry = "SELECT "  + rowMapper.tableSchema();
        String whereClause = " WHERE a.id=b.`kycId` AND b.`questionId`=1 AND b.`status`='A' AND DATE(a.created_at) BETWEEN ? AND ? ORDER BY a.created_at DESC ";
        Qry = Qry + whereClause;
        final List<ClientViewData> clientViewData = jdbcTemplate.query(Qry,clientViewRowMapper,
                new Object[] {fromDate , toDate});
        return clientViewData;
    }

    @Override
    public List<ClientViewData> fetchAllClientName() {
        Map<String, Object> parameters = new HashMap<>();
        final ClientViewRowMapper rowMapper = new ClientViewRowMapper();
        String Qry = "SELECT "  + rowMapper.tableSchema();
        String whereClause = " WHERE a.id=b.`kycId` AND b.`questionId`=1 AND b.`status`='A' AND DATE(a.created_at) ORDER BY a.created_at DESC ";
        Qry = Qry + whereClause;
        final List<ClientViewData> clientViewData = jdbcTemplate.query(Qry,clientViewRowMapper,
                new Object[] {});
        return clientViewData;
    }
}
