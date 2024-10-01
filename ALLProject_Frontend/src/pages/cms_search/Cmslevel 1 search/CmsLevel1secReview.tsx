
import React, { useState, useEffect } from 'react';
import {
  TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Grid, FormControl, InputLabel, Select, MenuItem, Button, Box, Dialog, DialogTitle,
  DialogContent, Container, DialogActions, DialogContentText, TablePagination, IconButton,
} from '@mui/material'

import { Card } from 'react-bootstrap';

import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; import { SelectChangeEvent } from '@mui/material';

import * as XLSX from 'xlsx';
import { GetApp } from '@mui/icons-material';
import { AiFillFileExcel, AiFillPrinter } from 'react-icons/ai';
import Header from '../../../layouts/header/header';
import SearchList from '../CmsSearchList';
import statusApiService from '../../../data/services/master/status/status-api-service';

import { useSelector } from 'react-redux';
import { Timeline, TimelineItem, TimelineContent, TimelineDot, TimelineSeparator, TimelineConnector } from '@mui/lab';
import HitdatalifecycleApiService from '../../../data/services/cms_search/hitdatalifecycle/hitdatalifecycle-api-service';
import HitcaseApiService from '../../../data/services/cms_search/hitcase/hitcase-api-service';
import PendingAlertApiService from '../../../data/services/cms_search/PendingAlert/pendingalert-api-service';
import { Col, Row, Typography } from 'antd';
import SearchService from '../../../data/services/Search/search-api-service';
import { RecordTypeData } from '../../../data/services/Search/search-payload';
import Entityview from '../../CmsView/Entityview';
import Individualview from '../../CmsView/Individualview';
import Shipview from '../../CmsView/Shipview';
import Aircraftview from '../../CmsView/Aircraftview';
import SearchApiService from '../../../data/services/cms_search/search-api-service';


interface PindingcasesPayload {
  id: string;
  id1: string;
  criminalId: string;
  name: string;
  MatchScore: string;
  remark: string;
}
export interface Employee {
  id: number;
  name: string;
  dob: string;
  title: string;
  lastName: string;
  state: string;
  dist: string;
  address: string;
  designation: string;
  ministry: string;
  placeOfBirth: string;
  coName: string; // Add the missing properties 'coName' and 'department'
  department: string;
  // Add any other missing properties as needed
}
interface Hitdata {
  id: string;
  name: string;
  display: string;
  criminalId: string;
  searchId: string;
  MatchScore: string
  statusNowId: string;
  cycleId: string;
}

interface Status {
  id: string;
  name: string;
  // Add other properties if necessary
}

interface PendingAlert {
  id: string;
  searchId: string;
  hitId: string;
  criminalId: string;
  criminalName: string;
  matchingScore: string;
  remark: string;
  statusId: string;
  case_id: string;
  dt: string;
  level_id: string;
  search_id: string;
  cmsId: string;
  recordTypeId: string;
}
interface DisabledIcons {
  [key: string]: boolean;
}
const { Title, Text } = Typography;
const Levelcasedetails = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [serialNumber, setSerialNumber] = useState(1);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [pendingAlert, setPendingAlert] = useState<PendingAlert[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // State to store the selected employee
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State 
  // const [selectedAction, setSelectedAction] = useState<string>('');
  const [selectedSerialNumber, setSelectedSerialNumber] = useState<number | null>(null);
  const [selectedActionTag, setSelectedActionTag] = useState<string | null>(null); // State to store the selected action for the selected row
  const [isRemarksDialogOpen, setIsRemarksDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [remarks, setRemarks] = useState('');
  const status = new statusApiService();
  const hitdatalifecycleApiService = new HitdatalifecycleApiService();

  const hitcaseApiService = new HitcaseApiService();

  const [statusData, setStatusData] = useState<any[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null); // Initialize with null
  const [remarksData, setRemarksData] = useState<{ [key: number]: string }>({});
  const [selectedActions, setSelectedActions] = useState<{ [key: string]: string }>({});
  const [remarksAndActions, setRemarksAndActions] = useState<{ [key: string]: { action: string; remarks: string } }>({});

  const [isSearchTableVisible, setIsSearchTableVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedAction, setSelectedAction] = useState<string[]>([]);
  const [showSearchTable, setShowSearchTable] = useState(false);
  const [showPendingAlertTable, setShowPendingAlertTable] = useState(false);
  const [showPendingCaseTable, setShowPendingCaseTable] = useState(false);
  const authService = new PendingAlertApiService();
  const userDetails = useSelector((state: any) => state.loginReducer);
  const userFirstName = userDetails.userData?.firstName;
  const loginDetails = userDetails.loginDetails;
  const userId = loginDetails.uid;
  const [selectedCourierTracker, setSelectedCourierTracker] = useState<PendingAlert | null>(null); // State to store the selected courier tracker

  useEffect(() => {
    fetchStatus();
    handlePendingAlertClick();

  }, []);



  const handlePendingAlertClick = async () => {
    try {
      let results = await authService.getpendingalertdetails();
      setPendingAlert(results);
      setSearchResults(results);
      setShowPendingAlertTable(true);


    } catch (error) {

    }
  };
  const authApiService = new SearchApiService();
  const fetchStatus = async () => {
    try {
      const statuses: Status[] = await authApiService.getStatus(); // Specify the type as Status[]

      // Filter the statuses to keep only "close" and "Escalation" (matching the actual case)
      const filteredStatuses = statuses.filter((status: Status) => {
        return status.name === "close" || status.name === "Escalation";
      });

      console.log(filteredStatuses); // Add this line to check the filtered statuses
      setStatusData(filteredStatuses); // Update the statusData state with the filtered results
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };






  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    setSerialNumber(newPage * rowsPerPage + 1);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    const newPage = selectedSerialNumber !== null ? Math.floor(selectedSerialNumber / newRowsPerPage) : 0;
    setRowsPerPage(newRowsPerPage);
    setPage(newPage);
    setSerialNumber(newPage * newRowsPerPage + 1);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleTableRowClick = (
    cmsId: any,

    recordTypeId: any,
    index: number,
    searchId: string
  ) => {
    const id = String(cmsId);
    const uid = loginDetails.id;
    setShowModal(true);
    const currentIndex = `${searchId}-${cmsId}-${index}`;
    const existingAction = selectedActions[currentIndex] || '';
    const existingRemarks = remarksAndActions[currentIndex]?.remarks || '';

    setSelectedStatus(existingAction);
    setRemarks(existingRemarks);
    setSelectedRow(currentIndex);
    // alert('uid: ' + uid + ', recordTypeId: ' + recordTypeId + ', cmsId: ' + cmsId);


    switch (recordTypeId) {
      case 1:
        setDialogComponent(<Entityview cmsId={cmsId} uid={uid} recordTypeId={recordTypeId} />);
        break;
      case 2:
        setDialogComponent(<Individualview cmsId={cmsId} uid={uid} recordTypeId={recordTypeId} />);
        break;
      case 3:
        setDialogComponent(<Shipview cmsId={cmsId} uid={uid} recordTypeId={recordTypeId} />);
        break;
      case 4:
        setDialogComponent(<Aircraftview cmsId={cmsId} uid={uid} recordTypeId={recordTypeId} />);
        break;
      default:
        setDialogComponent(null);
    }
  };



  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [RecordType, setRecordType] = useState<RecordTypeData[]>([
  ]);
  const [selectedRecordType, setSelectedRecordType] = useState(0);

  const recordtype = new SearchService();
  const fetchAll = async () => {
    try {
      const AllData = await recordtype.getRecoredType();
      setRecordType(AllData);
    } catch (error) {
      console.error("Error fetching country list:", error);
    }
  };

  const handleRecordTypeChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value;
    setSelectedRecordType(typeof value === 'string' ? parseInt(value) : value);
  };



  const handleCloseRemarksDialog = () => {
    setIsRemarksDialogOpen(false);
    setSelectedStatus('');
    setRemarks('');
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
  };
  const handleRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = event.target.value.replace(/[^\w\s]/gi, '');
    setRemarks(filteredValue);
  };
  // const handleRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRemarks(event.target.value);
  // };
  const [disabledIcons, setDisabledIcons] = useState<DisabledIcons>({});

  const handleIconClick = (index: number, searchId: string, cmsId: string) => {
    // alert(index);
    const currentIndex = `${searchId}-${cmsId}-${index}`;
    const existingAction = selectedActions[currentIndex] || '';
    const existingRemarks = remarksAndActions[currentIndex]?.remarks || '';
    const selectedAlert = pendingAlert[index];
    setSelectedCourierTracker(selectedAlert);
    setSelectedStatus(existingAction);
    setRemarks(existingRemarks);
    setSelectedRow(currentIndex);
    setIsRemarksDialogOpen(true);
  };

  const getStatusName = (action: string) => {
    const status = statusData.find((status) => status.id === action);

    if (status) {
      // Define a mapping from status ID to CSS class
      const statusClassMap: { [key: string]: string } = {
        '1': 'green-text', // Assuming '1' corresponds to 'Closed'
        '2': 'red-text',   // Assuming '2' corresponds to 'Escalation'
        '3': 'yellow-text', // Assuming '3' corresponds to 'Request For Information'
      };

      const statusClass = statusClassMap[status.id];

      if (statusClass) {
        return (
          <span className={statusClass}>
            {status.name}
          </span>
        );
      } else {
        // If the status ID doesn't match any of the defined classes, return the status name as is
        return status.name;
      }
    } else {
      return ''; // Handle cases where the status is not found
    }
  };

  const handleRemarksSubmit = async () => {
    try {
      if (selectedRow !== null && searchResults.some(alert => `${alert.searchId}-${alert.id}-${searchResults.indexOf(alert)}` === selectedRow)) {
        const updatedRemarksAndActions = { ...remarksAndActions };
        updatedRemarksAndActions[selectedRow] = { action: selectedStatus, remarks };

        setRemarksAndActions(updatedRemarksAndActions);



        // if (selectedRow !== null && selectedRow >= 0) {
        //   const updatedRemarksAndActions = [...remarksAndActions];
        //   updatedRemarksAndActions[selectedRow] = { action: selectedStatus, remarks };

        //   setRemarksAndActions(updatedRemarksAndActions);
        const selectedSearchResult = searchResults.find(alert => `${alert.searchId}-${alert.ids}-${searchResults.indexOf(alert)}` === selectedRow);


        // const selectedSearchResult = searchResults[selectedRow];
        //alert(selectedSearchResult);

        if (selectedSearchResult) {
          const hitdatalifecyclePayload = {
            searchId: selectedSearchResult.searchId,
            criminalId: selectedSearchResult.criminalId,
            statusId: selectedStatus,
            remark: remarks,
            hitId: selectedSearchResult.hitId,
            levelId: '2',
            caseId: '0',
            uid: loginDetails.id,
          };
          const hitcasePayload = {
            //id:'null',    
            display: '-', // Replace with actual value for 'display'
            searchId: selectedSearchResult.searchId,
            hitId: selectedSearchResult.hitId,
            criminalId: selectedSearchResult.criminalId,
            levelId: '2', // Replace with the appropriate level ID
            statusNowId: selectedStatus,
            cycleId: '1', // Replace with actual value for 'cycleId'
            remark: remarks,
            uid: loginDetails.id,            //valid:'1'



          };

          console.log("hitdatalifecycle Payload:", hitdatalifecyclePayload);
          console.log("hitCasePayload:", hitcasePayload);

          if (parseInt(selectedStatus) == 1) {// Insert into hitdatalifecycle table
            await hitdatalifecycleApiService.CreateHitdatalifecycle(hitdatalifecyclePayload);
          }
          if (parseInt(selectedStatus) == 2) { // Insert into hitcase table
            // alert(hitcasePayload.criminalId);

            await hitcaseApiService.CreateHitCaseInsert(hitcasePayload);
          }
        }

        setSelectedActions({
          ...selectedActions,
          [selectedRow]: selectedStatus,
        });

        setDisabledIcons({
          ...disabledIcons,
          [selectedRow]: true,
        });

      }


      setIsRemarksDialogOpen(false);
    } catch (error) {
      console.error("Error submitting remarks:", error);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [dialogComponent, setDialogComponent] = useState<React.ReactNode>(null);




  return (
    <>
      <Box sx={{ display: 'flex',fontFamily: "Bookman Old Style",
              fontSize: "12px"}}>
      <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3, m: 4,fontFamily: "Bookman Old Style",
              fontSize: "12px" }}>

          <h6 style={{fontFamily: "Bookman Old Style",
              fontSize: "16px"}}>Level 1 Second Review</h6>
          <div>

            {showPendingAlertTable && (
              <TableContainer
              component={Card}
              className="table-container"
              sx={{
                maxHeight: '70vh',
                overflowY: 'auto',
                margin: '20px',
                borderRadius: '10px',
                fontFamily: "Bookman Old Style",
                fontSize: "12px"
              }}
            >
              <Table
                size="small"
                aria-label="a dense table"
                style={{ margin: '0 auto' }}
              >
                <TableHead sx={{ backgroundColor: '#cccdd1' }}>
                  <TableRow className="tableHeading">
                    <TableCell
                      style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'lightgray',
                        width: '50px',
                        fontFamily: "Bookman Old Style",
                        fontSize: "14px"
                      }}
                    >
                      S.No
                    </TableCell>
                    <TableCell
                      style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'lightgray',
                        width: '200px',
                        fontFamily: "Bookman Old Style",
                        fontSize: "14px"
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'lightgray',
                        width: '70px',
                        fontFamily: "Bookman Old Style",
                        fontSize: "14px"
                      }}
                    >
                      Matching Score
                    </TableCell>
                    <TableCell
                      style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'lightgray',
                        width: '200px',
                        fontFamily: "Bookman Old Style",
                        fontSize: "14px"
                      }}
                    >
                      Remark
                    </TableCell>
                    <TableCell
                      style={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: 'lightgray',
                        width: '100px',
                        zIndex: '1',
                        fontFamily: "Bookman Old Style",
                        fontSize: "14px"
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingAlert.length > 0 ? (
                    pendingAlert.map((alert, index) => {
                      const currentIndex = `${alert.searchId}-${alert.id}-${index}`;
                      const selectedAction = selectedActions[currentIndex] || '';
            
                      return (
                        <React.Fragment key={alert.id}>
                          <TableRow key={alert.cmsId}>
                            <TableCell style={{ width: '50px',fontFamily: "Bookman Old Style",
                                  fontSize: "12px" }}>
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <button
                                style={{
                                  color: 'blue',
                                  textDecoration: 'underline',
                                  border: '0px solid blue',
                                  backgroundColor: 'white',
                                  fontFamily: "Bookman Old Style",
                                  fontSize: "12px"
                                }}
                                onClick={() => handleTableRowClick(alert.cmsId, alert.recordTypeId, index, alert.searchId)}
                                disabled={disabledIcons[`${alert.searchId}-${alert.id}-${index}`]}
                              >
                                {alert.criminalName}
                              </button>
                            </TableCell>
                            <TableCell style={{ width: '70px',fontFamily: "Bookman Old Style",
                                  fontSize: "12px" }}>
                              {alert.matchingScore}
                            </TableCell>
                            <TableCell style={{fontFamily: "Bookman Old Style",
                                  fontSize: "12px"}}>{alert.remark}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => handleIconClick(index, alert.searchId, alert.id)}
                                style={{ padding: '1px 1px',fontFamily: "Bookman Old Style",
                                  fontSize: "12px" }}
                                disabled={disabledIcons[`${alert.searchId}-${alert.id}-${index}`]}
                              >
                                {selectedAction ? (
                                  <VisibilityOffIcon style={{ color: 'red' }} />
                                ) : (
                                  <VisibilityIcon style={{ color: 'green' }} />
                                )}
                              </IconButton>
                              {selectedAction && (
                                <span>{getStatusName(selectedAction)}</span>
                              )}
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            
            )}

            {/* 
            </Grid> */}

          </div>

        </Box>
      </Box>
      <Dialog
        open={isRemarksDialogOpen}
        onClose={handleCloseRemarksDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogActions>
          <Button onClick={handleCloseRemarksDialog} color="primary">

            <ClearIcon />
          </Button>
        </DialogActions>

        {selectedCourierTracker && (

          <Timeline position="left" >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{selectedCourierTracker.criminalName || "Name Not Available"}</div>
              <div style={{ fontSize: '18px', color: '#555', marginBottom: '20px' }}>
                {`Matching Score: ${selectedCourierTracker.matchingScore || "Matching Score Not Available"}`}
              </div>
            </div>

            <TimelineItem>
              <TimelineContent>{selectedCourierTracker.remark}</TimelineContent>
              <TimelineSeparator>
                <TimelineDot style={{ backgroundColor: 'green' }} />
              </TimelineSeparator>
              <TimelineContent color="text.secondary">Remark</TimelineContent>
            </TimelineItem>
          </Timeline>
        )}


        <DialogTitle>Enter Remarks</DialogTitle>
        <DialogContentText style={{ textAlign: 'center' }}>
          Select a status and enter remarks for this employee.
        </DialogContentText>
        <DialogContent>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth variant="outlined" margin="dense">
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  {statusData.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>
          </Grid>
          {selectedStatus && (
            <div>
              <DialogContentText style={{ textAlign: 'center' }}>
                Enter your remarks for this action.
              </DialogContentText>

              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="outlined-multiline-static"
                    label="Remarks"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={remarks}
                    defaultValue="Default Value"
                    onChange={handleRemarksChange}
                  />

                </Grid>
              </Grid>

            </div>
          )}
        </DialogContent>
        <DialogActions>


          <Button onClick={handleRemarksSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDialogOpen} fullWidth maxWidth="xl">
        <DialogActions>
          <Button
            onClick={() => setIsDialogOpen(false)}
            color="primary"
          >
            <ClearIcon />
          </Button>
        </DialogActions>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          {selectedEmployee && <SearchList employee={selectedEmployee} />}
        </DialogContent>
      </Dialog>
      <Dialog open={showModal} onClose={handleCloseModal} fullWidth maxWidth="lg">
        <DialogContent>
          {dialogComponent}

        </DialogContent>
      </Dialog>

    </>
  );
}

export default Levelcasedetails;


