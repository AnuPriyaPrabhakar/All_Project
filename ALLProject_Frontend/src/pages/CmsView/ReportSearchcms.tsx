import React, { useState } from 'react';
import { Table, Modal, Button, DatePicker, Row, Col } from 'antd';
import CmsSearchApiService from '../../data/services/CmsSearch/cmsSearch-api-service';
import Header from '../../layouts/header/header';
import { Box } from '@mui/material';
import moment, { Moment } from 'moment';

// Define TypeScript interfaces
export interface CmsSearchData {
  searchDtos: SearchDto[];
}

export interface SearchDto {
  name: string;
  matchingScore: number | null;
  uid: number;
  fromDate: string;
  toDate: string;
  hitRecordData: HitRecordData[];
}

export interface HitRecordData {
  id: number;
  searchId: number;
  name: string;
  matchingScore: number;
  uid: number;
  criminalId: number;
  display: string;
  statusNowId: number;
  cycleId: number;
  fromDate: string;
  toDate: string;
}

// Define columns for the main table and modal dialog
const columns = [
  {
    title: 'S.No',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Matching Score',
    dataIndex: 'matchingScore',
    key: 'matchingScore',
  },
];

const hitRecordColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Matching Score',
    dataIndex: 'matchingScore',
    key: 'matchingScore',
  },
  {
    title: 'Display',
    dataIndex: 'display',
    key: 'display',
  },
  // Add more columns as needed
];

// Main component
const App: React.FC = () => {
  const [data, setData] = useState<SearchDto[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<HitRecordData[]>([]);
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);

  // Handle DatePicker change
  const handleStartChange = (date: Moment | null) => setStartDate(date);
  const handleEndChange = (date: Moment | null) => setEndDate(date);

  const handleSearch = async () => {
    if (startDate && endDate) {
      const apiService = new CmsSearchApiService();
      try {
        const response = await apiService.getCustomDate(startDate.toDate(), endDate.toDate());
        const searchData: CmsSearchData[] = response as CmsSearchData[];
        const allSearchDtos = searchData.flatMap(data => data.searchDtos);
        setData(allSearchDtos || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  
  // Handle row click to open modal
  const handleRowClick = (record: SearchDto) => {
    setSelectedRecord(record.hitRecordData);
    setVisible(true);
  };

  return (
    <Box sx={{ display: 'flex',fontFamily: "Bookman Old Style",
      fontSize: "12px"}}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3,m:4 }}>
       
          <h5 style={{fontFamily: "Bookman Old Style",
              fontSize: "16px"}}>DATA ENTRY</h5>
          <Row style={{ marginBottom: 16 }}>
            <Col>
              <DatePicker
                value={startDate}
                onChange={handleStartChange}
                format="MMMM D, YYYY"
                className="form-control"
                placeholder="Start Date"
              />
            </Col>
            <Col style={{ marginLeft: 8 }}>
              <DatePicker
                value={endDate}
                onChange={handleEndChange}
                format="MMMM D, YYYY"
                className="form-control"
                placeholder="End Date"
              />
            </Col>
            <Col style={{ marginLeft: 8 }}>
              <Button type="primary" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={data.map((item, index) => ({
              key: index + 1,
              name: item.name,
              matchingScore: item.matchingScore,
              uid: item.uid,
              fromDate: item.fromDate,
              toDate: item.toDate,
              hitRecordData: item.hitRecordData,
            }))}
            size="small"
          
            onRow={(record) => ({
              onClick: () => handleRowClick(record as SearchDto),
            })}
           
          />

          <Modal
            title="Hit Records"
         
            visible={visible}
            onCancel={() => setVisible(false)}
            centered
            style={{ top: 20 }}
            // width={750}
           
            footer={[
              <Button key="close" onClick={() => setVisible(false)}>
                Close
              </Button>,
            ]}
          >
            <Table
              columns={hitRecordColumns}
              dataSource={selectedRecord}
              pagination={false}
              size="small"
           
            />
          </Modal>
        </Box>
      </Box>
   
  );
};

export default App;
