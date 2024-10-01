// // import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
// // import { Box, Typography, TextField, Button, Grid, Card, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// // import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// // import '../../BankReport/bank.css';
// // import MuiAlert from '@mui/material/Alert';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
// // import { useSelector } from 'react-redux';
// // import { useLocation, useNavigate, useParams } from 'react-router-dom';
// // import { Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';
// // import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// // import ponsunImage from '../../../assets/ponsun.png';
// // import contactImage from '../../../assets/contact.png';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { faDownload } from '@fortawesome/free-solid-svg-icons';
// // import jsPDF from 'jspdf';
// // import html2canvas from 'html2canvas';

// // // import ApplicationFrom from '../kyc/Insert/ApplicationFrom';
// // import { Col, Image, Modal } from 'react-bootstrap';
// // import avatarImage from '../../assets/Avatar.png';
// // import { Document, Page, } from 'react-pdf';


// // // import Document from '../../pages/document/Document'
// // import Documented from '../../document/Documented';
// // import Periodic from '../../periodicview/Periodic';
// // import Header from '../../../layouts/header/header';
// // import ApplicationfromeService from '../../../data/services/applicationfrom/applicationfrome-api-service';
// // import DocumentApiService from '../../../data/services/document/Document_api_service';
// // import PepDocument from '../../document/PepDocument';
// // import Kycdoument from '../../kyc/View/Kycdoument';
// // import { GetData, GetDatas, kycForm } from '../../../data/services/applicationfrom/applicationfrome-payload';
// // import ApplicationFromView from '../../kyc/View/ApplicationFromView';



// // interface ApplicationFormValues {
// //     memberName: string;
// //     officeAddress: string;
// //     pepCount: string;
// //     date: string;
// //     place: string;
// //     authorizedSignatory: string;
// //     designation: string;
// //     stamp: string;
// // };

// // interface ButtonFormValues {
// //     buttonText: string;
// // };

// // interface TermsFormValues {
// //     termsContent: string;
// // };

// // interface FormValues {
// //     application: ApplicationFormValues;
// //     button: ButtonFormValues;
// //     terms: TermsFormValues;
// // };

// // interface SectionProps {
// //     formValues: any;
// //     handleInputChange: (sectionName: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// // };

// // interface Image {
// //     name: string;
// //     uploading: boolean;
// //     uploadSuccess: boolean;
// // };

// // function BankHeader() {

// //     const [section, setSection] = useState<string>('');
// //     const [activeButton, setActiveButton] = useState<string>('');
// //     const [openSnackbar, setOpenSnackbar] = useState(false);
// //     const [snackbarMessage, setSnackbarMessage] = useState('');
// //     const [successMessage, setSuccessMessage] = useState('');
// //     const [isSuccessOpen, setIsSuccessOpen] = useState(false);
// //     const [errorMessage, setErrorMessage] = useState('');
// //     const [isErrorOpen, setIsErrorOpen] = useState(false);

// //     const [formValues, setFormValues] = useState<FormValues>({
// //         application: {
// //             memberName: '',
// //             officeAddress: '',
// //             pepCount: '',
// //             date: '',
// //             place: '',
// //             authorizedSignatory: '',
// //             designation: '',
// //             stamp: ''
// //         },
// //         button: {
// //             buttonText: 'Click Me'
// //         },
// //         terms: {
// //             termsContent: ''
// //         }
// //     });

// //     const handleSectionChange = (sectionName: string) => {
// //         setSection(sectionName);
// //     };

// //     const handleInputChange = (sectionName: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //         const { name, value } = event.target;
// //         setFormValues((prevValues) => ({
// //             ...prevValues,
// //             [sectionName]: {
// //                 ...prevValues[sectionName as keyof FormValues],
// //                 [name]: value
// //             }
// //         }));
// //     };

// //     const showSuccessMessage = (message: string) => {
// //         setSuccessMessage(message);
// //         setIsSuccessOpen(true);
// //         setTimeout(() => {
// //             setIsSuccessOpen(false);
// //             setSuccessMessage('');
// //         }, 1000);
// //     };

// //     const showErrorMessage = (message: string) => {
// //         setErrorMessage(message);
// //         setIsErrorOpen(true);
// //     };

// //     const saveSectionData = () => {
// //         let message = '';
// //         switch (section) {
// //             case 'Application':
// //                 message = 'Application data saved successfully.';
// //                 break;
// //             case 'Button':
// //                 message = 'Button data saved successfully.';
// //                 break;
// //             case 'Terms':
// //                 message = 'Terms data saved successfully.';
// //                 break;
// //             case 'Document Upload':
// //                 message = 'Document Upload data saved successfully.';
// //                 break;
// //             case 'List of Board Directors':
// //                 message = 'List of Board Directors data saved successfully.';
// //                 break;
// //             case 'Pep':
// //                 message = 'Pep data saved successfully.';
// //                 break;
// //             default:
// //                 message = 'Data saved successfully.';
// //                 break;
// //         }
// //         showSuccessMessage(message);
// //     };

// //     const handleSubmit = () => {
// //         showSuccessMessage('Form submitted successfully.');
// //     };

// //     const renderSectionContent = () => {
// //         switch (section) {
// //             case 'Application':
// //                 return <ApplicationForm formValues={formValues.application} handleInputChange={handleInputChange} />;
// //             case 'Button':
// //                 return <ButtonContent formValues={formValues.button} handleInputChange={handleInputChange} />;
// //             case 'Terms':
// //                 return <TermsAndConditions formValues={formValues.terms} handleInputChange={handleInputChange} />;
// //             case 'KyCdoument':
// //                 return <KyCdoument formValues={formValues.terms} handleInputChange={handleInputChange} />;
// //             case 'Pep':
// //                 return <Pep formValues={formValues.terms} handleInputChange={handleInputChange} />;
// //             case 'PeriodicView':
// //                 return <PeriodicView formValues={formValues.terms} handleInputChange={handleInputChange} />;
// //             default:
// //                 return null;
// //         }
// //     };

// //     return (
// //         <>
// //             <Box sx={{ display: 'flex' }}>
// //                 <Header />
// //                 <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
// //                     <Box m={2} style={{ marginTop: '6%' }}>


// //                         {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '110vh', width: '100vw', position: 'fixed', top: 13, left: 88 }}>
// //                             <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', height: '110vh', overflow: 'hidden', width: '80%' }}> */}
// //                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '110vh', width: '100vw', position: 'fixed', top: 13, left: 88 }}>
// //                             <Card style={{ padding: '0.5%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', maxWidth: '80%', width: 'auto', height: '81%' }}>
// //                                 <Grid container spacing={2}>
// //                                     <Grid item xs={12} sm={2}>
// //                                         <div className="arrows">
// //                                             <span style={{ textAlign: 'center' }}>Client form</span>
// //                                         </div>
// //                                     </Grid>

// //                                     <Grid item xs={12} sm={2.5}>
// //                                         <div
// //                                             className={`arrow ${activeButton === 'Application' ? 'active' : ''}`}
// //                                             onClick={() => {
// //                                                 setActiveButton('Application');
// //                                                 handleSectionChange('Application');
// //                                             }}
// //                                         >
// //                                             <span style={{ textAlign: 'center' }}>Aml Kyc Questionnaire</span>
// //                                         </div>
// //                                     </Grid>
// //                                     <Grid item xs={12} sm={2.5}>
// //                                         <div
// //                                             className={`arrow ${activeButton === 'Button' ? 'active' : ''}`}
// //                                             onClick={() => {
// //                                                 setActiveButton('Button');
// //                                                 handleSectionChange('Button');
// //                                             }}
// //                                         >
// //                                             <span style={{ textAlign: 'center' }}>Declaration</span>
// //                                         </div>
// //                                     </Grid>
// //                                     <Grid item xs={12} sm={2.5}>
// //                                         <div
// //                                             className={`arrow ${activeButton === 'Terms' ? 'active' : ''}`}
// //                                             onClick={() => {
// //                                                 setActiveButton('Terms');
// //                                                 handleSectionChange('Terms');
// //                                             }}
// //                                         >
// //                                             <span style={{ textAlign: 'center' }}>List of Board Directors</span>
// //                                         </div>
// //                                     </Grid>
// //                                     <Grid item xs={12} sm={2.5}>
// //                                         <div
// //                                             className={`arrow ${activeButton === 'KyCdoument' ? 'active' : ''}`}
// //                                             onClick={() => {
// //                                                 setActiveButton('KyCdoument');
// //                                                 handleSectionChange('KyCdoument');
// //                                             }}
// //                                         >
// //                                             <span style={{ textAlign: 'center' }}>KYC Document</span>
// //                                         </div>
// //                                     </Grid>
// //                                 </Grid>
// //                                 <br />
// //                                 <Grid container spacing={3}>
// //                                     <Grid item xs={12} sm={2}>
// //                                         <div className="arrows">
// //                                             <span style={{ textAlign: 'center' }}>NPCI Review</span>
// //                                         </div>
// //                                     </Grid>
// //                                     <Grid item xs={12} sm={2}>
// //                                         <div
// //                                             className={`arrow ${activeButton === 'Client from Files' ? 'active' : ''}`}
// //                                             onClick={() => {
// //                                                 setActiveButton('Client from Files');
// //                                                 handleSectionChange('Client from Files');
// //                                             }}
// //                                         >
// //                                             <span style={{ textAlign: 'center' }}>Client Files</span>
// //                                         </div>
// //                                     </Grid>

// //                                     <Grid item xs={12} sm={2}>
// //                                         <div
// //                                             className={`arrow ${activeButton === 'Pep' ? 'active' : ''}`}
// //                                             onClick={() => {
// //                                                 setActiveButton('Pep');
// //                                                 handleSectionChange('Pep');
// //                                             }}
// //                                         >
// //                                             <span style={{ textAlign: 'center' }}>Entity Screening</span>
// //                                         </div>
// //                                     </Grid>
// //                                     <Grid item xs={12} sm={2}>
// //                                         <div
// //                                             className={`arrow ${activeButton === 'PeriodicView' ? 'active' : ''}`}
// //                                             onClick={() => {
// //                                                 setActiveButton('PeriodicView');
// //                                                 handleSectionChange('PeriodicView');
// //                                             }}
// //                                         >
// //                                             <span style={{ textAlign: 'center' }}>Risk Assessment</span>
// //                                         </div>
// //                                     </Grid>
// //                                     <Grid item xs={12} sm={2}>
// //                                         <div
// //                                             className={`arrow ${activeButton === 'Aml' ? 'active' : ''}`}
// //                                             onClick={() => {
// //                                                 setActiveButton('Aml');
// //                                                 handleSectionChange('Aml');
// //                                             }}
// //                                         >
// //                                             <span style={{ textAlign: 'center' }}>Queries</span>
// //                                         </div>
// //                                     </Grid>
// //                                     <Grid item xs={12} sm={2}>
// //                                         <div
// //                                             className={`arrow ${activeButton === 'Periodic Review' ? 'active' : ''}`}
// //                                             onClick={() => {
// //                                                 setActiveButton('Periodic Review');
// //                                                 handleSectionChange('Aml');
// //                                             }}
// //                                         >
// //                                             <span style={{ textAlign: 'center' }}>Periodic Review</span>
// //                                         </div>
// //                                     </Grid>
// //                                 </Grid>

// //                                 <div style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
// //                                     {renderSectionContent()}
// //                                 </div>
// //                             </Card>
// //                         </div>



// //                         <Box mt={2} textAlign="center">
// //                             <Snackbar
// //                                 open={isSuccessOpen}
// //                                 autoHideDuration={5000}
// //                                 onClose={() => setIsSuccessOpen(false)}
// //                                 anchorOrigin={{
// //                                     vertical: 'top',
// //                                     horizontal: 'right',
// //                                 }}
// //                             >
// //                                 <MuiAlert
// //                                     elevation={6}
// //                                     variant="filled"
// //                                     severity="success"
// //                                     onClose={() => setIsSuccessOpen(false)}
// //                                 >
// //                                     {successMessage}
// //                                 </MuiAlert>
// //                             </Snackbar>
// //                             <Snackbar
// //                                 open={isErrorOpen}
// //                                 autoHideDuration={5000}
// //                                 onClose={() => setIsErrorOpen(false)}
// //                                 anchorOrigin={{
// //                                     vertical: 'top',
// //                                     horizontal: 'right',
// //                                 }}
// //                             >
// //                                 <MuiAlert
// //                                     elevation={6}
// //                                     variant="filled"
// //                                     severity="error"
// //                                     onClose={() => setIsErrorOpen(false)}
// //                                 >
// //                                     {errorMessage}
// //                                 </MuiAlert>
// //                             </Snackbar>
// //                         </Box>
// //                     </Box>
// //                 </Box>
// //             </Box >
// //         </>
// //     );
// // }

// // // function ApplicationForm({ formValues, handleInputChange }: SectionProps) {
// // //     return (
// // //         <Box mt={2}>
// // //             <Typography variant="h6" gutterBottom>
// // //             </Typography>
// // //             <KycAmlDeclaration formValues={formValues} handleInputChange={handleInputChange} />
// // //         </Box>
// // //     );
// // // };

// // function ButtonContent({ formValues, handleInputChange }: SectionProps) {
// //     const [declarationFrom, setDeclarationFrom] = useState({
// //         id: 0,
// //         kycId: 0,
// //         memberName: '',
// //         registeredPlace: '',
// //         din: '',
// //         date: '',
// //         place: '',
// //         authorizeName: '',
// //         uid: 0,
// //     });

// //     const applicationfrome = new ApplicationfromeService();
// //     const [selectedImage, setSelectedImage] = useState<string | null>(null);
// //     const [showModal, setShowModal] = useState(false);
// //     const [imageURL, setImageURL] = useState('');

// //     const [zoomLevel, setZoomLevel] = useState<number>(1);

// //     const { kycId } = useParams<{ kycId: string }>();
// //     const componentRef = useRef<HTMLDivElement | null>(null);



// //     const [showImageModal, setShowImageModal] = useState(false);
// //     const [showPdfModal, setShowPdfModal] = useState(false);
// //     const [base64Image, setBase64Image] = useState<string | null>(null);
// //     const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({ base64: null, filename: null });
// //     const [errorMessage, setErrorMessage] = useState<string | null>(null);
// //     const [numPages, setNumPages] = useState<number | null>(null);
// //     const [pageNumber, setPageNumber] = useState(1);

// //     const customerApiService = new DocumentApiService();
// //     // Fetch declaration form data when id is available
// //     useEffect(() => {
// //         if (kycId) {
// //             handleDeclarationForm(kycId);
// //         }
// //     }, [kycId]);

// //     useEffect(() => {
// //         const handleImageClick = async (branchId: number) => {
// //             if (branchId) {
// //                 try {
// //                     const branchId = 1; // Or fetch it from your data source
// //                     const imageData = await customerApiService.getLetterHead(branchId);
// //                     const base64String = arrayBufferToBase64(imageData);
// //                     setImageURL(base64String); // Set imageURL to base64String
// //                 } catch (error) {
// //                     console.error('Error fetching image:', error);
// //                     setImageURL(''); 
// //                     setErrorMessage("No image available");

// //                 }
// //             }
// //         };

// //         handleImageClick(1); // Pass the desired branchId here
// //     }, []);

// //     const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
// //         const binary = new Uint8Array(buffer);
// //         const bytes = [];
// //         for (let i = 0; i < binary.length; i++) {
// //             bytes.push(String.fromCharCode(binary[i]));
// //         }
// //         return `data:image/png;base64,${btoa(bytes.join(''))}`;
// //     };

// //     // Update kycId from sessionStorage if responseId is available
// //     useEffect(() => {
// //         const responseId = sessionStorage.getItem('responseId');
// //         if (responseId) {
// //             console.log('Declaration responseId:', responseId);
// //             setDeclarationFrom(prevState => ({
// //                 ...prevState,
// //                 kycId: parseInt(responseId, 10), // Convert responseId to integer
// //             }));
// //         }
// //     }, []);

// //     // Handle form input changes
// //     const handleInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
// //         const { name, value } = event.target;
// //         setDeclarationFrom(prevState => ({
// //             ...prevState,
// //             [name]: value
// //         }));
// //     };

// //     // Fetch declaration form data from API
// //     // const handleDeclarationForm = async (kycId: any) => {
// //     //     try {
// //     //         const response = await applicationfrome.getDeclarationForm(kycId);
// //     //         console.log('df:', response);
// //     //         setDeclarationFrom(response[0]);
// //     //     } catch (error) {
// //     //         console.error("Error fetching declaration form:", error);
// //     //     }
// //     // };
// //     const handleDeclarationForm = async (kycId: string) => {
// //         try {
// //             const response = await applicationfrome.getDeclarationForm(kycId);
// //             console.log('df:', response);
// //             if (response && response.length > 0) {
// //                 setDeclarationFrom(response[0]);
// //             }
// //         } catch (error) {
// //             console.error("Error fetching declaration form:", error);
// //         }
// //     };

// //     // Return early if declarationFrom is not yet populated
// //     // if (!declarationFrom) return null;


// //     const handleImageClick = async () => {
// //         if (kycId) {
// //             try {
// //                 const imageData = await customerApiService.getImage(kycId, "2");
// //                 const base64String = arrayBufferToBase64(imageData);
// //                 setBase64Image(base64String);
// //                 setShowImageModal(true);
// //             } catch (error) {
// //                 console.error('Error fetching image:', error);
// //                 setBase64Image(null);
// //                 setErrorMessage("No image available");
// //                 setShowImageModal(true);
// //             }
// //         }
// //     };


// //     const handlePdfClick = async () => {
// //         if (kycId) {
// //             try {
// //                 const pdfData = await customerApiService.getPDF(kycId, "2");
// //                 setPdfData({ base64: pdfData.data, filename: pdfData.filename });
// //                 setShowPdfModal(true);
// //             } catch (error) {
// //                 console.error('Error fetching PDF:', error);
// //                 setPdfData({ base64: null, filename: null });
// //                 setErrorMessage("No PDF available");
// //                 setShowPdfModal(true);
// //             }
// //         }
// //     };



// //     const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
// //         setNumPages(numPages);
// //     };

// //     const handleCloseImageModal = () => {
// //         setShowImageModal(false);
// //     };

// //     const handleClosePdfModal = () => {
// //         setShowPdfModal(false);
// //     };

// //     const handlePrevPage = () => {
// //         setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
// //     };

// //     const handleNextPage = () => {
// //         setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages!));
// //     };




// //     return (
// //         <Box mt={2}>
// //             <Card style={{ padding: '2%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}  sx={{ mt: 1,mb:10,}}>
// //                 <Card style={{

// //                     width: '100%',
// //                 }}>
// //                     <div id="pdfContent">
// //                         <Paper style={{ marginBottom: '20px' }}>
// //                             <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
// //                                 {/* <img src={ponsunImage} alt="Ponsun" style={{ display: 'block', margin: '0 auto', maxWidth: '38%', marginBottom: '20px' }} /> */}
// //                                 <div>
// //                                         {imageURL && (
// //                                             <img
// //                                                 src={imageURL}
// //                                                 alt="Ponsun"
// //                                                 style={{ display: 'block', margin: '0 auto', maxWidth: '35%', height: 'auto', maxHeight: '200px', marginBottom: '20px' }}
// //                                             />
// //                                         )}

// //                                     </div>


// //                                 <h4>Declaration Form</h4>

// //                                 <Typography variant="body1" paragraph>
// //                                     We

// //                                     <TextField
// //                                         variant="standard"
// //                                         name="memberName"
// //                                         size='small'
// //                                         inputProps={{ style: { textAlign: 'center', fontWeight: "800" } }} // Aligns the input text in the center
// //                                         style={{ textAlign: 'center', fontWeight: 800 }} // Aligns the TextField and centers it within its container
// //                                         value={declarationFrom.memberName}

// //                                     />

// //                                     with registered office at <TextField
// //                                         variant="standard"
// //                                         name="registeredPlace"
// //                                         size='small'
// //                                         inputProps={{ style: { textAlign: 'center', fontWeight: "800" } }} // Aligns the input text in the center
// //                                         style={{ textAlign: 'center', fontWeight: 800 }} // Aligns the TextField and centers it within its container

// //                                         value={declarationFrom.registeredPlace}
// //                                         autoComplete="off"
// //                                     // onChange={handleInputChanges}
// //                                     /> have agreed to participate in the implementation of the products & services provided by National Payments Corporation of India (NPCI), with registered office at 1001 A, B wing 10th Floor, The Capital, Bandra-Kurla Complex, Bandra (East), Mumbai - 400051 and for that purpose, We hereby declare and undertake to NPCI that:
// //                                 </Typography>
// //                                 <Typography variant="body1" paragraph>
// //                                     ✓ We hereby confirm to have an established process for Know Your Customer (KYC), Anti Money Laundering process (AML) & Combating of Financing of Terrorism (CFT) and that we shall comply with all the Reserve Bank of India (RBI) norms on KYC, AML & CFT.
// //                                 </Typography>
// //                                 <Typography variant="body1" paragraph>
// //                                     ✓ We hereby confirm that <TextField
// //                                         variant="standard"
// //                                         name="din"
// //                                         value={declarationFrom.din}
// //                                         autoComplete='off'
// //                                         size='small'
// //                                         inputProps={{ style: { textAlign: 'center', fontWeight: "800" } }} // Aligns the input text in the center
// //                                         style={{ textAlign: 'center', fontWeight: 800 }} // Aligns the TextField and centers it within its container

// //                                     // onChange={handleInputChanges}
// //                                     /> number of our | the company’s Director(s) is/are a “Politically Exposed Person (PEP)” or “close relative(s) of a PEP” or appear in the “list of terrorist individuals / entities” provided by RBI. In the event of our existing Director(s) is/are “PEP” or “close relative(s) of PEP” or appear in the list of “terrorist individuals / entities” provided by RBI, the details of same shall be furnished to NPCI on letter head.
// //                                 </Typography>
// //                                 <Typography variant="body1" paragraph>
// //                                     ✓ We hereby confirm to have an appropriate procedure for PEP check and name screening of employees and customers against the list of terrorist individuals / entities provided by RBI/other Regulatory bodies.
// //                                 </Typography>
// //                                 <Typography variant="body1" paragraph>
// //                                     ✓ Keeping in view the new regulatory guidelines of Reserve Bank of India, we hereby confirm to have appropriate ongoing risk management procedures for Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD) in case if any customer(s) or the beneficial owner(s) of an existing account is/are a “PEP” or “close relative(s) of a PEP” or appear in the list of “terrorist individuals / entities” provided by RBI.
// //                                 </Typography>
// //                                 <Typography variant="body1" paragraph>
// //                                     ✓ We hereby confirm to offer NPCI products & services only to the customers who are KYC compliant.
// //                                 </Typography>

// //                             </div>
// //                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //                                 <div>
// //                                     <Typography variant="body1" paragraph>
// //                                         Date: <TextField variant="standard" size='small' name="date" type="date" value={declarationFrom.date}  />
// //                                     </Typography>
// //                                     <Typography variant="body1" paragraph>
// //                                         Place: <TextField variant="standard" size='small' name="place" value={declarationFrom.place} />
// //                                     </Typography>
// //                                 </div>
// //                                 <div>
// //                                     <Typography variant="body1" paragraph align="right">
// //                                         Authorized Signatory(ies)
// //                                     </Typography>
// //                                     <Typography variant="body1" paragraph align="right">
// //                                         <TextField name="authorizeName" size='small' value={declarationFrom.authorizeName} autoComplete='off'  />
// //                                     </Typography>
// //                                     <Typography variant="body1" paragraph align="right">
// //                                         (Name & Designation)
// //                                     </Typography>
// //                                     <Typography variant="body1" paragraph align="right">
// //                                         (With Stamp)
// //                                     </Typography>

// //                                 </div>
// //                             </div>

// //                             <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} />
// //                             <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}></div>


// //                         </Paper>
// //                         <div>
// //                             <Button onClick={handleImageClick}>Show Image</Button>
// //                             <Button onClick={handlePdfClick}>Show PDF</Button>

// //                             <Dialog open={showImageModal} onClose={handleCloseImageModal} fullWidth maxWidth='xl'>
// //                                 <DialogTitle>Image Preview</DialogTitle>
// //                                 <DialogContent>
// //                                     {base64Image && <img src={base64Image} alt="Image Preview" />}
// //                                     {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
// //                                 </DialogContent>
// //                                 <DialogActions>
// //                                     <Button onClick={handleCloseImageModal}>Close</Button>
// //                                 </DialogActions>
// //                             </Dialog>

// //                             <Dialog open={showPdfModal} onClose={handleClosePdfModal} fullWidth maxWidth='xl'>
// //                                 <DialogTitle>PDF Preview</DialogTitle>
// //                                 <DialogContent dividers={true} style={{ height: '80vh', overflowY: 'auto' }}>
// //                                     {pdfData.base64 && (
// //                                         <Document
// //                                             file={`data:application/pdf;base64,${pdfData.base64}`}
// //                                             onLoadSuccess={onDocumentLoadSuccess}
// //                                             className="pdf-document"
// //                                         >
// //                                             <Page pageNumber={pageNumber} width={window.innerWidth * 0.8} />
// //                                         </Document>
// //                                     )}
// //                                     {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
// //                                 </DialogContent>
// //                                 <DialogActions>
// //                                     <Button onClick={handlePrevPage} disabled={pageNumber <= 1}>Prev</Button>
// //                                     <Button onClick={handleNextPage} disabled={pageNumber >= numPages!}>Next</Button>
// //                                     {pdfData.filename && (
// //                                         <div>
// //                                             <a
// //                                                 href={`data:application/pdf;base64,${pdfData.base64}`}
// //                                                 download={pdfData.filename}
// //                                                 target="_blank"
// //                                                 rel="noopener noreferrer"
// //                                                 style={{ textDecoration: 'none', padding: '10px', backgroundColor: '#2a75bb', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
// //                                             >
// //                                                 Download PDF
// //                                             </a>
// //                                         </div>
// //                                     )}
// //                                     <Button onClick={handleClosePdfModal}>Close</Button>
// //                                 </DialogActions>
// //                             </Dialog>
// //                         </div>
// //                     </div>

// //                 </Card>


// //             </Card>
// //         </Box>
// //     );
// // }

// // interface Director {
// //     firstName: string;
// //     middleName: string;
// //     lastName: string;
// //     pan: string;
// //     nationality: string;
// //     citizenship: string;
// //     domicile: string;
// // }

// // interface ShareHolder {
// //     firstName: string;
// //     middleName: string;
// //     lastName: string;
// //     pan: string;
// //     nationality: string;
// //     citizenship: string;
// //     domicile: string;
// // }



// // function TermsAndConditions({ formValues, handleInputChange }: SectionProps) {
// //     const customTitleStyle = {
// //         fontFamily: 'Times New Roman',
// //         fontWeight: 'bold',
// //         backgroundColor: 'whitesmoke',

// //     };

// //     const headingStyle = {
// //         fontFamily: 'Times New Roman',

// //     };

// //     const profileStyle = {
// //         fontFamily: 'Times New Roman',

// //     };

// //     const personalDetails = {
// //         phone: '123-456-7890',
// //         email: 'john.doe@example.com',
// //         address: '123 Main Street, City, Country',
// //     };

// //     const companyStyle = {
// //         fontFamily: 'Times New Roman',
// //         fontWeight: 'bold',
// //     };

// //     const tableStyle = {
// //         fontFamily: 'Times New Roman',
// //         fontWeight: 'bold',
// //     };

// //     const sourceStyle = {
// //         fontFamily: 'Times New Roman',
// //     };

// //     const sourcesStyle = {
// //         fontFamily: 'Times New Roman',
// //         marginBottom: '-15px',
// //     };

// //     const proofStyle = {
// //         fontFamily: 'Times New Roman',
// //         backgroundColor: 'whitesmoke',
// //     }
// //     const applicationfrome = new ApplicationfromeService();
// //     const [directors, setDirectors] = useState<Director[]>([]);
// //     const [shareHolders, setShareHolder] = useState<ShareHolder[]>([]);
// //     const [responseId, setResponseId] = useState(null);
// //     const { kycId } = useParams<{ kycId: string }>();

// //     const [KycformData, setKycFormData] = useState<GetData[]>([
// //         {
// //             id: 0,
// //             kycId: 0,
// //             firstName: '',
// //             middleName: '',
// //             lastName: '',
// //             pan: '',
// //             nationality: 0,
// //             citizenship: 0,
// //             domicile: 0,
// //             isDirector: 1,
// //             isShareHolders: 0,
// //             uid: 0,
// //         }
// //     ]);
// //     const [KycformDataa, setKycFormDatas] = useState<GetDatas[]>([
// //         {
// //             id: 0,
// //             kycId: 0,
// //             firstName: '',
// //             middleName: '',
// //             lastName: '',
// //             pan: '',
// //             nationality: 0,
// //             citizenship: 0,
// //             domicile: 0,
// //             uid: 0,
// //             isDirector: 0,
// //             isShareHolders: 1,
// //         }
// //     ]);

// //     const handleInputChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>, personIndex: number) => {
// //         const { name, value } = event.target as HTMLInputElement | { name: string, value: string };
// //         setKycFormData(prevState => {
// //             return prevState.map((person, index) => {
// //                 if (index === personIndex) {
// //                     return { ...person, [name]: value };
// //                 }
// //                 return person;
// //             });
// //         });
// //     };

// //     const handleInputChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>, personIndex: number) => {
// //         const { name, value } = event.target as HTMLInputElement | { name: string, value: string };
// //         setKycFormDatas(prevState => {
// //             return prevState.map((person, index) => {
// //                 if (index === personIndex) {
// //                     return { ...person, [name]: value };
// //                 }
// //                 return person;
// //             });
// //         });
// //     };

// //     const handleRemoveBoxkycdetails = (personIndex: number) => {
// //         setKycFormData(KycformData.filter((person, index) => index !== personIndex));
// //     };

// //     const handleRemovekycdetails = (personIndex: number) => {
// //         setKycFormDatas(KycformData.filter((person, index) => index !== personIndex));
// //     };

// //     useEffect(() => {
// //         handleDirectors(kycId);
// //         handleShareHolder(kycId);

// //     }, [kycId]);

// //     useEffect(() => {
// //         if (responseId) {
// //         }
// //     }, [responseId]);

// //     const handleDirectors = async (kycId: any) => {
// //         try {
// //             const response = await applicationfrome.getKycDirectorsList(kycId);
// //             console.log('response:', response);
// //             setDirectors(response);
// //         } catch (error) {
// //             console.error("Error fetching directors:", error);
// //         }
// //     };

// //     const handleShareHolder = async (kycId: any) => {
// //         try {
// //             const response = await applicationfrome.getKycShareHolder(kycId);
// //             setShareHolder(response);
// //         } catch (error) {
// //             console.error("Error fetching shareholder:", error);
// //         }
// //     };

// //     const handleSubmit = async () => {
// //         try {
// //             const response = await applicationfrome.Directorslist(KycformData);
// //             const responses = await applicationfrome.Directorslists(KycformDataa);
// //             if (response && response.length > 0) {
// //                 sessionStorage.setItem('kycId', response[0].kycId.toString());
// //             }
// //             setKycFormData(prevState =>
// //                 prevState.map((person, index) => ({
// //                     ...person,
// //                     id: response[index]?.id ?? person.id,
// //                 }))
// //             );
// //             setKycFormDatas(prevState =>
// //                 prevState.map((person, index) => ({
// //                     ...person,
// //                     id: responses[index]?.id ?? person.id,
// //                 }))
// //             );
// //             console.log('Form submitted successfully:', response, responses);
// //         } catch (error) {
// //             console.error('Error submitting form:', error);
// //         }
// //     };

// //     const componentRef = useRef<HTMLDivElement | null>(null);



// //     const [showImageModal, setShowImageModal] = useState(false);
// //     const [showPdfModal, setShowPdfModal] = useState(false);
// //     const [base64Image, setBase64Image] = useState<string | null>(null);
// //     const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({ base64: null, filename: null });
// //     const [errorMessage, setErrorMessage] = useState<string | null>(null);
// //     const [numPages, setNumPages] = useState<number | null>(null);
// //     const [pageNumber, setPageNumber] = useState(1);
// //     const [imageURL, setImageURL] = useState('');

// //     const customerApiService = new DocumentApiService();
// //     const handleImageClick = async () => {
// //         if (kycId) {
// //             try {
// //                 const imageData = await customerApiService.getImage(kycId, "3");
// //                 const base64String = arrayBufferToBase64(imageData);
// //                 setBase64Image(base64String);
// //                 setShowImageModal(true);
// //             } catch (error) {
// //                 console.error('Error fetching image:', error);
// //                 setBase64Image(null);
// //                 setErrorMessage("No image available");
// //                 setShowImageModal(true);
// //             }
// //         }
// //     };
// //     useEffect(() => {
// //         const handleImageClick = async (branchId: number) => {
// //             if (branchId) {
// //                 try {
// //                     const branchId = 1; // Or fetch it from your data source
// //                     const imageData = await customerApiService.getLetterHead(branchId);
// //                     const base64String = arrayBufferToBase64(imageData);
// //                     setImageURL(base64String); // Set imageURL to base64String
// //                 } catch (error) {
// //                     console.error('Error fetching image:', error);
// //                     setImageURL(''); 
// //                     setErrorMessage("No image available");

// //                 }
// //             }
// //         };

// //         handleImageClick(1); // Pass the desired branchId here
// //     }, []);

// //     // const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
// //     //     const binary = new Uint8Array(buffer);
// //     //     const bytes = [];
// //     //     for (let i = 0; i < binary.length; i++) {
// //     //         bytes.push(String.fromCharCode(binary[i]));
// //     //     }
// //     //     return `data:image/png;base64,${btoa(bytes.join(''))}`;
// //     // };
// //     const handlePdfClick = async () => {
// //         if (kycId) {
// //             try {
// //                 const pdfData = await customerApiService.getPDF(kycId, "3");
// //                 setPdfData({ base64: pdfData.data, filename: pdfData.filename });
// //                 setShowPdfModal(true);
// //             } catch (error) {
// //                 console.error('Error fetching PDF:', error);
// //                 setPdfData({ base64: null, filename: null });
// //                 setErrorMessage("No PDF available");
// //                 setShowPdfModal(true);
// //             }
// //         }
// //     };

// //     const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
// //         const binary = new Uint8Array(buffer);
// //         const bytes = [];
// //         for (let i = 0; i < binary.length; i++) {
// //             bytes.push(String.fromCharCode(binary[i]));
// //         }
// //         return `data:image/png;base64,${btoa(bytes.join(''))}`;
// //     };

// //     const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
// //         setNumPages(numPages);
// //     };

// //     const handleCloseImageModal = () => {
// //         setShowImageModal(false);
// //     };

// //     const handleClosePdfModal = () => {
// //         setShowPdfModal(false);
// //     };

// //     const handlePrevPage = () => {
// //         setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
// //     };

// //     const handleNextPage = () => {
// //         setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages!));
// //     };

// //     return (
// //         <Box mt={2}>
// //             <Card style={{ padding: '3%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}sx={{ mt: 1,mb:10,}}>
// //                 <div id="pdfContent">
// //                     <Paper style={{ marginBottom: '20px' }}>
// //                         <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
// //                             {/* <img src={ponsunImage} alt="Ponsun" style={{ display: 'block', margin: '0 auto', maxWidth: '38%', marginBottom: '20px' }} /> */}
// //                             <div>
// //                                         {imageURL && (
// //                                             <img
// //                                                 src={imageURL}
// //                                                 alt="Ponsun"
// //                                                 style={{ display: 'block', margin: '0 auto', maxWidth: '35%', height: 'auto', maxHeight: '200px', marginBottom: '20px' }}
// //                                             />
// //                                         )}
// //                                     </div>
// //                             <Card style={{
// //                                 padding: '1%',
// //                                 width: '100%',
// //                             }}>
// //                                 <div className="key">
// //                                     <h4>List of Directors</h4>
// //                                     <div className="scrollablebox">
// //                                         {directors.map((director, directorIndex) => (
// //                                             <div key={directorIndex} className="person-container">
// //                                                 {directors.length > 1 && (
// //                                                     <div className="close-button" onClick={() => handleRemoveBoxkycdetails(directorIndex)}>
// //                                                         <FontAwesomeIcon icon={faTimes} />
// //                                                     </div>
// //                                                 )}
// //                                                 <Grid container spacing={2}>

// //                                                     <Grid item xs={12} sm={3}>
// //                                                         <p style={headingStyle}><strong>Name  :</strong>  {director.firstName || 'Not Available'}</p>
// //                                                     </Grid>

// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>Middle Name  :</strong>  {director.middleName || 'Not Available'}</p>
// //                                                     </Grid>
// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>Last Name  :</strong>  {director.lastName || 'Not Available'}</p>
// //                                                     </Grid>
// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>PAN  :</strong>  {director.pan || 'Not Available'}</p>
// //                                                     </Grid>
// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>Nationality  :</strong>  {director.nationality || 'Not Available'}</p>
// //                                                     </Grid>

// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>Citizenship  :</strong>  {director.citizenship || 'Not Available'}</p>
// //                                                     </Grid>
// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>Domicile  :</strong>  {director.domicile || 'Not Available'}</p>
// //                                                     </Grid>

// //                                                 </Grid>
// //                                             </div>
// //                                         ))}
// //                                     </div>
// //                                 </div>
// //                             </Card>
// //                             <br></br>
// //                             <Card style={{
// //                                 padding: '1%',
// //                                 width: '100%',
// //                             }}>
// //                                 <div className="key">
// //                                     <h4>List of ShareHolders</h4>
// //                                     <div className="scrollablebox">
// //                                         {shareHolders.map((shareHolder, shareHolderIndex) => (
// //                                             <div key={shareHolderIndex} className="person-container">
// //                                                 {shareHolders.length > 1 && (
// //                                                     <div className="close-button" onClick={() => handleRemovekycdetails(shareHolderIndex)}>
// //                                                         <FontAwesomeIcon icon={faTimes} />
// //                                                     </div>
// //                                                 )}
// //                                                 <Grid container spacing={2}>

// //                                                     <Grid item xs={12} sm={3}>
// //                                                         <p style={headingStyle}><strong>Name  :</strong>  {shareHolder.firstName || 'Not Available'}</p>
// //                                                     </Grid>

// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>Middle Name  :</strong>  {shareHolder.middleName || 'Not Available'}</p>
// //                                                     </Grid>
// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>Last Name  :</strong>  {shareHolder.lastName || 'Not Available'}</p>
// //                                                     </Grid>
// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>PAN  :</strong>  {shareHolder.pan || 'Not Available'}</p>
// //                                                     </Grid>
// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>Nationality  :</strong>  {shareHolder.nationality || 'Not Available'}</p>
// //                                                     </Grid>

// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>Citizenship  :</strong>  {shareHolder.citizenship || 'Not Available'}</p>
// //                                                     </Grid>
// //                                                     <Grid item xs={3}>
// //                                                         <p style={headingStyle}><strong>Domicile  :</strong>  {shareHolder.domicile || 'Not Available'}</p>
// //                                                     </Grid>
// //                                                 </Grid>
// //                                             </div>
// //                                         ))
// //                                         }
// //                                     </div>
// //                                 </div>
// //                             </Card>
// //                             <br></br>
// //                         </div>
// //                         <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} />
// //                             <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}></div>

// //                             <div>
// //                             <Button onClick={handleImageClick}>Show Image</Button>
// //                             <Button onClick={handlePdfClick}>Show PDF</Button>

// //                             <Dialog open={showImageModal} onClose={handleCloseImageModal} fullWidth maxWidth='xl'>
// //                                 <DialogTitle>Image Preview</DialogTitle>
// //                                 <DialogContent>
// //                                     {base64Image && <img src={base64Image} alt="Image Preview" />}
// //                                     {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
// //                                 </DialogContent>
// //                                 <DialogActions>
// //                                     <Button onClick={handleCloseImageModal}>Close</Button>
// //                                 </DialogActions>
// //                             </Dialog>

// //                             <Dialog open={showPdfModal} onClose={handleClosePdfModal} fullWidth maxWidth='xl'>
// //                                 <DialogTitle>PDF Preview</DialogTitle>
// //                                 <DialogContent dividers={true} style={{ height: '80vh', overflowY: 'auto' }}>
// //                                     {pdfData.base64 && (
// //                                         <Document
// //                                             file={`data:application/pdf;base64,${pdfData.base64}`}
// //                                             onLoadSuccess={onDocumentLoadSuccess}
// //                                             className="pdf-document"
// //                                         >
// //                                             <Page pageNumber={pageNumber} width={window.innerWidth * 0.8} />
// //                                         </Document>
// //                                     )}
// //                                     {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
// //                                 </DialogContent>
// //                                 <DialogActions>
// //                                     <Button onClick={handlePrevPage} disabled={pageNumber <= 1}>Prev</Button>
// //                                     <Button onClick={handleNextPage} disabled={pageNumber >= numPages!}>Next</Button>
// //                                     {pdfData.filename && (
// //                                         <div>
// //                                             <a
// //                                                 href={`data:application/pdf;base64,${pdfData.base64}`}
// //                                                 download={pdfData.filename}
// //                                                 target="_blank"
// //                                                 rel="noopener noreferrer"
// //                                                 style={{ textDecoration: 'none', padding: '10px', backgroundColor: '#2a75bb', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
// //                                             >
// //                                                 Download PDF
// //                                             </a>
// //                                         </div>
// //                                     )}
// //                                     <Button onClick={handleClosePdfModal}>Close</Button>
// //                                 </DialogActions>
// //                             </Dialog>
// //                         </div>
// //                     </Paper>
// //                 </div>
// //             </Card>
// //         </Box>
// //     );
// // }



// // interface CustomerData {
// //     kycFormDto: kycForm;
// // };


// // function Pep({ formValues, handleInputChange }: SectionProps) {


// //     return (
// //         <Box mt={2}>


// //             <PepDocument/>
// //             {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
// //                 <button className='btn btn-primary'>
// //                     Save
// //                 </button>&nbsp;
// //                 <button className='btn btn-primary'>
// //                     Submit
// //                 </button>
// //             </div> */}
// //         </Box>
// //     );
// // }
// // function PeriodicView({ formValues, handleInputChange }: SectionProps) {


// //     return (
// //         <Box mt={2}>


// //             <Periodic />
// //             {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
// //                 <button className='btn btn-primary'>
// //                     Save
// //                 </button>&nbsp;
// //                 <button className='btn btn-primary'>
// //                     Submit
// //                 </button>
// //             </div> */}
// //         </Box>
// //     );
// // }
// // function KyCdoument({ formValues, handleInputChange }: SectionProps) {


// //     return (
// //         <Box mt={2}>


// //             <Kycdoument />
// //             {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
// //                 <button className='btn btn-primary'>
// //                     Save
// //                 </button>&nbsp;
// //                 <button className='btn btn-primary'>
// //                     Submit
// //                 </button>
// //             </div> */}
// //         </Box>
// //     );
// // }


// // function ApplicationForm({ formValues, handleInputChange }: SectionProps) {

// //     const [section, setSection] = useState<string>('Application');
// //     const [successMessage, setSuccessMessage] = useState('');
// //     const [isSuccessOpen, setIsSuccessOpen] = useState(false);

// //     const showSuccessMessage = (message: string) => {
// //         setSuccessMessage(message);
// //         setIsSuccessOpen(true);
// //         setTimeout(() => {
// //             setIsSuccessOpen(false);
// //             setSuccessMessage('');
// //         }, 1000);
// //     };

// //     const saveSectionData = () => {
// //         let message = '';
// //         switch (section) {
// //             case 'Application':
// //                 message = 'Application data saved successfully.';
// //                 break;
// //             case 'Button':
// //                 message = 'Button data saved successfully.';
// //                 break;
// //             case 'Terms':
// //                 message = 'Terms data saved successfully.';
// //                 break;
// //             case 'Document Upload':
// //                 message = 'Document Upload data saved successfully.';
// //                 break;
// //             default:
// //                 message = 'Data saved successfully.';
// //                 break;
// //         }
// //         showSuccessMessage(message);
// //     };
// //     return (

// //         <Box mt={2}>

// //             <ApplicationFromView />
// //         </Box>


// //     );
// // }

// // export default BankHeader;

// import { useState, ChangeEvent, useEffect } from 'react';
// import { Box, Typography, TextField, Button, Grid, Card, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// import '../../BankReport/bank.css';
// import MuiAlert from '@mui/material/Alert';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
// import { useParams } from 'react-router-dom';
// import { Paper } from '@mui/material';
// import contactImage from '../../../assets/contact.png';
// import { Document, Page, } from 'react-pdf';

// import Header from '../../../layouts/header/header';



// import Kycdoument from '../../kyc/View/Kycdoument';

// import ApplicationFromView from '../../kyc/View/ApplicationFromView';
// import Periodic from '../../kyc/periodicview/Periodic';
// import ApplicationfromeService from '../../../data/services/kyc/applicationfrom/applicationfrome-api-service';
// import DocumentApiService from '../../../data/services/document/Document_api_service';
// import PepDocument from '../../kyc/document/PepDocument';
// import { GetData, GetDatas } from '../../../data/services/kyc/applicationfrom/applicationfrome-payload';
// import ClientFiles from '../../ClientView/ClientFiles';

// interface ApplicationFormValues {
//     memberName: string;
//     officeAddress: string;
//     pepCount: string;
//     date: string;
//     place: string;
//     authorizedSignatory: string;
//     designation: string;
//     stamp: string;
// };

// interface ButtonFormValues {
//     buttonText: string;
// };

// interface TermsFormValues {
//     termsContent: string;
// };

// interface FormValues {
//     application: ApplicationFormValues;
//     button: ButtonFormValues;
//     terms: TermsFormValues;
// };

// interface SectionProps {
//     formValues: any;
//     handleInputChange: (sectionName: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
// };

// function BankHeader() {

//     const [section, setSection] = useState<string>('Application');
//     const [activeButton, setActiveButton] = useState<string>('');
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [isErrorOpen, setIsErrorOpen] = useState(false);

//     const [formValues, setFormValues] = useState<FormValues>({
//         application: {
//             memberName: '',
//             officeAddress: '',
//             pepCount: '',
//             date: '',
//             place: '',
//             authorizedSignatory: '',
//             designation: '',
//             stamp: ''
//         },
//         button: {
//             buttonText: 'Click Me'
//         },
//         terms: {
//             termsContent: ''
//         }
//     });

//     const handleSectionChange = (sectionName: string) => {
//         setSection(sectionName);
//     };

//     const handleInputChange = (sectionName: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = event.target;
//         setFormValues((prevValues) => ({
//             ...prevValues,
//             [sectionName]: {
//                 ...prevValues[sectionName as keyof FormValues],
//                 [name]: value
//             }
//         }));
//     };

//     const showSuccessMessage = (message: string) => {
//         setSuccessMessage(message);
//         setIsSuccessOpen(true);
//         setTimeout(() => {
//             setIsSuccessOpen(false);
//             setSuccessMessage('');
//         }, 1000);
//     };

//     const renderSectionContent = () => {
//         switch (section) {
//             case 'Application':
//                 return <ApplicationForm formValues={formValues.application} handleInputChange={handleInputChange} />;
//             case 'Button':
//                 return <ButtonContent formValues={formValues.button} handleInputChange={handleInputChange} />;
//             case 'Terms':
//                 return <TermsAndConditions formValues={formValues.terms} handleInputChange={handleInputChange} />;
//             case 'KyCdoument':
//                 return <KyCdoument formValues={formValues.terms} handleInputChange={handleInputChange} />;
//             case 'Pep':
//                 return <Pep formValues={formValues.terms} handleInputChange={handleInputChange} />;
//             case 'Client from Files':
//                 return <Client formValues={formValues.terms} handleInputChange={handleInputChange} />;
//             case 'PeriodicView':
//                 return <PeriodicView formValues={formValues.terms} handleInputChange={handleInputChange} />;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <>
//             <Box sx={{ display: 'flex' }}>
//                 <Header />
//                 <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                     <Box m={2}>
//                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '110vh' }}>
//                             <Card style={{ padding: '0.5%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', height: '81%' }}>
//                                 <Grid container>
//                                     {/* <Grid item xs={12} sm={2}> */}
//                                     <div>
//                                         {/* <span style={{ textAlign: 'center' }}>Client form</span> */}
//                                         <h4 style={{ textAlign: 'center' }}>CLIENT FORM</h4>
//                                     </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                     {/* </Grid> */}
//                                     <Grid item xs={12} sm={2}>
//                                         <div
//                                             className={`arrow ${activeButton === 'Application' ? 'active' : ''}`}
//                                             onClick={() => {
//                                                 setActiveButton('Application');
//                                                 handleSectionChange('Application');
//                                             }}
//                                         >
//                                             <span style={{ textAlign: 'center' }}>Aml Kyc Questionnaire</span>
//                                         </div>
//                                     </Grid>
//                                     <Grid item xs={12} sm={2}>
//                                         <div
//                                             className={`arrow ${activeButton === 'Button' ? 'active' : ''}`}
//                                             onClick={() => {
//                                                 setActiveButton('Button');
//                                                 handleSectionChange('Button');
//                                             }}
//                                         >
//                                             <span style={{ textAlign: 'center' }}>Declaration</span>
//                                         </div>
//                                     </Grid>
//                                     <Grid item xs={12} sm={2}>
//                                         <div
//                                             className={`arrow ${activeButton === 'Terms' ? 'active' : ''}`}
//                                             onClick={() => {
//                                                 setActiveButton('Terms');
//                                                 handleSectionChange('Terms');
//                                             }}
//                                         >
//                                             <span style={{ textAlign: 'center' }}>List of Board Directors</span>
//                                         </div>
//                                     </Grid>
//                                     <Grid item xs={12} sm={2}>
//                                         <div
//                                             className={`arrow ${activeButton === 'KyCdoument' ? 'active' : ''}`}
//                                             onClick={() => {
//                                                 setActiveButton('KyCdoument');
//                                                 handleSectionChange('KyCdoument');
//                                             }}
//                                         >
//                                             <span style={{ textAlign: 'center' }}>KYC Document</span>
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                                 <br />
//                                 <Grid container>
//                                     <div>
//                                         <h4 style={{ textAlign: 'center' }}>NPCI REVIEW</h4>
//                                     </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                     {/* </Grid> */}
//                                     <Grid item xs={12} sm={2}>
//                                         <div
//                                             className={`arrow ${activeButton === 'Client from Files' ? 'active' : ''}`}
//                                             onClick={() => {
//                                                 setActiveButton('Client from Files');
//                                                 handleSectionChange('Client from Files');
//                                             }}
//                                         >
//                                             <span style={{ textAlign: 'center' }}>Client Files</span>
//                                         </div>
//                                     </Grid>
//                                     <Grid item xs={12} sm={2}>
//                                         <div
//                                             className={`arrow ${activeButton === 'Pep' ? 'active' : ''}`}
//                                             onClick={() => {
//                                                 setActiveButton('Pep');
//                                                 handleSectionChange('Pep');
//                                             }}
//                                         >
//                                             <span style={{ textAlign: 'center' }}>Entity Screening</span>
//                                         </div>
//                                     </Grid>
//                                     <Grid item xs={12} sm={2}>
//                                         <div
//                                             className={`arrow ${activeButton === 'PeriodicView' ? 'active' : ''}`}
//                                             onClick={() => {
//                                                 setActiveButton('PeriodicView');
//                                                 handleSectionChange('PeriodicView');
//                                             }}
//                                         >
//                                             <span style={{ textAlign: 'center' }}>Risk Assessment</span>
//                                         </div>
//                                     </Grid>
//                                     <Grid item xs={12} sm={2}>
//                                         <div
//                                             className={`arrow ${activeButton === 'Aml' ? 'active' : ''}`}
//                                             onClick={() => {
//                                                 setActiveButton('Aml');
//                                                 handleSectionChange('Aml');
//                                             }}
//                                         >
//                                             <span style={{ textAlign: 'center' }}>Queries</span>
//                                         </div>
//                                     </Grid>
//                                     <Grid item xs={12} sm={2}>
//                                         <div
//                                             className={`arrow ${activeButton === 'Periodic Review' ? 'active' : ''}`}
//                                             onClick={() => {
//                                                 setActiveButton('Periodic Review');
//                                                 handleSectionChange('Aml');
//                                             }}
//                                         >
//                                             <span style={{ textAlign: 'center' }}>Periodic Review</span>
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                                 <div style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
//                                     {renderSectionContent()}
//                                 </div>
//                             </Card>
//                         </div>
//                         <Box mt={2} textAlign="center">
//                             <Snackbar
//                                 open={isSuccessOpen}
//                                 autoHideDuration={5000}
//                                 onClose={() => setIsSuccessOpen(false)}
//                                 anchorOrigin={{
//                                     vertical: 'top',
//                                     horizontal: 'right',
//                                 }}
//                             >
//                                 <MuiAlert
//                                     elevation={6}
//                                     variant="filled"
//                                     severity="success"
//                                     onClose={() => setIsSuccessOpen(false)}
//                                 >
//                                     {successMessage}
//                                 </MuiAlert>
//                             </Snackbar>
//                             <Snackbar
//                                 open={isErrorOpen}
//                                 autoHideDuration={5000}
//                                 onClose={() => setIsErrorOpen(false)}
//                                 anchorOrigin={{
//                                     vertical: 'top',
//                                     horizontal: 'right',
//                                 }}
//                             >
//                                 <MuiAlert
//                                     elevation={6}
//                                     variant="filled"
//                                     severity="error"
//                                     onClose={() => setIsErrorOpen(false)}
//                                 >
//                                     {errorMessage}
//                                 </MuiAlert>
//                             </Snackbar>
//                         </Box>
//                     </Box>
//                 </Box>
//             </Box >
//         </>
//     );
// }

// function ButtonContent({ formValues, handleInputChange }: SectionProps) {

//     const [declarationFrom, setDeclarationFrom] = useState({
//         id: 0,
//         kycId: 0,
//         memberName: '',
//         registeredPlace: '',
//         din: '',
//         date: '',
//         place: '',
//         authorizeName: '',
//         authorizeDesignation: '',
//         uid: 0,
//     });

//     const applicationfrome = new ApplicationfromeService();
//     const [selectedImage, setSelectedImage] = useState<string | null>(null);
//     const [showModal, setShowModal] = useState(false);
//     const [imageURL, setImageURL] = useState('');
//     const [zoomLevel, setZoomLevel] = useState<number>(1);
//     const { kycId } = useParams<{ kycId: string }>();
//     const [showImageModal, setShowImageModal] = useState(false);
//     const [showPdfModal, setShowPdfModal] = useState(false);
//     const [base64Image, setBase64Image] = useState<string | null>(null);
//     const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({ base64: null, filename: null });
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [numPages, setNumPages] = useState<number | null>(null);
//     const [pageNumber, setPageNumber] = useState(1);
//     const customerApiService = new DocumentApiService();

//     useEffect(() => {
//         if (kycId) {
//             handleDeclarationForm(kycId);
//         }
//     }, [kycId]);

//     useEffect(() => {
//         const handleImageClick = async (branchId: number) => {
//             if (branchId) {
//                 try {
//                     const branchId = 1;
//                     const imageData = await customerApiService.getLetterHead(branchId);
//                     const base64String = arrayBufferToBase64(imageData);
//                     setImageURL(base64String);
//                 } catch (error) {
//                     console.error('Error fetching image:', error);
//                     setImageURL('');
//                     setErrorMessage("No image available");
//                 }
//             }
//         };
//         handleImageClick(1);
//     }, []);

//     const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
//         const binary = new Uint8Array(buffer);
//         const bytes = [];
//         for (let i = 0; i < binary.length; i++) {
//             bytes.push(String.fromCharCode(binary[i]));
//         }
//         return `data:image/png;base64,${btoa(bytes.join(''))}`;
//     };

//     useEffect(() => {
//         const responseId = sessionStorage.getItem('responseId');
//         if (responseId) {
//             console.log('Declaration responseId:', responseId);
//             setDeclarationFrom(prevState => ({
//                 ...prevState,
//                 kycId: parseInt(responseId, 10),
//             }));
//         }
//     }, []);

//     const handleDeclarationForm = async (kycId: string) => {
//         try {
//             const response = await applicationfrome.getDeclarationForm(kycId);
//             console.log('df:', response);
//             if (response && response.length > 0) {
//                 setDeclarationFrom(response[0]);
//             }
//         } catch (error) {
//             console.error("Error fetching declaration form:", error);
//         }
//     };

//     const handleImageClick = async () => {
//         if (kycId) {
//             try {
//                 const imageData = await customerApiService.getImage(kycId, 2);
//                 const base64String = arrayBufferToBase64(imageData);
//                 setBase64Image(base64String);
//                 setShowImageModal(true);
//             } catch (error) {
//                 console.error('Error fetching image:', error);
//                 setBase64Image(null);
//                 setErrorMessage("No image available");
//                 setShowImageModal(true);
//             }
//         }
//     };

//     const handlePdfClick = async () => {
//         if (kycId) {
//             try {
//                 const pdfData = await customerApiService.getPDF(kycId, 2);
//                 setPdfData({ base64: pdfData.data, filename: pdfData.filename });
//                 setShowPdfModal(true);
//             } catch (error) {
//                 console.error('Error fetching PDF:', error);
//                 setPdfData({ base64: null, filename: null });
//                 setErrorMessage("No PDF available");
//                 setShowPdfModal(true);
//             }
//         }
//     };

//     const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//         setNumPages(numPages);
//     };

//     const handleCloseImageModal = () => {
//         setShowImageModal(false);
//     };

//     const handleClosePdfModal = () => {
//         setShowPdfModal(false);
//     };

//     const handlePrevPage = () => {
//         setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
//     };

//     const handleNextPage = () => {
//         setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages!));
//     };

//     return (
//         <Box mt={2}>
//             <Card style={{ padding: '2%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }} sx={{ mt: 1, mb: 10, }}>
//                 <Card style={{
//                     width: '100%',
//                 }}>
//                     <div id="pdfContent">
//                         <Paper style={{ marginBottom: '20px' }}>
//                             <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
//                                 {/* <div>
//                                     {imageURL && (
//                                         <img
//                                             src={imageURL}
//                                             alt="Ponsun"
//                                             style={{ display: 'block', margin: '0 auto', maxWidth: '35%', height: 'auto', maxHeight: '200px', marginBottom: '20px' }}
//                                         />
//                                     )}
//                                 </div> */}
//                                 <h4>Declaration Form</h4>
//                                 <Typography variant="body1" paragraph>
//                                     We
//                                     <TextField
//                                         variant="standard"
//                                         name="memberName"
//                                         size='small'
//                                         inputProps={{ style: { textAlign: 'center', fontWeight: "800" } }}
//                                         style={{ textAlign: 'center', fontWeight: 800 }}
//                                         value={declarationFrom.memberName}
//                                     />
//                                     with registered office at <TextField
//                                         variant="standard"
//                                         name="registeredPlace"
//                                         size='small'
//                                         inputProps={{ style: { textAlign: 'center', fontWeight: "800" } }}
//                                         style={{ textAlign: 'center', fontWeight: 800 }}
//                                         value={declarationFrom.registeredPlace}
//                                         autoComplete="off"
//                                     /> have agreed to participate in the implementation of the products & services provided by National Payments Corporation of India (NPCI), with registered office at 1001 A, B wing 10th Floor, The Capital, Bandra-Kurla Complex, Bandra (East), Mumbai - 400051 and for that purpose, We hereby declare and undertake to NPCI that:
//                                 </Typography>
//                                 <Typography variant="body1" paragraph>
//                                     ✓ We hereby confirm to have an established process for Know Your Customer (KYC), Anti Money Laundering process (AML) & Combating of Financing of Terrorism (CFT) and that we shall comply with all the Reserve Bank of India (RBI) norms on KYC, AML & CFT.
//                                 </Typography>
//                                 <Typography variant="body1" paragraph>
//                                     ✓ We hereby confirm that <TextField
//                                         variant="standard"
//                                         name="din"
//                                         value={declarationFrom.din}
//                                         autoComplete='off'
//                                         size='small'
//                                         inputProps={{ style: { textAlign: 'center', fontWeight: "800" } }}
//                                         style={{ textAlign: 'center', fontWeight: 800 }}
//                                     /> number of our | the company’s Director(s) is/are a “Politically Exposed Person (PEP)” or “close relative(s) of a PEP” or appear in the “list of terrorist individuals / entities” provided by RBI. In the event of our existing Director(s) is/are “PEP” or “close relative(s) of PEP” or appear in the list of “terrorist individuals / entities” provided by RBI, the details of same shall be furnished to NPCI on letter head.
//                                 </Typography>
//                                 <Typography variant="body1" paragraph>
//                                     ✓ We hereby confirm to have an appropriate procedure for PEP check and name screening of employees and customers against the list of terrorist individuals / entities provided by RBI/other Regulatory bodies.
//                                 </Typography>
//                                 <Typography variant="body1" paragraph>
//                                     ✓ Keeping in view the new regulatory guidelines of Reserve Bank of India, we hereby confirm to have appropriate ongoing risk management procedures for Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD) in case if any customer(s) or the beneficial owner(s) of an existing account is/are a “PEP” or “close relative(s) of a PEP” or appear in the list of “terrorist individuals / entities” provided by RBI.
//                                 </Typography>
//                                 <Typography variant="body1" paragraph>
//                                     ✓ We hereby confirm to offer NPCI products & services only to the customers who are KYC compliant.
//                                 </Typography>
//                             </div>
//                             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                 <div>
//                                     <Typography variant="body1" paragraph>
//                                         Date: <TextField variant="standard" size='small' name="date" type="date" value={declarationFrom.date} />
//                                     </Typography>
//                                     <Typography variant="body1" paragraph>
//                                         Place: <TextField variant="standard" size='small' name="place" value={declarationFrom.place} />
//                                     </Typography>
//                                 </div>
//                                 <div>
//                                     <Typography variant="body1" paragraph align="right">
//                                         Authorized Signatory(ies)
//                                     </Typography>
//                                     <Typography variant="body1" paragraph align="right">
//                                         <TextField name="authorizeName" size='small' value={declarationFrom.authorizeName} autoComplete='off' />
//                                     </Typography>
//                                     <Typography variant="body1" paragraph align="right">
//                                         <TextField name="authorizeDesignation" size='small' value={declarationFrom.authorizeDesignation} autoComplete='off' />
//                                     </Typography>
//                                     <Typography variant="body1" paragraph align="right">
//                                         (Name & Designation)
//                                     </Typography>
//                                     <Typography variant="body1" paragraph align="right">
//                                         (With Stamp)
//                                     </Typography>
//                                 </div>
//                                 {/* <div>
//                                     <Typography variant="body1" paragraph align="right">
//                                         Authorized Signatory(ies)
//                                     </Typography>
//                                     <Typography variant="body1" paragraph align="right">
//                                         <TextField name="authorizeName" size='small' value={declarationFrom.authorizeName} autoComplete='off' />
//                                     </Typography>
//                                     <Typography variant="body1" paragraph align="right">
//                                         (Name & Designation)
//                                     </Typography>
//                                     <Typography variant="body1" paragraph align="right">
//                                         (With Stamp)
//                                     </Typography>
//                                 </div> */}
//                             </div>
//                             {/* <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} /> */}
//                             <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}></div>
//                         </Paper>
//                         <div>
//                             {/* <Button onClick={handleImageClick}>Show Image</Button>
//                             <Button onClick={handlePdfClick}>Show PDF</Button> */}
//                             <Dialog open={showImageModal} onClose={handleCloseImageModal} fullWidth maxWidth='xl'>
//                                 <DialogTitle>Image Preview</DialogTitle>
//                                 <DialogContent>
//                                     {base64Image && <img src={base64Image} alt="Image Preview" />}
//                                     {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
//                                 </DialogContent>
//                                 <DialogActions>
//                                     <Button onClick={handleCloseImageModal}>Close</Button>
//                                 </DialogActions>
//                             </Dialog>
//                             <Dialog open={showPdfModal} onClose={handleClosePdfModal} fullWidth maxWidth='xl'>
//                                 <DialogTitle>PDF Preview</DialogTitle>
//                                 <DialogContent dividers={true} style={{ height: '80vh', overflowY: 'auto' }}>
//                                     {pdfData.base64 && (
//                                         <Document
//                                             file={`data:application/pdf;base64,${pdfData.base64}`}
//                                             onLoadSuccess={onDocumentLoadSuccess}
//                                             className="pdf-document"
//                                         >
//                                             <Page pageNumber={pageNumber} width={window.innerWidth * 0.8} />
//                                         </Document>
//                                     )}
//                                     {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
//                                 </DialogContent>
//                                 <DialogActions>
//                                     <Button onClick={handlePrevPage} disabled={pageNumber <= 1}>Prev</Button>
//                                     <Button onClick={handleNextPage} disabled={pageNumber >= numPages!}>Next</Button>
//                                     {pdfData.filename && (
//                                         <div>
//                                             <a
//                                                 href={`data:application/pdf;base64,${pdfData.base64}`}
//                                                 download={pdfData.filename}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 style={{ textDecoration: 'none', padding: '10px', backgroundColor: '#2a75bb', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
//                                             >
//                                                 Download PDF
//                                             </a>
//                                         </div>
//                                     )}
//                                     <Button onClick={handleClosePdfModal}>Close</Button>
//                                 </DialogActions>
//                             </Dialog>
//                         </div>
//                     </div>
//                 </Card>
//             </Card>
//         </Box>
//     );
// }

// interface Director {
//     firstName: string;
//     middleName: string;
//     lastName: string;
//     pan: string;
//     nationality: string;
//     citizenship: string;
//     domicile: string;
// };

// interface ShareHolder {
//     firstName: string;
//     middleName: string;
//     lastName: string;
//     pan: string;
//     nationality: string;
//     citizenship: string;
//     domicile: string;
// };

// function TermsAndConditions({ formValues, handleInputChange }: SectionProps) {

//     const headingStyle = {
//         fontFamily: 'Times New Roman',
//     };

//     const applicationfrome = new ApplicationfromeService();
//     const [directors, setDirectors] = useState<Director[]>([]);
//     const [shareHolders, setShareHolder] = useState<ShareHolder[]>([]);
//     const [responseId, setResponseId] = useState(null);
//     const { kycId } = useParams<{ kycId: string }>();

//     const [KycformData, setKycFormData] = useState<GetData[]>([
//         {
//             id: 0,
//             kycId: 0,
//             firstName: '',
//             middleName: '',
//             lastName: '',
//             pan: '',
//             nationality: 0,
//             citizenship: 0,
//             domicile: 0,
//             isDirector: 1,
//             isShareHolders: 0,
//             uid: 0,
//         }
//     ]);

//     const [KycformDataa, setKycFormDatas] = useState<GetDatas[]>([
//         {
//             id: 0,
//             kycId: 0,
//             firstName: '',
//             middleName: '',
//             lastName: '',
//             pan: '',
//             nationality: 0,
//             citizenship: 0,
//             domicile: 0,
//             uid: 0,
//             isDirector: 0,
//             isShareHolders: 1,
//         }
//     ]);

//     const handleRemoveBoxkycdetails = (personIndex: number) => {
//         setKycFormData(KycformData.filter((person, index) => index !== personIndex));
//     };

//     const handleRemovekycdetails = (personIndex: number) => {
//         setKycFormDatas(KycformData.filter((person, index) => index !== personIndex));
//     };

//     useEffect(() => {
//         handleDirectors(kycId);
//         handleShareHolder(kycId);
//     }, [kycId]);

//     useEffect(() => {
//         if (responseId) {
//         }
//     }, [responseId]);

//     const handleDirectors = async (kycId: any) => {
//         try {
//             const response = await applicationfrome.getKycDirectorsList(kycId);
//             setDirectors(response);
//         } catch (error) {
//             console.error("Error fetching directors:", error);
//         }
//     };

//     const handleShareHolder = async (kycId: any) => {
//         try {
//             const response = await applicationfrome.getKycShareHolder(kycId);
//             setShareHolder(response);
//         } catch (error) {
//             console.error("Error fetching shareholder:", error);
//         }
//     };

//     const [showImageModal, setShowImageModal] = useState(false);
//     const [showPdfModal, setShowPdfModal] = useState(false);
//     const [base64Image, setBase64Image] = useState<string | null>(null);
//     const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({ base64: null, filename: null });
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [numPages, setNumPages] = useState<number | null>(null);
//     const [pageNumber, setPageNumber] = useState(1);
//     const [imageURL, setImageURL] = useState('');
//     const customerApiService = new DocumentApiService();

//     const handleImageClick = async () => {
//         if (kycId) {
//             try {
//                 const imageData = await customerApiService.getImage(kycId, 3);
//                 const base64String = arrayBufferToBase64(imageData);
//                 setBase64Image(base64String);
//                 setShowImageModal(true);
//             } catch (error) {
//                 console.error('Error fetching image:', error);
//                 setBase64Image(null);
//                 setErrorMessage("No image available");
//                 setShowImageModal(true);
//             }
//         }
//     };

//     useEffect(() => {
//         const handleImageClick = async (branchId: number) => {
//             if (branchId) {
//                 try {
//                     const branchId = 1;
//                     const imageData = await customerApiService.getLetterHead(branchId);
//                     const base64String = arrayBufferToBase64(imageData);
//                     setImageURL(base64String);
//                 } catch (error) {
//                     console.error('Error fetching image:', error);
//                     setImageURL('');
//                     setErrorMessage("No image available");
//                 }
//             }
//         };
//         handleImageClick(1);
//     }, []);

//     const handlePdfClick = async () => {
//         if (kycId) {
//             try {
//                 const pdfData = await customerApiService.getPDF(kycId, 3);
//                 setPdfData({ base64: pdfData.data, filename: pdfData.filename });
//                 setShowPdfModal(true);
//             } catch (error) {
//                 console.error('Error fetching PDF:', error);
//                 setPdfData({ base64: null, filename: null });
//                 setErrorMessage("No PDF available");
//                 setShowPdfModal(true);
//             }
//         }
//     };

//     const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
//         const binary = new Uint8Array(buffer);
//         const bytes = [];
//         for (let i = 0; i < binary.length; i++) {
//             bytes.push(String.fromCharCode(binary[i]));
//         }
//         return `data:image/png;base64,${btoa(bytes.join(''))}`;
//     };

//     const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//         setNumPages(numPages);
//     };

//     const handleCloseImageModal = () => {
//         setShowImageModal(false);
//     };

//     const handleClosePdfModal = () => {
//         setShowPdfModal(false);
//     };

//     const handlePrevPage = () => {
//         setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
//     };

//     const handleNextPage = () => {
//         setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages!));
//     };

//     return (
//         <Box mt={2}>
//             <Card style={{ padding: '3%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }} sx={{ mt: 1, mb: 10, }}>
//                 <div id="pdfContent">
//                     <Paper style={{ marginBottom: '20px' }}>
//                         <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
//                             {/* <div>
//                                 {imageURL && (
//                                     <img
//                                         src={imageURL}
//                                         alt="Ponsun"
//                                         style={{ display: 'block', margin: '0 auto', maxWidth: '35%', height: 'auto', maxHeight: '200px', marginBottom: '20px' }}
//                                     />
//                                 )}
//                             </div> */}
//                             <Card style={{
//                                 padding: '1%',
//                                 width: '100%',
//                             }}>
//                                 <div className="key">
//                                     <h4>List of Directors</h4>
//                                     <div className="scrollablebox">
//                                         {directors.map((director, directorIndex) => (
//                                             <div key={directorIndex} className="person-container">
//                                                 {/* {directors.length > 1 && (
//                                                     <div className="close-button" onClick={() => handleRemoveBoxkycdetails(directorIndex)}>
//                                                         <FontAwesomeIcon icon={faTimes} />
//                                                     </div>
//                                                 )} */}
//                                                 <Grid container spacing={2}>
//                                                     <Grid item xs={12} sm={3}>
//                                                         <p style={headingStyle}><strong>Name  :</strong>  {director.firstName || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>Middle Name  :</strong>  {director.middleName || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>Last Name  :</strong>  {director.lastName || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>PAN  :</strong>  {director.pan || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>Nationality  :</strong>  {director.nationality || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>Citizenship  :</strong>  {director.citizenship || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>Domicile  :</strong>  {director.domicile || 'Not Available'}</p>
//                                                     </Grid>
//                                                 </Grid>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </Card>
//                             <br></br>
//                             <Card style={{
//                                 padding: '1%',
//                                 width: '100%',
//                             }}>
//                                 <div className="key">
//                                     <h4>List of ShareHolders</h4>
//                                     <div className="scrollablebox">
//                                         {shareHolders.map((shareHolder, shareHolderIndex) => (
//                                             <div key={shareHolderIndex} className="person-container">
//                                                 ` {/* {shareHolders.length > 1 && (
//                                                     <div className="close-button" onClick={() => handleRemovekycdetails(shareHolderIndex)}>
//                                                         <FontAwesomeIcon icon={faTimes} />
//                                                     </div>
//                                                 )}` */}
//                                                 <Grid container spacing={2}>
//                                                     <Grid item xs={12} sm={3}>
//                                                         <p style={headingStyle}><strong>Name  :</strong>  {shareHolder.firstName || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>Middle Name  :</strong>  {shareHolder.middleName || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>Last Name  :</strong>  {shareHolder.lastName || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>PAN  :</strong>  {shareHolder.pan || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>Nationality  :</strong>  {shareHolder.nationality || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>Citizenship  :</strong>  {shareHolder.citizenship || 'Not Available'}</p>
//                                                     </Grid>
//                                                     <Grid item xs={3}>
//                                                         <p style={headingStyle}><strong>Domicile  :</strong>  {shareHolder.domicile || 'Not Available'}</p>
//                                                     </Grid>
//                                                 </Grid>
//                                             </div>
//                                         ))
//                                         }
//                                     </div>
//                                 </div>
//                             </Card>
//                             <br></br>
//                         </div>
//                         {/* <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} /> */}
//                         <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}></div>
//                         <div>
//                             {/* <Button onClick={handleImageClick}>Show Image</Button>
//                             <Button onClick={handlePdfClick}>Show PDF</Button> */}
//                             <Dialog open={showImageModal} onClose={handleCloseImageModal} fullWidth maxWidth='xl'>
//                                 <DialogTitle>Image Preview</DialogTitle>
//                                 <DialogContent>
//                                     {base64Image && <img src={base64Image} alt="Image Preview" />}
//                                     {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
//                                 </DialogContent>
//                                 <DialogActions>
//                                     <Button onClick={handleCloseImageModal}>Close</Button>
//                                 </DialogActions>
//                             </Dialog>
//                             <Dialog open={showPdfModal} onClose={handleClosePdfModal} fullWidth maxWidth='xl'>
//                                 <DialogTitle>PDF Preview</DialogTitle>
//                                 <DialogContent dividers={true} style={{ height: '80vh', overflowY: 'auto' }}>
//                                     {pdfData.base64 && (
//                                         <Document
//                                             file={`data:application/pdf;base64,${pdfData.base64}`}
//                                             onLoadSuccess={onDocumentLoadSuccess}
//                                             className="pdf-document"
//                                         >
//                                             <Page pageNumber={pageNumber} width={window.innerWidth * 0.8} />
//                                         </Document>
//                                     )}
//                                     {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
//                                 </DialogContent>
//                                 <DialogActions>
//                                     <Button onClick={handlePrevPage} disabled={pageNumber <= 1}>Prev</Button>
//                                     <Button onClick={handleNextPage} disabled={pageNumber >= numPages!}>Next</Button>
//                                     {pdfData.filename && (
//                                         <div>
//                                             <a
//                                                 href={`data:application/pdf;base64,${pdfData.base64}`}
//                                                 download={pdfData.filename}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 style={{ textDecoration: 'none', padding: '10px', backgroundColor: '#2a75bb', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
//                                             >
//                                                 Download PDF
//                                             </a>
//                                         </div>
//                                     )}
//                                     <Button onClick={handleClosePdfModal}>Close</Button>
//                                 </DialogActions>
//                             </Dialog>
//                         </div>
//                     </Paper>
//                 </div>
//             </Card>
//         </Box>
//     );
// }

// function Pep({ formValues, handleInputChange }: SectionProps) {

//     return (
//         <Box mt={2}>
//             <PepDocument />
//         </Box>
//     );
// }
// function Client({ formValues, handleInputChange }: SectionProps) {

//     return (
//         <Box mt={2}>
//             <ClientFiles />
//         </Box>
//     );
// }

// function PeriodicView({ formValues, handleInputChange }: SectionProps) {

//     return (
//         <Box mt={2}>
//             <Periodic />
//         </Box>
//     );
// }

// function KyCdoument({ formValues, handleInputChange }: SectionProps) {

//     return (
//         <Box mt={2}>
//             <Kycdoument />
//         </Box>
//     );
// }

// function ApplicationForm({ formValues, handleInputChange }: SectionProps) {

//     const [section, setSection] = useState<string>('Application');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [isSuccessOpen, setIsSuccessOpen] = useState(false);

//     const showSuccessMessage = (message: string) => {
//         setSuccessMessage(message);
//         setIsSuccessOpen(true);
//         setTimeout(() => {
//             setIsSuccessOpen(false);
//             setSuccessMessage('');
//         }, 1000);
//     };

//     return (

//         <Box mt={2}>
//             <ApplicationFromView />
//         </Box>
//     );
// }

// export default BankHeader;

import { useState, ChangeEvent, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import '../../BankReport/bank.css';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import { Paper } from '@mui/material';
import { Document, Page, } from 'react-pdf';
import Header from '../../../layouts/header/header';
import Kycdoument from '../../kyc/View/Kycdoument';
import ApplicationFromView from '../../kyc/View/ApplicationFromView';
import Periodic from '../../kyc/periodicview/Periodic';
import ApplicationfromeService from '../../../data/services/kyc/applicationfrom/applicationfrome-api-service';
import DocumentApiService from '../../../data/services/document/Document_api_service';
import PepDocument from '../../kyc/document/PepDocument';
import { GetData, GetDatas } from '../../../data/services/kyc/applicationfrom/applicationfrome-payload';
import ClientFiles from '../../ClientView/ClientFiles';

interface ApplicationFormValues {
    memberName: string;
    officeAddress: string;
    pepCount: string;
    date: string;
    place: string;
    authorizedSignatory: string;
    designation: string;
    stamp: string;
};

interface ButtonFormValues {
    buttonText: string;
};

interface TermsFormValues {
    termsContent: string;
};

interface FormValues {
    application: ApplicationFormValues;
    button: ButtonFormValues;
    terms: TermsFormValues;
};

interface SectionProps {
    formValues: any;
    handleInputChange: (sectionName: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function BankHeader() {

    const [section, setSection] = useState<string>('Application');
    const [activeButton, setActiveButton] = useState<string>('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isErrorOpen, setIsErrorOpen] = useState(false);

    const [formValues, setFormValues] = useState<FormValues>({
        application: {
            memberName: '',
            officeAddress: '',
            pepCount: '',
            date: '',
            place: '',
            authorizedSignatory: '',
            designation: '',
            stamp: ''
        },
        button: {
            buttonText: 'Click Me'
        },
        terms: {
            termsContent: ''
        }
    });

    const handleSectionChange = (sectionName: string) => {
        setSection(sectionName);
    };

    const handleInputChange = (sectionName: string, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [sectionName]: {
                ...prevValues[sectionName as keyof FormValues],
                [name]: value
            }
        }));
    };

    const renderSectionContent = () => {
        switch (section) {
            case 'Application':
                return <ApplicationForm formValues={formValues.application} handleInputChange={handleInputChange} />;
            case 'Button':
                return <ButtonContent formValues={formValues.button} handleInputChange={handleInputChange} />;
            case 'Terms':
                return <TermsAndConditions formValues={formValues.terms} handleInputChange={handleInputChange} />;
            case 'KyCdoument':
                return <KyCdoument formValues={formValues.terms} handleInputChange={handleInputChange} />;
            case 'Pep':
                return <Pep formValues={formValues.terms} handleInputChange={handleInputChange} />;
            case 'Client from Files':
                return <Client formValues={formValues.terms} handleInputChange={handleInputChange} />;
            case 'PeriodicView':
                return <PeriodicView formValues={formValues.terms} handleInputChange={handleInputChange} />;
            default:
                return null;
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Header />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Box m={2}>
                        <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', height: '81%', marginTop: '4%' }}>
                            <Grid container>
                                <div>
                                    <h4 style={{ textAlign: 'center' }}>CLIENT FORM</h4>
                                </div>
                                <span style={{ marginLeft: '1%' }}></span>
                                <Grid item xs={12} sm={2}>
                                    <div
                                        className={`arrow ${activeButton === 'Application' ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveButton('Application');
                                            handleSectionChange('Application');
                                        }}
                                    >
                                        <span style={{ textAlign: 'center' }}>Aml Kyc Questionnaire</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <div
                                        className={`arrow ${activeButton === 'Button' ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveButton('Button');
                                            handleSectionChange('Button');
                                        }}
                                    >
                                        <span style={{ textAlign: 'center' }}>Declaration</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <div
                                        className={`arrow ${activeButton === 'Terms' ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveButton('Terms');
                                            handleSectionChange('Terms');
                                        }}
                                    >
                                        <span style={{ textAlign: 'center' }}>List of Board Directors</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <div
                                        className={`arrow ${activeButton === 'KyCdoument' ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveButton('KyCdoument');
                                            handleSectionChange('KyCdoument');
                                        }}
                                    >
                                        <span style={{ textAlign: 'center' }}>KYC Document</span>
                                    </div>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container>
                                <div>
                                    <h4 style={{ textAlign: 'center' }}>NPCI REVIEW</h4>
                                </div>
                                <span style={{ marginLeft: '1%' }}></span>
                                <Grid item xs={12} sm={2}>
                                    <div
                                        className={`arrow ${activeButton === 'Client from Files' ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveButton('Client from Files');
                                            handleSectionChange('Client from Files');
                                        }}
                                    >
                                        <span style={{ textAlign: 'center' }}>Client Files</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <div
                                        className={`arrow ${activeButton === 'Pep' ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveButton('Pep');
                                            handleSectionChange('Pep');
                                        }}
                                    >
                                        <span style={{ textAlign: 'center' }}>Entity Screening</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <div
                                        className={`arrow ${activeButton === 'PeriodicView' ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveButton('PeriodicView');
                                            handleSectionChange('PeriodicView');
                                        }}
                                    >
                                        <span style={{ textAlign: 'center' }}>Risk Assessment</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <div
                                        className={`arrow ${activeButton === 'Aml' ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveButton('Aml');
                                            handleSectionChange('Aml');
                                        }}
                                    >
                                        <span style={{ textAlign: 'center' }}>Queries</span>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <div
                                        className={`arrow ${activeButton === 'Periodic Review' ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveButton('Periodic Review');
                                            handleSectionChange('Aml');
                                        }}
                                    >
                                        <span style={{ textAlign: 'center' }}>Periodic Review</span>
                                    </div>
                                </Grid>
                            </Grid>
                            <div style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
                                {renderSectionContent()}
                            </div>
                        </Card>
                        <Box mt={2} textAlign="center">
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
                        </Box>
                    </Box>
                </Box>
            </Box >
        </>
    );
};

function ButtonContent({ formValues, handleInputChange }: SectionProps) {

    const [declarationFrom, setDeclarationFrom] = useState({
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

    const applicationfrome = new ApplicationfromeService();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [imageURL, setImageURL] = useState('');
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const { kycId } = useParams<{ kycId: string }>();
    const [showImageModal, setShowImageModal] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({ base64: null, filename: null });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const customerApiService = new DocumentApiService();

    useEffect(() => {
        if (kycId) {
            handleDeclarationForm(kycId);
        }
    }, [kycId]);

    useEffect(() => {
        const handleImageClick = async (branchId: number) => {
            if (branchId) {
                try {
                    const branchId = 1;
                    const imageData = await customerApiService.getLetterHead(branchId);
                    const base64String = arrayBufferToBase64(imageData);
                    setImageURL(base64String);
                } catch (error) {
                    console.error('Error fetching image:', error);
                    setImageURL('');
                    setErrorMessage("No image available");
                }
            }
        };
        handleImageClick(1);
    }, []);

    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        const binary = new Uint8Array(buffer);
        const bytes = [];
        for (let i = 0; i < binary.length; i++) {
            bytes.push(String.fromCharCode(binary[i]));
        }
        return `data:image/png;base64,${btoa(bytes.join(''))}`;
    };

    useEffect(() => {
        const responseId = sessionStorage.getItem('responseId');
        if (responseId) {
            console.log('Declaration responseId:', responseId);
            setDeclarationFrom(prevState => ({
                ...prevState,
                kycId: parseInt(responseId, 10),
            }));
        }
    }, []);

    const handleDeclarationForm = async (kycId: string) => {
        try {
            const response = await applicationfrome.getDeclarationForm(kycId);
            console.log('df:', response);
            if (response && response.length > 0) {
                setDeclarationFrom(response[0]);
            }
        } catch (error) {
            console.error("Error fetching declaration form:", error);
        }
    };

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
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

    return (
        <Box mt={2}>
            <Card style={{ padding: '2%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }} sx={{ mt: 1, mb: 10, }}>
                <Card style={{
                    width: '100%',
                }}>
                    <div id="pdfContent">
                        <Paper style={{ marginBottom: '20px' }}>
                            <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
                                <h4>Declaration Form</h4>
                                <Typography variant="body1" paragraph>
                                    We
                                    <TextField
                                        variant="standard"
                                        name="memberName"
                                        size='small'
                                        inputProps={{ style: { textAlign: 'center', fontWeight: "800" } }}
                                        style={{ textAlign: 'center', fontWeight: 800 }}
                                        value={declarationFrom.memberName}
                                    />
                                    with registered office at <TextField
                                        variant="standard"
                                        name="registeredPlace"
                                        size='small'
                                        inputProps={{ style: { textAlign: 'center', fontWeight: "800" } }}
                                        style={{ textAlign: 'center', fontWeight: 800 }}
                                        value={declarationFrom.registeredPlace}
                                        autoComplete="off"
                                    /> have agreed to participate in the implementation of the products & services provided by National Payments Corporation of India (NPCI), with registered office at 1001 A, B wing 10th Floor, The Capital, Bandra-Kurla Complex, Bandra (East), Mumbai - 400051 and for that purpose, We hereby declare and undertake to NPCI that:
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    ✓ We hereby confirm to have an established process for Know Your Customer (KYC), Anti Money Laundering process (AML) & Combating of Financing of Terrorism (CFT) and that we shall comply with all the Reserve Bank of India (RBI) norms on KYC, AML & CFT.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    ✓ We hereby confirm that <TextField
                                        variant="standard"
                                        name="din"
                                        value={declarationFrom.din}
                                        autoComplete='off'
                                        size='small'
                                        inputProps={{ style: { textAlign: 'center', fontWeight: "800" } }}
                                        style={{ textAlign: 'center', fontWeight: 800 }}
                                    /> number of our | the company’s Director(s) is/are a “Politically Exposed Person (PEP)” or “close relative(s) of a PEP” or appear in the “list of terrorist individuals / entities” provided by RBI. In the event of our existing Director(s) is/are “PEP” or “close relative(s) of PEP” or appear in the list of “terrorist individuals / entities” provided by RBI, the details of same shall be furnished to NPCI on letter head.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    ✓ We hereby confirm to have an appropriate procedure for PEP check and name screening of employees and customers against the list of terrorist individuals / entities provided by RBI/other Regulatory bodies.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    ✓ Keeping in view the new regulatory guidelines of Reserve Bank of India, we hereby confirm to have appropriate ongoing risk management procedures for Customer Due Diligence (CDD) and Enhanced Due Diligence (EDD) in case if any customer(s) or the beneficial owner(s) of an existing account is/are a “PEP” or “close relative(s) of a PEP” or appear in the list of “terrorist individuals / entities” provided by RBI.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    ✓ We hereby confirm to offer NPCI products & services only to the customers who are KYC compliant.
                                </Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <Typography variant="body1" paragraph>
                                        Date: <TextField variant="standard" size='small' name="date" type="date" value={declarationFrom.date} />
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        Place: <TextField variant="standard" size='small' name="place" value={declarationFrom.place} />
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="body1" paragraph align="right">
                                        Authorized Signatory(ies)
                                    </Typography>
                                    <Typography variant="body1" paragraph align="right">
                                        <TextField name="authorizeName" size='small' value={declarationFrom.authorizeName} autoComplete='off' />
                                    </Typography>
                                    <Typography variant="body1" paragraph align="right">
                                        <TextField name="authorizeDesignation" size='small' value={declarationFrom.authorizeDesignation} autoComplete='off' />
                                    </Typography>
                                    <Typography variant="body1" paragraph align="right">
                                        (Name & Designation)
                                    </Typography>
                                    <Typography variant="body1" paragraph align="right">
                                        (With Stamp)
                                    </Typography>
                                </div>
                            </div>
                            {/* <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} /> */}
                            <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}></div>
                        </Paper>
                        <div>
                            {/* <Button onClick={handleImageClick}>Show Image</Button>
                            <Button onClick={handlePdfClick}>Show PDF</Button> */}
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
                        </div>
                    </div>
                </Card>
            </Card>
        </Box>
    );
};

interface Director {
    firstName: string;
    middleName: string;
    lastName: string;
    pan: string;
    nationality: string;
    citizenship: string;
    domicile: string;
};

interface ShareHolder {
    firstName: string;
    middleName: string;
    lastName: string;
    pan: string;
    nationality: string;
    citizenship: string;
    domicile: string;
};

function TermsAndConditions({ formValues, handleInputChange }: SectionProps) {

    const headingStyle = {
        fontFamily: 'Times New Roman',
    };

    const applicationfrome = new ApplicationfromeService();
    const [directors, setDirectors] = useState<Director[]>([]);
    const [shareHolders, setShareHolder] = useState<ShareHolder[]>([]);
    const [responseId, setResponseId] = useState(null);
    const { kycId } = useParams<{ kycId: string }>();

    const [KycformData, setKycFormData] = useState<GetData[]>([
        {
            id: 0,
            kycId: 0,
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
        }
    ]);

    const [KycformDataa, setKycFormDatas] = useState<GetDatas[]>([
        {
            id: 0,
            kycId: 0,
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
        }
    ]);

    useEffect(() => {
        handleDirectors(kycId);
        handleShareHolder(kycId);
    }, [kycId]);

    useEffect(() => {
        if (responseId) {
        }
    }, [responseId]);

    const handleDirectors = async (kycId: any) => {
        try {
            const response = await applicationfrome.getKycDirectorsList(kycId);
            setDirectors(response);
        } catch (error) {
            console.error("Error fetching directors:", error);
        }
    };

    const handleShareHolder = async (kycId: any) => {
        try {
            const response = await applicationfrome.getKycShareHolder(kycId);
            setShareHolder(response);
        } catch (error) {
            console.error("Error fetching shareholder:", error);
        }
    };

    const [showImageModal, setShowImageModal] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({ base64: null, filename: null });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [imageURL, setImageURL] = useState('');
    const customerApiService = new DocumentApiService();

    useEffect(() => {
        const handleImageClick = async (branchId: number) => {
            if (branchId) {
                try {
                    const branchId = 1;
                    const imageData = await customerApiService.getLetterHead(branchId);
                    const base64String = arrayBufferToBase64(imageData);
                    setImageURL(base64String);
                } catch (error) {
                    console.error('Error fetching image:', error);
                    setImageURL('');
                    setErrorMessage("No image available");
                }
            }
        };
        handleImageClick(1);
    }, []);

    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        const binary = new Uint8Array(buffer);
        const bytes = [];
        for (let i = 0; i < binary.length; i++) {
            bytes.push(String.fromCharCode(binary[i]));
        }
        return `data:image/png;base64,${btoa(bytes.join(''))}`;
    };

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
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

    const nationalityMap: { [key: string]: string } = {
        "1": "American",
        "2": "Canadian",
        "3": "Indian",
        "4": "Other"
    };

    const citizenshipMap: { [key: string]: string } = {
        "1": "American",
        "2": "Canadian",
        "3": "Indian",
        "4": "Other"
    };

    const DomicileMap: { [key: string]: string } = {
        "1": "American",
        "2": "Canadian",
        "3": "Indian",
        "4": "Other"
    };

    return (
        <Box mt={2}>
            <Card style={{ padding: '3%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }} sx={{ mt: 1, mb: 10, }}>
                <div id="pdfContent">
                    <Paper style={{ marginBottom: '20px' }}>
                        <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
                            {/* <div>
                                {imageURL && (
                                    <img
                                        src={imageURL}
                                        alt="Ponsun"
                                        style={{ display: 'block', margin: '0 auto', maxWidth: '35%', height: 'auto', maxHeight: '200px', marginBottom: '20px' }}
                                    />
                                )}
                            </div> */}
                            <Card style={{
                                padding: '1%',
                                width: '100%',
                            }}>
                                <div className="key">
                                    <h4>List of Directors</h4>
                                    <div className="scrollablebox">
                                        {directors.map((director, directorIndex) => (
                                            <div key={directorIndex} className="person-container">
                                                {/* {directors.length > 1 && (
                                                    <div className="close-button" onClick={() => handleRemoveBoxkycdetails(directorIndex)}>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </div>
                                                )} */}
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={3}>
                                                        <p style={headingStyle}><strong>Name  :</strong>  {director.firstName || 'Not Available'}</p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <p style={headingStyle}><strong>Middle Name  :</strong>  {director.middleName || 'Not Available'}</p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <p style={headingStyle}><strong>Last Name  :</strong>  {director.lastName || 'Not Available'}</p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <p style={headingStyle}><strong>PAN  :</strong>  {director.pan || 'Not Available'}</p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        {/* <p style={headingStyle}><strong>Nationality  :</strong>  {director.nationality || 'Not Available'}</p> */}
                                                        <p style={headingStyle}>
                                                            <strong>Nationality  :</strong> {nationalityMap[director.nationality] || 'Not Available'}
                                                        </p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        {/* <p style={headingStyle}><strong>Citizenship  :</strong>  {director.citizenship || 'Not Available'}</p> */}
                                                        <p style={headingStyle}><strong>Citizenship :</strong> {citizenshipMap[director.citizenship] || 'Not Available'}</p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        {/* <p style={headingStyle}><strong>Domicile  :</strong>  {director.domicile || 'Not Available'}</p> */}
                                                        <p style={headingStyle}><strong>Domicile :</strong> {DomicileMap[director.domicile] || 'Not Available'}</p>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                            <br></br>
                            <Card style={{
                                padding: '1%',
                                width: '100%',
                            }}>
                                <div className="key">
                                    <h4>List of ShareHolders</h4>
                                    <div className="scrollablebox">
                                        {shareHolders.map((shareHolder, shareHolderIndex) => (
                                            <div key={shareHolderIndex} className="person-container">
                                                ` {/* {shareHolders.length > 1 && (
                                                    <div className="close-button" onClick={() => handleRemovekycdetails(shareHolderIndex)}>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </div>
                                                )}` */}
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={3}>
                                                        <p style={headingStyle}><strong>Name  :</strong>  {shareHolder.firstName || 'Not Available'}</p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <p style={headingStyle}><strong>Middle Name  :</strong>  {shareHolder.middleName || 'Not Available'}</p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <p style={headingStyle}><strong>Last Name  :</strong>  {shareHolder.lastName || 'Not Available'}</p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <p style={headingStyle}><strong>PAN  :</strong>  {shareHolder.pan || 'Not Available'}</p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        {/* <p style={headingStyle}><strong>Nationality  :</strong>  {shareHolder.nationality || 'Not Available'}</p> */}
                                                        <p style={headingStyle}>
                                                            <strong>Nationality  :</strong> {nationalityMap[shareHolder.nationality] || 'Not Available'}
                                                        </p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        {/* <p style={headingStyle}><strong>Citizenship  :</strong>  {shareHolder.citizenship || 'Not Available'}</p> */}
                                                        <p style={headingStyle}><strong>Citizenship :</strong> {citizenshipMap[shareHolder.citizenship] || 'Not Available'}</p>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        {/* <p style={headingStyle}><strong>Domicile  :</strong>  {shareHolder.domicile || 'Not Available'}</p> */}
                                                        <p style={headingStyle}><strong>Domicile :</strong> {DomicileMap[shareHolder.domicile] || 'Not Available'}</p>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        ))
                                        }
                                    </div>
                                </div>
                            </Card>
                            <br></br>
                        </div>
                        {/* <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} /> */}
                        <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}></div>
                        <div>
                            {/* <Button onClick={handleImageClick}>Show Image</Button>
                            <Button onClick={handlePdfClick}>Show PDF</Button> */}
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
                        </div>
                    </Paper>
                </div>
            </Card>
        </Box>
    );
};

function Pep({ formValues, handleInputChange }: SectionProps) {

    return (
        <Box mt={2}>
            <PepDocument />
        </Box>
    );
};

function Client({ formValues, handleInputChange }: SectionProps) {

    return (
        <Box mt={2}>
            <ClientFiles />
        </Box>
    );
};

function PeriodicView({ formValues, handleInputChange }: SectionProps) {

    return (
        <Box mt={2}>
            <Periodic />
        </Box>
    );
};

function KyCdoument({ formValues, handleInputChange }: SectionProps) {

    return (
        <Box mt={2}>
            <Kycdoument />
        </Box>
    );
};

function ApplicationForm({ formValues, handleInputChange }: SectionProps) {

    const [section, setSection] = useState<string>('Application');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    return (
        <Box mt={2}>
            <ApplicationFromView />
        </Box>
    );
};

export default BankHeader;