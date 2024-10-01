import { Card } from 'react-bootstrap';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, FormControl, InputLabel, TextField } from '@mui/material'
import { KycCriminalSearchDetails, KycSanSearchDetails, KycSearchDetails, SancHitSearchData } from '../../../data/services/master/document/document_payload';
import DocumentApiService from '../../../data/services/master/document/Document_api_service';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Replace with your preferred icon
import SearchApiService from '../../../data/services/pep_search/search-api-service';
import { CmsHitSearchData, PepHitSearchData } from '../../../data/services/pep_search/search-payload';
import HitdatalifecycleApiService from '../../../data/services/pep_search/hitdatalifecycle/hitdatalifecycle-api-service';
import HitdatalifecycleApiServices from '../../../data/services/san_search/hitdatalifecycle/hitdatalifecycle-api-service';
import HitcaseApiService from '../../../data/services/pep_search/hitcase/hitcase-api-service';
import HitcaseApiServices from '../../../data/services/san_search/hitcase/hitcase-api-service';
import statusApiService from '../../../data/services/master/status/status-api-service';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from 'antd/es/tooltip';
import Loader from '../../loader/loader';

interface Status {
    id: string;
    name: string;
};

interface PepGetSearchDetails {
    id: number;
    question: string;
    answer: string;
    name: string;
    searchingScore: number;
    uid: number;
    kycId: number;
    screeningType: number;
};
interface PepGetScreenedSearchDetails {
    id: number;
    question: string;
    answer: string;
    kycId: number;
    screeningType: number;
    applicantFormId: number;
    isScreening: number;
};
interface SancSearchData {
    id: number;
    question: string;
    answer: string;
    name: string;
    searchingScore: number;
    uid: number;
    kycId: number;
    screeningType: number;
};

interface CriminalSearchData {
    id: number;
    question: string;
    answer: string;
    name: string;
    searchingScore: number;
    uid: number;
    kycId: number;
    screeningType: number;
};

interface CriminalGetScreenedSearchDetails {
    id: number;
    question: string;
    answer: string;
    kycId: number;
    screeningType: number;
    applicantFormId: number;
    isScreening: number;
};

interface SanctionSearchData {
    id: number;
    question: string;
    answer: string;
    name: string;
    searchingScore: number;
    uid: number;
    kycId: number;
    screeningType: number;
};
interface SanctionGetScreenedSearchDetails {
    id: number;
    question: string;
    answer: string;
    kycId: number;
    screeningType: number;
    applicantFormId: number;
    isScreening: number;
};
function Document() {

    const userDetails = useSelector((state: any) => state.loginReducer);
    const documentApiService = new DocumentApiService();
    const { kycId }: { kycId?: string | number } = useParams();
    const [sanctionData, setSanctionData] = useState<SancSearchData[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [blockedRows, setBlockedRows] = useState<string[]>([]);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const [pepData, setPepData] = useState<PepGetSearchDetails[]>([]);
    const [screenedPepData, setScreenedPepData] = useState<PepGetScreenedSearchDetails[]>([]);
    const [statusData, setStatusData] = useState<Status[]>([]);
    const [criminalData, setCriminalData] = useState<CriminalSearchData[]>([]);
    const [screenedCriminalData, setScreenedCriminalData] = useState<CriminalGetScreenedSearchDetails[]>([]);
    const [screenedRows, setScreenedRows] = useState<number[]>([]);
    const [screenedCriminalRows, setScreenedCriminalRows] = useState<number[]>([]);
    const loginDetails = userDetails.loginDetails;
    const userId = loginDetails.uid;
    const [iconDisabledMap, setIconDisabledMap] = useState<Record<number, boolean>>({});
    const [iconDisabledMapCriminal, setIconDisabledMapCriminal] = useState<Record<number, boolean>>({});
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [expandedRowId, setExpandedRowId] = useState<number | null>(null);
    const [expandedcriminalRowId, setExpandedCriminalRowId] = useState<number | null>(null);
    const [expandedSanctionRowId, setExpandedSanctionRowId] = useState<number | null>(null);
    const [rowHitRecordData, setRowHitRecordData] = useState<Record<number, PepHitSearchData[]> | null>(null);
    const [rowHitCriminalRecordData, setRowHitCriminalRecordData] = useState<Record<number, CmsHitSearchData[]> | null>(null);
    const [rowHitSanctionRecordData, setRowHitSanctionRecordData] = useState<Record<number, SancHitSearchData[]> | null>(null);
    const [tooltipMessage, setTooltipMessage] = useState<{ [key: string]: string }>({});
    const [tooltipOpen, setTooltipOpen] = useState<{ [key: string]: boolean }>({});
    const [tooltipMessageCriminal, setTooltipMessageCriminal] = useState<{ [key: string]: string }>({});
    const [tooltipOpenCriminal, setTooltipOpenCriminal] = useState<{ [key: string]: boolean }>({});
    const [selectedActions, setSelectedActions] = useState<{ [key: number]: string }>({});
    const [selectedCriminalActions, setSelectedCriminalActions] = useState<{ [key: number]: string }>({});
    const [remarksAndActions, setRemarksAndActions] = useState<{ action: string; remarks: string }[]>([]);
    const [remarksAndActionsCriminal, setRemarksAndActionsCriminal] = useState<{ action: string; remarks: string }[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedCriminalStatus, setSelectedCriminalStatus] = useState<string>('');
    const [remarks, setRemarks] = useState('');
    const [remarksCriminal, setRemarksCriminal] = useState('');
    const [isRemarksDialogOpen, setIsRemarksDialogOpen] = useState(false);
    const [isRemarksDialogCriminalOpen, setIsRemarksDialogCriminalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchCriminalResults, setSearchCriminalResults] = useState<any[]>([]);
    const [searchResult, setSearchResult] = useState<any[]>([]);
    const status = new statusApiService();
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [selectedCriminalRow, setSelectedCriminalRow] = useState<number | null>(null);
    const hitdatalifecycleApiServices = new HitdatalifecycleApiServices();
    const hitdatalifecycleApiService = new HitdatalifecycleApiService();
    const hitcaseApiService = new HitcaseApiService();
    const hitcaseApiServices = new HitcaseApiServices();
    const [iconVisible, setIconVisible] = useState<Record<number, boolean>>({});
    const [selectedAction, setSelectedAction] = useState<string | null>(null);
    const [iconVisibles, setIconVisibles] = useState<{ [rowId: number]: boolean[] }>({});
    const [selectedSanctionRow, setSelectedSanctionRow] = useState<number | null>(null);
    const [selectedSanctionStatus, setSelectedSanctionStatus] = useState<string>('');
    const [sanctionRemarks, setSanctionRemarks] = useState<string>('');
    const [isSanctionRemarksDialogOpen, setIsSanctionRemarksDialogOpen] = useState(false);
    const [dialogRowId, setDialogRowId] = useState<number | null>(null);
    const [isPepScreeningDisabled, setIsPepScreeningDisabled] = useState(false);
    const searchApiService = new SearchApiService();
    const [combinedCriminalData, setCombinedCriminalData] = useState<(CriminalSearchData & { isScreening: number })[]>([]);
    const [isCriminalScreeningDisabled, setIsCriminalScreeningDisabled] = useState(false);
    const [combinedSanctionData, setCombinedSanctionData] = useState<(SanctionSearchData & { isScreening: number })[]>([]);
    const [screenedSanctionRows, setScreenedSanctionRows] = useState<number[]>([]);
    const [iconDisabledMapSanction, setIconDisabledMapSanction] = useState<Record<number, boolean>>({});
    const [screenedSanctionData, setScreenedSanctionData] = useState<SanctionGetScreenedSearchDetails[]>([]);
    const [isSanScreeningDisabled, setIsSanScreeningDisabled] = useState(false);
    const [tooltipMessageSanction, setTooltipMessageSanction] = useState<{ [key: string]: string }>({});
    const [tooltipOpenSanction, setTooltipOpenSanction] = useState<{ [key: string]: boolean }>({});
    const [selectedSanctionActions, setSelectedSanctionActions] = useState<{ [key: number]: string }>({});
    const [remarksAndActionsSanction, setRemarksAndActionsSanction] = useState<{ action: string; remarks: string }[]>([]);
    const [remarksSanction, setRemarksSanction] = useState('');
    const [isRemarksDialogSanctionOpen, setIsRemarksDialogSanctionOpen] = useState(false);
    const [isSanctionScreeningDisabled, setIsSanctionScreeningDisabled] = useState(false);
    const [loading, setLoading] = useState(false);  // Add loading state
    useEffect(() => {
        console.log('Screened Rows:', screenedRows);
    }, [screenedRows]);

    useEffect(() => {
        fetchStatus();
        const savedScreenedRows = localStorage.getItem('screenedRows');
        console.log('Saved Screened Rows from Local Storage:', savedScreenedRows);
        if (savedScreenedRows) {
            const parsedScreenedRows = JSON.parse(savedScreenedRows);
            console.log('Parsed Screened Rows:', parsedScreenedRows);
            if (Array.isArray(parsedScreenedRows)) {
                setScreenedRows(parsedScreenedRows.filter(id => id !== null));
            } else {
                console.error('Invalid data in local storage:', parsedScreenedRows);
            }
        }
        if (kycId) {
            const numericKycId = Number(kycId);
            if (!isNaN(numericKycId)) {
                fetchData(numericKycId)
                fetchPepData(numericKycId);
                fetchPepScreenedData(numericKycId);
                fetchCrimialCombinedData(numericKycId);
                fetchCriminalData(numericKycId);
                fetchCriminalScreenedData(numericKycId);
                fetchSanctionData(numericKycId);
                fetchCriminalData(numericKycId);
                fetchSanctiomCombinedData(numericKycId);
                fetchSanctionScreenedData(numericKycId);
            } else {
                console.error('Invalid kycId, cannot fetch sanction or PEP data');
            }
        } else {
            console.error('kycId is undefined, cannot fetch sanction or PEP data');
        }
        const storedBlockedRows = localStorage.getItem('blockedRows');
        if (storedBlockedRows) {
            setBlockedRows(JSON.parse(storedBlockedRows) as string[]);
        }
    }, [kycId]);

    const fetchStatus = async () => {
        try {
            const statuses: Status[] = await status.getPepStatus();
            setStatusData(statuses);
        } catch (error) {
            console.error("Error fetching statuses:", error);
        }
    };


    //Pep Combine Data
    const [combinedData, setCombinedData] = useState<(PepGetSearchDetails & { isScreening: number })[]>([]);
    const fetchData = async (kycId: number) => {
        try {
            console.log("Fetching data for kycId:", kycId);
            const pepResponse: PepGetSearchDetails[] = await documentApiService.getName(kycId);
            console.log("Fetched pepResponse:", pepResponse);
            const screenedResponse: PepGetScreenedSearchDetails[] = await documentApiService.getScreenedDataPep(kycId);
            console.log("Fetched screenedResponse:", screenedResponse);
            const combined = pepResponse.map((item: PepGetSearchDetails) => {
                const screeningStatus = screenedResponse.find((screenedItem: PepGetScreenedSearchDetails) =>
                    screenedItem.kycId === item.kycId && screenedItem.screeningType === item.screeningType
                );
                return {
                    ...item,
                    isScreening: screeningStatus ? screeningStatus.isScreening : 0
                };
            });
            setCombinedData(combined);
            setScreenedRows(combined.filter(item => item.isScreening === 1).map(item => item.kycId));
            console.log("Combined Data:", combined);
            const updatedIconDisabledMap: { [key: number]: boolean } = combined.reduce((acc: { [key: number]: boolean }, item) => {
                if (item.isScreening === 1) {
                    acc[item.screeningType] = true;
                }
                return acc;
            }, {});
            setIconDisabledMap(updatedIconDisabledMap);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchPepData = async (kycId: number) => {
        try {
            const data = await documentApiService.getName(kycId);
            const updatedData = data.map((item: any) => ({
                ...item,
                kycId: kycId
            }));
            setPepData(updatedData);
        } catch (error) {
            console.error('Error fetching PEP data:', error);
        }
    };
    const fetchPepScreenedData = async (kycId: number) => {
        try {
            const data: PepGetScreenedSearchDetails[] = await documentApiService.getScreenedDataPep(kycId);
            console.log('Fetched Screened Data:', data);
            const updatedIconDisabledMap: Record<number, boolean> = {};
            data.forEach(item => {
                if (item.isScreening === 1) {
                    updatedIconDisabledMap[item.isScreening] = true;
                }
            });
            setIconDisabledMap(updatedIconDisabledMap);
            console.log('Fetched updatedIconDisabledMap Data:', updatedIconDisabledMap);
            setScreenedPepData(data);
        } catch (error) {
            console.error('Error fetching PEP screened data:', error);
        }
    };
    const handlePepScreeningIconClick = async (row: any) => {
        if (!kycId) {
            console.error('kycId is missing');
            return;
        }
        const numericKycId = Number(kycId);
        if (isNaN(numericKycId)) {
            console.error('kycId is not a valid number');
            return;
        }
        try {
            setLoading(true); 
            // Disable the icon for the specific row
            setIconDisabledMap(prevMap => ({
                ...prevMap,
                [row.screeningType]: true
            }));

            const data = {
                name: row.answer,
                searchingScore: 80,
                uid: row.id,
                kycId: numericKycId,
                screeningType: row.screeningType,
                applicantFormId: row.applicantFormId,
                isScreening: 1
            };

            await documentApiService.createKycDetails([data]);

            // Show tooltip message only for the specific row
            setTooltipMessage(prevMessages => ({
                ...prevMessages,
                [row.screeningType]: 'Data inserted successfully'
            }));
            setTooltipOpen(prevOpen => ({
                ...prevOpen,
                [row.screeningType]: true
            }));

            // Hide tooltip after 3 seconds for the specific row
            setTimeout(() => {
                setTooltipOpen(prevOpen => ({
                    ...prevOpen,
                    [row.screeningType]: false
                }));
            }, 3000);

            // Update screened data and combined data
            const updatedScreenedData: PepGetScreenedSearchDetails[] = await documentApiService.getScreenedDataPep(numericKycId);
            setScreenedRows(updatedScreenedData.filter((item: PepGetScreenedSearchDetails) => item.isScreening === 1).map((item: PepGetScreenedSearchDetails) => item.kycId));

            const updatedCombinedData = combinedData.map(item => {
                const updatedScreeningStatus = updatedScreenedData.find(screenedItem => screenedItem.kycId === item.kycId);
                return {
                    ...item,
                    isScreening: updatedScreeningStatus ? updatedScreeningStatus.isScreening : item.isScreening
                };
            });

            setCombinedData(updatedCombinedData);
            fetchData(numericKycId)
        } catch (error) {
            console.error('API error:', error);
        } finally {
            setLoading(false);
            // Re-enable the icon for the specific row
            setIconDisabledMap(prevMap => ({
                ...prevMap,
                [row.screeningType]: false
            }));
        }
    };
    const handlePepScreeningClick = async () => {
        if (!kycId) {
            console.error('kycId is missing');
            return;
        }
        const data: KycSearchDetails[] = pepData.map(row => ({
            name: row.answer,
            searchingScore: 80,
            uid: row.id,
            kycId: Number(kycId),
            screeningType: row.screeningType,
            applicantFormId: row.id,
            isScreening: 1
        }));
        try {
            const response = await documentApiService.createKycDetails(data);
            setIsPepScreeningDisabled(true);

        } catch (error) {
            console.error('API error:', error);
        }
    };
    const handlePepRowClick = async (kycId: number, stype: number) => {
        if (expandedRowId === stype) {
            setExpandedRowId(null);
        } else {
            if (rowHitRecordData === null || !rowHitRecordData[kycId]) {
                try {
                    const data = await searchApiService.getPepHitRecordSearch(kycId);
                    setRowHitRecordData(prev => ({
                        ...(prev || {}),
                        [stype]: data
                    }));
                    setSearchResults(data);
                } catch (error) {
                    console.error('Error fetching hit record data:', error);
                }
            }
            console.log("Row clicked with stype ID:", stype);
            setExpandedRowId(stype);
        }
    };
    const handleIconClick = (row: number) => {
        const currentIndex = page * rowsPerPage + row;
        const existingAction = selectedActions[currentIndex] || '';
        const existingRemarks = remarksAndActions[currentIndex]?.remarks || '';
        setSelectedStatus(existingAction);
        setRemarks(existingRemarks);
        setSelectedRow(currentIndex);
        setIsRemarksDialogOpen(true);
    };
    const getStatusName = (action: string) => {
        const status = statusData.find((status) => status.id === action);
        if (status) {
            const statusStyleMap: { [key: string]: React.CSSProperties } = {
                '1': { color: 'red' },
                '2': { color: 'red' },
                '3': { color: 'red' },
            };
            const statusStyle = statusStyleMap[status.id] || {}; // Default to empty style if no match
            return (
                <span style={statusStyle}>
                    {status.name}
                </span>
            );
        } else {
            return '';
        }
    };
    const handleRemarksSubmit = async () => {
        try {
            console.log("handleRemarksSubmit called");
            console.log("searchResults length:", searchResults.length);
            console.log("selectedRow:", selectedRow);

            if (searchResults.length === 0) {
                console.error("No search results available");
                return;
            }

            if (selectedRow === null || selectedRow < 0 || selectedRow >= searchResults.length) {
                console.error("Selected row is invalid or out of bounds");
                return;
            }

            console.log("Selected row is valid:", selectedRow);

            // Update remarks and actions
            const updatedRemarksAndActions = [...remarksAndActions];
            updatedRemarksAndActions[selectedRow] = { action: selectedStatus, remarks };
            setRemarksAndActions(updatedRemarksAndActions);

            const selectedSearchResult = searchResults[selectedRow];

            if (!selectedSearchResult || !selectedSearchResult.id) {
                console.error("Selected search result is undefined or missing 'id'");
                return;
            }

            const hitdatalifecyclePayload = {
                searchId: selectedSearchResult.searchId,
                criminalId: selectedSearchResult.id.toString(),
                statusId: selectedStatus,
                remark: remarks,
                hitId: selectedSearchResult.hitId,
                levelId: '1',
                caseId: '0',
                uid: userId,
                dt: new Date().toISOString(),
                valid: true
            };

            const hitcasePayload = {
                display: selectedSearchResult.display,
                searchId: selectedSearchResult.searchId,
                hitId: selectedSearchResult.hitId,
                criminalId: selectedSearchResult.id.toString(),
                levelId: '1',
                statusNowId: selectedStatus,
                cycleId: '1',
                remark: remarks,
                uid: userId
            };

            console.log("Hit data lifecycle payload:", hitdatalifecyclePayload);
            console.log("Hit case payload:", hitcasePayload);

            if (parseInt(selectedStatus) === 1) {
                console.log("Status is 1, calling CreateHitdatalifecycle API");
                await hitdatalifecycleApiService.CreateHitdatalifecycle(hitdatalifecyclePayload);
            } else if (parseInt(selectedStatus) === 2) {
                console.log("Status is 2, calling CreateHitCaseInsert API");
                await hitcaseApiService.CreateHitCaseInsert(hitcasePayload);
            }

            // Update selectedActions and icon visibility
            setSelectedActions(prev => ({
                ...prev,
                [selectedRow]: selectedStatus,
            }));

            if (selectedRow !== null) {
                setIconVisible(prev => ({
                    ...prev,
                    [selectedRow]: false  // Close icon after submission
                }));
            }

            console.log("Updated selected actions:", selectedActions);
            setIsRemarksDialogOpen(false);
            console.log("Dialog closed");
        } catch (error) {
            console.error("Error submitting remarks:", error);
        }
    };

    //Criminal
    const fetchCrimialCombinedData = async (kycId: number) => {
        try {
            console.log("Fetching data for kycId:", kycId);
            const pepResponse: CriminalSearchData[] = await documentApiService.getName(kycId);
            console.log("Fetched pepResponse:", pepResponse);
            const screenedResponse: CriminalGetScreenedSearchDetails[] = await documentApiService.getScreenedDataCriminal(kycId);
            console.log("Fetched screenedResponse:", screenedResponse);
            const combinedCriminal = pepResponse.map((item: CriminalSearchData) => {
                const screeningStatus = screenedResponse.find((screenedItem: CriminalGetScreenedSearchDetails) =>
                    screenedItem.kycId === item.kycId && screenedItem.screeningType === item.screeningType
                );
                return {
                    ...item,
                    isScreening: screeningStatus ? screeningStatus.isScreening : 0
                };
            });
            setCombinedCriminalData(combinedCriminal);
            setScreenedCriminalRows(combinedCriminal.filter(item => item.isScreening === 1).map(item => item.kycId));
            console.log("Combined Data:", combinedCriminal);
            const updatedIconDisabledMapCriminal: { [combinedCriminal: number]: boolean } = combinedCriminal.reduce((acc: { [key: number]: boolean }, item) => {
                if (item.isScreening === 1) {
                    acc[item.screeningType] = true;
                }
                return acc;
            }, {});
            setIconDisabledMapCriminal(updatedIconDisabledMapCriminal);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchCriminalData = async (kycId: number) => {
        try {
            const data = await documentApiService.getName(kycId);
            const updatedData = data.map((item: any) => ({
                ...item,
                kycId: kycId
            }));
            setCriminalData(updatedData);
        } catch (error) {
            console.error('Error fetching PEP data:', error);
        }
    };
    const fetchCriminalScreenedData = async (kycId: number) => {
        try {
            const data: CriminalGetScreenedSearchDetails[] = await documentApiService.getScreenedDataCriminal(kycId);
            console.log('Fetched Criminial Screened Data:', data);
            const updatedIconDisabledMapCriminal: Record<number, boolean> = {};
            data.forEach(item => {
                if (item.isScreening === 1) {
                    updatedIconDisabledMapCriminal[item.isScreening] = true;
                }
            });
            setIconDisabledMapCriminal(updatedIconDisabledMapCriminal);
            console.log('Fetched updatedIconDisabledMapCriminal Data:', updatedIconDisabledMapCriminal);
            setScreenedCriminalData(data);
        } catch (error) {
            console.error('Error fetching PEP screened data:', error);
        }
    };
    const handleCriminalScreeningIconClick = async (row: any) => {
        if (!kycId) {
            console.error('kycId is missing');
            return;
        }
        const numericKycId = Number(kycId);
        if (isNaN(numericKycId)) {
            console.error('kycId is not a valid number');
            return;
        }
        try {
            setLoading(true); 
            // Disable the icon for the specific row
            setIconDisabledMap(prevMap => ({
                ...prevMap,
                [row.screeningType]: true
            }));

            const data = {
                name: row.answer,
                searchingScore: 80,
                uid: row.id,
                kycId: numericKycId,
                screeningType: row.screeningType,
                applicantFormId: row.applicantFormId,
                isScreening: 1
            };

            await documentApiService.createKycDetailsCriminal([data]);

            // Show tooltip message only for the specific row
            setTooltipMessageCriminal(prevMessages => ({
                ...prevMessages,
                [row.screeningType]: 'Data inserted successfully'
            }));
            setTooltipOpenCriminal(prevOpen => ({
                ...prevOpen,
                [row.screeningType]: true
            }));

            // Hide tooltip after 3 seconds for the specific row
            setTimeout(() => {
                setTooltipOpenCriminal(prevOpen => ({
                    ...prevOpen,
                    [row.screeningType]: false
                }));
            }, 3000);

            // Update screened data and combined data
            const updatedScreenedDataCriminal: CriminalGetScreenedSearchDetails[] = await documentApiService.getScreenedDataCriminal(numericKycId);
            setScreenedCriminalRows(updatedScreenedDataCriminal.filter((item: CriminalGetScreenedSearchDetails) => item.isScreening === 1).map((item: CriminalGetScreenedSearchDetails) => item.kycId));

            const updatedCombinedDataCriminal = combinedData.map(item => {
                const updatedScreeningStatusCriminal = updatedScreenedDataCriminal.find(screenedItem => screenedItem.kycId === item.kycId);
                return {
                    ...item,
                    isScreening: updatedScreeningStatusCriminal ? updatedScreeningStatusCriminal.isScreening : item.isScreening
                };
            });

            setCombinedCriminalData(updatedCombinedDataCriminal);
            fetchCrimialCombinedData(numericKycId);
        } catch (error) {
            console.error('API error:', error);
        } finally {
            setLoading(false);
            // Re-enable the icon for the specific row
            setIconDisabledMap(prevMap => ({
                ...prevMap,
                [row.screeningType]: false
            }));
        }
    };
    const handleCriminalScreeningClick = async () => {
        if (!kycId) {
            console.error('kycId is missing');
            return;
        }
        const data: KycCriminalSearchDetails[] = criminalData.map(row => ({
            id: row.id,
            name: row.answer,
            matchingScore: 80,
            searchingScore: 80,
            uid: row.id,
            kycId: Number(kycId),
            screeningType: row.screeningType,
            applicantFormId: row.id,
            isScreening: 1


        }));
        try {
            const response = await documentApiService.createKycDetailsCriminal(data);
            setIsCriminalScreeningDisabled(true);
        } catch (error) {
            console.error('API error:', error);
        }
    };
    const handleCriminalRowClick = async (kycId: number, stype: number) => {
        if (expandedcriminalRowId === stype) {
            setExpandedCriminalRowId(null);
        } else {
            if (rowHitCriminalRecordData === null || !rowHitCriminalRecordData[kycId]) {
                try {
                    const data = await searchApiService.getCriminalHitRecordSearch(kycId);
                    setRowHitCriminalRecordData(prev => ({
                        ...(prev || {}),
                        [stype]: data
                    }));
                    setSearchCriminalResults(data);
                } catch (error) {
                    console.error('Error fetching hit record data:', error);
                }
            }
            console.log("Row clicked with stype ID:", stype);
            setExpandedCriminalRowId(stype);
        }
    };
    const handleCriminalIconClick = (row: number) => {
        const currentIndex = page * rowsPerPage + row;
        const existingAction = selectedCriminalActions[currentIndex] || '';
        const existingRemarks = remarksAndActionsCriminal[currentIndex]?.remarks || '';
        setSelectedStatus(existingAction);
        setRemarksCriminal(existingRemarks);
        setSelectedCriminalRow(currentIndex);
        setIsRemarksDialogCriminalOpen(true);
    };
    const handleCriminalRemarkSubmit = async () => {
        try {
            if (selectedCriminalRow !== null && selectedCriminalRow >= 0) {
                const updatedRemarksAndActions = [...remarksAndActionsCriminal];
                updatedRemarksAndActions[selectedCriminalRow] = { action: selectedStatus, remarks };
                setRemarksAndActionsCriminal(updatedRemarksAndActions);
                const selectedSearchResult = searchCriminalResults[selectedCriminalRow];
                if (selectedSearchResult) {
                    const hitdatalifecyclePayload = {
                        searchId: selectedSearchResult.searchId,
                        criminalId: selectedSearchResult.criminalId,
                        statusId: selectedStatus,
                        remark: remarks,
                        hitId: selectedSearchResult.hitId,
                        levelId: '2',
                        caseId: '0',
                        uid: userId
                    };
                    const hitcasePayload = {
                        display: '-',
                        searchId: selectedSearchResult.searchId,
                        hitId: selectedSearchResult.hitId,
                        criminalId: selectedSearchResult.criminalId,
                        levelId: '2',
                        statusNowId: selectedStatus,
                        cycleId: '1',
                        remark: remarks,
                        uid: userId
                    };
                    if (parseInt(selectedStatus) == 1) {
                        await hitdatalifecycleApiService.CreateCriminalHitdatalifecycle(hitdatalifecyclePayload);
                    }
                    if (parseInt(selectedStatus) == 2) {
                        alert(hitcasePayload.criminalId);
                        await hitcaseApiService.CreateHitCaseInsert(hitcasePayload);
                    }
                }
            }
            setIsRemarksDialogCriminalOpen(false);
        } catch (error) {
            console.error("Error submitting remarks:", error);
        }
    };

    //Sanction

    const fetchSanctiomCombinedData = async (kycId: number) => {
        try {
            console.log("Fetching data for kycId:", kycId);
            const sanResponse: SanctionSearchData[] = await documentApiService.getName(kycId);
            console.log("Fetched sanResponse:", sanResponse);
            const screenedSanctionResponse: SanctionGetScreenedSearchDetails[] = await documentApiService.getScreenedDataSanction(kycId);
            console.log("Fetched screenedResponse:", screenedSanctionResponse);
            const combinedSanction = sanResponse.map((item: SanctionSearchData) => {
                const screeningStatus = screenedSanctionResponse.find((screenedItem: SanctionGetScreenedSearchDetails) =>
                    screenedItem.kycId === item.kycId && screenedItem.screeningType === item.screeningType
                );
                return {
                    ...item,
                    isScreening: screeningStatus ? screeningStatus.isScreening : 0
                };
            });
            setCombinedSanctionData(combinedSanction);
            setScreenedSanctionRows(combinedSanction.filter(item => item.isScreening === 1).map(item => item.kycId));
            console.log("Combined Data:", combinedSanction);
            const updatedIconDisabledMapSanction: { [combinedSanction: number]: boolean } = combinedSanction.reduce((acc: { [key: number]: boolean }, item) => {
                if (item.isScreening === 1) {
                    acc[item.screeningType] = true;
                }
                return acc;
            }, {});
            setIconDisabledMapSanction(updatedIconDisabledMapSanction);
        } catch (error) {
            console.error('Error Sanctionfetching data:', error);
        }
    };
    const fetchSanctionData = async (kycId: number) => {
        try {
            const data = await documentApiService.getName(kycId);
            const updatedData = data.map((item: any) => ({
                ...item,
                kycId: kycId
            }));
            setSanctionData(updatedData);
        } catch (error) {
            console.error('Error fetching sanction data:', error);
        }
    };
    const fetchSanctionScreenedData = async (kycId: number) => {
        try {
            const data: SanctionGetScreenedSearchDetails[] = await documentApiService.getScreenedDataSanction(kycId);
            console.log('Fetched Sanction Screened Data:', data);
            const updatedIconDisabledMapSanction: Record<number, boolean> = {};
            data.forEach(item => {
                if (item.isScreening === 1) {
                    updatedIconDisabledMapSanction[item.isScreening] = true;
                }
            });
            setIconDisabledMapSanction(updatedIconDisabledMapSanction);
            console.log('Fetched updatedIconDisabledMapSanction Data:', updatedIconDisabledMapSanction);
            setScreenedSanctionData(data);
        } catch (error) {
            console.error('Error fetching Sanction screened data:', error);
        }
    };
    const handleSanctionScreeningIconClick = async (row: any) => {
        if (!kycId) {
            console.error('kycId is missing');
            return;
        }
        const numericKycId = Number(kycId);
        if (isNaN(numericKycId)) {
            console.error('kycId is not a valid number');
            return;
        }
        try {
            setLoading(true); 
            // Disable the icon for the specific row
            setIconDisabledMap(prevMap => ({
                ...prevMap,
                [row.screeningType]: true
            }));

            const data = {
                name: row.answer,
                searchingScore: 80,
                uid: row.id,
                kycId: numericKycId,
                screeningType: row.screeningType,
                applicantFormId: row.applicantFormId,
                isScreening: 1
            };

            await documentApiService.createKycDetailsSanction([data]);

            // Show tooltip message only for the specific row
            setTooltipMessageSanction(prevMessages => ({
                ...prevMessages,
                [row.screeningType]: 'Data inserted successfully'
            }));
            setTooltipOpenSanction(prevOpen => ({
                ...prevOpen,
                [row.screeningType]: true
            }));

            // Hide tooltip after 3 seconds for the specific row
            setTimeout(() => {
                setTooltipOpenSanction(prevOpen => ({
                    ...prevOpen,
                    [row.screeningType]: false
                }));
            }, 3000);

            // Update screened data and combined data
            const updatedScreenedDataSanction: SanctionGetScreenedSearchDetails[] = await documentApiService.getScreenedDataSanction(numericKycId);
            setScreenedSanctionRows(updatedScreenedDataSanction.filter((item: SanctionGetScreenedSearchDetails) => item.isScreening === 1).map((item: SanctionGetScreenedSearchDetails) => item.kycId));

            const updatedCombinedDataSanction = combinedSanctionData.map(item => {
                const updatedScreeningStatusSanction = updatedScreenedDataSanction.find(screenedItem => screenedItem.kycId === item.kycId);
                return {
                    ...item,
                    isScreening: updatedScreeningStatusSanction ? updatedScreeningStatusSanction.isScreening : item.isScreening
                };
            });

            setCombinedSanctionData(updatedCombinedDataSanction);
            fetchSanctiomCombinedData(numericKycId);
        } catch (error) {
            console.error('API error:', error);
        } finally {
            setLoading(false);
            // Re-enable the icon for the specific row
            setIconDisabledMap(prevMap => ({
                ...prevMap,
                [row.screeningType]: false
            }));
        }
    };
    const handleSanctionScreeningClick = async () => {
        if (!kycId) {
            console.error('kycId is missing');
            return;
        }
        const data: KycSanSearchDetails[] = sanctionData.map(row => ({
            id: row.id,
            name: row.answer,
            matchingScore: 80,
            searchingScore: 80,
            uid: row.id,
            kycId: Number(kycId),
            screeningType: row.screeningType,
            applicantFormId: row.id,
            isScreening: 1
        }));
        try {
            const response = await documentApiService.createKycDetailsSan(data);
            setIsSanScreeningDisabled(true);
        } catch (error) {
            console.error('API error:', error);
        }
    };
    const handleSanctionRowClick = async (kycId: number, stype: number) => {
        if (expandedSanctionRowId === stype) {
            setExpandedSanctionRowId(null);
        } else {
            if (rowHitSanctionRecordData === null || !rowHitSanctionRecordData[kycId]) {
                try {
                    const data = await searchApiService.getSanctionHitRecordSearch(kycId);
                    setRowHitSanctionRecordData(prev => ({
                        ...(prev || {}),
                        [stype]: data,
                    }));
                    setSearchResult(data);
                    
                } catch (error) {
                    console.error('Error fetching hit record data:', error);
                }
            }
            setExpandedSanctionRowId(stype);
        }
    };
    const handleSanctionIconClick = (row: number) => {
        const currentIndex = page * rowsPerPage + row;
        const existingAction = selectedSanctionActions[currentIndex] || '';
        const existingRemarks = remarksAndActionsSanction[currentIndex]?.remarks || '';
        setSelectedStatus(existingAction);
        setRemarksSanction(existingRemarks);
        setSelectedSanctionRow(currentIndex);
        setIsRemarksDialogSanctionOpen(true);
    };
    const handleSanctionRemarksSubmit = async () => {
        try {
            console.log("handleSanctionRemarksSubmit called");
            console.log("searchResult length:", searchResult.length);
            console.log("selectedSanctionRow:", selectedSanctionRow);

            if (searchResult.length === 0) {
                console.error("No search results available");
                return;
            }

            if (selectedSanctionRow === null || selectedSanctionRow < 0 || selectedSanctionRow >= searchResult.length) {
                console.error("Selected row is invalid or out of bounds");
                return;
            }

            console.log("Selected row is valid:", selectedSanctionRow);

            const selectedSearchResult = searchResult[selectedSanctionRow];

            if (!selectedSearchResult || !selectedSearchResult.id) {
                console.error("Selected search result is undefined or missing 'id'");
                return;
            }

            // Update remarks and actions
            const updatedRemarksAndActions = [...remarksAndActions];
            updatedRemarksAndActions[selectedSanctionRow] = { action: selectedSanctionStatus, remarks: sanctionRemarks };
            setRemarksAndActions(updatedRemarksAndActions);

            const hitdatalifecyclePayload = {
                searchId: selectedSearchResult.searchId,
                criminalId: selectedSearchResult.id.toString(),
                statusId: selectedSanctionStatus,
                remark: sanctionRemarks,
                hitId: selectedSearchResult.hitId,
                levelId: '1',
                caseId: '0',
                uid: userId,
                dt: new Date().toISOString(),
                valid: true
            };

            const hitcasePayload = {
                display: selectedSearchResult.display,
                searchId: selectedSearchResult.searchId,
                hitId: selectedSearchResult.hitId,
                criminalId: selectedSearchResult.id.toString(),
                levelId: '1',
                statusNowId: selectedSanctionStatus,
                cycleId: '1',
                remark: sanctionRemarks,
                uid: userId
            };

            console.log("Hit data lifecycle payload:", hitdatalifecyclePayload);
            console.log("Hit case payload:", hitcasePayload);

            if (parseInt(selectedSanctionStatus) === 1) {
                console.log("Status is 1, calling CreateHitdatalifecycle API");
                await hitdatalifecycleApiServices.CreateHitdatalifecycle(hitdatalifecyclePayload);
            } else if (parseInt(selectedSanctionStatus) === 2) {
                console.log("Status is 2, calling CreateHitCaseInsert API");
                await hitcaseApiServices.CreateHitCaseInsert(hitcasePayload);
            }

            setIconVisibles((prev) => {
                const rowVisibles = prev[dialogRowId!] || [];
                const newVisibles = [...rowVisibles];
                newVisibles[selectedSanctionRow % rowsPerPage] = !newVisibles[selectedSanctionRow % rowsPerPage];
                return {
                    ...prev,
                    [dialogRowId!]: newVisibles,
                };
            });

            setIsSanctionRemarksDialogOpen(false);
        } catch (error) {
            console.error("Error submitting remarks:", error);
        }
    };
   






    const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleCloseRemarksDialog = () => {
        setIsRemarksDialogOpen(false);
        setSelectedStatus('');
        setRemarks('');
    };
    const handleCloseRemarksCriminalDialog = () => {
        setIsRemarksDialogOpen(false);
        setSelectedStatus('');
        setRemarks('');
    };
    const handleCloseRemarksSanctionDialog = () => {
        setIsRemarksDialogOpen(false);
        setSelectedStatus('');
        setRemarks('');
    };

    const handleRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemarks(event.target.value);
    };
    const handleCriminalRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemarksCriminal(event.target.value);
    };
    const handleSanctionRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemarksCriminal(event.target.value);
    };





   


    return (
        <>
            <Box m={6}>
                <h4 style={{ marginTop: '1%' }}>SANCTION</h4>
                <Card style={{ padding: '16px', marginTop: '16px' }}>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '8px' }}>S.No</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '8px' }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '8px', textAlign: 'center' }}>Screening</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {combinedSanctionData.map((row, index) => {
                                    const isIconDisabledSanction = row.isScreening === 1;
                                    return (
                                        <React.Fragment key={row.kycId}>
                                            <TableRow
                                                sx={{
                                                    cursor: 'pointer',
                                                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff',
                                                    '&:hover': { backgroundColor: '#e3f2fd' },
                                                    transition: 'background-color 0.3s ease',
                                                    height: 48
                                                }}
                                               
                                            >
                                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                <TableCell  
                                                 onClick={() => handleSanctionRowClick(row.kycId, row.screeningType)}
                                                >{row.answer}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <Tooltip
                                                        open={tooltipOpenSanction[row.screeningType] || false}
                                                        title={tooltipMessageSanction[row.screeningType] || ''}
                                                    >
                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Checkbox
                                                                icon={<CheckCircleIcon />}
                                                                checkedIcon={<CheckCircleIcon />}
                                                                checked={screenedSanctionRows.includes(row.kycId)}
                                                                onChange={() => handleSanctionScreeningIconClick(row)}
                                                                disabled={isIconDisabledSanction}
                                                                sx={{
                                                                    color: isIconDisabledSanction ? 'grey' : 'primary.main', // Change color when disabled
                                                                    '&.Mui-checked': { color: isIconDisabledSanction ? 'grey' : 'primary.main' },
                                                                    padding: 1
                                                                }}
                                                            />
                                                            
                                                        </Box>
                                                        {loading && <Loader />}
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>

                                            {expandedSanctionRowId === row.screeningType && rowHitSanctionRecordData && rowHitSanctionRecordData[row.screeningType] && (
                                                <TableRow>
                                                    <TableCell colSpan={4} sx={{ padding: 0 }}>
                                                        <Box
                                                            sx={{
                                                                padding: 2,
                                                                backgroundColor: '#f5f5f5',
                                                                borderTop: '1px solid #e0e0e0',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                gap: 2,
                                                                width: '100%',
                                                                boxSizing: 'border-box'
                                                            }}
                                                        >
                                                            <Typography variant="h6">Screening Record</Typography>
                                                            <Table size="small">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Name</TableCell>
                                                                        <TableCell>Matching Score</TableCell>
                                                                        <TableCell>Display</TableCell>
                                                                        <TableCell>Status</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {rowHitSanctionRecordData[row.screeningType].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, recordIndex) => {
                                                                        // Move the variable declarations here
                                                                        const currentIndex = page * rowsPerPage + recordIndex;
                                                                        const selectedSanctionAction = selectedSanctionActions[currentIndex] || '';

                                                                        return (
                                                                            <TableRow key={recordIndex}>
                                                                                <TableCell>{record.name}</TableCell>
                                                                                <TableCell>{record.matchingScore}</TableCell>
                                                                                <TableCell>{record.display}</TableCell>
                                                                                <TableCell>
                                                                                    <IconButton onClick={() => handleSanctionIconClick(recordIndex)} style={{ padding: '1px 1px' }}>
                                                                                        {selectedSanctionAction ? (
                                                                                            <VisibilityOffIcon style={{ color: 'red' }} />
                                                                                        ) : (
                                                                                            <VisibilityIcon style={{ color: 'green' }} />
                                                                                        )}
                                                                                    </IconButton>
                                                                                    {selectedSanctionAction && (
                                                                                        <span>{getStatusName(selectedSanctionAction)}</span>
                                                                                    )}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        );
                                                                    })}
                                                                </TableBody>
                                                            </Table>
                                                            <TablePagination
                                                                rowsPerPageOptions={[5, 10, 20]}
                                                                component="div"
                                                                count={rowHitSanctionRecordData[row.screeningType].length}
                                                                page={page}
                                                                onPageChange={handleChangePage}
                                                                rowsPerPage={rowsPerPage}
                                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                            />
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </Table>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSanctionScreeningClick}
                                disabled={isSanctionScreeningDisabled}
                            >
                                Screening
                            </Button>
                        </Box>
                    </TableContainer>
                    <Dialog
                        open={isRemarksDialogSanctionOpen}
                        onClose={handleCloseRemarksSanctionDialog}
                        fullWidth
                        maxWidth="md"
                    >
                        <DialogTitle>Enter Remarks</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                Select a status and enter remarks for this employee.
                            </Typography>
                            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            label="Status"
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
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
                                {selectedStatus && (
                                    <Grid item xs={12}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="remarks"
                                            label="Remarks"
                                            type="text"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={remarksCriminal}
                                            onChange={handleSanctionRemarksChange}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleSanctionRemarksSubmit} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Card>
                <h4 style={{ marginTop: '1%' }}>CRIMINAL</h4>
                <Card style={{ padding: '16px', marginTop: '16px' }}>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '8px' }}>S.No</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '8px' }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '8px', textAlign: 'center' }}>Screening</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {combinedCriminalData.map((row, index) => {
                                    const isIconDisabledCriminal = row.isScreening === 1;
                                    return (
                                        <React.Fragment key={row.kycId}>
                                            <TableRow
                                                sx={{
                                                    cursor: 'pointer',
                                                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff',
                                                    '&:hover': { backgroundColor: '#e3f2fd' },
                                                    transition: 'background-color 0.3s ease',
                                                    height: 48
                                                }}
                                              
                                            >
                                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                <TableCell
                                                  onClick={() => handleCriminalRowClick(row.kycId, row.screeningType)}
                                                >{row.answer}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <Tooltip
                                                        open={tooltipOpenCriminal[row.screeningType] || false}
                                                        title={tooltipMessageCriminal[row.screeningType] || ''}
                                                    >
                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Checkbox
                                                                icon={<CheckCircleIcon />}
                                                                checkedIcon={<CheckCircleIcon />}
                                                                checked={screenedCriminalRows.includes(row.kycId)}
                                                                onChange={() => handleCriminalScreeningIconClick(row)}
                                                                disabled={isIconDisabledCriminal}
                                                                sx={{
                                                                    color: isIconDisabledCriminal ? 'grey' : 'primary.main', // Change color when disabled
                                                                    '&.Mui-checked': { color: isIconDisabledCriminal ? 'grey' : 'primary.main' },
                                                                    padding: 1
                                                                }}
                                                            />
                                                        </Box>
                                                        {loading && <Loader />}
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>

                                            {expandedcriminalRowId === row.screeningType && rowHitCriminalRecordData && rowHitCriminalRecordData[row.screeningType] && (
                                                <TableRow>
                                                    <TableCell colSpan={4} sx={{ padding: 0 }}>
                                                        <Box
                                                            sx={{
                                                                padding: 2,
                                                                backgroundColor: '#f5f5f5',
                                                                borderTop: '1px solid #e0e0e0',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                gap: 2,
                                                                width: '100%',
                                                                boxSizing: 'border-box'
                                                            }}
                                                        >
                                                            <Typography variant="h6">Screening Record</Typography>
                                                            <Table size="small">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Name</TableCell>
                                                                        <TableCell>Matching Score</TableCell>
                                                                        <TableCell>Display</TableCell>
                                                                        <TableCell>Status</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {rowHitCriminalRecordData[row.screeningType].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, recordIndex) => {
                                                                        // Move the variable declarations here
                                                                        const currentIndex = page * rowsPerPage + recordIndex;
                                                                        const selectedCriminalAction = selectedCriminalActions[currentIndex] || '';

                                                                        return (
                                                                            <TableRow key={recordIndex}>
                                                                                <TableCell>{record.name}</TableCell>
                                                                                <TableCell>{record.matchingScore}</TableCell>
                                                                                <TableCell>{record.display}</TableCell>
                                                                                <TableCell>
                                                                                    <IconButton onClick={() => handleCriminalIconClick(recordIndex)} style={{ padding: '1px 1px' }}>
                                                                                        {selectedCriminalAction ? (
                                                                                            <VisibilityOffIcon style={{ color: 'red' }} />
                                                                                        ) : (
                                                                                            <VisibilityIcon style={{ color: 'green' }} />
                                                                                        )}
                                                                                    </IconButton>
                                                                                    {selectedCriminalAction && (
                                                                                        <span>{getStatusName(selectedCriminalAction)}</span>
                                                                                    )}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                        );
                                                                    })}
                                                                </TableBody>
                                                            </Table>
                                                            <TablePagination
                                                                rowsPerPageOptions={[5, 10, 20]}
                                                                component="div"
                                                                count={rowHitCriminalRecordData[row.screeningType].length}
                                                                page={page}
                                                                onPageChange={handleChangePage}
                                                                rowsPerPage={rowsPerPage}
                                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                            />
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </Table>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCriminalScreeningClick}
                                disabled={isCriminalScreeningDisabled}
                            >
                                Screening
                            </Button>
                        </Box>
                    </TableContainer>
                    <Dialog
                        open={isRemarksDialogCriminalOpen}
                        onClose={handleCloseRemarksCriminalDialog}
                        fullWidth
                        maxWidth="md"
                    >
                        <DialogTitle>Enter Remarks</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                Select a status and enter remarks for this employee.
                            </Typography>
                            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            label="Status"
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
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
                                {selectedStatus && (
                                    <Grid item xs={12}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="remarks"
                                            label="Remarks"
                                            type="text"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={remarksCriminal}
                                            onChange={handleCriminalRemarksChange}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCriminalRemarkSubmit} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Card>

                <h4 style={{ marginTop: '1%' }}>PEP</h4>
                <Card style={{ padding: '16px', marginTop: '16px' }}>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '8px' }}>S.No</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '8px' }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', padding: '8px', textAlign: 'center' }}>Screening</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {combinedData.map((row, index) => {
                                    const isIconDisabled = row.isScreening === 1;
                                    return (
                                        <React.Fragment key={row.kycId}>
                                            <TableRow
                                                sx={{
                                                    cursor: 'pointer',
                                                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#ffffff',
                                                    '&:hover': { backgroundColor: '#e3f2fd' },
                                                    transition: 'background-color 0.3s ease',
                                                    height: 48
                                                }}
                                               
                                            >
                                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                <TableCell
                                                 onClick={() => handlePepRowClick(row.kycId, row.screeningType)}
                                                >{row.answer}</TableCell>
                                                <TableCell sx={{ textAlign: 'center' }}>
                                                    <Tooltip
                                                        open={tooltipOpen[row.screeningType] || false}
                                                        title={tooltipMessage[row.screeningType] || ''}
                                                    >
                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Checkbox
                                                                icon={<CheckCircleIcon />}
                                                                checkedIcon={<CheckCircleIcon />}
                                                                checked={screenedRows.includes(row.kycId)}
                                                                onChange={() => handlePepScreeningIconClick(row)}
                                                                disabled={isIconDisabled}
                                                                sx={{
                                                                    color: isIconDisabled ? 'grey' : 'primary.main', // Change color when disabled
                                                                    '&.Mui-checked': { color: isIconDisabled ? 'grey' : 'primary.main' },
                                                                    padding: 1
                                                                }}
                                                            />
                                                        </Box>
                                                       
                                                        {loading && <Loader />}
                                                     
                                                       
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>

                                            {expandedRowId === row.screeningType && rowHitRecordData && rowHitRecordData[row.screeningType] && (
                                                <TableRow>
                                                    <TableCell colSpan={4} sx={{ padding: 0 }}>
                                                        <Box
                                                            sx={{
                                                                padding: 2,
                                                                backgroundColor: '#f5f5f5',
                                                                borderTop: '1px solid #e0e0e0',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                gap: 2,
                                                                width: '100%',
                                                                boxSizing: 'border-box'
                                                            }}
                                                        >
                                                            <Typography variant="h6">Screening Record</Typography>
                                                            <Table size="small">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Name</TableCell>
                                                                        <TableCell>Matching Score</TableCell>
                                                                        <TableCell>Display</TableCell>
                                                                        <TableCell>Status</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {rowHitRecordData[row.screeningType].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, recordIndex) => {
                                                                        // Move the variable declarations here
                                                                        const currentIndex = page * rowsPerPage + recordIndex;
                                                                        const selectedAction = selectedActions[currentIndex] || '';

                                                                        return (
                                                                            <TableRow key={recordIndex}>
                                                                                <TableCell>{record.name}</TableCell>
                                                                                <TableCell>{record.matchingScore}</TableCell>
                                                                                <TableCell>{record.display}</TableCell>
                                                                                <TableCell>
                                                                                    <IconButton onClick={() => handleIconClick(recordIndex)} style={{ padding: '1px 1px' }}>
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
                                                                        );
                                                                    })}
                                                                </TableBody>
                                                            </Table>
                                                            <TablePagination
                                                                rowsPerPageOptions={[5, 10, 20]}
                                                                component="div"
                                                                count={rowHitRecordData[row.screeningType].length}
                                                                page={page}
                                                                onPageChange={handleChangePage}
                                                                rowsPerPage={rowsPerPage}
                                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                            />
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>

                        </Table>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handlePepScreeningClick}
                                disabled={isPepScreeningDisabled}
                            >
                                Screening
                            </Button>
                        </Box>
                    </TableContainer>
                    <Dialog
                        open={isRemarksDialogOpen}
                        onClose={handleCloseRemarksDialog}
                        fullWidth
                        maxWidth="md"
                    >
                        <DialogTitle>Enter Remarks</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                Select a status and enter remarks for this employee.
                            </Typography>
                            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            label="Status"
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
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
                                {selectedStatus && (
                                    <Grid item xs={12}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="remarks"
                                            label="Remarks"
                                            type="text"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={remarks}
                                            onChange={handleRemarksChange}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleRemarksSubmit} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Card>
            </Box>
        </>
    );
}

export default Document;