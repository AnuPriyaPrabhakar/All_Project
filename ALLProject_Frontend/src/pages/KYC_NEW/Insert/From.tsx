

import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, Snackbar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './Form.css';
import MuiAlert from '@mui/material/Alert';
import Header from '../../../layouts/header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import DocumentApiService from '../../../data/services/document/Document_api_service';
// import { useApplicationContext } from './ApplicationContext';
import { Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';

import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ponsunImage from '../../../assets/ponsun.png';
import ApplicationfromeService from '../../../data/services/kyc/applicationfrom/applicationfrome-api-service';
import { kycForm, CreateData, DeclarationFrom, QuestionType, CreateDirectorsSignAuthorityRequest } from '../../../data/services/kyc/applicationfrom/applicationfrome-payload';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import contactImage from '../../../assets/contact.png';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Kyc from './Kyc';
import Letter from './Letter';
import { Document, Page } from 'react-pdf';

import saveApplicationReducer from './state/save-application-reducer';
import { saveDeclaration, saveQuestionnaire } from './state/save-application-action';
import Declaration from './Declaration';
import ListOfBoardDirector from './ListOfBoardDirector';
import ApplicationForm from '../../KYC_NEW/Insert/ApplicationForm';
import Loader from '../../loader/loader';



interface SectionProps {
    formData?: any;
    questionData?: any;
    declarationData?: any;
    handleInputChange?: (sectionName: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    renderDeclarationContent?: any;
}
interface FormValues {
    Letterhead: any;
    Questionnaire: any;
    Declaration: any;
    ListofBoardDirectors: any;
    KYCDocument: any;
}

interface Image {
    name: string;
    uploading: boolean;
    uploadSuccess: boolean;
};
function Letterhead({ formData, handleInputChange }: SectionProps) {
    return (
        <Box mt={2}>

            <Letter />

        </Box>
    );
}

function Questionnaire({ formData, questionData, handleInputChange }: SectionProps) {
    return (
        <Box mt={2}>

            <ApplicationForm formData={formData} questionData={questionData} handleInputChange={handleInputChange} />

        </Box>
    );
}

function DeclarationForm({ formData, declarationData, handleInputChange, renderDeclarationContent }: SectionProps) {
    return (
        <Box mt={2}>

            <Declaration formData={formData} handleInputChange={handleInputChange} declarationData={declarationData} renderDeclarationContent={renderDeclarationContent} />

        </Box>
    );
}




function ListofBoardDirectors({ formData, handleInputChange }: SectionProps) {
    const initialImageState: Image = {
        name: '',
        uploading: false,
        uploadSuccess: false,
    };
    const [images, setImages] = useState<Image[]>([initialImageState]);
    const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
    const [base64Images, setBase64Images] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const applicationfrome = new ApplicationfromeService();

    const [KycformData, setKycFormData] = useState<CreateData[]>([
        {
            id: 0,
            kycId: 0,
            authorityId: 0,
            firstName: '',
            middleName: '',
            lastName: '',
            pan: '',
            nationality: 0,
            citizenship: 0,
            domicile: 0,
            isDirector: 1,
            isShareHolders: 0,
            uid: 0,
            euid: 0,
            isScreening: 0
        }
    ]);
    const [KycformDataa, setKycFormDatas] = useState<CreateData[]>([
        {
            id: 0,
            kycId: 0,
            authorityId: 0,
            firstName: '',
            middleName: '',
            lastName: '',
            pan: '',
            nationality: 0,
            citizenship: 0,
            domicile: 0,
            uid: 0,
            isDirector: 0,
            isShareHolders: 1,
            euid: 0,
            isScreening: 0
        }
    ]);
    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setIsSuccessOpen(true);
        setTimeout(() => {
            setIsSuccessOpen(false);
            setSuccessMessage('');
        }, 1000);
    };

    const showErrorMessage = (message: string) => {
        setErrorMessage(message);
        setIsErrorOpen(true);
    };


    const handleInputChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>, personIndex: number) => {
        const { name, value } = event.target as HTMLInputElement | { name: string, value: string };
        setKycFormData(prevState => {
            return prevState.map((person, index) => {
                if (index === personIndex) {
                    return { ...person, [name]: value };
                }
                return person;
            });
        });
    };
    const handleInputChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>, personIndex: number) => {
        const { name, value } = event.target as HTMLInputElement | { name: string, value: string };
        setKycFormDatas(prevState => {
            return prevState.map((person, index) => {
                if (index === personIndex) {
                    return { ...person, [name]: value };
                }
                return person;
            });
        });
    };

    const handleRemoveBoxkycdetails = (personIndex: number) => {
        setKycFormData(KycformData.filter((person, index) => index !== personIndex));
    };
    const handleRemovekycdetails = (personIndex: number) => {
        setKycFormDatas(KycformData.filter((person, index) => index !== personIndex));
    };


    const responseId = sessionStorage.getItem('responseId');

    console.log('ApplicationForm responseId:', responseId);
    useEffect(() => {
        if (responseId) {
            console.log(responseId.toString());
        }
    }, [responseId]);



    // const handleSubmit = async () => {
    //     const responseId = sessionStorage.getItem('responseId');
    //     if (!responseId) {
    //         console.error('No responseId found in session storage');
    //         return;
    //     }
    //     try {
    //         const directorsDataWithResponseId = KycformData.map(person => ({
    //             ...person,
    //             kycId: parseInt(responseId)
    //         }));
    //         const shareholdersDataWithResponseId = KycformDataa.map(person => ({
    //             ...person,
    //             kycId: parseInt(responseId)
    //         }));
    //         const response = await applicationfrome.Directorslist(directorsDataWithResponseId);
    //         const responses = await applicationfrome.Directorslists(shareholdersDataWithResponseId);
    //         if (response && response.length > 0) {
    //             sessionStorage.setItem('kycId', response[0].kycId.toString());
    //         }
    //         setKycFormData(prevState =>
    //             prevState.map((person, index) => ({
    //                 ...person,
    //                 id: response[index]?.id ?? person.id,
    //             }))
    //         );
    //         setKycFormDatas(prevState =>
    //             prevState.map((person, index) => ({
    //                 ...person,
    //                 id: responses[index]?.id ?? person.id,
    //             }))
    //         );
    //         showSuccessMessage('List of Board Directors unblocked successfully.');
    //         console.log('Form submitted successfully:', response, responses);
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //     }
    // };
    const handleInputChangess = (section: any, event: any) => {
        const { name, value } = event.target;
        // setKycFormData(prevState => ({
        //     ...prevState,
        //     [name]: value
        // }));
    };




    const [downloadingPDF, setDownloadingPDF] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [downloadCount, setDownloadCount] = useState(0);
    const [isLevelcasedetailsOpen, setIsLevelcasedetailsOpen] = useState(false);
    const [isUploadSectionOpen, setIsUploadSectionOpen] = useState(false); // New state to manage upload section visibility
    const [isSaveActive, setIsSaveActive] = useState(false);
    const handleDownload = async () => {

        setDownloadingPDF(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 0));
            const pdf = new jsPDF('p', 'mm', 'a4');
            const content = document.getElementById('pdfContent');
            if (!content) return;
            pdf.setFontSize(10);
            pdf.setFont('helvetica');
            // content.style.display = 'block';
            const padding = 10;
            const scale = 2;
            const pageWidth = 210;
            const pageHeight = 297;
            const contentWidth = pageWidth - 2 * padding;
            const contentHeight = pageHeight - 2 * padding;
            const totalPages = content.childNodes.length;
            for (let i = 0; i < totalPages; i++) {
                const page = content.childNodes[i];
                const canvas = await html2canvas(page as HTMLElement, {
                    scale: scale,
                    useCORS: true,
                    logging: true,
                });
                const imgData = canvas.toDataURL('image/png');
                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'PNG', padding, padding, contentWidth, contentHeight);
                pdf.setLineWidth(0.2);
                pdf.setDrawColor(0, 0, 0);
                pdf.rect(padding, padding, contentWidth, contentHeight);
            }
            pdf.save('application_form.pdf');
            showSuccessMessage('Download successfully.');
        } catch (error) {
            setErrors(["Error generating PDF"]);
        } finally {
            const content = document.getElementById('pdfContent');
            // if (content) content.style.display = 'none';
            setDownloadingPDF(false);
            setDownloadCount(prevCount => prevCount + 1);
        }
        setIsLevelcasedetailsOpen(true);
        setIsUploadSectionOpen(false);
    };
    const { kycId } = useParams<{ kycId: string }>();

    const componentRef = useRef<HTMLDivElement | null>(null);


    const [showImageModal, setShowImageModal] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({ base64: null, filename: null });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const customerApiService = new DocumentApiService();
    const documentApiService = new DocumentApiService();

    useEffect(() => {
        if (responseId) {
            console.log('responseId11:', responseId);
        }
    }, [responseId]);



    const handleView = async () => {
        console.log('handleView called');
        setShowPdfModal(true);

        try {
            const responseId = sessionStorage.getItem('responseId');
            if (!responseId) {
                console.error('No responseId found in session storage');
                return;
            }



            const pdfData = await customerApiService.getPDF(responseId, 3);
            console.log('PDF data:', pdfData);

            setPdfData({ base64: pdfData.data, filename: pdfData.filename });
            setShowPdfModal(true);
            console.log('PDF modal set to open');
        } catch (error) {
            console.error('Error fetching PDF:', error);
            setPdfData({ base64: null, filename: null });
            setErrorMessage("No PDF available");
            setShowPdfModal(true);
        }
    };





    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        console.log('Document loaded with', numPages, 'pages'); // Added logging
        setNumPages(numPages);
    };

    const handleCloseImageModal = () => {
        setShowImageModal(false);
    };

    const handleClosePdfModal = () => {
        setShowPdfModal(false);
    };

    const handlePrevPage = () => {
        setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
    };

    const handleNextPage = () => {
        setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages!));
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);
        }
    };

    const handleChooseImagesClick1 = (index1: number) => {
        document.getElementById(`image-upload-input1-${index1}`)?.click();
    };

    const handleFileChange4 = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFiles = Array.from(event.target.files) as File[];
            const nameWithoutExtension = selectedFiles[0].name.replace(/\.[^/.]+$/, '');
            setImages(prevFields => {
                const updatedFields = [...prevFields];
                updatedFields[index] = {
                    ...updatedFields[index],
                    name: nameWithoutExtension,
                    uploading: false,
                    uploadSuccess: false,
                };
                return updatedFields;
            });
            setIsFileSelected(true);
        } else {
            setIsFileSelected(false);
        }
    };
    const Signonupload = async (event: any) => {
        event.preventDefault();
        try {
            const responseId = sessionStorage.getItem('responseId');
            if (!responseId) {
                console.error('No responseId found in session storage');
                return;
            }
            const documentTypeId = 3;
            console.log('Submitting files:', selectedFiles);
            await documentApiService.saveCustomerRequest(selectedFiles, parseInt(responseId, 10), documentTypeId);
            showSuccessMessage('Signonupload added successfully.');
        } catch (error) {
            console.error('Error submitting files:', error);
        }
        // setIsLevelcasedetailsOpen(true);
        setIsUploadSectionOpen(false);
    };
    const handleSubmits = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const responseId = sessionStorage.getItem('responseId');
            if (!responseId) {
                console.error('No responseId found in session storage');
                return;
            }
            const documentTypeId = 2;
            console.log('Submitting files:', selectedFiles);
            await documentApiService.saveCustomerRequest(selectedFiles, parseInt(responseId, 10), documentTypeId);
        } catch (error) {
            console.error('Error submitting files:', error);
        }
    };
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        const handleImageClick = async (branchId: number) => {
            if (branchId) {
                try {
                    const branchId = 1; // Or fetch it from your data source
                    const imageData = await customerApiService.getLetterHead(branchId);
                    const base64String = arrayBufferToBase64(imageData);
                    setImageURL(base64String); // Set imageURL to base64String
                } catch (error) {
                    console.error('Error fetching image:', error);
                    setImageURL('');
                    setErrorMessage("No image available");

                }
            }
        };

        handleImageClick(1); // Pass the desired branchId here
    }, []);

    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        const binary = new Uint8Array(buffer);
        const bytes = [];
        for (let i = 0; i < binary.length; i++) {
            bytes.push(String.fromCharCode(binary[i]));
        }
        return `data:image/png;base64,${btoa(bytes.join(''))}`;
    };
    return (
        <Box mt={2}>
            <Card style={{ boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                <div id="pdfContent">
                    <Paper style={{ marginBottom: '20px' }}>
                        <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
                            {/* <img src={ponsunImage} alt="Ponsun" style={{ display: 'block', margin: '0 auto', maxWidth: '40%', marginBottom: '20px' }} /> */}
                            <div>
                                {imageURL && (
                                    <img
                                        src={imageURL}
                                        alt="Ponsun"
                                        style={{ display: 'block', margin: '0 auto', maxWidth: '35%', height: 'auto', maxHeight: '200px', marginBottom: '20px' }}
                                    />
                                )}
                            </div>

                            <Card >

                                {/* <Container style={{ width: '274mm', minHeight: '297mm', marginTop: '2%' }}> */}
                                <Card style={{
                                    padding: '1%',
                                    width: '100%',
                                }}>

                                    <div className="key">
                                        <h4>List of Directors</h4>
                                        <div className="scrollablebox">
                                            {KycformData.map((person, personIndex) => (
                                                <div key={personIndex} className="person-container">
                                                    {KycformData.length > 1 && (
                                                        <div className="close-button" onClick={() => handleRemoveBoxkycdetails(personIndex)}>
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </div>
                                                    )}
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={3}>
                                                            <TextField
                                                                name="firstName"
                                                                label="Name"
                                                                size='small'
                                                                autoComplete='off'
                                                                value={person.firstName}
                                                                onChange={(e) => handleInputChanged(e, personIndex)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <TextField
                                                                name="middleName"
                                                                label="Middle Name"
                                                                size='small'
                                                                autoComplete='off'
                                                                value={person.middleName}
                                                                onChange={(e) => handleInputChanged(e, personIndex)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <TextField
                                                                name="lastName"
                                                                label="Last Name"
                                                                size='small'
                                                                autoComplete='off'
                                                                value={person.lastName}
                                                                onChange={(e) => handleInputChanged(e, personIndex)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <TextField
                                                                name="pan"
                                                                label="PAN"
                                                                size='small'
                                                                autoComplete='off'
                                                                value={person.pan}
                                                                onChange={(e) => handleInputChanged(e, personIndex)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControl style={{ width: '100%' }}>
                                                                <InputLabel htmlFor="contact-select">Nationality</InputLabel>

                                                                <Select
                                                                    name="nationality"
                                                                    label="Nationality"
                                                                    size='small'
                                                                    value={person.nationality}
                                                                    onChange={(e) => handleInputChanged(e as SelectChangeEvent<string>, personIndex)}

                                                                >
                                                                    {/* <MenuItem value="American">American</MenuItem>
                                                                <MenuItem value="Canadian">Canadian</MenuItem>
                                                                <MenuItem value="Indian">Indian</MenuItem>
                                                                <MenuItem value="Other">Other</MenuItem> */}
                                                                </Select>
                                                            </FormControl>

                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControl style={{ width: '100%' }}>
                                                                <InputLabel htmlFor="contact-select">Citizenship</InputLabel>
                                                                <Select
                                                                    name="citizenship"
                                                                    label="Citizenship"
                                                                    size='small'
                                                                    value={person.citizenship}
                                                                    onChange={(e) => handleInputChanged(e as SelectChangeEvent<string>, personIndex)}

                                                                >

                                                                    {/* <MenuItem value="American">American</MenuItem>
                                                                <MenuItem value="Canadian">Canadian</MenuItem>
                                                                <MenuItem value="Indian">Indian</MenuItem>
                                                                <MenuItem value="Other">Other</MenuItem> */}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControl style={{ width: '100%' }}>
                                                                <InputLabel htmlFor="contact-select">Domicile</InputLabel>
                                                                <Select
                                                                    name="domicile"
                                                                    label="Domicile"
                                                                    size='small'
                                                                    value={person.domicile}
                                                                    onChange={(e) => handleInputChanged(e as SelectChangeEvent<string>, personIndex)}

                                                                >

                                                                    {/* <MenuItem value="American">American</MenuItem>
                                                                <MenuItem value="Canadian">Canadian</MenuItem>
                                                                <MenuItem value="Indian">Indian</MenuItem>
                                                                <MenuItem value="Other">Other</MenuItem> */}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>

                                                </div>
                                            ))}
                                        </div>
                                        <div className="button-container">
                                            <Button
                                                className="add-people"
                                                variant="contained"
                                                startIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setKycFormData([...KycformData, {
                                                    id: 0,
                                                    kycId: 0,
                                                    authorityId: 0,
                                                    firstName: '',
                                                    middleName: '',
                                                    lastName: '',
                                                    pan: '',
                                                    nationality: 0,
                                                    citizenship: 0,
                                                    domicile: 0,
                                                    uid: 0,
                                                    isDirector: 0,
                                                    isShareHolders: 0,
                                                    euid: 0,
                                                    isScreening: 0
                                                }])}>
                                                Add Directors Details
                                            </Button>
                                        </div>
                                    </div>

                                </Card>
                                <Card style={{
                                    padding: '1%',
                                    width: '100%',
                                }}>
                                    <div className="key">
                                        <h4>List of ShareHolders</h4>
                                        <div className="scrollablebox">
                                            {KycformDataa.map((person, personIndex) => (
                                                <div key={personIndex} className="person-container">
                                                    {KycformDataa.length > 1 && (
                                                        <div className="close-button" onClick={() => handleRemovekycdetails(personIndex)}>
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </div>
                                                    )}
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={3}>
                                                            <TextField
                                                                name="firstName"
                                                                label="Name"
                                                                size='small'
                                                                autoComplete='off'
                                                                value={person.firstName}
                                                                onChange={(e) => handleInputChanges(e, personIndex)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <TextField
                                                                name="middleName"
                                                                label="Middle Name"
                                                                size='small'
                                                                autoComplete='off'
                                                                value={person.middleName}
                                                                onChange={(e) => handleInputChanges(e, personIndex)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <TextField
                                                                name="lastName"
                                                                label="Last Name"
                                                                size='small'
                                                                autoComplete='off'
                                                                value={person.lastName}
                                                                onChange={(e) => handleInputChanges(e, personIndex)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <TextField
                                                                name="pan"
                                                                label="PAN"
                                                                size='small'
                                                                autoComplete='off'
                                                                value={person.pan}
                                                                onChange={(e) => handleInputChanges(e, personIndex)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControl style={{ width: '100%' }}>
                                                                <InputLabel htmlFor="contact-select">Nationality</InputLabel>

                                                                <Select
                                                                    name="nationality"
                                                                    label="Nationality"
                                                                    size='small'
                                                                    autoComplete='off'
                                                                    value={person.nationality}
                                                                    onChange={(e) => handleInputChanged(e as SelectChangeEvent<string>, personIndex)}

                                                                >
                                                                    <MenuItem value="American">American</MenuItem>
                                                                    <MenuItem value="Canadian">Canadian</MenuItem>
                                                                    <MenuItem value="Indian">Indian</MenuItem>
                                                                    <MenuItem value="Other">Other</MenuItem>
                                                                </Select>
                                                            </FormControl>

                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControl style={{ width: '100%' }}>
                                                                <InputLabel htmlFor="contact-select">Citizenship</InputLabel>
                                                                <Select
                                                                    name="citizenship"
                                                                    label="Citizenship"
                                                                    size='small'
                                                                    value={person.citizenship}
                                                                    onChange={(e) => handleInputChanged(e as SelectChangeEvent<string>, personIndex)}

                                                                >

                                                                    <MenuItem value="American">American</MenuItem>
                                                                    <MenuItem value="Canadian">Canadian</MenuItem>
                                                                    <MenuItem value="Indian">Indian</MenuItem>
                                                                    <MenuItem value="Other">Other</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <FormControl style={{ width: '100%' }}>
                                                                <InputLabel htmlFor="contact-select">Domicile</InputLabel>
                                                                <Select
                                                                    name="domicile"
                                                                    label="Domicile"
                                                                    size='small'
                                                                    value={person.domicile}
                                                                    onChange={(e) => handleInputChanged(e as SelectChangeEvent<string>, personIndex)}

                                                                >

                                                                    <MenuItem value="American">American</MenuItem>
                                                                    <MenuItem value="Canadian">Canadian</MenuItem>
                                                                    <MenuItem value="Indian">Indian</MenuItem>
                                                                    <MenuItem value="Other">Other</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>

                                                </div>
                                            ))}
                                        </div>
                                        <div className="button-container">
                                            <Button
                                                className="add-people"
                                                variant="contained"
                                                startIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => setKycFormDatas([...KycformDataa, {
                                                    id: 0,
                                                    kycId: 0,
                                                    authorityId: 0,
                                                    firstName: '',
                                                    middleName: '',
                                                    lastName: '',
                                                    pan: '',
                                                    nationality: 0,
                                                    citizenship: 0,
                                                    domicile: 0,
                                                    isDirector: 0,
                                                    isShareHolders: 0,
                                                    uid: 0,
                                                    euid: 0,
                                                    isScreening: 0
                                                }])}>
                                                Add ShareHolders Details
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <Typography variant="body1" paragraph align="right">
                                            Authorized Signatory(ies)
                                        </Typography>
                                        <Typography variant="body1" paragraph align="right">
                                            <TextField name="authorizeName" size='small' autoComplete='off' placeholder="Name & Designation" />
                                        </Typography>
                                        <Typography variant="body1" paragraph align="right">
                                            (Name & Designation)
                                        </Typography>
                                        <Typography variant="body1" paragraph align="right">
                                            (With Stamp)
                                        </Typography>

                                    </div>

                                </Card>
                                <br></br>

                                {/* </Container> */}
                            </Card>
                        </div>
                        <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '48%' }} />
                        <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}></div>

                    </Paper>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="arroww" style={{ marginRight: '10px' }}>
                        <span style={{ textAlign: 'center' }}>Step 1:</span>
                    </div>

                    <button style={{ width: '12%' }} className='btn btn-primary'>
                        Save
                    </button>
                </div>
                <br></br>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="arroww" style={{ marginRight: '10px' }}>
                        <span style={{ textAlign: 'center' }}>Step 2:</span>
                    </div>
                    <button style={{ width: '12%' }} className='btn btn-primary btn-sm' onClick={handleDownload}>Download</button>

                </div>
                <Card>
                    {isLevelcasedetailsOpen && (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Grid container spacing={1}>
                                    {images.map((image, index) => (
                                        <Grid item xs={12} key={index}>
                                            <form onSubmit={handleSubmits} encType="multipart/form-data">

                                                <div className="person-container">
                                                    <div className="field-group">
                                                        <div className="field-group-column">

                                                            <input
                                                                type="file"
                                                                id={`image-upload-input1-${index}`}
                                                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                                                onChange={(event) => {
                                                                    handleFileChange(event);
                                                                    handleFileChange4(index, event);
                                                                }}
                                                                style={{ display: 'none' }}
                                                                multiple
                                                            />

                                                            <Button
                                                                variant="outlined"
                                                                onClick={() => handleChooseImagesClick1(index)}
                                                                style={{ marginRight: '10px' }}
                                                            >
                                                                Document
                                                            </Button>
                                                            <TextField style={{ width: '50%' }}
                                                                label="Attachment"
                                                                type="text"
                                                                size="small"
                                                                variant="outlined"
                                                                value={image.name}
                                                                disabled
                                                                fullWidth
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            </form>
                                        </Grid>
                                    ))}




                                </Grid>
                            </Grid>

                        </Grid>
                    )}

                    {/* {isUploadSectionOpen && ( */}
                    {/* <> */}
                    <Dialog open={showImageModal} onClose={handleCloseImageModal} fullWidth maxWidth='xl'>
                        <DialogTitle>Image Preview</DialogTitle>
                        <DialogContent>
                            {base64Image && <img src={base64Image} alt="Image Preview" />}
                            {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseImageModal}>Close</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={showPdfModal} onClose={handleClosePdfModal} fullWidth maxWidth='xl'>
                        <DialogTitle>PDF Preview</DialogTitle>
                        <DialogContent dividers={true} style={{ height: '80vh', overflowY: 'auto' }}>
                            {pdfData.base64 && (
                                <Document
                                    file={`data:application/pdf;base64,${pdfData.base64}`}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    className="pdf-document"
                                >
                                    <Page pageNumber={pageNumber} width={window.innerWidth * 0.8} />
                                </Document>
                            )}
                            {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handlePrevPage} disabled={pageNumber <= 1}>Prev</Button>
                            <Button onClick={handleNextPage} disabled={pageNumber >= numPages!}>Next</Button>
                            {pdfData.filename && (
                                <div>
                                    <a
                                        href={`data:application/pdf;base64,${pdfData.base64}`}
                                        download={pdfData.filename}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', padding: '10px', backgroundColor: '#2a75bb', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
                                    >
                                        Download PDF
                                    </a>
                                </div>
                            )}
                            <Button onClick={handleClosePdfModal}>Close</Button>
                        </DialogActions>
                    </Dialog>


                </Card>

                <br></br>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="arroww" style={{ marginRight: '10px' }}>
                        <span style={{ textAlign: 'center' }}>Step 2:</span>
                    </div>
                    <form onSubmit={Signonupload}>
                        <button style={{ width: '141%' }} className='btn btn-primary btn-sm'>Sign on upload</button>
                    </form>
                </div>


                <br></br>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="arroww" style={{ marginRight: '10px' }}>
                        <span style={{ textAlign: 'center' }}>Step 4:</span>
                    </div>
                    <button style={{ width: '12%' }} className='btn btn-primary btn-sm' onClick={handleView}>View</button>
                </div>
                <br></br>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="arroww" style={{ marginRight: '10px' }}>
                        <span style={{ textAlign: 'center' }}>Step 5:</span>
                    </div>
                    <button style={{ width: '12%' }} className='btn btn-primary btn-sm' >submit</button>
                </div>

                <Snackbar
                    open={isSuccessOpen}
                    autoHideDuration={5000}
                    onClose={() => setIsSuccessOpen(false)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        severity="success"
                        onClose={() => setIsSuccessOpen(false)}
                    >
                        {successMessage}
                    </MuiAlert>
                </Snackbar>
                <Snackbar
                    open={isErrorOpen}
                    autoHideDuration={5000}
                    onClose={() => setIsErrorOpen(false)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MuiAlert
                        elevation={6}
                        variant="filled"
                        severity="error"
                        onClose={() => setIsErrorOpen(false)}
                    >
                        {errorMessage}
                    </MuiAlert>
                </Snackbar>
            </Card>

        </Box>
    );
}


interface CustomerData {
    kycFormDto: kycForm;
};
///kyc document
function KYCDocument({ formData: any, handleInputChange }: SectionProps) {
    const userDetails = useSelector((state: any) => state.loginReducer);
    console.log('userDetails', userDetails);
    const loginDetails = userDetails?.loginDetails;
    const location = useLocation();
    const navigate = useNavigate();
    const documentApiService = new DocumentApiService();

    const initialImageState: Image = {
        name: '',
        uploading: false,
        uploadSuccess: false,
    };

    const [images, setImages] = useState<Image[]>([initialImageState]);
    const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
    const [base64Images, setBase64Images] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [includeImageRequest, setIncludeImageRequest] = useState(false);
    // const {responseId} = useApplicationContext();
    // console.log('ApplicationForm responseId:', responseId);
    const [formData, setFormData] = useState<kycForm[]>([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);
    const [downloadingPDF, setDownloadingPDF] = useState(false);
    const applicationfrome = new ApplicationfromeService();
    const responseId = sessionStorage.getItem('responseId');
    const [fetchedQuestions, setFetchedQuestions] = useState<QuestionType[]>([]);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);

    useEffect(() => {
        if (responseId) {
            fetchData(responseId.toString());
        }
    }, [responseId]);

    const fetchData = async (responseId: string) => {
        try {
            setLoading(true);
            const response = await applicationfrome.getkycData(responseId);
            console.log('kycData:', response);
            const customerData: CustomerData[] = response;
            console.log('customerData:', customerData);
            setFormData(customerData.map((data: CustomerData) => data.kycFormDto));
            // setFormData(response); // Assuming response contains the array of customer data
        } catch (error) {
            setErrors(["Error fetching data"]);
        } finally {
            setLoading(false);
        }
    };

    const itemsPerPage = 10;

    const splitDataIntoPages = (data: any[], itemsPerPage: number) => {
        const pages = [];
        for (let i = 0; i < data.length; i += itemsPerPage) {
            pages.push(data.slice(i, i + itemsPerPage));
        }
        return pages;
    };

    const pages = splitDataIntoPages(formData, itemsPerPage);


    const downloadPDF = async () => {
        setDownloadingPDF(true);
        try {
            // Call the getPrintNumber API to fetch the print number
            const response = await applicationfrome.getPrintNumber(responseId);
            // Assuming response contains the print number directly
            const printNumber = response;

            // Create a new PDF document
            const pdf = new jsPDF('p', 'mm', 'a4');
            const content = document.getElementById('pdfContent');
            if (!content) return;
            const padding = 10;
            const scale = 3;
            const pageWidth = 210;
            const pageHeight = 297;
            const contentWidth = pageWidth - 2 * padding;
            const contentHeight = pageHeight - 2 * padding;
            const totalPages = content.childNodes.length;

            // Loop through each page of the content and add it to the PDF
            for (let i = 0; i < totalPages; i++) {
                const page = content.childNodes[i];
                const canvas = await html2canvas(page as HTMLElement, {
                    scale: scale,
                    useCORS: true,
                    logging: true,
                });
                const imgData = canvas.toDataURL('image/png');
                if (i > 0) pdf.addPage();

                // Calculate the x-coordinate for the "Count" text to be in the right top corner
                const textWidth = pdf.getTextWidth(`Count: ${printNumber}`);
                const xCoordinate = pageWidth - textWidth - padding;

                // Display the "Count" text in the right top corner of each page
                pdf.text(`Count: ${printNumber}`, xCoordinate, padding);

                pdf.addImage(imgData, 'PNG', padding, padding + 10, contentWidth, contentHeight);
                pdf.setLineWidth(0.2);
                pdf.setDrawColor(0, 0, 0);
                pdf.rect(padding, padding + 10, contentWidth, contentHeight);
            }
            pdf.save('application_form.pdf');
        } catch (error) {
            console.error('Error fetching print number:', error);
        } finally {
            setDownloadingPDF(false);
        }
    };




    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        if (name === 'includeImageRequest') {
            setIncludeImageRequest(checked);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);
        }
    };

    const handleChooseImagesClick1 = (index1: number) => {
        document.getElementById(`image-upload-input1-${index1}`)?.click();
    };

    const handleFileChange4 = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFiles = Array.from(event.target.files) as File[];
            const nameWithoutExtension = selectedFiles[0].name.replace(/\.[^/.]+$/, '');
            setImages(prevFields => {
                const updatedFields = [...prevFields];
                updatedFields[index] = {
                    ...updatedFields[index],
                    name: nameWithoutExtension,
                    uploading: false,
                    uploadSuccess: false,
                };
                return updatedFields;
            });
            setIsFileSelected(true);
        } else {
            setIsFileSelected(false);
        }
    };
    const showSuccessMessage = (message: string) => {
        setSuccessMessage(message);
        setIsSuccessOpen(true);
        setTimeout(() => {
            setIsSuccessOpen(false);
            setTimeout(() => setSuccessMessage(''), 500);
        }, 3000);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            const responseId = sessionStorage.getItem('responseId');
            if (!responseId) {
                console.error('No responseId found in session storage');
                return;
            }
            const documentTypeId = 4;

            const filesList = Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles];

            console.log('Submitting files:', filesList);
            await documentApiService.saveFormCustomerRequest(filesList, parseInt(responseId, 10), documentTypeId);
            showSuccessMessage('Attachment added successfully.');
        } catch (error) {
            console.error('Error submitting files:', error);
        }
        finally {
            setLoading(false);
        }
    };

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     try {
    //         const responseId = sessionStorage.getItem('responseId');
    //         if (!responseId) {
    //             console.error('No responseId found in session storage');
    //             return;
    //         }
    //         const documentTypeId = 4;

    //         console.log('Submitting files:', selectedFiles);
    //         await documentApiService.saveFormCustomerRequest(selectedFiles, parseInt(responseId, 10), documentTypeId);
    //         showSuccessMessage('Attachment added successfully.');
    //         sessionStorage.clear();
    //     } catch (error) {
    //         console.error('Error submitting files:', error);
    //     }
    // };

    const handleAddMoreFiles = () => {
        setImages([...images, initialImageState]);
    };

    const handleRemoveFileInput = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <Box mt={2}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        {images.map((image, index) => (
                            <Grid item xs={12} key={index}>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="field-group" >
                                        <div style={{ marginLeft: '78%' }}>
                                            <IconButton
                                                onClick={() => handleRemoveFileInput(index)}
                                                aria-label="remove"
                                            >
                                                <FontAwesomeIcon icon={faTimes} style={{
                                                    color: 'red',

                                                }} />
                                            </IconButton>
                                        </div>
                                        <div className="field-group-column">
                                            <input
                                                type="file"
                                                id={`image-upload-input1-${index}`}
                                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                                onChange={(event) => {
                                                    handleFileChange(event);
                                                    handleFileChange4(index, event);
                                                }}
                                                style={{ display: 'none' }}
                                                multiple
                                            />
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleChooseImagesClick1(index)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Document
                                            </Button>
                                            <TextField style={{ width: '50%' }}
                                                label="Attachment"
                                                type="text"
                                                size="small"
                                                variant="outlined"
                                                value={image.name}
                                                disabled
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                </form>
                            </Grid>
                        ))}
                        <Grid item xs={12} style={{ marginTop: '-10px', marginLeft: '20%' }}>
                            <Button
                                variant="outlined"
                                onClick={handleAddMoreFiles}
                                startIcon={<FontAwesomeIcon icon={faPlus} />}
                            >
                                Add More Files
                            </Button>
                        </Grid>


                    </Grid>
                </Grid>
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Grid item>
                    <form onSubmit={handleSubmit}>

                        <button className='btn btn-primary'>
                            Save
                        </button>&nbsp;
                    </form>
                    {loading && <Loader />}
                </Grid>

                <form onSubmit={handleSubmit}>

                    <button className='btn btn-primary'>
                        Submit
                    </button>&nbsp;
                </form>
            </div>
            <Snackbar
                open={isSuccessOpen}
                autoHideDuration={5000}
                onClose={() => setIsSuccessOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity="success"
                    onClose={() => setIsSuccessOpen(false)}
                >
                    {successMessage}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
}

function FormTabs() {
    const [formData, setFormData] = useState({
        Letterhead: {},
        Questionnaire: {},
        Declaration: {},
        ListofBoardDirectors: {},
        KYCDocument: {},
    });
    const [declarationFrom, setDeclarationFrom] = useState<DeclarationFrom>({
        id: 0,
        kycId: 0,
        memberName: '',
        registeredPlace: '',
        din: '',
        date: '',
        place: '',
        authorizeName: '',
        authorizeDesignation: '',
        uid: 0,

    });
    const [listOfDirectors, setListOfDirectors] = useState<CreateData[]>([
        {
            id: 0,
            kycId: 0,
            authorityId: 0,
            firstName: '',
            middleName: '',
            lastName: '',
            pan: '',
            nationality: 0,
            citizenship: 0,
            domicile: 0,
            isDirector: 1,
            isShareHolders: 0,
            uid: 0,
            euid: 0,
            isScreening: 0
        }
    ]);
    const [listOfShareHolders, setListOfShareHolders] = useState<CreateData[]>([
        {
            id: 0,
            kycId: 0,
            authorityId: 0,
            firstName: '',
            middleName: '',
            lastName: '',
            pan: '',
            nationality: 0,
            citizenship: 0,
            domicile: 0,
            isDirector: 0,
            isShareHolders: 1,
            uid: 0,
            euid: 0,
            isScreening: 0
        }
    ]);
    const [signAuthority, setSignAuthority] = useState<CreateDirectorsSignAuthorityRequest[]>([
        {
            id: 0,
            kycId: 0,
            name: '',
            designation: '',
            uid: 0,
            euid: 0,

        }
    ]);
    const [section, setSection] = useState<string>('Questionnaire');
    const [fetchedQuestions, setFetchedQuestions] = useState<QuestionType[]>([]);
    const applicationfrome = new ApplicationfromeService();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const applicationTypeId = 1;
    const accountTypeId = 2; //state.accountTypeId;
    const kycId = sessionStorage.getItem('responseId');
    const [isKycApplicationSaved, setIsKycApplicationSaved] = useState(false);
    const [isDeclarationSaved, setIsDeclarationSaved] = useState(false);
    const [isListOfBoardSaved, setIsListOfBoardSaved] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, [applicationTypeId, accountTypeId, kycId]);

    const fetchQuestions = async () => {
        try {
            const questions: any = await applicationfrome.getQuestionTypes(applicationTypeId, accountTypeId);
            setFetchedQuestions(questions);
            dispatch(saveQuestionnaire(questions));
            console.log('formData:', questions);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const handleSectionChange = (newSection: React.SetStateAction<string>) => {
        setSection(newSection);
    };

    const handleInputChange = (sectionName: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Input change handling logic
    };
    const handleDeclarationFormChange = (section: any, event: any) => {
        if (section == 'dbData') {
            setDeclarationFrom((prevState: any) => ({
                ...prevState,
                id: event.id, kycId: event.kycId, memberName: event.memberName,
                registeredPlace: event.registeredPlace, din: event.din, date: event.date,
                place: event.place, authorizeName: event.authorizeName, uid: event.uid

            }));
        }
        if (section == 'kycId') {
            setDeclarationFrom((prevState: any) => ({
                ...prevState,
                [section]: event
            }));
        } else {
            const { name, value } = event.target;
            setDeclarationFrom((prevState: any) => ({
                ...prevState,
                [name]: value
            }));
        }

    };

    const handleDirectorsChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>, personIndex: number, isNewRecord?: boolean, response?: any) => {
        if (isNewRecord) {
            setListOfDirectors((prevState: any) => [...prevState, {
                id: 0, kycId: 0, firstName: '', middleName: '', lastName: '', pan: '', nationality: 0, citizenship: 0, domicile: 0, isDirector: 1, isShareHolders: 0, uid: 0, euid: 0, isScreening: 0
            }]);

        } if (personIndex && isNewRecord) {
            setListOfDirectors(listOfDirectors.filter((person: any, index: any) => index !== personIndex));

        } if (response && !isNewRecord) {
            setListOfDirectors(prevState =>
                prevState.map((person, index) => ({
                    ...person,
                    id: response[index]?.id ?? person.id,
                }))
            )
        } if (event) {
            const { name, value } = event.target as HTMLInputElement | { name: string, value: string };
            setListOfDirectors(prevState => {
                return prevState.map((person, index) => {
                    if (index === personIndex) {
                        return { ...person, [name]: value };
                    }
                    return person;
                });
            });
        }

    };
    const handleShareHoldersChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>, personIndex: number, isNewRecord?: boolean, response?: any) => {
        if (isNewRecord) {
            setListOfShareHolders((prevState: any) => [...prevState, {
                id: 0, kycId: 0, firstName: '', middleName: '', lastName: '', pan: '', nationality: 0, citizenship: 0, domicile: 0, isDirector: 0, isShareHolders: 1, uid: 0, euid: 0, isScreening: 0
            }]);
        } if (personIndex && isNewRecord) {
            setListOfShareHolders(listOfShareHolders.filter((person: any, index: any) => index !== personIndex));
        }
        if (response && !isNewRecord) {
            setListOfDirectors(prevState =>
                prevState.map((person, index) => ({
                    ...person,
                    id: response[index]?.id ?? person.id,
                }))
            )
        } if (event) {
            const { name, value } = event.target as HTMLInputElement | { name: string, value: string };
            setListOfShareHolders(prevState => {
                return prevState.map((person, index) => {
                    if (index === personIndex) {
                        return { ...person, [name]: value };
                    }
                    return person;
                });
            });
        }

    };
    // const handleSignAuthorityChange = (
    //     event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    //     personIndex: number
    // ) => {
    //     const { name, value } = event.target; // Get the name of the input field and its value
    //     setSignAuthority((prevState) =>
    //         prevState.map((person, index) =>
    //             index === personIndex ? { ...person, [name]: value } : person // Update the specific person at personIndex
    //         )
    //     );
    // };



    const handleSignAuthorityChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        personIndex: number
    ) => {
        const { name, value } = event.target; // Get the name of the input field and its value
        setSignAuthority((prevState) =>
            prevState.map((person, index) =>
                index === personIndex ? { ...person, [name]: value } : person // Update the specific person at personIndex
            )
        );
    };



    const renderDeclarationContent = (value: any) => {
        setIsKycApplicationSaved(true);
    }
    const renderListOfBoardContent = (value: any) => {
        setIsDeclarationSaved(true);
    }
    const renderKycdocumentContent = (value: any) => {
        setIsListOfBoardSaved(true);
    }


    const renderSectionContent = () => {
        switch (section) {
            case 'Letterhead':
                return <Letterhead formData={formData.Letterhead} questionData={fetchedQuestions} handleInputChange={handleInputChange} />;
            case 'Questionnaire':
                return <ApplicationForm formData={formData} questionData={fetchedQuestions} handleInputChange={handleInputChange} renderDeclarationContent={renderDeclarationContent} />
            case 'Declaration':
                return <Declaration formData={formData.Declaration} handleInputChange={handleDeclarationFormChange} declarationData={declarationFrom} enableBoardContent={renderListOfBoardContent} />
            case 'ListofBoardDirectors':
                return (
                    <ListOfBoardDirector
                        formData={formData.ListofBoardDirectors}
                        directorsData={listOfDirectors}
                        shareholdersData={listOfShareHolders}
                        signAuthorityData={signAuthority}
                        handleDirectorsChange={handleDirectorsChange}
                        handleShareHoldersChange={handleShareHoldersChange}
                        handleSignAuthorityChange={handleSignAuthorityChange} // Ensure this is passed
                        renderKycdocumentContent={renderKycdocumentContent}
                    />
                );

            case 'KYCDocument':
                return <KYCDocument formData={formData.KYCDocument} questionData={fetchedQuestions} handleInputChange={handleInputChange} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Header />
                <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
                    <Box m={2} style={{ marginTop: '2%' }}>
                        <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                            <Grid container spacing={3} style={{ marginTop: '10px' }}>
                                {/* <Grid item xs={12} sm={2}>
                                    <div className={`arrow ${section === 'Letterhead' ? 'active' : ''}`} onClick={() => handleSectionChange('Letterhead')}>
                                        <span style={{ textAlign: 'center' }}>Letter head</span>
                                    </div>
                                </Grid> */}
                                <Grid item xs={12} sm={2}>
                                    <div className={`arrow ${section === 'Questionnaire' ? 'active' : ''}`} onClick={() => handleSectionChange('Questionnaire')}>
                                        <span style={{ textAlign: 'center', marginLeft: '7%' }}> Aml Kyc Questionnaire</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={2} className={isKycApplicationSaved ? " " : "container-disabled"}>
                                    <div className={`arrow ${section === 'Declaration' ? 'active' : ''}`} onClick={() => handleSectionChange('Declaration')} >
                                        <span style={{ textAlign: 'center' }} aria-disabled >Declaration</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={2} className={isDeclarationSaved ? " " : "container-disabled"}>
                                    <div className={`arrow ${section === 'ListofBoardDirectors' ? 'active' : ''}`} onClick={() => handleSectionChange('ListofBoardDirectors')}>
                                        <span style={{ textAlign: 'center' }}>List of Board Directors</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={2} className={isListOfBoardSaved ? " " : "container-disabled"}>
                                    <div className={`arrow ${section === 'KYCDocument' ? 'active' : ''}`} onClick={() => handleSectionChange('KYCDocument')}>
                                        <span style={{ textAlign: 'center' }}>KYC Document</span>
                                    </div>
                                </Grid>
                            </Grid>
                            {renderSectionContent()}
                        </Card>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default FormTabs;

