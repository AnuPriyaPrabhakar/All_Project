import React, { useEffect, useRef, useState } from 'react';
import {

  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  IconButton
} from '@mui/material';
import { Box, TextField, Button, Grid, InputLabel, FormControl, Select, MenuItem, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';

import { Card } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../layouts/header/header';
import { Timeline, TimelineItem, TimelineContent, TimelineDot, TimelineSeparator, TimelineConnector } from '@mui/lab';
import { useSelector } from 'react-redux';
import HitdatalifecycleApiService from '../../../data/services/cms_search/hitdatalifecycle/hitdatalifecycle-api-service';
import HitcaseApiService from '../../../data/services/cms_search/hitcase/hitcase-api-service';
import SearchApiService from '../../../data/services/cms_search/search-api-service';
import ViewService from '../../../data/services/viewpage/view_api_service';
import { RecordDTO, SearchDTO } from '../../../data/services/viewservice/viewpagedetails-payload';
import ViewPageDetailsService from '../../../data/services/viewservice/viewpagedetails-api-service';
import { SelectChangeEvent } from '@mui/material/Select';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ClearIcon from '@mui/icons-material/Clear';
import { useReactToPrint } from 'react-to-print'; // Example import, adjust based on your actual library
import * as XLSX from 'xlsx';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Entityview from '../../CmsView/Entityview';
import Individualview from '../../CmsView/Individualview';
import Shipview from '../../CmsView/Shipview';
import Aircraftview from '../../CmsView/Aircraftview';


interface Notification {
  id: number;
  name: string;
  createdAt: string;
  matchingScore: number;
}

interface Levelpending {
  name: string;
  matching_score: number;
  hitName: string;
  hitScore: number;
  hitId: string;
  recId: number;
  searchId: string;
  lifcycleSearchId: string;
  recordTypeId: string;
  cmsId:string;
}
interface Status {
  id: string;
  name: string;
  // Add other properties if necessary
}

interface DisabledIcons {
  [key: string]: boolean;
}
const NotificationComponent: React.FC = () => {
  const userDetails = useSelector((state: any) => state.loginReducer);
  const userFirstName = userDetails.userData?.firstName;
  const loginDetails = userDetails.loginDetails;

  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<number | null>(null);

  const [levelpending, setLevelpending] = useState<Levelpending[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RecordDTO>({

    cmsId: 0,
    cmsName: '',
    cmsRecordType: '',
    score: 0,
    recordTypeId: 0,
    criminalId: '',
    searchId: '',
    hitId: ''
});


 

  const viewservice = new ViewService();
 

  const [sortedColumn, setSortedColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showModal, setShowModal] = useState(false);
  const [showModallogical, setShowModallogical] = useState(false);
  const [showModalgroup, setShowModalgroup] = useState(false);
  const [showModalun, setShowModalun] = useState(false);

  const [selectedSearchDetails, setSelectedSearchDetails] = useState<string>(''); // Initialize with an appropriate default value

  const [statusData, setStatusData] = useState<Status[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedActions, setSelectedActions] = useState<{ [key: string]: string }>({});
  const [remarksAndActions, setRemarksAndActions] = useState<{ [key: string]: { action: string; remarks: string } }>({});

  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedCourierTracker, setSelectedCourierTracker] = useState<any | null>(null); // State to store the selected courier tracker
  const [isRemarksDialogOpen, setIsRemarksDialogOpen] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [selectedRow, setSelectedRow] = useState<string | null>(null); // Initialize with null
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  useEffect(() => {
    fetchNotifications();

    fetchStatus();

  }, [id]);
  useEffect(() => {
    const handleKeyDown = (event: { key: any; }) => {
        if (!cardRef.current) return;
        const { key } = event;
        const element = cardRef.current;
        if (key === 'ArrowUp') {
            element.scrollTop -= 50;
        } else if (key === 'ArrowDown') {
            element.scrollTop += 50;
        }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
}, []);



  const fetchNotifications = async () => {
    try {
      const notifications = await authApiService.getfirstlevelsearch();
      setNotifications(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchLevelpending = async (id: number) => {
    try {
      const levelpending = await authApiService.getcmsLevelpending(id);
      setLevelpending(levelpending);
    } catch (error) {
      console.error("Error fetching the details:", error);
      setError("Error fetching the details");
    }
  };

  const handleNotificationClick = async (id: number) => {
    if (selectedNotification === id) {
      setSelectedNotification(null); // Close the table if the same notification is clicked
    } else {
      setSelectedNotification(id); // Open the table for the clicked notification
      await fetchLevelpending(id); // Fetch the levelpending data
    }
  };
  


  const tableRef = useRef<HTMLDivElement>(null); // Assuming tableRef is used to reference a <div> in your JSX

  
  const myRef = useRef(null);


  //   const handlePrint = useReactToPrint({
  //     content: () => myRef.current
  //   });
  const handlePrint = useReactToPrint({
    content: () => myRef.current,
    pageStyle: `
    @page {
      margin-left: 20mm; /* Adjust this value as per your requirement */
    }
    body {
      margin: 0;
    }
  `,
  });

  const exportToExcel = () => {
    try {
      const dataForExport = notifications.length > 0 ? notifications.map((row) => ({
        // Id: row.,
        Name: row.name,
        matching_score: row.matchingScore,
        CreatedAt: row.createdAt,
      

      })) : [{ Message: "Your search has not returned any results." }];

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(dataForExport);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Lookup Results");
      XLSX.writeFile(workbook, "lookup_results.xlsx");
    } catch (error) {
      console.error("Error exporting data to Excel:", error);
    }
  };



  const [loading, setLoading] = useState(false);


  


  const handleCloseModallogical = () => {
    setShowModallogical(false);

  };
  const handleCloseModalgroup = () => {
    setShowModalgroup(false);

  };
  const handleCloseModalun = () => {
    setShowModalun(false);

  };
  const fetchStatus = async () => {
    try {
      const statuses: Status[] = await authApiService.getStatus(); 

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
  const handleCloseRemarksDialog = () => {
    console.log('Closing remarks dialog.');

    setIsRemarksDialogOpen(false);
    setSelectedAction(null);
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

  // const handleIconClick = (index: number, searchId: string, recId: string) => {
  //   console.log("Clicked icon at row:", index);
  //   console.log("Search ID:", searchId);
  //   console.log("Record ID:", recId);

  //   const currentIndex = page + index;
  //   const existingAction = selectedActions[currentIndex] || '';
  //   const existingRemarks = remarksAndActions[currentIndex]?.remarks || '';

  //   setSelectedStatus(existingAction);
  //   setRemarks(existingRemarks);
  //   setSelectedRow(currentIndex);
  //   setIsRemarksDialogOpen(true);
  // };
  const [disabledIcons, setDisabledIcons] = useState<DisabledIcons>({});

  const handleIconClick = (index: number, searchId: string, recId: string) => {
    console.log("Clicked icon at row:", index);
    console.log("Search ID:", searchId);
    console.log("Record ID:", recId);

    const currentIndex = `${searchId}-${recId}-${index}`;
    const existingAction = selectedActions[currentIndex] || '';
    const existingRemarks = remarksAndActions[currentIndex]?.remarks || '';

    setSelectedStatus(existingAction);
    setRemarks(existingRemarks);
    setSelectedRow(currentIndex);
    setIsRemarksDialogOpen(true);
  };
  const [dialogComponent, setDialogComponent] = useState<React.ReactNode>(null);


  const handleTableRowClick = (
    cmsId: any,
    cmsRecordType: any,
    recordTypeId: any,
    index: number,
    searchId: string,
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

    // Pass the props when setting the dialog component
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
      if (selectedRow !== null && levelpending.some(record => `${record.searchId}-${record.recId}-${levelpending.indexOf(record)}` === selectedRow)) {
        const updatedRemarksAndActions = { ...remarksAndActions };
        updatedRemarksAndActions[selectedRow] = { action: selectedStatus, remarks };

        setRemarksAndActions(updatedRemarksAndActions);

        const selectedSearchResult = levelpending.find(record => `${record.searchId}-${record.recId}-${levelpending.indexOf(record)}` === selectedRow);

        if (!selectedSearchResult) {
          console.error("Selected search result is undefined");
          return;
        }

        const hitdatalifecyclePayload = {
          searchId: selectedSearchResult.searchId,
          criminalId: selectedSearchResult.recId.toString(),
          statusId: selectedStatus,
          remark: remarks,
          hitId: selectedSearchResult.hitId,
          levelId: '1',
          caseId: '0',
          uid: loginDetails.id,
        };

        const hitcasePayload = {
          display: '-',
          searchId: selectedSearchResult.searchId,
          hitId: selectedSearchResult.hitId,
          criminalId: selectedSearchResult.recId.toString(),
          levelId: '1',
          statusNowId: selectedStatus,
          cycleId: '1',
          remark: remarks,
          uid: loginDetails.id,
        };

        console.log("hitdatalifecycle Payload:", hitdatalifecyclePayload);
        console.log("hitCasePayload:", hitcasePayload);

        if (parseInt(selectedStatus) == 1) {
          await hitdatalifecycleApiService.CreateHitdatalifecycle(hitdatalifecyclePayload);
        } else if (parseInt(selectedStatus) == 2) {
          await hitcaseApiService.CreateHitCaseInsert(hitcasePayload);
        }

        setSelectedActions({
          ...selectedActions,
          [selectedRow]: selectedStatus,
        });

        setDisabledIcons({
          ...disabledIcons,
          [selectedRow]: true,
        });

        setIsRemarksDialogOpen(false);
      } else {
        console.error("Selected row is null, invalid, or out of bounds");
      }
    } catch (error) {
      console.error("Error submitting remarks:", error);
    }
    handleCloseModal();
    handleCloseModallogical();
    handleCloseModalgroup();
    handleCloseModalun();
  };
  const authApiService = new SearchApiService();
  const hitdatalifecycleApiService = new HitdatalifecycleApiService();
  const hitcaseApiService = new HitcaseApiService();

  return (
    <>

      <Box sx={{ display: 'flex',fontFamily: "Bookman Old Style",
              fontSize: "12px" }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3,m:4 ,fontFamily: "Bookman Old Style",
              fontSize: "12px"}}>
          <Box >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '95%' ,fontFamily: "Bookman Old Style",
              fontSize: "12px"}}>

              <IconButton

                color="primary"

                onClick={exportToExcel}
                style={{ minWidth: 'unset', padding: '2px' }}
              >
                <FileDownloadIcon />
              </IconButton>

            </div>
            <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' ,fontFamily: "Bookman Old Style",
              fontSize: "12px"}}>
              {notifications && notifications.length > 0 ? (
                <>
                  <TableContainer style={{ maxHeight: '600px', overflow: 'auto',fontFamily: "Bookman Old Style",
              fontSize: "12px" }}>
                    <Table size="small" aria-label="a dense table" style={{ margin: '0 auto',fontFamily: "Bookman Old Style",
              fontSize: "12px" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'lightgray',fontFamily: "Bookman Old Style",
              fontSize: "12px" }}>S.No</TableCell>
                          <TableCell style={{ position: 'sticky', top: 0,backgroundColor: 'lightgray',fontFamily: "Bookman Old Style",
              fontSize: "12px"}}>Name</TableCell>
                          <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'lightgray',fontFamily: "Bookman Old Style",
              fontSize: "12px" }}>MatchingScore</TableCell>
                          <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'lightgray',fontFamily: "Bookman Old Style",
              fontSize: "12px" }}>Created At</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {notifications.map((notification, index) => (
                          <React.Fragment key={notification.id}>
                            <TableRow>
                            <TableCell>{index + 1}</TableCell> 
                            <TableCell>
                                <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleNotificationClick(notification.id)}>{notification.name}</span>
                              </TableCell>
                              <TableCell>{(notification.matchingScore)}</TableCell>

                              <TableCell>{new Date(notification.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                            {selectedNotification === notification.id && (
                              <TableRow >
                                <TableCell colSpan={2}>
                                  <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '20%' }}>
                                    {error ? (
                                      <Typography variant="body2" color="error">{error}</Typography>
                                    ) : (
                                      levelpending.length > 0 ? (
                                        <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>

                                          <TableContainer style={{ maxHeight: '400px', overflow: 'auto' }}>
                                            <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }}>
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>Hit Name</TableCell>
                                                  <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white' }}>Hit Score</TableCell>
                                                  <TableCell style={{ position: 'sticky', top: 0, backgroundColor: 'white',zIndex:'1' }}>Action</TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody>
                                                {levelpending.map((record, index) => {
                                                  const currentIndex = `${record.searchId}-${record.recId}-${index}`;
                                                  const selectedAction = selectedActions[currentIndex];
                                                  return (
                                                    <React.Fragment key={record.recId}>
                                                      <TableRow>

                                                        <TableCell>
                                                          <button
                                                            style={{
                                                              // cursor: 'pointer',
                                                              color: 'blue',
                                                              textDecoration: 'underline',
                                                              border: '0px solid blue',  // Example border style
                                                              backgroundColor: 'white'
                                                            }}
                                                            onClick={() =>
                                                            
                                                                handleTableRowClick(
                                                                  record.cmsId,
                                                                  record.recId,
                                                                  record.recordTypeId,
                                                                  index,
                                                                  record.searchId
                                                                  
                                                                )
                                                            }
                                                            disabled={disabledIcons[`${record.searchId}-${record.cmsId}${record.recId}-${index}`]}

                                                          >
                                                            {record.hitName}
                                                          </button>
                                                        </TableCell>


                                                        <TableCell>{record.hitScore}</TableCell>
                                                        <TableCell>
                                                          <IconButton onClick={() => handleIconClick(index, record.searchId, record.recId.toString())} style={{ padding: '1px 1px' }}
                                                            disabled={disabledIcons[`${record.searchId}-${record.recId}-${index}`]}
                                                          >
                                                            {selectedAction ? (
                                                              <VisibilityOffIcon style={{ color: 'red' }} />
                                                            ) : (
                                                              <VisibilityIcon style={{ color: 'green' }} />
                                                            )}
                                                          </IconButton>
                                                          {selectedAction && <span>{getStatusName(selectedAction)}</span>}
                                                        </TableCell>
                                                      </TableRow>
                                                    </React.Fragment>
                                                  );
                                                })}
                                              </TableBody>
                                            </Table>
                                          </TableContainer>
                                        </Card>
                                      ) : (
                                        <Typography variant="body2">No Pending data available</Typography>
                                      )
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <Typography variant="body1">No FirstLevelPending available</Typography>
              )}
            </Card>

          </Box>
        </Box>
      </Box >
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
                    <div>Enter Remarks</div>
                                        <div style={{ textAlign: 'center' }}>
                                            Select a status and enter remarks for this employee.
                                        </div>
                                        <div>
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
                                                    <div style={{ textAlign: 'center' }}>
                                                        Enter your remarks for this action.
                                                    </div>

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
                                        </div>
                               
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <DialogActions>
                                            <Button variant="contained" onClick={handleCloseModal}>Close</Button>
                                            {selectedStatus && (
                                                <Button variant="contained" onClick={handleRemarksSubmit} color="primary">
                                                    Submit
                                                </Button>
                                            )}
                                        </DialogActions>
                                    </div>
                </DialogContent>
            </Dialog>
            
   

    </>
  );
};

export default NotificationComponent;
