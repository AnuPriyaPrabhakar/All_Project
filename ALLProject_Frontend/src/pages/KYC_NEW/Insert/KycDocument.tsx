import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, Grid, IconButton } from '@mui/material';
import { AnyIfEmpty, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ApplicationfromeService from "../../../data/services/kyc/applicationfrom/applicationfrome-api-service";
import { kycForm, QuestionType } from "../../../data/services/kyc/applicationfrom/applicationfrome-payload";
import DocumentApiService from "../../../data/services/document/Document_api_service";
interface Image {
    name: string;
    uploading: boolean;
    uploadSuccess: boolean;
};

interface CustomerData {
    kycFormDto: kycForm;
};
function KYCDocument(props:any) {
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


    useEffect(() => {
        if (responseId) {
            fetchData(responseId.toString());
        }
        sessionStorage.clear();
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


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const responseId = sessionStorage.getItem('responseId');
            if (!responseId) {
                console.error('No responseId found in session storage');
                return;
            }
            const documentTypeId = 4;

            console.log('Submitting files:', selectedFiles);
            await documentApiService.saveCustomerRequest(selectedFiles, parseInt(responseId, 10), documentTypeId);
            // sessionStorage.removeItem('responseId');
        } catch (error) {
            console.error('Error submitting files:', error);
        }
    };

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

                                    <div className="person-container">
                                        <div className="field-group">
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
                </Grid>

                <button className='btn btn-primary'>
                    Submit
                </button>
            </div>
        </Box>
    );
}
export default KYCDocument;