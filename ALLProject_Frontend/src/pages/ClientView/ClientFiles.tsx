
// import React, { useEffect, useState } from 'react';
// import { Col, Spinner } from 'react-bootstrap';
// import DocumentApiService from '../../data/services/document/Document_api_service';
// import { useParams } from 'react-router-dom';
// import { Box, Card } from '@mui/material';

// const ClientFiles: React.FC = () => {
//     const { kycId } = useParams<{ kycId: string }>();
//     const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({
//         base64: null,
//         filename: null
//     });
//     const [base64Image, setBase64Image] = useState<string | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (kycId) {
//             const parsedKycId = parseInt(kycId, 10);
//             fetchData(parsedKycId);
//         }
//     }, [kycId]);

//     const documentApiService = new DocumentApiService();

//     const fetchData = async (parsedKycId: number) => {
//         setLoading(true);
//         try {
//             await Promise.all([
//                 handleButtonClick(parsedKycId, 4, 'image'),
//                 handleButtonClick(parsedKycId, 4, 'pdf')
//             ]);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleButtonClick = async (kycId: number, documentTypeId: number, fileType: string) => {
//         try {
//             if (fileType === 'image') {
//                 const imageData = await documentApiService.getClientImage(documentTypeId, kycId);
//                 const base64String = arrayBufferToBase64(imageData);
//                 setBase64Image(base64String);
//             } else if (fileType === 'pdf') {
//                 const pdfData = await documentApiService.getClientPDF(documentTypeId, kycId);
//                 setPdfData({ base64: pdfData.data, filename: pdfData.filename });
//             }
//         } catch (error) {
//             console.error('Error fetching file:', error);
//         }
//     };

//     const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
//         const binary = new Uint8Array(buffer);
//         const bytes = Array.from(binary).map(byte => String.fromCharCode(byte));
//         return btoa(bytes.join(''));
//     };

//     return (
//         <Box component="main" sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//             <Card sx={{ p: 3, boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
//                 <h4 style={{ font: 'openSans' }}>CLIENT FILES</h4>
//                 <Col xs={12}>
//                     {loading ? (
//                         <div style={{ textAlign: 'center', marginTop: '2%' }}>
//                             <Spinner animation="border" role="status">
//                                 <span className="sr-only"></span>
//                             </Spinner>
//                             <p>Loading files...</p>
//                         </div>
//                     ) : (
//                         pdfData.base64 && (
//                             <Col xs={12} style={{ marginTop: '2%' }}>
//                                 <div>
//                                     <h6>PDF Preview</h6>
//                                     <iframe
//                                         title="PDF Preview"
//                                         width="100%"
//                                         height="100%"
//                                         style={{ border: 'none' }}
//                                         src={`data:application/pdf;base64,${pdfData.base64}`}
//                                     />
//                                     {pdfData.filename && (
//                                         <div style={{ marginTop: '10px', textAlign: 'center' }}>
//                                             <a
//                                                 href={`data:application/pdf;base64,${pdfData.base64}`}
//                                                 download={pdfData.filename}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 style={{
//                                                     textDecoration: 'none',
//                                                     padding: '5px 15px',
//                                                     backgroundColor: '#2a75bb',
//                                                     color: 'white',
//                                                     borderRadius: '5px',
//                                                     cursor: 'pointer',
//                                                     fontSize: '14px',
//                                                 }}
//                                             >
//                                                 Download PDF
//                                             </a>
//                                         </div>
//                                     )}
//                                 </div>
//                             </Col>
//                         )
//                     )}
//                 </Col>
//             </Card>
//         </Box>
//     );
// };

// export default ClientFiles;

import React, { useState, useEffect, useRef } from 'react';
import {
    Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress,Card,CardHeader,CardContent,
} from '@mui/material';
import { AxiosError } from 'axios';
import { Document, Page } from 'react-pdf';
import { useParams } from 'react-router-dom';
import DocumentApiService from '../../data/services/kyc/document/Document_api_service';

const ClientFiles = () => {
    const { kycId } = useParams<{ kycId: string }>();
    const componentRef = useRef<HTMLDivElement | null>(null);


    const [showImageModal, setShowImageModal] = useState(false);
    const [imageIds, setImageIds] = useState<string[]>([]);
    const [pdfIds, setPdfIds] = useState<string[]>([]);
    const [imageError, setImageError] = useState<string | null>(null);
    const [pdfError, setPdfError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const [currentPdfIndex, setCurrentPdfIndex] = useState<number>(0);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [pdfData, setPdfData] = useState<{ base64: string | null; filename: string | null }>({ base64: null, filename: null });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const customerApiService = new DocumentApiService();
    const [loading, setLoading] = useState(false);

    const handleImageClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
        if (kycId) {
            try {
                const fetchedImageIds = await customerApiService.getAllImageID(kycId, 4);
                if (Array.isArray(fetchedImageIds)) {
                    setImageIds(fetchedImageIds);
                    setImageError(null);
                    setCurrentImageIndex(0);
                    await fetchAndShowImage(fetchedImageIds[0]);
                } else {
                    setImageIds([]);
                    setImageError('Unexpected response format.');
                }
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    setImageIds([]);
                    setImageError('No image IDs available.');
                } else {
                    setImageIds([]);
                    setImageError('Error fetching image IDs.');
                }
            }
        }
    };

    const handleNextImage = async () => {
        if (imageIds.length > 0 && currentImageIndex < imageIds.length - 1) {
            const nextIndex = currentImageIndex + 1;
            setCurrentImageIndex(nextIndex);
            await fetchAndShowImage(imageIds[nextIndex]);
        }
    };

    const handlePreviousImage = async () => {
        if (imageIds.length > 0 && currentImageIndex > 0) {
            const prevIndex = currentImageIndex - 1;
            setCurrentImageIndex(prevIndex);
            await fetchAndShowImage(imageIds[prevIndex]);
        }
    };

    const fetchAndShowImage = async (imgId: string) => {
        if (kycId) {
            try {
                const imageData = await customerApiService.getAllImage(kycId, imgId);
                const base64String = arrayBufferToBase64(imageData);
                setBase64Image(base64String);
                setShowImageModal(true);
                setErrorMessage(null);
            } catch (error) {
                console.error('Error fetching image:', error);
                setBase64Image(null);
                setErrorMessage("No image available");
                setShowImageModal(true);
            }
        }
    };

    const handleCloseImageModals = () => {
        setShowImageModal(false);
    };

    const currentImageId = imageIds.length > 0 ? imageIds[currentImageIndex] : null;

    const handleImageClicks = async (imgId: string) => {
        if (kycId) {
            try {
                const imageData = await customerApiService.getAllImage(kycId, imgId);
                const base64String = arrayBufferToBase64(imageData);
                setBase64Image(base64String);
                setShowImageModal(true);
            } catch (error) {
                console.error('Error fetching image:', error);
                setBase64Image(null);
                setErrorMessage("No image available");
                setShowImageModal(true);
            }
        }
    };

    const handlePdfClick: React.MouseEventHandler<HTMLButtonElement> = async () => {
        if (kycId) {
            try {
                const pdfIds = await customerApiService.getAllImageID(kycId, 4);
                console.log('PDF IDs:', pdfIds);
                if (Array.isArray(pdfIds)) {
                    setPdfIds(pdfIds);
                    setPdfError(null);
                    setCurrentPdfIndex(0);
                    if (pdfIds.length > 0) {
                        await fetchAndShowPdf(pdfIds[0]);
                    }
                } else {
                    console.error('Received pdfIds is not an array:', pdfIds);
                    setPdfIds([]);
                    setPdfError('Unexpected response format.');
                }
            } catch (error: any) {
                console.error('Error fetching PDFs:', error);
                if (error.response && error.response.status === 404) {
                    setPdfIds([]);
                    setPdfError('No PDFs available.');
                } else {
                    setPdfIds([]);
                    setPdfError('Error fetching PDFs.');
                }
            }
        }
    };


    const handleNextPdf = async () => {

        if (pdfIds.length > 0 && currentPdfIndex < pdfIds.length - 1) {
            const nextIndex = currentPdfIndex + 1;
            setCurrentPdfIndex(nextIndex);
            await fetchAndShowPdf(pdfIds[nextIndex]);
        }
    };

    const handlePreviousPdf = async () => {
        if (pdfIds.length > 0 && currentPdfIndex > 0) {
            const prevIndex = currentPdfIndex - 1;
            setCurrentPdfIndex(prevIndex);
            await fetchAndShowPdf(pdfIds[prevIndex]);
        }
    };

    const fetchAndShowPdf = async (pdfId: string) => {
        if (kycId) {
            try {
                const pdfData = await customerApiService.getPDF(kycId, pdfId);
                setPdfData({ base64: pdfData.data, filename: pdfData.filename });
                setShowPdfModal(true);
                setPdfError(null); // Clear any previous error message
            } catch (error: unknown) {
                console.error('Error fetching PDF:', error);

                if (error instanceof AxiosError) {
                    if (error.response) {
                        if (error.response.status === 404) {
                            setPdfError('PDF not found.');
                        } else {
                            setPdfError(`Error fetching PDF: ${error.response.statusText}`);
                        }
                    } else {
                        setPdfError('Network error.');
                    }
                } else {
                    setPdfError('An unexpected error occurred.');
                }

                setShowPdfModal(true);
            }
        }
    };



    const currentPDFId = pdfIds.length > 0 ? pdfIds[currentPdfIndex] : null;

    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        const binary = new Uint8Array(buffer);
        const bytes = [];
        for (let i = 0; i < binary.length; i++) {
            bytes.push(String.fromCharCode(binary[i]));
        }
        return `data:image/png;base64,${btoa(bytes.join(''))}`;
    };

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setLoading(false);
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

    return (
        <>
            {/* <div>
                <Button onClick={handleImageClick}>Show Image IDs</Button>

                <Button onClick={handlePdfClick}>Show PDFs</Button>
            </div> */}
            <Card variant="outlined" style={{ margin: '20px' }}>
                <CardHeader title="CLIENT FILES" titleTypographyProps={{ variant: 'h5' }} />
                <CardContent>
                    <Button variant="contained" onClick={handleImageClick} style={{ marginRight: '10px' }}>
                        Show Images
                    </Button>
                    <Button variant="contained" onClick={handlePdfClick}>
                        Show PDFs
                    </Button>
                </CardContent>
            </Card>
            <Dialog open={showImageModal} onClose={handleCloseImageModals} fullWidth maxWidth='xl'>
                <DialogContent>
                    {base64Image && <img src={base64Image} alt="Image" style={{ maxWidth: '100%', height: 'auto' }} />}
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePreviousImage} disabled={currentImageIndex === 0}>
                        &lt; Previous
                    </Button>
                    <Button onClick={handleNextImage} disabled={currentImageIndex === imageIds.length - 1}>
                        Next &gt;
                    </Button>
                    <Button onClick={handleCloseImageModals}>Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={showPdfModal}
                onClose={() => setShowPdfModal(false)}
                fullWidth
                maxWidth="xl"
            >
                <DialogContent
                    style={{
                        textAlign: 'center',
                        minHeight: '80vh',
                        // display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {loading && <CircularProgress />}
                    {pdfData.base64 && (
                        <Document
                            file={`data:application/pdf;base64,${pdfData.base64}`}
                            onLoadSuccess={onDocumentLoadSuccess}
                            renderMode="canvas"
                            onLoadProgress={() => setLoading(true)}
                        >
                            {Array.from(new Array(numPages), (el, index) => (
                                <div
                                    key={`page_${index + 1}`}
                                    style={{
                                        margin: '10px',
                                        padding: '100px',
                                        marginBottom: '5px',
                                    }}
                                >
                                    <Page pageNumber={index + 1} />
                                </div>
                            ))}
                        </Document>
                    )}
                    {pdfError && <Typography color="error">{pdfError}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePreviousPdf} disabled={currentPdfIndex === 0}>
                        &lt; Previous
                    </Button>
                    <Button
                        onClick={handleNextPdf}
                        disabled={currentPdfIndex === pdfIds.length - 1}
                    >
                        Next &gt;
                    </Button>
                    <Button onClick={() => setShowPdfModal(false)}>Close</Button>
                </DialogActions>
            </Dialog>


        </>
    );
};

export default ClientFiles;



