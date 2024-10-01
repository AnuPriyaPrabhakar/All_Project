
// import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
// import { Box, Typography, TextField, Button, Grid, Card, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Container } from '@mui/material';
// import './Form.css';
// import MuiAlert from '@mui/material/Alert';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
// import DocumentApiService from '../../../data/services/document/Document_api_service';
// import { Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';
// import { Paper } from '@mui/material';
// import ApplicationfromeService from '../../../data/services/kyc/applicationfrom/applicationfrome-api-service';
// import { CreateData } from '../../../data/services/kyc/applicationfrom/applicationfrome-payload';
// import contactImage from '../../../assets/contact.png';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { Document, Page } from 'react-pdf';
// import { useParams } from 'react-router-dom';
// import Loader from '../../loader/loader';
// import CloseIcon from '@mui/icons-material/Close';
// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// interface Image {
//     name: string;
//     uploading: boolean;
//     uploadSuccess: boolean;
// };
// const ListOfBoardDirector = (props: any) => {
//     const initialImageState: Image = {
//         name: '',
//         uploading: false,
//         uploadSuccess: false,
//     };
//     const [images, setImages] = useState<Image[]>([initialImageState]);
//     const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
//     const [base64Images, setBase64Images] = useState<string | null>(null);
//     const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//     const [isErrorOpen, setIsErrorOpen] = useState(false);
//     const [successMessage, setSuccessMessage] = useState('');
//     const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//     const [showImageModal, setShowImageModal] = useState(false);
//     const [showPdfModal, setShowPdfModal] = useState(false);
//     const [base64Image, setBase64Image] = useState<string | null>(null);
//     const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({ base64: null, filename: null });
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [numPages, setNumPages] = useState<number | null>(null);
//     const [pageNumber, setPageNumber] = useState(1);
//     const customerApiService = new DocumentApiService();
//     const documentApiService = new DocumentApiService();
//     const applicationFormApiSevice = new ApplicationfromeService();
//     const [authorizeName, setAuthorizeName] = useState('');
//     const [authorizeDesignation, setAuthorizeDesignation] = useState('');
//     const [hideAddBtn, setHideAddBtn] = useState(false);
//     console.log('props.listOfDirectors', props.listOfDirectors);
//     const [saveClicked, setSaveClicked] = useState(false);
//     const [downlodClicked, setDownlodClicked] = useState(false);
//     const [signUploadBtnClicked, setSignUploadBtnClicked] = useState(false);
//     const [viewBtnClicked, setViewBtnClicked] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const showSuccessMessage = (message: string) => {
//         setSuccessMessage(message);
//         setIsSuccessOpen(true);
//         setTimeout(() => {
//             setIsSuccessOpen(false);
//             setSuccessMessage('');
//         }, 1000);
//     };

//     const showErrorMessage = (message: string) => {
//         setErrorMessage(message);
//         setIsErrorOpen(true);
//     };


//     const handleAddNewDirectorsList = () => {
//         props.handleDirectorsChange(null, null, true);
//     }
//     const handleAddNewShareholdersList = () => {
//         props.handleShareHoldersChange(null, null, true);
//     }
//     const handleRemoveDirectorsdata = (personIndex: number) => {
//         props.handleDirectorsChange(null, personIndex, false);
//     };
//     const handleRemoveShareHoldersData = (personIndex: number) => {
//         props.handleShareHoldersChange(null, personIndex, false);
//     };

//     const responseId = sessionStorage.getItem('responseId');

//     console.log('ApplicationForm responseId:', responseId);
//     useEffect(() => {
//         if (responseId) {
//             console.log(responseId.toString());
//         }
//     }, [responseId]);

//     const { kycId } = useParams<{ kycId: any }>();


//     const handleSubmit = async () => {
//         const responseId = sessionStorage.getItem('responseId');
//         if (!responseId && !kycId) {
//             console.error('No responseId found in session storage');
//             return;
//         }
//         try {
//             const directorsDataWithResponseId = props.directorsData.map((person: any) => ({
//                 ...person,
//                 kycId: parseInt(responseId || kycId)
//             }));
//             const shareholdersDataWithResponseId = props.shareholdersData.map((person: any) => ({
//                 ...person,
//                 kycId: parseInt(responseId || kycId)
//             }));
//             // directorsDataWithResponseId.push(...shareholdersDataWithResponseId);
//             console.log('finaldata', directorsDataWithResponseId);
//             const directorsResponse = await applicationFormApiSevice.Directorslist(directorsDataWithResponseId);
//             const shareHoldersResponse = await applicationFormApiSevice.Directorslists(shareholdersDataWithResponseId);
//             if (directorsResponse && directorsResponse.length > 0) {
//                 sessionStorage.setItem('kycId', directorsResponse[0].kycId.toString());
//             }
//             props.handleDirectorsChange(null, null, false, directorsResponse);
//             props.handleShareHoldersChange(null, null, false, shareHoldersResponse);
//             setHideAddBtn(true);
//             props.renderKycdocumentContent();
//             showSuccessMessage('List of Board Directors unblocked successfully.');
//             setSaveClicked(true);
//             console.log('Form submitted successfully:', directorsResponse);
//         } catch (error) {
//             setHideAddBtn(false);
//             setSaveClicked(false);
//             console.error('Error submitting form:', error);
//         }
//     };
//     const handleSubmits = async () => {
//         showSuccessMessage('List of Board Directors unblocked successfully.');
//     };
//     const [downloadingPDF, setDownloadingPDF] = useState(false);
//     const [errors, setErrors] = useState<string[]>([]);
//     const [downloadCount, setDownloadCount] = useState(0);
//     const [isLevelcasedetailsOpen, setIsLevelcasedetailsOpen] = useState(false);
//     const [isUploadSectionOpen, setIsUploadSectionOpen] = useState(false); // New state to manage upload section visibility
//     const handleDownload = async () => {

//         setDownloadingPDF(true);
//         try {

//             await new Promise(resolve => setTimeout(resolve, 0));
//             const pdf = new jsPDF('p', 'mm', 'a4');
//             const content = document.getElementById('pdfContent');
//             if (!content) return;
//             pdf.setFontSize(10);
//             pdf.setFont('helvetica');
//             // content.style.display = 'block';
//             const padding = 10;
//             const scale = 2;
//             const pageWidth = 210;
//             const pageHeight = 297;
//             const contentWidth = pageWidth - 2 * padding;
//             const contentHeight = pageHeight - 2 * padding;
//             const totalPages = content.childNodes.length;
//             for (let i = 0; i < totalPages; i++) {
//                 const page = content.childNodes[i];
//                 const canvas = await html2canvas(page as HTMLElement, {
//                     scale: scale,
//                     useCORS: true,
//                     logging: true,
//                 });
//                 const imgData = canvas.toDataURL('image/png');
//                 if (i > 0) pdf.addPage();
//                 pdf.addImage(imgData, 'PNG', padding, padding, contentWidth, contentHeight);
//                 pdf.setLineWidth(0.2);
//                 pdf.setDrawColor(0, 0, 0);
//                 pdf.rect(padding, padding, contentWidth, contentHeight);
//             }
//             pdf.save('application_form.pdf');
//             setDownlodClicked(true);
//             showSuccessMessage('Download successfully.');
//         } catch (error) {
//             setDownlodClicked(false);
//             setErrors(["Error generating PDF"]);
//         } finally {
//             const content = document.getElementById('pdfContent');
//             // if (content) content.style.display = 'none';
//             setDownloadingPDF(false);
//             setDownlodClicked(true);
//             setDownloadCount(prevCount => prevCount + 1);
//         }
//         setIsLevelcasedetailsOpen(true);
//         setIsUploadSectionOpen(false);
//     };

//     useEffect(() => {
//         if (responseId) {
//             console.log('responseId11:', responseId);
//         }
//     }, [responseId]);

//     const handleView = async () => {
//         console.log('handleView called');
//         setLoading(true);
//         setShowPdfModal(true);
//         try {
//             const responseId = sessionStorage.getItem('responseId');
//             if (!responseId) {
//                 console.error('No responseId found in session storage');
//                 setLoading(false);
//                 return;
//             }
//             const pdfData = await customerApiService.getkycPDF(responseId, 3);
//             setPdfData({ base64: pdfData.data, filename: pdfData.filename });
//             setShowPdfModal(true);
//             setLoading(false);
//             setViewBtnClicked(true);
//             console.log('PDF modal set to open');
//         } catch (error) {
//             console.error('Error fetching PDF:', error);
//             setPdfData({ base64: null, filename: null });
//             setErrorMessage("No PDF available");
//             setShowPdfModal(false);
//             setViewBtnClicked(false);
//             setLoading(false);
//         }
//     };

//     const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//         console.log('Document loaded with', numPages, 'pages'); // Added logging
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
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files.length > 0) {
//             const filesArray = Array.from(event.target.files);
//             setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);
//         }
//     };

//     const handleChooseImagesClick1 = (index1: number) => {
//         document.getElementById(`image-upload-input1-${index1}`)?.click();
//     };

//     const handleFileChange4 = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files.length > 0) {
//             const selectedFiles = Array.from(event.target.files) as File[];
//             const nameWithoutExtension = selectedFiles[0].name.replace(/\.[^/.]+$/, '');
//             setImages(prevFields => {
//                 const updatedFields = [...prevFields];
//                 updatedFields[index] = {
//                     ...updatedFields[index],
//                     name: nameWithoutExtension,
//                     uploading: false,
//                     uploadSuccess: false,
//                 };
//                 return updatedFields;
//             });
//             setIsFileSelected(true);
//         } else {
//             setIsFileSelected(false);
//         }
//     };
//     const Signonupload = async (event: any) => {
//         event.preventDefault();
//         try {
//             const responseId = sessionStorage.getItem('responseId');
//             if (!responseId) {
//                 console.error('No responseId found in session storage');
//                 return;
//             }
//             const documentTypeId = 3;
//             console.log('Submitting files:', selectedFiles);
//             await documentApiService.saveFormCustomerRequest(selectedFiles, parseInt(responseId, 10), documentTypeId);
//             setSignUploadBtnClicked(true);
//             showSuccessMessage('Signonupload added successfully.');
//         } catch (error) {
//             setSignUploadBtnClicked(false);
//             console.error('Error submitting files:', error);
//         }
//         // setIsLevelcasedetailsOpen(true);
//         setIsUploadSectionOpen(false);
//     };

//     const [imageURL, setImageURL] = useState('');

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

//         handleImageClick(1); // Pass the desired branchId here
//     }, []);

//     const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
//         const binary = new Uint8Array(buffer);
//         const bytes = [];
//         for (let i = 0; i < binary.length; i++) {
//             bytes.push(String.fromCharCode(binary[i]));
//         }
//         return `data:image/png;base64,${btoa(bytes.join(''))}`;
//     };
//     return (
//         <Container
//             style={{ width: "274mm", minHeight: "297mm", marginTop: "5%" }}
//         >
//             <div id="pdfContent">
//                 <Paper elevation={10} style={{ marginBottom: '20px' }}>
//                     <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
//                         {/* <img src={ponsunImage} alt="Ponsun" style={{ display: 'block', margin: '0 auto', maxWidth: '40%', marginBottom: '20px' }} /> */}
//                         <div>
//                             {imageURL && (
//                                 <img
//                                     src={imageURL}
//                                     alt="Ponsun"
//                                     style={{ display: 'block', margin: '0 auto', maxWidth: '35%', height: 'auto', maxHeight: '200px', marginBottom: '20px' }}
//                                 />
//                             )}
//                         </div>

//                         <div className="key p-3">
//                             <h4>List of Directors</h4>
//                             <div className="scrollablebox">
//                                 {props.directorsData.map((person: any, personIndex: any) => (
//                                     <div key={personIndex} className="person-container">
//                                         {props.directorsData.length > 1 && !hideAddBtn && (
//                                             <div className="close-button" onClick={() => handleRemoveDirectorsdata(personIndex)}>
//                                                 <FontAwesomeIcon icon={faTimes} />
//                                             </div>
//                                         )}
//                                         <Grid container spacing={2}>
//                                             <Grid item xs={3}>
//                                                 <TextField
//                                                     name="firstName"
//                                                     label="Name"
//                                                     size='small'
//                                                     autoComplete='off'
//                                                     value={person.firstName}
//                                                     onChange={(e) => props.handleDirectorsChange(e, personIndex)}
//                                                 />
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <TextField
//                                                     name="middleName"
//                                                     label="Middle Name"
//                                                     size='small'
//                                                     autoComplete='off'
//                                                     value={person.middleName}
//                                                     onChange={(e) => props.handleDirectorsChange(e, personIndex)}
//                                                 />
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <TextField
//                                                     name="lastName"
//                                                     label="Last Name"
//                                                     size='small'
//                                                     autoComplete='off'
//                                                     value={person.lastName}
//                                                     onChange={(e) => props.handleDirectorsChange(e, personIndex)}
//                                                 />
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <TextField
//                                                     name="pan"
//                                                     label="PAN"
//                                                     size='small'
//                                                     autoComplete='off'
//                                                     value={person.pan}
//                                                     onChange={(e) => props.handleDirectorsChange(e, personIndex)}
//                                                 />
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <FormControl style={{ width: '100%' }}>
//                                                     <InputLabel htmlFor="contact-select">Nationality</InputLabel>

//                                                     <Select
//                                                         name="nationality"
//                                                         label="Nationality"
//                                                         size='small'
//                                                         value={person.nationality}
//                                                         onChange={(e) => props.handleDirectorsChange(e as SelectChangeEvent<string>, personIndex)}

//                                                     >
//                                                         <MenuItem value="">Select the Nationality</MenuItem>
//                                                         <MenuItem value="1">American</MenuItem>
//                                                         <MenuItem value="2">Canadian</MenuItem>
//                                                         <MenuItem value="3">Indian</MenuItem>
//                                                         <MenuItem value="4">Other</MenuItem>
//                                                     </Select>
//                                                 </FormControl>

//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <FormControl style={{ width: '100%' }}>
//                                                     <InputLabel htmlFor="contact-select">Citizenship</InputLabel>
//                                                     <Select
//                                                         name="citizenship"
//                                                         label="Citizenship"
//                                                         size='small'
//                                                         value={person.citizenship}
//                                                         onChange={(e) => props.handleDirectorsChange(e as SelectChangeEvent<string>, personIndex)}

//                                                     >
//                                                         <MenuItem value="">Select the Citizenship</MenuItem>
//                                                         <MenuItem value="1">American</MenuItem>
//                                                         <MenuItem value="2">Canadian</MenuItem>
//                                                         <MenuItem value="3">Indian</MenuItem>
//                                                         <MenuItem value="4">Other</MenuItem>
//                                                     </Select>
//                                                 </FormControl>
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <FormControl style={{ width: '100%' }}>
//                                                     <InputLabel htmlFor="contact-select">Domicile</InputLabel>
//                                                     <Select
//                                                         name="domicile"
//                                                         label="Domicile"
//                                                         size='small'
//                                                         value={person.domicile}
//                                                         onChange={(e) => props.handleDirectorsChange(e as SelectChangeEvent<string>, personIndex)}

//                                                     >
//                                                         <MenuItem value="">Select the Domicile</MenuItem>
//                                                         <MenuItem value="1">American</MenuItem>
//                                                         <MenuItem value="2">Canadian</MenuItem>
//                                                         <MenuItem value="3">Indian</MenuItem>
//                                                         <MenuItem value="4">Other</MenuItem>
//                                                     </Select>
//                                                 </FormControl>
//                                             </Grid>
//                                         </Grid>

//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="button-container">
//                                 {!hideAddBtn && <Button
//                                     className="add-people"
//                                     variant="contained"
//                                     startIcon={<FontAwesomeIcon icon={faPlus} />}
//                                     onClick={() => handleAddNewDirectorsList()}>
//                                     Add Directors Details
//                                 </Button>
//                                 }
//                             </div>
//                         </div>
//                         <div className="key mt-2 p-3">
//                             <h4>List of ShareHolders</h4>
//                             <div className="scrollablebox">
//                                 {props.shareholdersData.map((person: any, personIndex: any) => (
//                                     <div key={personIndex} className="person-container">
//                                         {props.shareholdersData.length > 1 && !hideAddBtn && (
//                                             <div className="close-button" onClick={() => handleRemoveShareHoldersData(personIndex)}>
//                                                 <FontAwesomeIcon icon={faTimes} />
//                                             </div>
//                                         )}
//                                         <Grid container spacing={2}>
//                                             <Grid item xs={3}>
//                                                 <TextField
//                                                     name="firstName"
//                                                     label="Name"
//                                                     size='small'
//                                                     autoComplete='off'
//                                                     value={person.firstName}
//                                                     onChange={(e) => props.handleShareHoldersChange(e, personIndex)}
//                                                 />
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <TextField
//                                                     name="middleName"
//                                                     label="Middle Name"
//                                                     size='small'
//                                                     autoComplete='off'
//                                                     value={person.middleName}
//                                                     onChange={(e) => props.handleShareHoldersChange(e, personIndex)}
//                                                 />
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <TextField
//                                                     name="lastName"
//                                                     label="Last Name"
//                                                     size='small'
//                                                     autoComplete='off'
//                                                     value={person.lastName}
//                                                     onChange={(e) => props.handleShareHoldersChange(e, personIndex)}
//                                                 />
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <TextField
//                                                     name="pan"
//                                                     label="PAN"
//                                                     size='small'
//                                                     autoComplete='off'
//                                                     value={person.pan}
//                                                     onChange={(e) => props.handleShareHoldersChange(e, personIndex)}
//                                                 />
//                                             </Grid>
//                                             {/* <Grid item xs={3}>
//                                                 <FormControl style={{ width: '100%' }}>
//                                                     <InputLabel htmlFor="contact-select">Nationality</InputLabel>

//                                                     <Select
//                                                         name="nationality"
//                                                         label="Nationality"
//                                                         size='small'
//                                                         autoComplete='off'
//                                                         value={person.nationality}
//                                                         onChange={(e) => props.handleShareHoldersChange(e as SelectChangeEvent<string>, personIndex)}

//                                                     >
//                                                         <MenuItem value="">Select the Nationality</MenuItem>
//                                                         <MenuItem value="1">American</MenuItem>
//                                                         <MenuItem value="2">Canadian</MenuItem>
//                                                         <MenuItem value="3">Indian</MenuItem>
//                                                         <MenuItem value="4">Other</MenuItem>
//                                                     </Select>
//                                                 </FormControl>

//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <FormControl style={{ width: '100%' }}>
//                                                     <InputLabel htmlFor="contact-select">Citizenship</InputLabel>
//                                                     <Select
//                                                         name="citizenship"
//                                                         label="Citizenship"
//                                                         size='small'
//                                                         value={person.citizenship}
//                                                         onChange={(e) => props.handleShareHoldersChange(e as SelectChangeEvent<string>, personIndex)}
//                                                     >
//                                                         <MenuItem value="">Select the Citizenship</MenuItem>
//                                                         <MenuItem value="1">American</MenuItem>
//                                                         <MenuItem value="2">Canadian</MenuItem>
//                                                         <MenuItem value="3">Indian</MenuItem>
//                                                         <MenuItem value="4">Other</MenuItem>
//                                                     </Select>
//                                                 </FormControl>
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <FormControl style={{ width: '100%' }}>
//                                                     <InputLabel htmlFor="contact-select">Domicile</InputLabel>
//                                                     <Select
//                                                         name="domicile"
//                                                         label="Domicile"
//                                                         size='small'
//                                                         value={person.domicile}
//                                                         onChange={(e) => props.handleShareHoldersChange(e as SelectChangeEvent<string>, personIndex)}
//                                                     >
//                                                         <MenuItem value="">Select the Domicile</MenuItem>
//                                                         <MenuItem value="1">American</MenuItem>
//                                                         <MenuItem value="2">Canadian</MenuItem>
//                                                         <MenuItem value="3">Indian</MenuItem>
//                                                         <MenuItem value="4">Other</MenuItem>
//                                                     </Select>
//                                                 </FormControl>
//                                             </Grid> */}
//                                             <Grid item xs={3}>
//                                                 <FormControl fullWidth>
//                                                     <InputLabel htmlFor="contact-select">Nationality</InputLabel>
//                                                     <Select
//                                                         name="nationality"
//                                                         label="Nationality"
//                                                         size="small"
//                                                         autoComplete="off"
//                                                         value={person.nationality}
//                                                         onChange={(e) => props.handleShareHoldersChange(e as SelectChangeEvent<string>, personIndex)}
//                                                     >
//                                                         <MenuItem value="">Select the Nationality</MenuItem>
//                                                         <MenuItem value="1">American</MenuItem>
//                                                         <MenuItem value="2">Canadian</MenuItem>
//                                                         <MenuItem value="3">Indian</MenuItem>
//                                                         <MenuItem value="4">Other</MenuItem>
//                                                     </Select>
//                                                 </FormControl>
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <FormControl fullWidth>
//                                                     <InputLabel htmlFor="contact-select">Citizenship</InputLabel>
//                                                     <Select
//                                                         name="citizenship"
//                                                         label="Citizenship"
//                                                         size="small"
//                                                         value={person.citizenship}
//                                                         onChange={(e) => props.handleShareHoldersChange(e as SelectChangeEvent<string>, personIndex)}
//                                                     >
//                                                         <MenuItem value="">Select the Citizenship</MenuItem>
//                                                         <MenuItem value="1">American</MenuItem>
//                                                         <MenuItem value="2">Canadian</MenuItem>
//                                                         <MenuItem value="3">Indian</MenuItem>
//                                                         <MenuItem value="4">Other</MenuItem>
//                                                     </Select>
//                                                 </FormControl>
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <FormControl fullWidth>
//                                                     <InputLabel htmlFor="contact-select">Domicile</InputLabel>
//                                                     <Select
//                                                         name="domicile"
//                                                         label="Domicile"
//                                                         size="small"
//                                                         value={person.domicile}
//                                                         onChange={(e) => props.handleShareHoldersChange(e as SelectChangeEvent<string>, personIndex)}
//                                                     >
//                                                         <MenuItem value="">Select the Domicile</MenuItem>
//                                                         <MenuItem value="1">American</MenuItem>
//                                                         <MenuItem value="2">Canadian</MenuItem>
//                                                         <MenuItem value="3">Indian</MenuItem>
//                                                         <MenuItem value="4">Other</MenuItem>
//                                                     </Select>
//                                                 </FormControl>
//                                             </Grid>
//                                         </Grid>

//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="button-container">
//                                 {!hideAddBtn && <Button
//                                     className="add-people"
//                                     variant="contained"
//                                     startIcon={<FontAwesomeIcon icon={faPlus} />}
//                                     onClick={() => handleAddNewShareholdersList()}>
//                                     Add ShareHolders Details
//                                 </Button>}
//                             </div>
//                         </div>
//                         <div>
//                             <Typography variant="body1" paragraph align="right">
//                                 Authorized Signatory(ies)
//                             </Typography>
//                             <Typography variant="body1" paragraph align="right">
//                                 <TextField name="authorizeName" size='small' autoComplete='off' value={authorizeName} onChange={(e) => setAuthorizeName(e.target.value)} placeholder="Name" />
//                             </Typography>
//                             <Typography variant="body1" paragraph align="right">
//                                 <TextField name="authorizeDesignation" size='small' autoComplete='off' value={authorizeDesignation} onChange={(e) => setAuthorizeDesignation(e.target.value)} placeholder="Designation" />
//                             </Typography>
//                             <Typography variant="body1" paragraph align="right">
//                                 (Name & Designation)
//                             </Typography>
//                             <Typography variant="body1" paragraph align="right">
//                                 (With Stamp)
//                             </Typography>

//                         </div>

//                         <br></br>

//                         {/* </Container> */}
//                     </div>
//                     <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '48%' }} />
//                     <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}></div>

//                 </Paper>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <div className="arroww" style={{ marginRight: '10px' }}>
//                     <span style={{ textAlign: 'center' }}>Step 1:</span>
//                 </div>

//                 <button style={{ width: '12%' }} className='btn btn-primary' disabled={hideAddBtn} onClick={handleSubmit}>
//                     Save
//                 </button>
//             </div>
//             <br></br>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <div className="arroww" style={{ marginRight: '10px' }}>
//                     <span style={{ textAlign: 'center' }}>Step 2:</span>
//                 </div>
//                 <button style={{ width: '12%' }} className={`btn btn-sm ${saveClicked ? 'btn-primary' : 'btn-secondary'}`} disabled={!saveClicked} onClick={handleDownload}>Download</button>

//             </div>
//             {/* <Card> */}
//                 {isLevelcasedetailsOpen && (
//                     <Grid container spacing={1}>
//                         <Grid item xs={12}>
//                             <Grid container spacing={1}>
//                                 {images.map((image, index) => (
//                                     <Grid item xs={12} key={index}>
//                                         <form onSubmit={handleSubmits} encType="multipart/form-data">

//                                             <div className="person-container">
//                                                 <div className="field-group">

//                                                     <div className="field-group-column">

//                                                         <input
//                                                             type="file"
//                                                             id={`image-upload-input1-${index}`}
//                                                             accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                                                             onChange={(event) => {
//                                                                 handleFileChange(event);
//                                                                 handleFileChange4(index, event);
//                                                             }}
//                                                             style={{ display: 'none' }}
//                                                             multiple
//                                                         />

//                                                         <Button
//                                                             variant="outlined"
//                                                             onClick={() => handleChooseImagesClick1(index)}
//                                                             style={{ marginRight: '10px' }}
//                                                         >
//                                                             Document
//                                                         </Button>
//                                                         <TextField style={{ width: '50%' }}
//                                                             label="Attachment"
//                                                             type="text"
//                                                             size="small"
//                                                             variant="outlined"
//                                                             value={image.name}
//                                                             disabled
//                                                             fullWidth
//                                                         />
//                                                     </div>

//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </Grid>
//                                 ))}




//                             </Grid>
//                         </Grid>

//                     </Grid>
//                 )}

//                 {/* {isUploadSectionOpen && ( */}
//                 {/* <> */}
//                 <Dialog open={showImageModal} onClose={handleCloseImageModal} fullWidth maxWidth='xl'>
//                     <DialogTitle>Image Preview</DialogTitle>
//                     <DialogContent>
//                         {base64Image && <img src={base64Image} alt="Image Preview" />}
//                         {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleCloseImageModal}>Close</Button>
//                     </DialogActions>
//                 </Dialog>

//                 {/* <Dialog open={showPdfModal} onClose={handleClosePdfModal} fullWidth maxWidth='xl'>
//                     <DialogTitle>PDF Preview</DialogTitle>
//                     <DialogContent dividers={true} style={{ height: '80vh', overflowY: 'auto' }}>
//                         {pdfData.base64 && (
//                             <Document
//                                 file={`data:application/pdf;base64,${pdfData.base64}`}
//                                 onLoadSuccess={onDocumentLoadSuccess}
//                                 className="pdf-document"
//                             >
//                                 <Page pageNumber={pageNumber} width={window.innerWidth * 0.8} />
//                             </Document>
//                         )}
//                         {errorMessage && <Typography variant="body1">{errorMessage}</Typography>}
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handlePrevPage} disabled={pageNumber <= 1}>Prev</Button>
//                         <Button onClick={handleNextPage} disabled={pageNumber >= numPages!}>Next</Button>
//                         {pdfData.filename && (
//                             <div>
//                                 <a
//                                     href={`data:application/pdf;base64,${pdfData.base64}`}
//                                     download={pdfData.filename}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     style={{ textDecoration: 'none', padding: '10px', backgroundColor: '#2a75bb', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
//                                 >
//                                     Download PDF
//                                 </a>
//                             </div>
//                         )}
//                         <Button onClick={handleClosePdfModal}>Close</Button>
//                     </DialogActions>
//                 </Dialog> */}
//                  <Dialog open={showPdfModal} onClose={handleClosePdfModal} maxWidth="md">
//                 {loading && <Loader />}
//                 <DialogTitle>PDF Preview
//                     <IconButton
//                         aria-label="close"
//                         onClick={handleClosePdfModal}
//                         style={{ position: "absolute", right: 8, top: 8, color: "#aaa" }}>
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent
//                     dividers={true}
//                     style={{
//                         overflow: "auto",
//                         padding: 0,
//                         margin: 0,
//                         maxHeight: "85vh",
//                     }}>
//                     {pdfData.base64 && (
//                         <div
//                             style={{
//                                 border: "1px solid #e0e0e0",
//                                 padding: 0,
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 width: '100%',
//                                 overflow: 'hidden',
//                             }}
//                         >
//                             <Document
//                                 file={`data:application/pdf;base64,${pdfData.base64}`}
//                                 onLoadSuccess={onDocumentLoadSuccess}
//                                 className="pdf-document"
//                             >
//                                 {Array.from(new Array(numPages), (el, index) => (
//                                     <div
//                                         key={`page_${index + 1}`}
//                                         style={{
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             overflow: "hidden",
//                                             height: 'auto',
//                                             margin: '10px 0',
//                                         }}
//                                     >
//                                         <Page
//                                             pageNumber={index + 1}
//                                             width={Math.min(window.innerWidth * 0.8, 650)}
//                                             renderMode="canvas"
//                                             scale={1.3}
//                                             renderTextLayer={true}
//                                             renderAnnotationLayer={false}
//                                             imageResourcesPath=""
//                                         />
//                                     </div>
//                                 ))}
//                             </Document>
//                         </div>
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     {pdfData.filename && (
//                         <div style={{ marginRight: '15px' }}>  
//                             <a
//                                 href={`data:application/pdf;base64,${pdfData.base64}`}
//                                 download={pdfData.filename}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 style={{
//                                     textDecoration: 'none',
//                                     padding: '10px',
//                                     backgroundColor: '#2a75bb',
//                                     color: 'white',
//                                     borderRadius: '5px',
//                                     cursor: 'pointer',
//                                     float:'right',
//                                 }}
//                             >
//                                 Download PDF
//                             </a>
//                         </div>
//                     )}
//                 </DialogActions>
//             </Dialog>
//                 {/* <Dialog open={showPdfModal} onClose={handleClosePdfModal} maxWidth='md'>
//                     {loading && <Loader />}
//                     <DialogTitle>PDF Preview
//                         <IconButton
//                             aria-label="close"
//                             onClick={handleClosePdfModal}
//                             style={{ position: "absolute", right: 8, top: 8, color: "#aaa" }}>
//                             <CloseIcon />
//                         </IconButton>
//                     </DialogTitle>
//                     <DialogContent
//                         dividers={true}
//                         style={{
//                             overflow: "auto",
//                             padding: 0,
//                             margin: 0,
//                             //  maxHeight: "70vh", 
//                         }}>
//                         {pdfData.base64 && (
//                             <div
//                                 style={{
//                                     border: "1px solid #e0e0e0",
//                                     padding: 0,
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     alignItems: "center",
//                                     height: '100%',
//                                     overflow: 'hidden',
//                                     // flexWrap:'wrap',
//                                     // justifyContent:'space-between',
//                                 }}
//                             >
//                                 <Document
//                                     file={`data:application/pdf;base64,${pdfData.base64}`}
//                                     onLoadSuccess={onDocumentLoadSuccess}
//                                     className="pdf-document"
//                                 >
//                                     {Array.from(new Array(numPages), (el, index) => (
//                                         <div
//                                             key={`page_${index + 1}`}
//                                             style={{
//                                                 // margin: 0,
//                                                 // padding: 0,
//                                                 display: "flex",
//                                                 justifyContent: "center",
//                                                 overflow: "hidden",
//                                                 height: 'auto',
//                                                 flex: '1 1 30%',
//                                                 margin: '10px',
//                                                 padding: '5px',
//                                             }}
//                                         >
//                                             <Page
//                                                 pageNumber={index + 1}
//                                                 width={Math.min(window.innerWidth * 0.85, 800)}
//                                             // scale={1.1}
//                                             />
//                                         </div>
//                                     ))}
//                                 </Document>
//                             </div>
//                         )}
//                     </DialogContent>
//                     <DialogActions>
//                         {pdfData.filename && (
//                             <div>
//                                 <a
//                                     href={`data:application/pdf;base64,${pdfData.base64}`}
//                                     download={pdfData.filename}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     style={{ textDecoration: 'none', padding: '10px', backgroundColor: '#2a75bb', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
//                                 >
//                                     Download PDF
//                                 </a>
//                             </div>
//                         )}
//                     </DialogActions>
//                 </Dialog> */}

//             {/* </Card> */}

//             <br></br>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <div className="arroww" style={{ marginRight: '10px' }}>
//                     <span style={{ textAlign: 'center' }}>Step 3:</span>
//                 </div>
//                 <form onSubmit={Signonupload} style={{ width: '11%' }}>
//                     <button style={{ width: '109%', marginLeft: '-1%' }}
//                         className={`btn btn-sm ${downlodClicked ? 'btn-primary' : 'btn-secondary'}`}
//                         disabled={!downlodClicked}>Sign on upload</button>
//                 </form>
//             </div>


//             <br></br>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <div className="arroww" style={{ marginRight: '10px' }}>
//                     <span style={{ textAlign: 'center' }}>Step 4:</span>
//                 </div>
//                 <button style={{ width: '12%' }} className={`btn btn-sm ${signUploadBtnClicked ? 'btn-primary' : 'btn-secondary'}`} disabled={!signUploadBtnClicked} onClick={handleView}>View</button>
//             </div>
//             <br></br>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <div className="arroww" style={{ marginRight: '10px' }}>
//                     <span style={{ textAlign: 'center' }}>Step 5:</span>
//                 </div>
//                 <button style={{ width: '12%' }} className={`btn btn-sm ${viewBtnClicked ? 'btn-primary' : 'btn-secondary'}`} disabled={!viewBtnClicked} onClick={handleSubmit}>Submit</button>
//             </div>

//             <Snackbar
//                 open={isSuccessOpen}
//                 autoHideDuration={5000}
//                 onClose={() => setIsSuccessOpen(false)}
//                 anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                 }}
//             >
//                 <MuiAlert
//                     elevation={6}
//                     variant="filled"
//                     severity="success"
//                     onClose={() => setIsSuccessOpen(false)}
//                 >
//                     {successMessage}
//                 </MuiAlert>
//             </Snackbar>
//             <Snackbar
//                 open={isErrorOpen}
//                 autoHideDuration={5000}
//                 onClose={() => setIsErrorOpen(false)}
//                 anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                 }}
//             >
//                 <MuiAlert
//                     elevation={6}
//                     variant="filled"
//                     severity="error"
//                     onClose={() => setIsErrorOpen(false)}
//                 >
//                     {errorMessage}
//                 </MuiAlert>
//             </Snackbar>
//         </Container>

//     );

// }
// export default ListOfBoardDirector;


import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Container } from '@mui/material';
import './Form.css';
import MuiAlert from '@mui/material/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import DocumentApiService from '../../../data/services/document/Document_api_service';
import { Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';
import { Paper } from '@mui/material';
import ApplicationfromeService from '../../../data/services/kyc/applicationfrom/applicationfrome-api-service';
import { CreateData, NewPayload } from '../../../data/services/kyc/applicationfrom/applicationfrome-payload';
import contactImage from '../../../assets/contact.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Page } from 'react-pdf';
import { useParams } from 'react-router-dom';
import Loader from '../../loader/loader';
import CloseIcon from '@mui/icons-material/Close';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
interface Image {
    name: string;
    uploading: boolean;
    uploadSuccess: boolean;
};
const ListOfBoardDirector = (props: any) => {
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
    const [showImageModal, setShowImageModal] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({ base64: null, filename: null });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const customerApiService = new DocumentApiService();
    const documentApiService = new DocumentApiService();
    const applicationFormApiSevice = new ApplicationfromeService();
    const [name, setAuthorizeName] = useState('');
    const [designation, setAuthorizeDesignation] = useState('');
    const [hideAddBtn, setHideAddBtn] = useState(false);
    console.log('props.listOfDirectors', props.listOfDirectors);
    const [saveClicked, setSaveClicked] = useState(false);
    const [downlodClicked, setDownlodClicked] = useState(false);
    const [signUploadBtnClicked, setSignUploadBtnClicked] = useState(false);
    const [viewBtnClicked, setViewBtnClicked] = useState(false);
    const [loading, setLoading] = useState(false);
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
    useEffect(() => {
        // Retrieve saved values from sessionStorage
        const savedName = sessionStorage.getItem('authorizeName');
        const savedDesignation = sessionStorage.getItem('authorizeDesignation');

        if (savedName) {
            setAuthorizeName(savedName);
        }
        if (savedDesignation) {
            setAuthorizeDesignation(savedDesignation);
        }
    }, []);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAuthorizeName(value);
        sessionStorage.setItem('authorizeName', value); // Save value to sessionStorage
    };

    const handleDesignationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAuthorizeDesignation(value);
        sessionStorage.setItem('authorizeDesignation', value); // Save value to sessionStorage
    };
    const handleAddNewDirectorsList = () => {
        props.handleDirectorsChange(null, null, true);
    }
    const handleAddNewShareholdersList = () => {
        props.handleShareHoldersChange(null, null, true);
    }
    const handleRemoveDirectorsdata = (personIndex: number) => {
        props.handleDirectorsChange(null, personIndex, false);
    };
    const handleRemoveShareHoldersData = (personIndex: number) => {
        props.handleShareHoldersChange(null, personIndex, false);
    };

    const responseId = sessionStorage.getItem('responseId');

    console.log('ApplicationForm responseId:', responseId);
    useEffect(() => {
        if (responseId) {
            console.log(responseId.toString());
        }
    }, [responseId]);

    const { kycId } = useParams<{ kycId: any }>();

    const handleSubmit = async () => {
        const responseId = sessionStorage.getItem('responseId');
        const validResponseId = responseId ? Number(responseId) : props.kycId;
    
        if (!validResponseId) {
            console.error('No valid responseId or kycId found');
            return;
        }
    
        // Validate all authorized signatories
        const invalidSignatories = props.signAuthorityData.filter(
            (person: { name: any; designation: any; }) => !person.name || !person.designation
        );
        if (invalidSignatories.length > 0) {
            console.error('Name and designation are required fields for all signatories');
            return;
        }
    
        try {
            setLoading(true);
            const directorsPayload = props.directorsData.map((person: any) => ({
                ...person,
                responseId: validResponseId,
                kycId: validResponseId,
            }));
    
            const shareholdersPayload = props.shareholdersData.map((person: any) => ({
                ...person,
                responseId: validResponseId,
                kycId: validResponseId,
            }));
    
            const payload: NewPayload = {
                createDirectorsSignAuthorityRequests: {
                    id: 0,
                    kycId: validResponseId,
                    name: props.signAuthorityData.map((person: { name: any; }) => person.name).join(', '),
                    designation: props.signAuthorityData.map((person: { designation: any; }) => person.designation).join(', '),
                    uid: 0,
                    euid: 0,
                },
                createDirectorsListRequest: [...directorsPayload, ...shareholdersPayload],
            };
    
            // Send the data to the backend
            const response = await applicationFormApiSevice.Directorslist(payload);
            console.log('API Response:', response);
    
            // Check for success in response
            if (response && response.id) { // Assuming the presence of 'id' indicates success
                console.log('Submission successful', response);
                setHideAddBtn(true);
                props.renderKycdocumentContent();
                showSuccessMessage('List of Board Directors unblocked successfully.');
                setSaveClicked(true);
            } else {
                throw new Error('Unexpected response format');
            }
        } catch (error) {
            console.error('Error submitting data', error);
            setHideAddBtn(false);
            setSaveClicked(false);
            showErrorMessage('Failed to submit the list. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // const handleSubmit = async () => {
    //     const responseId = sessionStorage.getItem('responseId');

    //     // Ensure that kycId is used if responseId is not available
    //     const validResponseId = responseId ? Number(responseId) : kycId;

    //     if (!validResponseId) {
    //         console.error('No valid responseId or kycId found');
    //         return;
    //     }

    //     try {
    //         setLoading(true);
    //         // Map directorsData and shareholdersData and ensure correct responseId and kycId are assigned
    //         const directorsPayload = props.directorsData.map((person: any) => ({
    //             ...person,
    //             responseId: validResponseId,  // Assign responseId to responseId field
    //             kycId: validResponseId        // Assign responseId to kycId field
    //         }));

    //         const shareholdersPayload = props.shareholdersData.map((person: any) => ({
    //             ...person,
    //             responseId: validResponseId,  // Assign responseId to responseId field
    //             kycId: validResponseId        // Assign responseId to kycId field
    //         }));

    //         const payload: NewPayload = {
    //             createDirectorsSignAuthorityRequests: {
    //                 id: 0,
    //                 kycId: validResponseId, // Use the correct responseId here as kycId
    //                 name: name,
    //                 designation: designation,
    //                 uid: 0,
    //                 euid: 0
    //             },
    //             createDirectorsListRequest: [...directorsPayload, ...shareholdersPayload], // Combine the director and shareholder data
    //         };

    //         // Send the data to the backend
    //         const response = await applicationFormApiSevice.Directorslist(payload);
    //         setHideAddBtn(true);
    //         props.renderKycdocumentContent();
    //         showSuccessMessage('List of Board Directors unblocked successfully.');
    //         setSaveClicked(true);
    //         console.log('Submission successful', response);
    //     } catch (error) {
    //         setHideAddBtn(false);
    //         setSaveClicked(false);
    //         console.error('Error submitting data', error);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // };





    const handleSubmits = async () => {
        showSuccessMessage('List of Board Directors unblocked successfully.');
    };
    const [downloadingPDF, setDownloadingPDF] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [downloadCount, setDownloadCount] = useState(0);
    const [isLevelcasedetailsOpen, setIsLevelcasedetailsOpen] = useState(false);
    const [isUploadSectionOpen, setIsUploadSectionOpen] = useState(false); // New state to manage upload section visibility
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
            setDownlodClicked(true);
            showSuccessMessage('Download successfully.');
        } catch (error) {
            setDownlodClicked(false);
            setErrors(["Error generating PDF"]);
        } finally {
            const content = document.getElementById('pdfContent');
            // if (content) content.style.display = 'none';
            setDownloadingPDF(false);
            setDownlodClicked(true);
            setDownloadCount(prevCount => prevCount + 1);
        }
        setIsLevelcasedetailsOpen(true);
        setIsUploadSectionOpen(false);
    };

    useEffect(() => {
        if (responseId) {
            console.log('responseId11:', responseId);
        }
    }, [responseId]);

    const handleView = async () => {
        console.log('handleView called');
        setLoading(true);
        setShowPdfModal(true);
        try {
            const responseId = sessionStorage.getItem('responseId');
            if (!responseId) {
                console.error('No responseId found in session storage');
                setLoading(false);
                return;
            }
            const pdfData = await customerApiService.getkycPDF(responseId, 3);
            setPdfData({ base64: pdfData.data, filename: pdfData.filename });
            setShowPdfModal(true);
            setLoading(false);
            setViewBtnClicked(true);
            console.log('PDF modal set to open');
        } catch (error) {
            console.error('Error fetching PDF:', error);
            setPdfData({ base64: null, filename: null });
            setErrorMessage("No PDF available");
            setShowPdfModal(false);
            setViewBtnClicked(false);
            setLoading(false);
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
            setLoading(true);
            const responseId = sessionStorage.getItem('responseId');
            if (!responseId) {
                console.error('No responseId found in session storage');
                return;
            }
            const documentTypeId = 3;
            console.log('Submitting files:', selectedFiles);
            await documentApiService.saveFormCustomerRequest(selectedFiles, parseInt(responseId, 10), documentTypeId);
            setSignUploadBtnClicked(true);
            showSuccessMessage('Signonupload added successfully.');
        } catch (error) {
            setSignUploadBtnClicked(false);
            console.error('Error submitting files:', error);
        } finally {
            setLoading(false);
            setIsUploadSectionOpen(false);
        }
        // setIsLevelcasedetailsOpen(true);

    };

    const [imageURL, setImageURL] = useState('');

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
    return (
        <Container
            style={{ width: "274mm", minHeight: "297mm", marginTop: "5%" }}
        >
            <div id="pdfContent">
                <Paper elevation={10} style={{ marginBottom: '20px' }}>
                    <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
                        <div className="key p-3">
                            <h4>List of Directors</h4>
                            <div className="scrollablebox">
                                {props.directorsData.map((person: any, personIndex: any) => (
                                    <div key={personIndex} className="person-container">
                                        {props.directorsData.length > 1 && !hideAddBtn && (
                                            <div className="close-button" onClick={() => handleRemoveDirectorsdata(personIndex)}>
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
                                                    onChange={(e) => props.handleDirectorsChange(e, personIndex)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField
                                                    name="middleName"
                                                    label="Middle Name"
                                                    size='small'
                                                    autoComplete='off'
                                                    value={person.middleName}
                                                    onChange={(e) => props.handleDirectorsChange(e, personIndex)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField
                                                    name="lastName"
                                                    label="Last Name"
                                                    size='small'
                                                    autoComplete='off'
                                                    value={person.lastName}
                                                    onChange={(e) => props.handleDirectorsChange(e, personIndex)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField
                                                    name="pan"
                                                    label="PAN"
                                                    size='small'
                                                    autoComplete='off'
                                                    value={person.pan}
                                                    onChange={(e) => props.handleDirectorsChange(e, personIndex)}
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
                                                        onChange={(e) => props.handleDirectorsChange(e as SelectChangeEvent<string>, personIndex)}

                                                    >
                                                        <MenuItem value="">Select the Nationality</MenuItem>
                                                        <MenuItem value="1">American</MenuItem>
                                                        <MenuItem value="2">Canadian</MenuItem>
                                                        <MenuItem value="3">Indian</MenuItem>
                                                        <MenuItem value="4">Other</MenuItem>
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
                                                        onChange={(e) => props.handleDirectorsChange(e as SelectChangeEvent<string>, personIndex)}

                                                    >
                                                        <MenuItem value="">Select the Citizenship</MenuItem>
                                                        <MenuItem value="1">American</MenuItem>
                                                        <MenuItem value="2">Canadian</MenuItem>
                                                        <MenuItem value="3">Indian</MenuItem>
                                                        <MenuItem value="4">Other</MenuItem>
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
                                                        onChange={(e) => props.handleDirectorsChange(e as SelectChangeEvent<string>, personIndex)}

                                                    >
                                                        <MenuItem value="">Select the Domicile</MenuItem>
                                                        <MenuItem value="1">American</MenuItem>
                                                        <MenuItem value="2">Canadian</MenuItem>
                                                        <MenuItem value="3">Indian</MenuItem>
                                                        <MenuItem value="4">Other</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                    </div>
                                ))}
                            </div>
                            <div className="button-container">
                                {!hideAddBtn && <Button
                                    className="add-people"
                                    variant="contained"
                                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                                    onClick={() => handleAddNewDirectorsList()}>
                                    Add Directors Details
                                </Button>
                                }
                            </div>
                        </div>
                        <div className="key mt-2 p-3">
                            <h4>List of ShareHolders</h4>
                            <div className="scrollablebox">
                                {props.shareholdersData.map((person: any, personIndex: any) => (
                                    <div key={personIndex} className="person-container">
                                        {props.shareholdersData.length > 1 && !hideAddBtn && (
                                            <div className="close-button" onClick={() => handleRemoveShareHoldersData(personIndex)}>
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
                                                    onChange={(e) => props.handleShareHoldersChange(e, personIndex)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField
                                                    name="middleName"
                                                    label="Middle Name"
                                                    size='small'
                                                    autoComplete='off'
                                                    value={person.middleName}
                                                    onChange={(e) => props.handleShareHoldersChange(e, personIndex)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField
                                                    name="lastName"
                                                    label="Last Name"
                                                    size='small'
                                                    autoComplete='off'
                                                    value={person.lastName}
                                                    onChange={(e) => props.handleShareHoldersChange(e, personIndex)}
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <TextField
                                                    name="pan"
                                                    label="PAN"
                                                    size='small'
                                                    autoComplete='off'
                                                    value={person.pan}
                                                    onChange={(e) => props.handleShareHoldersChange(e, personIndex)}
                                                />
                                            </Grid>

                                            <Grid item xs={3}>
                                                <FormControl fullWidth>
                                                    <InputLabel htmlFor="contact-select">Nationality</InputLabel>
                                                    <Select
                                                        name="nationality"
                                                        label="Nationality"
                                                        size="small"
                                                        autoComplete="off"
                                                        value={person.nationality}
                                                        onChange={(e) => props.handleShareHoldersChange(e as SelectChangeEvent<string>, personIndex)}
                                                    >
                                                        <MenuItem value="">Select the Nationality</MenuItem>
                                                        <MenuItem value="1">American</MenuItem>
                                                        <MenuItem value="2">Canadian</MenuItem>
                                                        <MenuItem value="3">Indian</MenuItem>
                                                        <MenuItem value="4">Other</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <FormControl fullWidth>
                                                    <InputLabel htmlFor="contact-select">Citizenship</InputLabel>
                                                    <Select
                                                        name="citizenship"
                                                        label="Citizenship"
                                                        size="small"
                                                        value={person.citizenship}
                                                        onChange={(e) => props.handleShareHoldersChange(e as SelectChangeEvent<string>, personIndex)}
                                                    >
                                                        <MenuItem value="">Select the Citizenship</MenuItem>
                                                        <MenuItem value="1">American</MenuItem>
                                                        <MenuItem value="2">Canadian</MenuItem>
                                                        <MenuItem value="3">Indian</MenuItem>
                                                        <MenuItem value="4">Other</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <FormControl fullWidth>
                                                    <InputLabel htmlFor="contact-select">Domicile</InputLabel>
                                                    <Select
                                                        name="domicile"
                                                        label="Domicile"
                                                        size="small"
                                                        value={person.domicile}
                                                        onChange={(e) => props.handleShareHoldersChange(e as SelectChangeEvent<string>, personIndex)}
                                                    >
                                                        <MenuItem value="">Select the Domicile</MenuItem>
                                                        <MenuItem value="1">American</MenuItem>
                                                        <MenuItem value="2">Canadian</MenuItem>
                                                        <MenuItem value="3">Indian</MenuItem>
                                                        <MenuItem value="4">Other</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>

                                    </div>
                                ))}
                            </div>
                            <div className="button-container">
                                {!hideAddBtn && <Button
                                    className="add-people"
                                    variant="contained"
                                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                                    onClick={() => handleAddNewShareholdersList()}>
                                    Add ShareHolders Details
                                </Button>}
                            </div>
                        </div>
                    
                       {props.signAuthorityData.map((person: any, personIndex: any) => (
                            <div key={personIndex}>
                                <Typography variant="body1" paragraph align="right">
                                    Authorized Signatory(ies)
                                </Typography>
                                <Typography variant="body1" paragraph align="right">
                                    <TextField
                                        name="name"
                                        size="small"
                                        autoComplete="off"
                                        value={person.name}
                                        onChange={(event) => props.handleSignAuthorityChange(event, personIndex)}
                                        placeholder="Name"
                                        required // Add required attribute for better validation
                                    />
                                </Typography>
                                <Typography variant="body1" paragraph align="right">
                                    <TextField
                                        name="designation"
                                        size="small"
                                        autoComplete="off"
                                        value={person.designation}
                                        onChange={(event) => props.handleSignAuthorityChange(event, personIndex)}
                                        placeholder="Designation"
                                        required // Add required attribute for better validation
                                    />
                                </Typography>
                                <Typography variant="body1" paragraph align="right">
                                    (Name & Designation)
                                </Typography>
                                <Typography variant="body1" paragraph align="right">
                                    (With Stamp)
                                </Typography>
                            </div>
                        ))}




                        <br></br>

                    </div>

                    <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}></div>

                </Paper>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="arroww" style={{ marginRight: '10px' }}>
                    <span style={{ textAlign: 'center' }}>Step 1:</span>
                </div>

                <button style={{ width: '12%' }} className='btn btn-primary' disabled={hideAddBtn} onClick={handleSubmit}>
                    Save
                </button>
            </div>
            <br></br>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="arroww" style={{ marginRight: '10px' }}>
                    <span style={{ textAlign: 'center' }}>Step 2:</span>
                </div>
                <button style={{ width: '12%' }} className={`btn btn-sm ${saveClicked ? 'btn-primary' : 'btn-secondary'}`} disabled={!saveClicked} onClick={handleDownload}>Download</button>

            </div>
            {/* <Card> */}
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


            <Dialog open={showPdfModal} onClose={handleClosePdfModal} maxWidth="md">
                {loading && <Loader />}
                <DialogTitle>PDF Preview
                    <IconButton
                        aria-label="close"
                        onClick={handleClosePdfModal}
                        style={{ position: "absolute", right: 8, top: 8, color: "#aaa" }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent
                    dividers={true}
                    style={{
                        overflow: "auto",
                        padding: 0,
                        margin: 0,
                        maxHeight: "85vh",
                    }}>
                    {pdfData.base64 && (
                        <div
                            style={{
                                border: "1px solid #e0e0e0",
                                padding: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                width: '100%',
                                overflow: 'hidden',
                            }}
                        >
                            <Document
                                file={`data:application/pdf;base64,${pdfData.base64}`}
                                onLoadSuccess={onDocumentLoadSuccess}
                                className="pdf-document"
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <div
                                        key={`page_${index + 1}`}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            overflow: "hidden",
                                            height: 'auto',
                                            margin: '10px 0',
                                        }}
                                    >
                                        <Page
                                            pageNumber={index + 1}
                                            width={Math.min(window.innerWidth * 0.8, 650)}
                                            renderMode="canvas"
                                            scale={1.3}
                                            renderTextLayer={true}
                                            renderAnnotationLayer={false}
                                            imageResourcesPath=""
                                        />
                                    </div>
                                ))}
                            </Document>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    {pdfData.filename && (
                        <div style={{ marginRight: '15px' }}>
                            <a
                                href={`data:application/pdf;base64,${pdfData.base64}`}
                                download={pdfData.filename}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    padding: '10px',
                                    backgroundColor: '#2a75bb',
                                    color: 'white',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    float: 'right',
                                }}
                            >
                                Download PDF
                            </a>
                        </div>
                    )}
                </DialogActions>
            </Dialog>
            <br></br>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="arroww" style={{ marginRight: '10px' }}>
                    <span style={{ textAlign: 'center' }}>Step 3:</span>
                </div>
                <form onSubmit={Signonupload} style={{ width: '11%' }}>
                    <button style={{ width: '109%', marginLeft: '-1%' }}
                        className={`btn btn-sm ${downlodClicked ? 'btn-primary' : 'btn-secondary'}`}
                        disabled={!downlodClicked}>Sign on upload</button>
                </form>
                {loading && <Loader />}
            </div>


            <br></br>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="arroww" style={{ marginRight: '10px' }}>
                    <span style={{ textAlign: 'center' }}>Step 4:</span>
                </div>
                <button style={{ width: '12%' }} className={`btn btn-sm ${signUploadBtnClicked ? 'btn-primary' : 'btn-secondary'}`} disabled={!signUploadBtnClicked} onClick={handleView}>View</button>
            </div>
            <br></br>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="arroww" style={{ marginRight: '10px' }}>
                    <span style={{ textAlign: 'center' }}>Step 5:</span>
                </div>
                <button style={{ width: '12%' }} className={`btn btn-sm ${viewBtnClicked ? 'btn-primary' : 'btn-secondary'}`} disabled={!viewBtnClicked} onClick={handleSubmit}>Submit</button>
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
        </Container>

    );

}
export default ListOfBoardDirector;