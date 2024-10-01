
import React, { useState, useEffect } from 'react';
import {
  TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
  Grid, FormControl, InputLabel, Select, MenuItem, Button, Box, Dialog, DialogTitle,
  DialogContent, Container, DialogActions, DialogContentText, TablePagination, IconButton,
} from '@mui/material'

import { Card } from 'react-bootstrap';

import ClearIcon from '@mui/icons-material/Clear';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; import { SelectChangeEvent } from '@mui/material';



import { start } from 'repl';
import classNames from 'classnames';
import CountryApiService from '../../../data/services/master/Country/country_api_service';

import Header from '../../../layouts/header/header';
import SearchList from '../CmsSearchList';
import statusApiService from '../../../data/services/master/status/status-api-service';
import StateApiService from '../../../data/services/master/State/state_api_service';
import { useSelector } from 'react-redux';
import SearchApiService from '../../../data/services/cms_search/search-api-service';
import PendingcasesApiService from '../../../data/services/cms_search/pendingcases/pending-api-service';
import HitcaseApiService from '../../../data/services/cms_search/hitcase/hitcase-api-service';
import RIFApiService from '../../../data/services/cms_search/rif/rif-api-service';
import { Timeline, TimelineItem, TimelineContent, TimelineDot, TimelineSeparator, TimelineConnector } from '@mui/lab';
import Entityview from '../../CmsView/Entityview';
import Individualview from '../../CmsView/Individualview';
import Shipview from '../../CmsView/Shipview';
import Aircraftview from '../../CmsView/Aircraftview';

interface Pendingcase {
  id: string;
  searchId: string;
  criminalId: string;
  hitId: string;
  criminalName: string;
  matchingScore: string;
  remark: string;
  levelId: string;
  statusId: string;
  caseId: string;
  cmsId: string;
  recordTypeId: string;
}

interface Status {
  id: string;
  name: string;
  // Add other properties if necessary
}
interface RIF {
  id: string;
  caseId: string;
  criminalId: string;
  hitId: string;
  levelId: string;
  searchId: string;
  statusId: string;
  matchScore: string;
  country: string;
  state: string;
  dob: string;
  remark: string;
  uid: string;
  criminalName: string;
  cmsId: string;
  recordTypeId: string;
}
interface Remark {
  id: number;
  criminalId: string;
  hitId: string;
  levelId: string;
  remark: string;
  searchId: string;
  statusId: string;
  name: string;
  matchingScore: string;

};



interface LevelTwo {
  remark: string;
};
interface DisabledIcons {
  [key: string]: boolean;
}

const CmsLevel3Search = () => {

  const [selectedCountry, setSelectedCountry] = useState('');

  const [selectedState, setSelectedState] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [serialNumber, setSerialNumber] = useState(1);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // State to store the selected employee
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State 
  const countryService = new CountryApiService(); // Create an instance of CountryApiService
  const [isRemarksDialogOpen, setIsRemarksDialogOpen] = useState(false);
  const [isRemarksDialogOpenRif, setIsRemarksDialogOpenRif] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [remarks, setRemarks] = useState('');
  const authApiService = new SearchApiService();
  const status = new statusApiService();
  const stateApiService = new StateApiService();
  const [statusData, setStatusData] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [pendingcase, setPendingcase] = useState<Pendingcase[]>([]);
  const [pendingRif, setPendingRif] = useState<RIF[]>([]);

  const authService = new PendingcasesApiService();
  const [selectedRow, setSelectedRow] = useState<string | null>(null); // Initialize with null
  const [selectedActions, setSelectedActions] = useState<{ [key: string]: string }>({});
  const [remarksAndActions, setRemarksAndActions] = useState<{ [key: string]: { action: string; remarks: string } }>({});
  const [showPendingAlertTable, setShowPendingAlertTable] = useState(false);
  const hitcaseApiService = new HitcaseApiService();
  const [selectedSerialNumber, setSelectedSerialNumber] = useState<number | null>(null);
  const rifService = new RIFApiService();
  const [levelOneRemark, setLevelOneRemark] = useState<Remark[]>([]);
  const [levelOneRemarkRfi, setLevelOneRemarkRfi] = useState<Remark[]>([]);
  const [levelTwoRemarkRfi, setLevelTwoRemarkRfi] = useState<Remark[]>([]);
  const [levelTwo, setLevelTwo] = useState<LevelTwo[]>([]);
  const [levelThree, setLevelThree] = useState<LevelTwo[]>([]);
  const [levelfourRemarkRfi, setLevelfourRemarkRfi] = useState<LevelTwo[]>([]);
  const [selectedCourierTracker, setSelectedCourierTracker] = useState<Pendingcase | null>(null);
  const [selectedCourierTrackers, setSelectedCourierTrackers] = useState<RIF | null>(null); // State to store the selected courier tracker
  const [loading, setLoading] = useState<boolean>(false);

  const [activeButton, setActiveButton] = useState<string | null>(null); // Changed type to 'string | null'


  const [showPendingCaseTable, setShowPendingCaseTable] = useState(false);
  const [showPendingRIFTable, setShowPendingRIFTable] = useState(false);
  const userDetails = useSelector((state: any) => state.loginReducer);
  const userFirstName = userDetails.userData?.firstName;
  const loginDetails = userDetails.loginDetails;
  const userId = loginDetails.uid;
  useEffect(() => {
    fetchStatus();
    handlePendingAlertClick();

    // const savedActions = JSON.parse(localStorage.getItem('savedActions') || '{}');
    // setSelectedActions(savedActions);
  }, [page, rowsPerPage]);



  const handlePendingAlertClick = async () => {
    try {
      setLoading(true);
      setActiveButton('case');

      let results = await authService.getPendingcaseRIF();

      // Update the state to show the pending case table
      setShowPendingCaseTable(true);
      setShowPendingRIFTable(false);

      setLoading(false);
      // Set the pending cases data to be displayed in the table
      setPendingcase(results);
      setSearchResults(results);
    } catch (error) {
      // Handle the error as needed
    }
  };
  const handlePendingRIFClick = async () => {
    try {
      setLoading(true);
      setActiveButton('rif');
      let results = await rifService.getpendingRIF();
      setPendingRif(results);
      setSearchResults(results);
      setLoading(false);
      setShowPendingRIFTable(true);
      setShowPendingCaseTable(false);


    } catch (error) {

    }
  };
  const fetchStatus = async () => {
    try {
      const filteredStatuses = await authApiService.getStatus(); // Call getType from TypeApiService
      setStatusData(filteredStatuses)
    } catch (error) {
      console.error("Error fetching types:", error);
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

  const handleCloseRemarksDialog = () => {
    setIsRemarksDialogOpen(false);
    setSelectedStatus('');
    setRemarks('');
  };
  const handleCloseRemarksDialogRif = () => {
    setIsRemarksDialogOpen(false);
    setSelectedStatus('');
    setRemarks('');
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
  };
  const handleStatusChangeRif = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
  };
  // const handleRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setRemarks(event.target.value);
  // };
  const handleRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = event.target.value.replace(/[^\w\s]/gi, '');
    setRemarks(filteredValue);
  };
  const handleRemarksChangeRif = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemarks(event.target.value);
  };




  const [disabledIcons, setDisabledIcons] = useState<DisabledIcons>({});

  const handleIconClick = (index: number, searchId: string,cmsId: string, criminalId: string, hitId: string) => {
    console.log("Clicked icon at row:", index);
    console.log("Search ID:", searchId);
    console.log("ids:", criminalId);

    const currentIndex = `${searchId}-${cmsId}-${criminalId}-${hitId}-${index}`;
    const existingAction = selectedActions[currentIndex] || '';
    const existingRemarks = remarksAndActions[currentIndex]?.remarks || '';
    const selectedSearchResult = pendingcase[index];
    const selectedSearchResults = pendingRif[index]
    setSelectedCourierTracker(selectedSearchResult);
    setSelectedCourierTrackers(selectedSearchResults)
    setSelectedStatus(existingAction);

    setRemarks(existingRemarks);
    setSelectedRow(currentIndex);
    setIsRemarksDialogOpen(true);
    handleLevelOneRemark(criminalId, hitId);
    handleLevelTwoRemarkRfi(criminalId, hitId);
    handleLevelThreeRemarkRfi(criminalId, hitId);
    handleLevelthreeStatusTwo(criminalId, hitId);
    handleLevelOneStatusTwo(criminalId, hitId);
    handleLevelfourRemarkRfi(criminalId, hitId);

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
      if (selectedRow !== null && searchResults.some(alert => `${alert.searchId}-${alert.id}-${alert.criminalId}-${alert.hitId}-${searchResults.indexOf(alert)}` === selectedRow)) {
        const updatedRemarksAndActions = { ...remarksAndActions };
        updatedRemarksAndActions[selectedRow] = { action: selectedStatus, remarks };

        setRemarksAndActions(updatedRemarksAndActions);
        const selectedSearchResult = searchResults.find(alert => `${alert.searchId}-${alert.id}-${alert.criminalId}-${alert.hitId}-${searchResults.indexOf(alert)}` === selectedRow);

        if (selectedSearchResult) {
          // alert(selectedSearchResult.searchId + '' + selectedSearchResult.criminalId + '' + selectedSearchResult.hitId);
          // alert('(selectedSearchResult.searchId : ' + 'searchId ' + ', selectedSearchResult: ' + 'criminalId' + ', selectedSearchResult: ' + ' hitId');

          const PindingcasesPayload = {
            searchId: selectedSearchResult.searchId,
            criminalId: selectedSearchResult.criminalId,
            statusId: selectedStatus,
            remark: remarks,
            hitId: selectedSearchResult.hitId,
            levelId: '4',
            caseId: selectedSearchResult.caseId,
            uid: '1', // Ensure 'userId' or a valid user ID is used here
            criminalName: '',
            matchingScore: '0' // You can set an appropriate value for matchingScore
          };
          // Assuming CreateCaseLifeCycleImplInsert is accessible from this scope

          await authService.CreateCaseLifeCycleImplInsert(PindingcasesPayload);
          // Handle the response if needed
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
      console.error('Error submitting remarks:', error);
      // Handle any other errors that might occur
    }
  }
  const handleLevelOneRemark = async (criminalId: any, hitId: any) => {
    try {
      const response = await authService.getPendingOneRemarkDetails(criminalId, hitId, 1, 1);
      console.log("Request:", response);
      setLevelOneRemark(response);
    } catch (error) {
      console.log("Error fetching the handleLevelOneRemark:", error);
    }
  };

  const handleLevelTwoRemarkRfi = async (criminalId: any, hitId: any) => {
    try {
      const response = await authService.getPendingTwoRemarkDetails(criminalId, hitId, 2, 2);
      setLevelTwoRemarkRfi(response);
    } catch (error) {
      console.log("Error fetching the handleLevelOneRemarkRfi:", error);
    }
  };

  const handleLevelOneStatusTwo = async (criminalId: any, hitId: any) => {
    try {
      const response = await authService.getPendingOneStatusTwoRemarkDetails(criminalId, hitId, 1, 2);
      setLevelTwo(response);
    } catch (error) {
      console.log("Error feching the handleLevelOneStatusTwo:", error);
    }
  };

  const handleLevelthreeStatusTwo = async (criminalId: any, hitId: any) => {
    try {
      const response = await authService.getPendingthreeStatusTwoRemarkDetails(criminalId, hitId, 3, 2);
      setLevelThree(response);
    } catch (error) {
      console.log("Error fetching the handleLevelthreeStatusTwo:", error);
    }
  };

  const handleLevelThreeRemarkRfi = async (criminalId: any, hitId: any) => {
    try {
      const response = await authService.getPendingOneRemarkDetails(criminalId, hitId, 3, 3);
      setLevelOneRemarkRfi(response);
    } catch (error) {
      console.log("Error fetching the handleLevelOneRemarkRfi:", error);
    }
  };
  const handleLevelfourRemarkRfi = async (criminalId: any, hitId: any) => {
    try {
      const response = await authService.getPendingOneRemarkDetails(criminalId, hitId, 4, 3);
      setLevelfourRemarkRfi(response);
    } catch (error) {
      console.log("Error fetching the handleLevelOneRemarkRfi:", error);
    }
  };


 
  const [showModal, setShowModal] = useState(false);
  const [dialogComponent, setDialogComponent] = useState<React.ReactNode>(null);



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
 

  function getStatusColor(status: string) {
    switch (status) {
      case 'Close':
        return 'red';
      case 'Escalation':
        return 'green';
      case 'Request for information':
        return 'yellow';
      default:
        return 'white';
    }
  }
  return (
    <>
      <Box sx={{ display: 'flex' ,fontFamily: "Bookman Old Style",
              fontSize: "12px"}}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3,m:4}}>
        <h6 style={{fontFamily: "Bookman Old Style",
              fontSize: "16px"}}> Level 3 Search</h6>

<div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center',gap:'10px',fontFamily: "Bookman Old Style",
              fontSize: "12px" }}>
                    <div
                      style={{
                        backgroundColor: activeButton === 'case' ? '#3f51b5' : '#007BFF',
                        color: '#fff',
                        padding: '9px 24px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        borderRadius: '4px',
                       
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease',
                        fontFamily: "Bookman Old Style",
              fontSize: "12px",
                      }}
                      onClick={handlePendingAlertClick}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = '#1976d2';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = activeButton === 'case' ? '#3f51b5' : '#007BFF';
                      }}
                    >
                      Pending Case
                    </div>
                 
                    <div
                      style={{
                        backgroundColor: activeButton === 'rif' ? '#3f51b5' : '#007BFF',
                        color: '#fff',
                        padding: '9px 24px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        borderRadius: '4px',
                     
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease',
                        fontFamily: "Bookman Old Style",
              fontSize: "12px",
                        
                      }}
                      onClick={handlePendingRIFClick}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = '#1976d2';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLElement;
                        target.style.backgroundColor = activeButton === 'rif' ? '#3f51b5' : '#007BFF';
                      }}
                    >
                      Pending RFI
                    </div>
                </div>



                {/* {isSearchTableVisible && ( */}
                <div>
                      {showPendingCaseTable && (

<TableContainer component={Card} className="table-container" sx={{ maxHeight: '70vh', overflowY: 'auto', margin: '20px', borderRadius: '10px' ,fontFamily: "Bookman Old Style",
  fontSize: "12px"}}>

            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto',fontFamily: "Bookman Old Style",
fontSize: "12px" }}>
              <TableHead sx={{ backgroundColor: '#cccdd1', position: 'sticky', top: 0,fontFamily: "Bookman Old Style",
fontSize: "12px" }}>
                <TableRow className="tableHeading">
                <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'lightgray', width: '50px',fontFamily: "Bookman Old Style",
fontSize: "14px" }}>S.No</TableCell>
        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'lightgray', width: '200px' ,fontFamily: "Bookman Old Style",
fontSize: "14px"}}>Name</TableCell>
        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'lightgray', width: '70px',fontFamily: "Bookman Old Style",
fontSize: "14px" }}>Matching Score</TableCell>
        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'lightgray', width: '200px' ,fontFamily: "Bookman Old Style",
fontSize: "14px"}}>Remark</TableCell>
        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'lightgray', width: '100px', zIndex: '1' ,fontFamily: "Bookman Old Style",
fontSize: "14px"}}>Action</TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {loading ? (
                                <TableRow>
                                  <TableCell colSpan={5} align="center">
                                    <Typography variant="body1">Loading...</Typography>
                                  </TableCell>
                                </TableRow>
                              ) : pendingcase.length > 0 ? (
                                pendingcase.map((alert, index) => {
                                  const currentIndex = `${alert.searchId}-${alert.id}-${alert.criminalId}-${alert.hitId}-${index}`;
                                  const selectedAction = selectedActions[currentIndex] || '';

                                  return (
                                    <React.Fragment key={alert.id}>
                                      <TableRow key={alert.cmsId}>                                      
                                      <TableCell style={{ width: '50px',fontFamily: "Bookman Old Style",
              fontSize: "12px" }}>{index + 1}</TableCell>
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
                                            onClick={() => handleTableRowClick(alert.cmsId,

                                              alert.recordTypeId,
                                              index,
                                              alert.searchId)}
                                              disabled={disabledIcons[`${alert.searchId}-${alert.id}-${alert.criminalId}-${alert.hitId}-${index}`]}
                                          >
                                            {alert.criminalName}
                                          </button>
                                        </TableCell>
                                      {/* <TableCell>{alert.criminalName}</TableCell> */}
                                      <TableCell style={{ width: '70px' ,fontFamily: "Bookman Old Style",
              fontSize: "12px"}}>{alert.matchingScore}</TableCell>
               <TableCell style={{fontFamily: "Bookman Old Style",
              fontSize: "12px"}}>{alert.remark}</TableCell>
                                      <TableCell style={{ minWidth: '120px', zIndex: 1 }}>
                                        <IconButton
                                          onClick={() => handleIconClick(index, alert.searchId,alert.id, alert.criminalId,alert.hitId)}
                                          style={{ padding: '1px 1px' }}
                                          disabled={disabledIcons[`${alert.searchId}-${alert.id}-${alert.criminalId}-${alert.hitId}-${index}`]}
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
                          <div>

                          </div>
                        </TableContainer>
                      )}

              
                  <div>
                 
                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                      {showPendingRIFTable && (

                        <TableContainer component={Card} style={{ maxHeight: '520px', overflow: 'auto', width: "85%", margin: "1%" }}>

                          <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                            <TableHead sx={{ backgroundColor: '#cccdd1', position: 'sticky', top: 0 }}>
                              <TableRow className="tableHeading">
                                <TableCell >S.No</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Matching Score</TableCell>
                                <TableCell>Remark</TableCell>
                                <TableCell>Action</TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {loading ? (
                                <TableRow>
                                  <TableCell colSpan={5} align="center">
                                    <Typography variant="body1">Loading...</Typography>
                                  </TableCell>
                                </TableRow>
                              ) : pendingRif.length > 0 ? (
                                pendingRif.map((alert, index) => {
                                  const currentIndex = `${alert.searchId}-${alert.id}-${alert.criminalId}-${alert.hitId}-${index}`;
                                  const selectedAction = selectedActions[currentIndex] || '';

                                  return (
                                    <React.Fragment key={alert.id}>
                                      <TableRow key={alert.cmsId}>                                      
                                         <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                          <button
                                            style={{
                                              color: 'blue',
                                              textDecoration: 'underline',
                                              border: '0px solid blue',
                                              backgroundColor: 'white'
                                            }}
                                            onClick={() => handleTableRowClick(alert.cmsId,

                                              alert.recordTypeId,
                                              index,
                                              alert.searchId)}
                                              disabled={disabledIcons[`${alert.searchId}-${alert.id}-${alert.criminalId}-${alert.hitId}-${index}`]}
                                              >
                                            {alert.criminalName}
                                          </button>
                                        </TableCell>
                                      {/* <TableCell>{alert.criminalName}</TableCell> */}
                                      <TableCell>{alert.matchScore}</TableCell>
                                      <TableCell>{alert.remark}</TableCell>
                                      <TableCell style={{ minWidth: '120px', zIndex: 1 }}>
                                        <IconButton
                                          onClick={() => handleIconClick(index, alert.searchId,alert.id, alert.criminalId,alert.hitId)}
                                          style={{ padding: '1px 1px' }}
                                          disabled={disabledIcons[`${alert.searchId}-${alert.id}-${alert.criminalId}-${alert.hitId}-${index}`]}
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
                          <div>

                          </div>
                        </TableContainer>
                      )}


                    </Grid>


                  </div>
                </div>


         
        


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

              {showPendingCaseTable && selectedCourierTracker && (
                <>
                  <Timeline position="left">
                 
                    {levelOneRemark && levelOneRemark.length > 0 ? (
                      <>
                   
                         <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{levelOneRemark[0]?.name || "Name Not Available"}</div>
                            <div style={{ fontSize: '18px', color: '#555', marginBottom: '20px' }}>
                            {`Matching Score: ${levelOneRemark[0]?.matchingScore || "Matching Score Not Available"}`}
                            </div>
                        </div>


                        <TimelineItem>
                          <TimelineContent>{levelOneRemark[0]?.remark || "Remark Not Available"}</TimelineContent>
                          <TimelineSeparator>
                            <TimelineDot style={{ backgroundColor: 'green' }} />
                            <TimelineConnector style={{ background: 'blue' }} />
                          </TimelineSeparator>
                          <TimelineContent style={{ fontWeight: 'bold' }}>L1 First Review</TimelineContent>
                        </TimelineItem>
                      </>
                    ) : (
                      <TimelineItem>
                        <TimelineContent>No L1 Remark Data Available</TimelineContent>
                      </TimelineItem>
                    )}

                    <TimelineItem>
                      <TimelineContent>
                        {levelTwoRemarkRfi.length > 0 && levelTwoRemarkRfi[0]?.remark
                          ? levelTwoRemarkRfi[0].remark
                          : levelTwo.length > 0 && levelTwo[0]?.remark
                            ? levelTwo[0].remark
                            : "Not Available"}
                      </TimelineContent>
                      <TimelineSeparator>
                        <TimelineDot style={{ backgroundColor: 'green' }} />
                        <TimelineConnector style={{ background: 'blue' }} />
                        <TimelineConnector style={{ background: '#1976d2' }} />
                      </TimelineSeparator>
                      <TimelineContent style={{ fontWeight: 'bold' }}>L1 Second Review</TimelineContent>
                    </TimelineItem>

                    {/* Check if levelThree has data */}
                    <TimelineItem>
                      <TimelineContent>{levelThree && levelThree.length > 0 ? levelThree[0]?.remark || "Not Available" : "Not Available"}</TimelineContent>
                      <TimelineSeparator>
                        <TimelineDot style={{ backgroundColor: 'green' }} />
                      </TimelineSeparator>
                      <TimelineContent style={{ fontWeight: 'bold' }}>L2 Search Review</TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </>
              )}
              {showPendingRIFTable && selectedCourierTrackers && (
                <>
                  <Timeline position="left">
                    {/* Check if levelOneRemark has data */}
                    {levelOneRemark && levelOneRemark.length > 0 ? (
                      <>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>{levelOneRemark[0]?.name || "Name Not Available"}</div>
                            <div style={{ fontSize: '18px', color: '#555', marginBottom: '20px' }}>
                            {`Matching Score: ${levelOneRemark[0]?.matchingScore || "Matching Score Not Available"}`}
                            </div>
                        </div>
                        <TimelineItem>
                          <TimelineContent>{levelOneRemark[0]?.remark || "Remark Not Available"}</TimelineContent>
                          <TimelineSeparator>
                            <TimelineDot style={{ backgroundColor: 'green' }} />
                            <TimelineConnector style={{ background: 'blue' }} />
                          </TimelineSeparator>
                          <TimelineContent style={{ fontWeight: 'bold' }}>L1 First Review</TimelineContent>
                        </TimelineItem>
                      </>
                    ) : (
                      <TimelineItem>
                        <TimelineContent>No L1 Remark Data Available</TimelineContent>
                      </TimelineItem>
                    )}

                    <TimelineItem>
                      <TimelineContent>
                        {levelTwoRemarkRfi.length > 0 && levelTwoRemarkRfi[0]?.remark
                          ? levelTwoRemarkRfi[0].remark
                          : levelTwo.length > 0 && levelTwo[0]?.remark
                            ? levelTwo[0].remark
                            : "Not Available"}
                      </TimelineContent>
                      <TimelineSeparator>
                        <TimelineDot style={{ backgroundColor: 'green' }} />
                        <TimelineConnector style={{ background: 'blue' }} />
                        <TimelineConnector style={{ background: '#1976d2' }} />
                      </TimelineSeparator>
                      <TimelineContent style={{ fontWeight: 'bold' }}>L1 Second Review</TimelineContent>
                    </TimelineItem>

                    {/* Check if levelThree has data */}
                    <TimelineItem>
                      <TimelineContent>{levelThree && levelThree.length > 0 ? levelThree[0]?.remark || "Not Available" : "Not Available"}</TimelineContent>
                      <TimelineSeparator>
                        <TimelineDot style={{ backgroundColor: 'green' }} />
                      </TimelineSeparator>
                      <TimelineContent style={{ fontWeight: 'bold' }}>L2 Search Review</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineContent>{levelfourRemarkRfi && levelfourRemarkRfi.length > 0 ? levelfourRemarkRfi[0]?.remark || "Not Available" : "Not Available"}</TimelineContent>
                      <TimelineSeparator>
                        <TimelineDot style={{ backgroundColor: 'green' }} />
                      </TimelineSeparator>
                      <TimelineContent style={{ fontWeight: 'bold' }}>L2 Search Review</TimelineContent>
                    </TimelineItem>

                  </Timeline>
                </>
              )}




              <DialogTitle>Enter Remarks</DialogTitle>
              <DialogContentText style={{ textAlign: 'center' }}>
                Select a status and enter remarks for this employee.
              </DialogContentText>
              {/* <DialogContent> */}
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
                        style={{ maxHeight: '150px', }}
                      />

                    </Grid>
                  </Grid>

                </div>
              )}
              {/* </DialogContent> */}
              <DialogActions>

                {selectedStatus && (
                  <Button onClick={handleRemarksSubmit} color="primary">
                    Submit
                  </Button>
                )}
              </DialogActions>
            </Dialog>
             <Dialog open={showModal} onClose={handleCloseModal} fullWidth maxWidth="lg">
        <DialogContent>
          {dialogComponent}
         
        </DialogContent>
      </Dialog>
          </Box>
       
      </Box>

    </>
  );
}

export default CmsLevel3Search;
