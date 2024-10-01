// import { useState } from 'react';
// import { Grid, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import { Search as SearchIcon } from '@mui/icons-material';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import PepSearchApiService from '../../data/services/pep/PepSearch/pepSearch-api-service';
// import Header from '../../layouts/header/header';
// import { Card } from 'react-bootstrap';

// export interface PepSearchData {
//     searchDtos: SearchDto[];
// }

// export interface SearchDto {
//     id: number;
//     name: string;
//     searchingScore: number | null;
//     uid: number;
//     fromDate: string;
//     toDate: string;
//     searchDetailsData: SearchDetailsData[];
// }

// export interface SearchDetailsData {
//     id: number;
//     searchId: number;
//     name: string;
//     matchingScore: number;
//     uid: number;
//     fromDate: string;
//     toDate: string;
// }

// function ReportSearch() {



//     const [startDate, setStartDate] = useState<Date>(new Date());
//     const [endDate, setEndDate] = useState<Date>(new Date());
//     const [data, setData] = useState<PepSearchData[]>([]);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedSearchDetails, setSelectedSearchDetails] = useState<SearchDetailsData[]>([]);

//     const handleSearch = () => {
//         const apiService = new PepSearchApiService();
//         apiService.getCustomDate(startDate, endDate)
//             .then((fetchedData: PepSearchData[]) => {
//                 const transformedData: PepSearchData[] = fetchedData.map(entry => {
//                     let searchDtos: SearchDto[] = [];
//                     if (Array.isArray(entry.searchDtos)) {
//                         searchDtos = entry.searchDtos;
//                     } else if (entry.searchDtos && typeof entry.searchDtos === 'object') {
//                         searchDtos = [entry.searchDtos as SearchDto];
//                     }
//                     const transformedEntry = {
//                         searchDtos: searchDtos.map(dto => ({
//                             ...dto,
//                             searchDetailsData: Array.isArray(dto.searchDetailsData) ? dto.searchDetailsData : []
//                         }))
//                     };
//                     return transformedEntry;
//                 });
//                 setData(transformedData);
//             })
//             .catch((error: any) => {
//                 console.error('API request error:', error);
//             });
//     };
//     const handleRowClick = (searchDetails: SearchDetailsData[]) => {
//         console.log("Row clicked!");  // Basic log to see if function is triggered
//         console.log("Search details data:", searchDetails);  // Log full search details array
//         searchDetails.forEach((detail) => {
//             console.log("ID:", detail.id);  // Log each individual ID in the search details
//         });
//         setSelectedSearchDetails(searchDetails);
//         setShowModal(true);
//     };


//     const handleCloseModal = () => {
//         setShowModal(false);
//         setSelectedSearchDetails([]);
//     };

//     return (
//         <>
//             <Box sx={{ display: 'flex' }}>
//                 <Header />
//                 <Box component="main" sx={{ flexGrow: 1, p: 3,mt:4 }}>
//                     <Box 
//                     sx={{
//                         marginLeft: '15px',
//                         marginBottom: '20px',
//                         marginTop:'44px'
//                       }}

//                     >
//                        <Typography><strong>REPORT</strong> </Typography>
//                         <Paper elevation={3} sx={{ p: 3, mb: 5,mt:2 }}>
//                             <Grid container spacing={3} alignItems="center" style={{marginTop:'0px'}}>
//                                 <Grid item xs={2}>
//                                     <Typography><strong>Start Date</strong></Typography>
//                                     <DatePicker
//                                         selected={startDate}
//                                         onChange={(date: Date) => setStartDate(date)}
//                                         dateFormat="MMMM d, yyyy"
//                                         className="form-control"
//                                     />
//                                 </Grid>
//                                 <Grid item xs={2}>
//                                     <Typography><strong>End Date</strong></Typography>
//                                     <DatePicker
//                                         selected={endDate}
//                                         onChange={(date: Date) => setEndDate(date)}
//                                         dateFormat="MMMM d, yyyy"
//                                         className="form-control"
//                                     />
//                                 </Grid>
//                                 <Grid item xs={2} style={{ marginTop: '18px' }}>
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         startIcon={<SearchIcon />}
//                                         onClick={handleSearch}
//                                         fullWidth
//                                     >
//                                         Search
//                                     </Button>
//                                 </Grid>
//                             </Grid>
//                             {data.length > 0 && (

//                                 <TableContainer
//                                     component={Card}
//                                     style={{
//                                         overflow: 'auto',
//                                         maxHeight: '400px',
//                                         width: '95%',
//                                         marginTop:'3%',
//                                     }}
//                                 >
//                                     <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }} stickyHeader>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell style={{padding: '4px',minWidth: '80px',backgroundColor: '#D3D3D3'}}><strong>Sl No</strong></TableCell>
//                                                 <TableCell style={{padding: '4px',minWidth: '80px', backgroundColor: '#D3D3D3'}}><strong>Name</strong></TableCell>
//                                                 <TableCell style={{padding: '4px', minWidth: '80px', backgroundColor: '#D3D3D3'}}><strong>Searching Score</strong></TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {data.flatMap((item: PepSearchData, idx: number) =>
//                                                 item.searchDtos.map((dto: SearchDto, index: number) => (
//                                                     <TableRow key={dto.uid} 
//                                                      hover 
//                                                     onClick={() => handleRowClick(dto.searchDetailsData)} 
//                                                     style={{ cursor: 'pointer',height:'32px' }}>
//                                                         <TableCell  style={{ padding: '4px', }}><span>{index + 1}</span></TableCell>
//                                                         <TableCell  style={{ padding: '4px', }}><span>{dto.name}</span></TableCell>
//                                                         <TableCell  style={{ padding: '4px', }}><span>{dto.searchingScore ?? 'N/A'}</span></TableCell>
//                                                     </TableRow>
//                                                 ))
//                                             )}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             )}
//                         </Paper>



//                     </Box>
//                 </Box>
//             </Box>

//             {/* Modal to display search details */}
//             <Dialog open={showModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
//                 <DialogTitle><strong>Search Details</strong></DialogTitle>
//                 <DialogContent>
//                     {selectedSearchDetails.length > 0 ? (
//                         <TableContainer>
//                             <Table>
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell><strong>Search ID</strong></TableCell>
//                                         <TableCell><strong>Name</strong></TableCell>
//                                         <TableCell><strong>Matching Score</strong></TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {selectedSearchDetails.map((detail, index) => (
//                                         <TableRow key={index}>
//                                             <TableCell>{detail.searchId}</TableCell>
//                                             <TableCell>{detail.name}</TableCell>
//                                             <TableCell>{detail.matchingScore}</TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     ) : (
//                         <Typography><span>No details available</span></Typography>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseModal} color="primary">
//                         Close
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// }

// export default ReportSearch;
import { useState } from 'react';
import { Grid, Typography, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PepSearchApiService from '../../data/services/pep/PepSearch/pepSearch-api-service';
import Header from '../../layouts/header/header';
import { Card } from 'react-bootstrap';
import SearchApiService from '../../data/services/pep_search/search-api-service';
import '../CommonStyle/Style.css'
export interface PepSearchData {
    searchDtos: SearchDto[];
}

export interface SearchDto {
    id: number;
    name: string;
    searchingScore: number | null;
    uid: number;
    fromDate: string;
    toDate: string;
    hitName: string;
    searchDetailsData: SearchDetailsData[];
}

export interface SearchDetailsData {
    id: number;
    searchId: number;
    name: string;
    matchingScore: number;
    uid: number;
    fromDate: string;
    toDate: string;
    hitName: string;
}

function ReportSearch() {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [data, setData] = useState<PepSearchData[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSearchDetails, setSelectedSearchDetails] = useState<SearchDetailsData[]>([]);
    const [detailedData, setDetailedData] = useState<SearchDetailsData[]>([]); // State for detailed data

    const apiService = new PepSearchApiService();

    const handleSearch = () => {
        apiService.getCustomDate(startDate, endDate)
            .then((fetchedData: PepSearchData[]) => {
                const transformedData: PepSearchData[] = fetchedData.map(entry => {
                    let searchDtos: SearchDto[] = [];
                    if (Array.isArray(entry.searchDtos)) {
                        searchDtos = entry.searchDtos;
                    } else if (entry.searchDtos && typeof entry.searchDtos === 'object') {
                        searchDtos = [entry.searchDtos as SearchDto];
                    }
                    const transformedEntry = {
                        searchDtos: searchDtos.map(dto => ({
                            ...dto,
                            searchDetailsData: Array.isArray(dto.searchDetailsData) ? dto.searchDetailsData : []
                        }))
                    };
                    return transformedEntry;
                });
                setData(transformedData);
            })
            .catch((error: any) => {
                console.error('API request error:', error);
            });
    };
    const pendingapiService = new SearchApiService();
    const fetchDetailedData = async (searchId: number) => {
        try {
            const detailedData = await pendingapiService.getpepLevelpending(searchId); // API call
            console.log("detailedData", detailedData)
            setDetailedData(detailedData); // Store detailed data in state
            setShowModal(true); // Open the modal only after data is fetched
        } catch (error) {
            console.error("Error fetching detailed data:", error);
        }
    };

    const handleRowClick = (searchId: number) => {
        console.log(`Row clicked with searchId: ${searchId}`);
        fetchDetailedData(searchId);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedSearchDetails([]);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Header />
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 4 }}>
                    <Box sx={{
                        marginLeft: '15px',
                        marginBottom: '20px',
                        marginTop: '44px'
                    }}>
                        <Typography className='allHeading'>REPORT</Typography>
                        <Paper elevation={3} sx={{ p: 3, mb: 5, mt: 2 }}>
                            <Grid container spacing={3} alignItems="center" style={{ marginTop: '0px' }}>
                                <Grid item xs={2}>
                                    <Typography><strong>Start Date</strong></Typography>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date: Date) => setStartDate(date)}
                                        dateFormat="MMMM d, yyyy"
                                        className="form-control"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography><strong>End Date</strong></Typography>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date: Date) => setEndDate(date)}
                                        dateFormat="MMMM d, yyyy"
                                        className="form-control"
                                    />
                                </Grid>
                                <Grid item xs={2} style={{ marginTop: '18px' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className='commonButton'
                                        // startIcon={<SearchIcon />}
                                        onClick={handleSearch}
                                        fullWidth
                                    >
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>
                            {data.length > 0 && (
                                <TableContainer
                                    component={Card}
                                    style={{
                                        overflow: 'auto',
                                        maxHeight: '400px',
                                        width: '95%',
                                        marginTop: '3%',
                                    }}>
                                    <Table size="small" aria-label="a dense table" style={{ margin: '0 auto' }} stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ padding: '4px', minWidth: '80px', backgroundColor: '#D3D3D3' }}><strong>Sl No</strong></TableCell>
                                                <TableCell style={{ padding: '4px', minWidth: '80px', backgroundColor: '#D3D3D3' }}><strong>Name</strong></TableCell>
                                                <TableCell style={{ padding: '4px', minWidth: '80px', backgroundColor: '#D3D3D3' }}><strong>Searching Score</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.flatMap((item: PepSearchData) =>
                                                item.searchDtos.map((dto: SearchDto, index: number) => ({
                                                    ...dto,
                                                    globalIndex: index + 1 + (item.searchDtos.length * (data.indexOf(item)))
                                                }))
                                            ).map((dto: SearchDto & { globalIndex: number }) => (
                                                <TableRow key={dto.id} hover onClick={() => handleRowClick(dto.id)} style={{ cursor: 'pointer', height: '32px' }}>
                                                    <TableCell style={{ padding: '4px' }}>{dto.globalIndex}</TableCell>
                                                    <TableCell style={{ padding: '4px' }}>{dto.name}</TableCell>
                                                    <TableCell style={{ padding: '4px' }}>{dto.searchingScore ?? 'N/A'}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                            )}
                        </Paper>
                    </Box>
                </Box>
            </Box>

            {/* Modal to display search details */}
            <Dialog open={showModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
                <DialogTitle><strong>Search Details</strong></DialogTitle>
                <DialogContent>
                    {detailedData.length > 0 ? (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>S.No</strong></TableCell>
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell><strong>Matching Score</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailedData.map((detail, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{detail.hitName}</TableCell>
                                            <TableCell>{detail.matchingScore ?? 'N/A'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography>No details available</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ReportSearch;

