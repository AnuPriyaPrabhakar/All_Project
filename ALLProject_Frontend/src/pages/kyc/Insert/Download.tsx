import React, { useEffect, useRef, useState } from 'react';
import { Box, TextField, Button, Grid, InputLabel, FormControl, Select, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import Header from '../../../layouts/header/header';
import { Card } from 'react-bootstrap';
import ApplicationfromeService from '../../../data/services/kyc/applicationfrom/applicationfrome-api-service';
import { Type, AccountType, QuestionType, AppFormData, kycForm, AnswerTypeData } from '../../../data/services/kyc/applicationfrom/applicationfrome-payload';
import { SelectChangeEvent } from '@mui/material/Select';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import contactImage from '../../../assets/contact.png';

import { useApplicationContext } from './ApplicationContext';
import DocumentApiService from '../../../data/services/kyc/document/Document_api_service';
import './Form.css';

function ApplicationForm() {
    const [formData, setFormData] = useState<AppFormData>({
        applicantFormDto: {
            id: 0,
            name: '',
            numberOfPrint: 0,
            isCompleted:0,
            isScreening:0,
            applicantFormDetailsData: [],
        },
    });

    const documentApiService = new DocumentApiService();

    const [typeOptions, setTypeOptions] = useState<Type[]>([]);
    const [accountTypeOptions, setAccountTypeOptions] = useState<AccountType[]>([]);
    const [fetchedQuestions, setFetchedQuestions] = useState<QuestionType[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [downloadingPDF, setDownloadingPDF] = useState(false);
    const applicationfrome = new ApplicationfromeService();
    const { setResponseId } = useApplicationContext();
    const [downloadCount, setDownloadCount] = useState(0);
    const [isFormDataUpdated, setIsFormDataUpdated] = useState(false);
    const [formFullyRendered, setFormFullyRendered] = useState(false);
    const [showDownloadButton, setShowDownloadButton] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formDatas, setFormDatas] = useState<kycForm[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);

    const [showInputBox, setShowInputBox] = useState<{ [key: number]: boolean }>({});
    const [additionalAnswers, setAdditionalAnswers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        fetchQuestions()
    }, []);

    // const fetchQuestions = async () => {
    //     const applicationTypeId = 1; // Manually setting applicationTypeId to 1
    //     const accountTypeId = 2; // Manually setting accountTypeId to 2
    //     try {
    //         const questions = await applicationfrome.getQuestionTypes(applicationTypeId, accountTypeId);
    //         setFetchedQuestions(questions);
    //         setDataFetched(true);
    //         setFormData(prevState => {
    //             const updatedFormData = {
    //                 ...prevState,
    //                 applicantFormDto: {
    //                     ...prevState.applicantFormDto,
    //                     applicantFormDetailsData: questions.map((question: { questionDto: { id: number; ansTypeId: number; multiQuestion: any; subQuestionTypeData: any[] }; }) => ({
    //                         id: 0,
    //                         kycId: 0,
    //                         accountTypeId,
    //                         applicationTypeId,
    //                         questionId: question.questionDto.id,
    //                         ansTypeId: question.questionDto.ansTypeId,
    //                         answer: '', // Initialize answer field
    //                         score: 0, // Initialize score field
    //                         uid: 0,
    //                         subQuestionId: 0,
    //                         isSubAnswer: 0, // Initialize isSubAnswer field
    //                         ansId: 0 // Initialize ansId field with default value
    //                     }))
    //                 }
    //             };
    //             setIsFormDataUpdated(true);
    //             return updatedFormData;
    //         });
    //         console.log('formData:', questions);
    //         console.log('subQuestionTypeData:', questionDto[0].subQuestionTypeData);

    //         setErrors(Array(questions.length).fill(''));
    //         setFormFullyRendered(true);
    //     } catch (error) {
    //         console.error("Error fetching questions:", error);
    //     }
    // };
   
    

    // const handleAnswerChange = (index: number, value: string) => {
    //     const question = fetchedQuestions[index];
    //     const answerTypeData = question.questionDto.answerTypeData.find(answer => answer.name === value);


    //     const updatedFormDetails = formData.applicantFormDto.applicantFormDetailsData.map((item, idx) =>
    //         idx === index ? {
    //             ...item,
    //             answer: value,
    //             score: answerTypeData ? answerTypeData.score : item.score,
    //             questionId: answerTypeData ? answerTypeData.questionId : item.questionId
    //         } : item
    //     );
    //     setFormData({
    //         ...formData,
    //         applicantFormDto: {
    //             ...formData.applicantFormDto,
    //             applicantFormDetailsData: updatedFormDetails
    //         }
    //     });

    // };

    // const handleAnswerChange = (index: number, value: string, isSubQuestion: boolean, subQuestionId: number | null = null) => {
    //     const question = fetchedQuestions[index];
    //     let answerTypeData: AnswerTypeData | undefined;
    
    //     if (isSubQuestion && subQuestionId) {
    //         const subQuestion = question.questionDto.subQuestionTypeData.find(subQ => subQ.id === subQuestionId);
    //         answerTypeData = subQuestion?.answerTypeData.find(answer => answer.name === value);
    //     } else {
    //         answerTypeData = question.questionDto.answerTypeData.find(answer => answer.name === value);
    //     }
    
    //     const updatedFormDetails = formData.applicantFormDto.applicantFormDetailsData.map((item, idx) => {
    //         if (idx === index) {
    //             return {
    //                 ...item,
    //                 answer: value,
    //                 score: answerTypeData ? answerTypeData.score : item.score,
    //                 questionId: answerTypeData ? answerTypeData.questionId : item.questionId,
    //                 subQuestionId: isSubQuestion && subQuestionId ? subQuestionId : item.subQuestionId,
    //             };
    //         }
    //         return item;
    //     });
    
    //     setFormData({
    //         ...formData,
    //         applicantFormDto: {
    //             ...formData.applicantFormDto,
    //             applicantFormDetailsData: updatedFormDetails
    //         }
    //     });
    // };
     // const handleDropdownChange = (index: number, value: string) => {
    //     const question = fetchedQuestions[index];
    //     const answerTypeData = question.questionDto.answerTypeData.find(answer => answer.name === value);

    //     const updatedFormDetails = formData.applicantFormDto.applicantFormDetailsData.map((item, idx) =>
    //         idx === index ? {
    //             ...item,
    //             answer: value,
    //             ansId: value === 'Under Process' ? answerTypeData?.id ?? 0 : item.ansId, // Ensure ansId is never undefined
    //             score: answerTypeData ? answerTypeData.score : item.score,
    //             questionId: answerTypeData ? answerTypeData.questionId : item.questionId
    //         } : item
    //     );
    //     setFormData({
    //         ...formData,
    //         applicantFormDto: {
    //             ...formData.applicantFormDto,
    //             applicantFormDetailsData: updatedFormDetails
    //         }
    //     });

    //     // If selected value is 'Under Process', show the input box
    //     if (value === 'Under Process') {
    //         setShowInputBox(prev => ({ ...prev, [index]: true }));
    //     } else {
    //         setShowInputBox(prev => ({ ...prev, [index]: false }));
    //         setAdditionalAnswers(prev => ({ ...prev, [index]: '' }));
    //     }
    // };
    const fetchQuestions = async () => {
        const applicationTypeId = 1; // Manually setting applicationTypeId to 1
        const accountTypeId = 2; // Manually setting accountTypeId to 2
        try {
            const questions = await applicationfrome.getQuestionTypes(applicationTypeId, accountTypeId);
            setFetchedQuestions(questions);
            setDataFetched(true);
    
            // Logging subQuestionTypeData for each question
            questions.forEach((question: { questionDto: { id: any; subQuestionTypeData: any; }; }) => {
                console.log('SubQuestionTypeData for Question ID', question.questionDto.id);
                console.log(question.questionDto.subQuestionTypeData);
            });
    
            setFormData(prevState => {
                const updatedFormData = {
                    ...prevState,
                    applicantFormDto: {
                        ...prevState.applicantFormDto,
                        applicantFormDetailsData: questions.map((question: { questionDto: { id: any; ansTypeId: any; }; }) => ({
                            id: 0,
                            kycId: 0,
                            accountTypeId,
                            applicationTypeId,
                            questionId: question.questionDto.id,
                            ansTypeId: question.questionDto.ansTypeId,
                            answer: '', // Initialize answer field
                            score: 0, // Initialize score field
                            uid: 0,
                            subQuestionId: 0,
                            isSubAnswer: 0, // Initialize isSubAnswer field
                            ansId: 0 // Initialize ansId field with default value
                        }))
                    }
                };
                setIsFormDataUpdated(true);
                return updatedFormData;
            });
    
            console.log('formData:', questions);
            setErrors(Array(questions.length).fill(''));
            setFormFullyRendered(true);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    
    const handleAnswerChange = (index: number, value: string, isSubQuestion: boolean, subQuestionId: number | null = null) => {
        const question = fetchedQuestions[index];
        let answerTypeData: AnswerTypeData | undefined;
    
        // Log questionId and subQuestionId for debugging
   
        if (isSubQuestion && subQuestionId) {
            
            console.log('Sub-Question ID:', question.questionDto.id,subQuestionId);
            const subQuestion = question.questionDto.subQuestionTypeData.find(subQ => subQ.id === subQuestionId);
            answerTypeData = subQuestion?.answerTypeData.find(answer => answer.name === value);
        } 
        else {
         
            answerTypeData = question.questionDto.answerTypeData.find(answer => answer.name === value);
        }
    
        const updatedFormDetails = formData.applicantFormDto.applicantFormDetailsData.map((item, idx) => {
            if (idx === index) {
                return {
                    ...item,
                    answer: value,
                    ansId: value === 'Under Process' ? answerTypeData?.id ?? 0 : item.ansId, 
                    score: answerTypeData ? answerTypeData.score : item.score,
                    questionId: answerTypeData ? answerTypeData.questionId : item.questionId,
                    subQuestionId: isSubQuestion && subQuestionId ? subQuestionId : item.subQuestionId,
                };
            }
        
            return item;
    

        });
    
        setFormData({
            ...formData,
            applicantFormDto: {
                ...formData.applicantFormDto,
                applicantFormDetailsData: updatedFormDetails
            }
                   
        });
    
    
        setShowInputBox(prev => ({ ...prev, [index]: value === "Under Process" }));
        console.log('item:', updatedFormDetails);
        console.log('applicantFormDetailsData:', formData);

    };
    


   
    const handleAdditionalAnswerChange = (index: number, value: string) => {
        // Parse or convert value to number for isSubAnswer
        const isSubAnswerNumber = value.trim() === '' || isNaN(parseInt(value, 10)) ? 1 : parseInt(value, 10);

        setAdditionalAnswers(prev => ({ ...prev, [index]: value }));

        // Update formData to include additional answer
        setFormData(prevFormData => {
            const updatedFormDetails = prevFormData.applicantFormDto.applicantFormDetailsData.map((item, idx) =>
                idx === index ? { ...item, isSubAnswer: isSubAnswerNumber } : item
            );
            return {
                ...prevFormData,
                applicantFormDto: {
                    ...prevFormData.applicantFormDto,
                    applicantFormDetailsData: updatedFormDetails
                }
            };
        });
    };



    const itemsPerPage = 10;

    const splitDataIntoPages = (data: any[], itemsPerPage: number) => {
        const pages = [];
        for (let i = 0; i < data.length; i += itemsPerPage) {
            pages.push(data.slice(i, i + itemsPerPage));
        }
        return pages;
    };

    const pages = splitDataIntoPages(fetchedQuestions, itemsPerPage);

    const itemsPerPages = 12;

    const splitDataIntoPage = (data: any[], itemsPerPages: number) => {
        const pageView = [];
        for (let i = 0; i < data.length; i += itemsPerPages) {
            pageView.push(data.slice(i, i + itemsPerPages));
        }
        return pageView;
    };

    const pageView = splitDataIntoPage(formDatas, itemsPerPages);
    const downloadPDFRef = React.useRef<() => void | null>(null);

    const handleDownloadClick = () => {
        if (downloadPDFRef.current) {
            downloadPDFRef.current();
        }
    };

    const [imageURL, setImageURL] = useState('');

    const handleSubmit = async () => {
        const hasErrors = errors.some(error => error !== '');
        if (hasErrors) {

            return;
        }

        try {
            let responseId = sessionStorage.getItem('responseId');
            let responseIdNumber;

            if (responseId) {
                responseIdNumber = Number(responseId);
                if (isNaN(responseIdNumber)) {
                    console.error('Invalid responseId found in session storage');

                    return;
                }
            } else {
                const initialResponse = await applicationfrome.Apllicationinsert(formData);
                if (initialResponse && initialResponse.id) {
                    responseIdNumber = initialResponse.id;
                    sessionStorage.setItem('responseId', responseIdNumber.toString());
                    setResponseId(responseIdNumber);
                } else {

                    console.error('Failed to generate a new responseId');

                    return;
                }
            }

            const updatedNumberOfPrint = formData.applicantFormDto.numberOfPrint + 1;

            const updatedFormData = {
                ...formData,
                applicantFormDto: {
                    ...formData.applicantFormDto,
                    id: responseIdNumber,
                    numberOfPrint: updatedNumberOfPrint,
                },
            };

            // Save updated form data to local storage
            localStorage.setItem('formData', JSON.stringify(updatedFormData));

            const response = await applicationfrome.Apllicationinsert(updatedFormData);
            console.log('Updated formData:', updatedFormData);

            if (response && response.id) {
                setDataFetched(true);
                setShowDownloadButton(true);
                setFormData(updatedFormData);
                setResponseId(response.id);


            } else {
                console.error('Failed to generate a new responseId');

            }
        } catch (error) {
            console.error("Error submitting form:", error);

        }
    };

    return (
        <>
            <Card style={{ boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                <Container style={{ width: '274mm', minHeight: '297mm', marginTop: '2%' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {pages.map((pageContent, pageIndex) => (
                            <Paper key={pageIndex} style={{ marginBottom: '20px' }}>
                                <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
                                    <div>
                                        {imageURL && (
                                            <img
                                                src={imageURL}
                                                alt="Ponsun"
                                                style={{ display: 'block', margin: '0 auto', maxWidth: '35%', height: 'auto', maxHeight: '200px', marginBottom: '20px' }}
                                            />
                                        )}
                                    </div>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow sx={{ fontSize: 'small' }}>
                                                    <TableCell sx={{ width: '10%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Sl.no</TableCell>
                                                    <TableCell sx={{ width: '40%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Question</TableCell>
                                                    <TableCell sx={{ width: '50%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Answer</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {pageContent.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <TableRow>
                                                            <TableCell sx={{ width: '10%', padding: '20px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
                                                                {index + 1 + pageIndex * itemsPerPage}
                                                            </TableCell>
                                                            <TableCell sx={{ width: '40%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
                                                                {item.questionDto.name}
                                                                {item.questionDto.multiQuestion === 1 && (
                                                                    item.questionDto.subQuestionTypeData && item.questionDto.subQuestionTypeData.map((subQuestion: any) => (
                                                                        <Typography key={subQuestion.id}>{subQuestion.name}:</Typography>
                                                                    ))
                                                                )}
                                                                {item.questionDto.ansTypeId === 2 && (
                                                                    <Typography variant="body2" color="textSecondary">
                                                                        {item.questionDto.description}
                                                                    </Typography>
                                                                )}
                                                            </TableCell>
                                                            <TableCell sx={{ width: '50%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
                                                                {item.questionDto.multiQuestion === 1 && item.questionDto.subQuestionTypeData && (
                                                                    item.questionDto.subQuestionTypeData.map((subQuestion: any, subIndex: number) => (
                                                                        <React.Fragment key={subQuestion.id}>
                                                                            {subQuestion.ansTypeId === 2 ? (
                                                                                <>
                                                                                    <Select
                                                                                        style={{ fontSize: 'small' }}
                                                                                        fullWidth
                                                                                        size='small'
                                                                                        value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.subQuestionId === subQuestion.id)?.answer || ''}
                                                                                        onChange={(e) => handleAnswerChange(index + pageIndex * itemsPerPage, e.target.value, true, subQuestion.id)}
                                                                                    >
                                                                                        {subQuestion.answerTypeData.map((answer: { name: string }, answerIndex: React.Key) => (
                                                                                            <MenuItem
                                                                                                style={{ height: '2rem', fontSize: '0.75rem' }}
                                                                                                key={answerIndex}
                                                                                                value={answer.name}
                                                                                            >
                                                                                                {answer.name}
                                                                                            </MenuItem>
                                                                                        ))}
                                                                                    </Select>
                                                                                    {showInputBox[index + pageIndex * itemsPerPage] && (
                                                                                        <TextField
                                                                                            sx={{ fontSize: 'x-small', marginTop: '10px' }}
                                                                                            fullWidth
                                                                                            size='small'
                                                                                            autoComplete='off'
                                                                                            multiline
                                                                                            placeholder="Please provide additional details"
                                                                                            value={additionalAnswers[index + pageIndex * itemsPerPage]}
                                                                                            onChange={(e) => handleAdditionalAnswerChange(index + pageIndex * itemsPerPage, e.target.value)}
                                                                                        />
                                                                                    )}
                                                                                </>
                                                                            ) : (
                                                                                <TextField
                                                                                    sx={{ fontSize: 'x-small' }}
                                                                                    fullWidth
                                                                                    size='small'
                                                                                    autoComplete='off'
                                                                                    multiline
                                                                                    value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.subQuestionId === subQuestion.id)?.answer || ''}
                                                                                    onChange={(e) => handleAnswerChange(index + pageIndex * itemsPerPage, e.target.value, true, subQuestion.id)}
                                                                                />
                                                                            )}
                                                                            {errors[index + pageIndex * itemsPerPage] && (
                                                                                <Typography variant="caption" color="error">
                                                                                    {errors[index + pageIndex * itemsPerPage]}
                                                                                </Typography>
                                                                            )}
                                                                        </React.Fragment>
                                                                    ))
                                                                )}
                                                                {!item.questionDto.multiQuestion && item.questionDto.ansTypeId === 2 && (
                                                                    <>
                                                                        <Select
                                                                            style={{ fontSize: 'small' }}
                                                                            fullWidth
                                                                            size='small'
                                                                            value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.questionId === item.questionDto.id)?.answer || ''}
                                                                            onChange={(e) => handleAnswerChange(index + pageIndex * itemsPerPage, e.target.value, false)}
                                                                        >
                                                                            {item.questionDto.answerTypeData.map((answer: { name: string }, answerIndex: React.Key) => (
                                                                                <MenuItem
                                                                                    style={{ height: '2rem', fontSize: '0.75rem' }}
                                                                                    key={answerIndex}
                                                                                    value={answer.name}
                                                                                >
                                                                                    {answer.name}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                        {showInputBox[index + pageIndex * itemsPerPage] && (
                                                                            <TextField
                                                                                sx={{ fontSize: 'x-small', marginTop: '10px' }}
                                                                                fullWidth
                                                                                size='small'
                                                                                autoComplete='off'
                                                                                multiline
                                                                                placeholder="Please provide additional details"
                                                                                value={additionalAnswers[index + pageIndex * itemsPerPage]}
                                                                                onChange={(e) => handleAdditionalAnswerChange(index + pageIndex * itemsPerPage, e.target.value)}
                                                                            />
                                                                        )}
                                                                    </>
                                                                )}
                                                                {!item.questionDto.multiQuestion && item.questionDto.ansTypeId !== 2 && (
                                                                    <TextField
                                                                        sx={{ fontSize: 'x-small' }}
                                                                        fullWidth
                                                                        size='small'
                                                                        autoComplete='off'
                                                                        multiline
                                                                        value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.questionId === item.questionDto.id)?.answer || ''}
                                                                        onChange={(e) => handleAnswerChange(index + pageIndex * itemsPerPage, e.target.value, false)}
                                                                    />
                                                                )}
                                                                {errors[index + pageIndex * itemsPerPage] && (
                                                                    <Typography variant="caption" color="error">
                                                                        {errors[index + pageIndex * itemsPerPage]}
                                                                    </Typography>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                                ))}




                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} />
                                    <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}>Page : {pageIndex + 1}</div>
                                </div>
                                <h3>Update: {formData.applicantFormDto.numberOfPrint}</h3>
                            </Paper>
                        ))}

                        {dataFetched && isFormDataUpdated && formFullyRendered && (
                            <div>
                                {formData.applicantFormDto.applicantFormDetailsData[0]?.applicationTypeId === 1 &&
                                    formData.applicantFormDto.applicantFormDetailsData[0]?.accountTypeId === 2 && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="arroww" style={{ marginRight: '10px' }}>
                                                <span style={{ textAlign: 'center' }}>Step 1:</span>
                                            </div>
                                            <button style={{ width: '12%' }} className='btn btn-primary btn-sm' onClick={() => { handleSubmit() }}>Save</button>
                                            <br />
                                        </div>
                                    )}
                            </div>
                        )}
                        <br></br>
                    </LocalizationProvider>
                </Container>
            </Card>
            <Card>
            </Card>
        </>
    );
}

export default ApplicationForm;

// // // import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
// // // import {
// // //     Container, Table, TableBody, TableCell, TableContainer, Button, Grid, TableHead, TableRow, Paper, TextField, Snackbar,
// // //     Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
// // // } from '@mui/material';
// // // import { Box, Typography } from '@mui/material';
// // // import { Card } from 'react-bootstrap';
// // // import { useParams } from 'react-router-dom';
// // // import Header from '../../../layouts/header/header';
// // // import ponsunImage from '../../../assets/ponsun.png';
// // // import ApplicationfromeService from '../../../data/services/applicationfrom/applicationfrome-api-service';
// // // import { kycForm } from '../../../data/services/applicationfrom/applicationfrome-payload';
// // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // // import contactImage from '../../../assets/contact.png';
// // // import { faDownload } from '@fortawesome/free-solid-svg-icons';
// // // import html2canvas from 'html2canvas';
// // // import { useApplicationContext } from '../Insert/ApplicationContext';
// // // import { px } from 'framer-motion';
// // // import jsPDF from 'jspdf';
// // // import { useSelector } from 'react-redux';
// // // import DocumentApiService from '../../../data/services/document/Document_api_service';
// // // import avatarImage from '../../../../src/assets/Avatar.png';
// // // import { Document, Page, pdfjs } from 'react-pdf';
// // // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // // import { faUserCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
// // // import { Col, Image, Modal } from 'react-bootstrap';
// // // import BankHeader from '../../BankReport/bankHeader';
// // // import { CSSProperties } from 'react';

// // // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// // // interface CustomerData {
// // //     kycFormDto: kycForm;
// // // };

// // // const Download = forwardRef((props, ref) => {
// // //     const { responseId } = useApplicationContext();
// // //     console.log('ApplicationForm responseId:', responseId);
// // //     const { kycId } = useParams<{ kycId: string }>();
// // //     const [formData, setFormData] = useState<kycForm[]>([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [errors, setErrors] = useState<string[]>([]);
// // //     const contentRef = useRef<HTMLDivElement>(null);
// // //     const [downloadingPDF, setDownloadingPDF] = useState(false);
// // //     const applicationfrome = new ApplicationfromeService();
// // //     const [downloadCount, setDownloadCount] = useState(0);

// // //     useEffect(() => {
// // //         if (responseId) {
// // //             console.log('responseId:', responseId);
// // //         }
// // //     }, [responseId]);

// // //     useEffect(() => {
// // //         const fetchData = async (kycId: string) => {
// // //             try {
// // //                 setLoading(true);
// // //                 const customerData: CustomerData[] = await applicationfrome.getkycData(kycId);
// // //                 if (customerData && customerData.length > 0) {
// // //                     setFormData(customerData.map((data: CustomerData) => data.kycFormDto));
// // //                 } else {
// // //                     setErrors(["No data found"]);
// // //                 }
// // //             } catch (error) {
// // //                 setErrors(["Error fetching data"]);
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };
// // //         if (kycId) {
// // //             fetchData(kycId);
// // //         }
// // //     }, [kycId]);

// // //     const itemsPerPage = 10;

// // //     const splitDataIntoPages = (data: any[], itemsPerPage: number) => {
// // //         const pages = [];
// // //         for (let i = 0; i < data.length; i += itemsPerPage) {
// // //             pages.push(data.slice(i, i + itemsPerPage));
// // //         }
// // //         return pages;
// // //     };

// // //     const pages = splitDataIntoPages(formData, itemsPerPage);

// // //     const userDetails = useSelector((state: any) => state.loginReducer);
// // //     const loginDetails = userDetails.loginDetails;
// // //     const { uid, recordTypeId, positionId } = useParams();
// // //     const componentRef = useRef<HTMLDivElement | null>(null);

// // //     const a4SheetStyle = {
// // //         width: '210mm',
// // //         minHeight: '297mm',
// // //         padding: '20px',
// // //         fontFamily: 'Arial, sans-serif',
// // //     };

// // //     const footerStyle: CSSProperties = {
// // //         flexShrink: 0,
// // //         display: 'flex',
// // //         flexDirection: 'column',
// // //         marginTop: '20px',
// // //     };

// // //     const tableStyle: React.CSSProperties = {
// // //         width: '100%',
// // //         borderCollapse: 'collapse',
// // //         fontSize: '12px',
// // //     };

// // //     const cellStyle = {
// // //         padding: '8px',
// // //         border: '1px solid #000',
// // //     };

// // //     const evenRowStyle = {
// // //         backgroundColor: '#f2f2f2',
// // //     };

// // //     const pageContentStyle = {
// // //         flex: '1 0 auto',
// // //     };

// // //     const tableContainerStyle = {
// // //         width: '100%',
// // //         marginBottom: '20px',
// // //     };

// // //     const tableCellStyle = {
// // //         width: '10%',
// // //         padding: '5px',
// // //     };

// // //     const contactImageStyle = {
// // //         display: 'block',
// // //         margin: '20px auto 0',
// // //         maxWidth: '75%',
// // //     };

// // //     const contactImagesStyle: CSSProperties = {
// // //         display: 'block',
// // //         margin: '20px auto 0',
// // //         maxWidth: '85%',
// // //         textAlign: 'center' as 'center',
// // //     };

// // //     const pageNumberStyle: React.CSSProperties = {
// // //         position: 'relative',
// // //         bottom: '10px',
// // //         right: '20px',
// // //         fontSize: 'small',
// // //         display: 'flex',
// // //         justifyContent: 'flex-end',
// // //     };

// // //     // Move the downloadPDF function here
// // //     // const downloadPDF = async () => {
// // //     //     if (!responseId) {
// // //     //         setErrors(["KYC ID is not defined"]);
// // //     //         return;
// // //     //     }
// // //     //     setDownloadingPDF(true);
// // //     //     try {
// // //     //         await new Promise(resolve => setTimeout(resolve, 0));
// // //     //         const pdf = new jsPDF('p', 'mm', 'a4');
// // //     //         const content = document.getElementById('pdfContent');
// // //     //         if (!content) return;
// // //     //         pdf.setFontSize(10);
// // //     //         pdf.setFont('helvetica');
// // //     //         const padding = 10;
// // //     //         const scale = 2;
// // //     //         const pageWidth = 210;
// // //     //         const pageHeight = 297;
// // //     //         const contentWidth = pageWidth - 2 * padding;
// // //     //         const contentHeight = pageHeight - 2 * padding;
// // //     //         const totalPages = content.childNodes.length;
// // //     //         for (let i = 0; i < totalPages; i++) {
// // //     //             const page = content.childNodes[i];
// // //     //             const canvas = await html2canvas(page as HTMLElement, {
// // //     //                 scale: scale,
// // //     //                 useCORS: true,
// // //     //                 logging: true,
// // //     //             });
// // //     //             const imgData = canvas.toDataURL('image/png');
// // //     //             if (i > 0) pdf.addPage();
// // //     //             pdf.addImage(imgData, 'PNG', padding, padding, contentWidth, contentHeight);
// // //     //             pdf.setLineWidth(0.2);
// // //     //             pdf.setDrawColor(0, 0, 0);
// // //     //             pdf.rect(padding, padding, contentWidth, contentHeight);
// // //     //         }
// // //     //         pdf.save('application_form.pdf');
// // //     //     } catch (error) {
// // //     //         setErrors(["Error generating PDF"]);
// // //     //     } finally {
// // //     //         setDownloadingPDF(false);
// // //     //         setDownloadCount(prevCount => prevCount + 1);
// // //     //     }
// // //     // };
// // //     useEffect(() => {
// // //         const fetchData = async (kycId: string) => {
// // //             try {
// // //                 setLoading(true);

// // //                 const customerData: CustomerData[] = await applicationfrome.getkycData(kycId);
// // //                     console.log('Selected customerData:', customerData);
// // //                 if (customerData && customerData.length > 0) {
// // //                     setFormData(customerData.map((data: CustomerData) => data.kycFormDto));
// // //                 } else {
// // //                     setErrors(["No data found"]);
// // //                 }

// // //             } catch (error) {
// // //                 setErrors(["Error fetching data"]);
// // //             } finally {
// // //                 setLoading(false);
// // //             }
// // //         };
// // //         if (kycId) {
// // //             fetchData(kycId);
// // //         }
// // //     }, [kycId]);


// // //     const downloadPDF = async () => {
// // //         setDownloadingPDF(true);
// // //         try {
// // //             await new Promise(resolve => setTimeout(resolve, 0));
// // //             const pdf = new jsPDF('p', 'mm', 'a4');
// // //             const content = document.getElementById('pdfContent');
// // //             if (!content) return;
// // //             pdf.setFontSize(10);
// // //             pdf.setFont('helvetica');
// // //             content.style.display = 'block';
// // //             const padding = 10;
// // //             const scale = 2;
// // //             const pageWidth = 210;
// // //             const pageHeight = 297;
// // //             const contentWidth = pageWidth - 2 * padding;
// // //             const contentHeight = pageHeight - 2 * padding;
// // //             const totalPages = content.childNodes.length;
// // //             for (let i = 0; i < totalPages; i++) {
// // //                 const page = content.childNodes[i];
// // //                 const canvas = await html2canvas(page as HTMLElement, {
// // //                     scale: scale,
// // //                     useCORS: true,
// // //                     logging: true,
// // //                 });
// // //                 const imgData = canvas.toDataURL('image/png');
// // //                 if (i > 0) pdf.addPage();
// // //                 pdf.addImage(imgData, 'PNG', padding, padding, contentWidth, contentHeight);
// // //                 pdf.setLineWidth(0.2);
// // //                 pdf.setDrawColor(0, 0, 0);
// // //                 pdf.rect(padding, padding, contentWidth, contentHeight);
// // //             }
// // //             pdf.save('application_form.pdf');
// // //         } catch (error) {
// // //             setErrors(["Error generating PDF"]);
// // //         } finally {
// // //             const content = document.getElementById('pdfContent');
// // //             // if (content) content.style.display = 'none';
// // //             setDownloadingPDF(false);
// // //             setDownloadCount(prevCount => prevCount + 1);
// // //         }
// // //     };

// // //     // Use useImperativeHandle to expose the downloadPDF function to parent components
// // //     useImperativeHandle(ref, () => downloadPDF);

// // //     return (
// // //         <>
// // //             <br></br>
// // //             <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
// // //                 <Container style={{ minHeight: '297mm', }}>
// // //                     <LocalizationProvider dateAdapter={AdapterDayjs}>
// // //                         <div id="pdfContent">
// // //                             {pages.map((pageContent, pageIndex) => (
// // //                                 <Paper key={pageIndex} style={{ marginBottom: '20px' }}>
// // //                                     <div ref={contentRef} style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
// // //                                         <img src={ponsunImage} alt="Ponsun" style={{ display: 'block', margin: '0 auto', maxWidth: '45%', marginBottom: '20px' }} />
// // //                                         <TableContainer>
// // //                                             <Table>
// // //                                                 <TableHead>
// // //                                                     <TableRow sx={{ fontSize: 'small' }}>
// // //                                                         <TableCell sx={{ width: '5%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Sl.no</TableCell>
// // //                                                         <TableCell sx={{ width: '60%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Question</TableCell>
// // //                                                         <TableCell sx={{ width: '30%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Answer</TableCell>
// // //                                                     </TableRow>
// // //                                                 </TableHead>
// // //                                                 <TableBody>
// // //                                                     {pageContent && pageContent.map((item, index) => (
// // //                                                         <TableRow key={index}>
// // //                                                             <TableCell sx={{ width: '10%', padding: '20px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
// // //                                                                 {index + 1 + pageIndex * itemsPerPage}
// // //                                                             </TableCell>
// // //                                                             <TableCell sx={{ width: '40%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
// // //                                                                 {item && item.name}
// // //                                                                 {item && item.description && (
// // //                                                                     <Typography variant="body2" color="textSecondary">
// // //                                                                         {item.description}
// // //                                                                     </Typography>
// // //                                                                 )}
// // //                                                             </TableCell>
// // //                                                             <TableCell>
// // //                                                                 {item && item.kycAnswerData && item.kycAnswerData.length > 0 ? item.kycAnswerData[0]?.answer : 'No answer available'}
// // //                                                                 {errors[index + pageIndex * itemsPerPage] && (
// // //                                                                     <Typography variant="caption" color="error">
// // //                                                                         {errors[index + pageIndex * itemsPerPage]}
// // //                                                                     </Typography>
// // //                                                                 )}
// // //                                                             </TableCell>
// // //                                                         </TableRow>
// // //                                                     ))}
// // //                                                 </TableBody>
// // //                                             </Table>
// // //                                         </TableContainer>
// // //                                         <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} />
// // //                                         <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}>Page : {pageIndex + 1}</div>
// // //                                     </div>
// // //                                 </Paper>
// // //                             ))}
// // //                             <div style={a4SheetStyle}>
// // //                                 <table style={tableStyle}>
// // //                                     <tbody>
// // //                                         <tr style={evenRowStyle}>
// // //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Name</strong></td>
// // //                                             <td style={{ ...cellStyle, width: '70%' }}>                     </td>
// // //                                         </tr>
// // //                                         <tr>
// // //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Designation(Principal Officer/Compliance Officer/MLRO)</strong></td>
// // //                                             <td style={{ ...cellStyle, width: '70%' }}>                            </td>
// // //                                         </tr>
// // //                                         <tr style={evenRowStyle}>
// // //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Signature</strong></td>
// // //                                             <td style={{ ...cellStyle, width: '70%' }}>                          </td>
// // //                                         </tr>
// // //                                         <tr>
// // //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Seal of the Member</strong></td>
// // //                                             <td style={{ ...cellStyle, width: '70%' }}>                                   </td>
// // //                                         </tr>
// // //                                         <tr style={evenRowStyle}>
// // //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Date</strong></td>
// // //                                             <td style={{ ...cellStyle, width: '70%' }}>                     </td>
// // //                                         </tr>
// // //                                         <tr>
// // //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Place</strong></td>
// // //                                             <td style={{ ...cellStyle, width: '70%' }}>                      </td>
// // //                                         </tr>
// // //                                     </tbody>
// // //                                 </table>
// // //                             </div>
// // //                         </div>
// // //                     </LocalizationProvider>
// // //                 </Container >
// // //             </Card >
// // //             <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px' }}></Card>
// // //         </>
// // //     );
// // // });

// // // export default Download;


// // import React, { useEffect, useState, useRef } from 'react';
// // import {
// //     Container, Table, TableBody, TableCell, TableContainer, Button, Grid, TableHead, TableRow, Paper, TextField, Snackbar,
// //     Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
// // } from '@mui/material';
// // import { Box, Typography } from '@mui/material';
// // import { Card } from 'react-bootstrap';
// // import { useParams } from 'react-router-dom';
// // import Header from '../../../layouts/header/header';
// // import ponsunImage from '../../../assets/ponsun.png';
// // import ApplicationfromeService from '../../../data/services/applicationfrom/applicationfrome-api-service';
// // import { kycForm } from '../../../data/services/applicationfrom/applicationfrome-payload';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import contactImage from '../../../assets/contact.png';
// // import { faDownload } from '@fortawesome/free-solid-svg-icons';
// // import html2canvas from 'html2canvas';
// // import { useApplicationContext } from '../Insert/ApplicationContext';
// // import { px } from 'framer-motion';
// // import jsPDF from 'jspdf';
// // import { useSelector } from 'react-redux';
// // import DocumentApiService from '../../../data/services/document/Document_api_service';
// // import avatarImage from '../../../../src/assets/Avatar.png';
// // import { Document, Page, pdfjs } from 'react-pdf';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faUserCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
// // import { Col, Image, Modal } from 'react-bootstrap';
// // import BankHeader from '../../BankReport/bankHeader';
// // import { CSSProperties } from 'react';

// // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


// // interface CustomerData {
// //     kycFormDto: kycForm;
// // };

// // const ApplicationForm = () => {

// //     const { responseId } = useApplicationContext();
// //     console.log('ApplicationForm responseId:', responseId);
// //     const { kycId } = useParams<{ kycId: string }>();
// //     const [formData, setFormData] = useState<kycForm[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [errors, setErrors] = useState<string[]>([]);
// //     const contentRef = useRef<HTMLDivElement>(null);
// //     const [downloadingPDF, setDownloadingPDF] = useState(false);
// //     const applicationfrome = new ApplicationfromeService();
// //     const [downloadCount, setDownloadCount] = useState(0);

// //     useEffect(() => {
// //         if (responseId) {
// //             console.log('responseId:', responseId);
// //         }
// //     }, [responseId]);

// //     useEffect(() => {
// //         const fetchData = async (kycId: string) => {
// //             try {
// //                 setLoading(true);
// //                 const customerData: CustomerData[] = await applicationfrome.getkycData(kycId);
// //                 if (customerData && customerData.length > 0) {
// //                     setFormData(customerData.map((data: CustomerData) => data.kycFormDto));
// //                 } else {
// //                     setErrors(["No data found"]);
// //                 }
// //             } catch (error) {
// //                 setErrors(["Error fetching data"]);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         if (kycId) {
// //             fetchData(kycId);
// //         }
// //     }, [kycId]);

// //     const itemsPerPage = 10;

// //     const splitDataIntoPages = (data: any[], itemsPerPage: number) => {
// //         const pages = [];
// //         for (let i = 0; i < data.length; i += itemsPerPage) {
// //             pages.push(data.slice(i, i + itemsPerPage));
// //         }
// //         return pages;
// //     };

// //     const pages = splitDataIntoPages(formData, itemsPerPage);




// //     const userDetails = useSelector((state: any) => state.loginReducer);
// //     const loginDetails = userDetails.loginDetails;
// //     const { uid, recordTypeId, positionId } = useParams(); // Default imgId to '1'
// //     const componentRef = useRef<HTMLDivElement | null>(null);




// //     const a4SheetStyle = {
// //         width: '210mm',
// //         minHeight: '297mm',
// //         padding: '20px',
// //         fontFamily: 'Arial, sans-serif',
// //     };

// //     const footerStyle: CSSProperties = {
// //         flexShrink: 0,
// //         display: 'flex',
// //         flexDirection: 'column',
// //         marginTop: '20px',
// //     };

// //     const tableStyle: React.CSSProperties = {
// //         width: '100%',
// //         borderCollapse: 'collapse',
// //         fontSize: '12px',
// //     };

// //     const cellStyle = {
// //         padding: '8px',
// //         border: '1px solid #000',
// //     };

// //     const evenRowStyle = {
// //         backgroundColor: '#f2f2f2',
// //     };

// //     const pageContentStyle = {
// //         flex: '1 0 auto',
// //     };

// //     const tableContainerStyle = {
// //         width: '100%',
// //         marginBottom: '20px',
// //     };

// //     const tableCellStyle = {
// //         width: '10%',
// //         padding: '5px',
// //     };

// //     const contactImageStyle = {
// //         display: 'block',
// //         margin: '20px auto 0',
// //         maxWidth: '75%',
// //     };

// //     const contactImagesStyle: CSSProperties = {
// //         display: 'block',
// //         margin: '20px auto 0',
// //         maxWidth: '85%',
// //         textAlign: 'center' as 'center',
// //     };

// //     const pageNumberStyle: React.CSSProperties = {
// //         position: 'relative',
// //         bottom: '10px',
// //         right: '20px',
// //         fontSize: 'small',
// //         display: 'flex',
// //         justifyContent: 'flex-end',
// //     };

// //     return (
// //         <>


// //             <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
// //                 <Container style={{ minHeight: '297mm', }}>
// //                     <LocalizationProvider dateAdapter={AdapterDayjs}>
// //                         <div id="pdfContent">
// //                             {pages.map((pageContent, pageIndex) => (
// //                                 <Paper key={pageIndex} style={{ marginBottom: '20px' }}>
// //                                     <div ref={contentRef} style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
// //                                         <img src={ponsunImage} alt="Ponsun" style={{ display: 'block', margin: '0 auto', maxWidth: '45%', marginBottom: '20px' }} />
// //                                         <TableContainer>
// //                                             <Table>
// //                                                 <TableHead>
// //                                                     <TableRow sx={{ fontSize: 'small' }}>
// //                                                         <TableCell sx={{ width: '5%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Sl.no</TableCell>
// //                                                         <TableCell sx={{ width: '60%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Question</TableCell>
// //                                                         <TableCell sx={{ width: '30%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Answer</TableCell>
// //                                                     </TableRow>
// //                                                 </TableHead>
// //                                                 <TableBody>
// //                                                     {pageContent && pageContent.map((item, index) => (
// //                                                         <TableRow key={index}>
// //                                                             <TableCell sx={{ width: '10%', padding: '20px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
// //                                                                 {index + 1 + pageIndex * itemsPerPage}
// //                                                             </TableCell>
// //                                                             <TableCell sx={{ width: '40%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
// //                                                                 {item && item.name}
// //                                                                 {item && item.description && (
// //                                                                     <Typography variant="body2" color="textSecondary">
// //                                                                         {item.description}
// //                                                                     </Typography>
// //                                                                 )}
// //                                                             </TableCell>
// //                                                             <TableCell>
// //                                                                 {item && item.kycAnswerData && item.kycAnswerData.length > 0 ? item.kycAnswerData[0]?.answer : 'No answer available'}
// //                                                                 {errors[index + pageIndex * itemsPerPage] && (
// //                                                                     <Typography variant="caption" color="error">
// //                                                                         {errors[index + pageIndex * itemsPerPage]}
// //                                                                     </Typography>
// //                                                                 )}
// //                                                             </TableCell>
// //                                                         </TableRow>
// //                                                     ))}
// //                                                 </TableBody>
// //                                             </Table>
// //                                         </TableContainer>


// //                                         <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} />
// //                                         <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}>Page : {pageIndex + 1}</div>
// //                                     </div>


// //                                 </Paper>


// //                             ))}

// //                             <div style={a4SheetStyle}>
// //                                 <table style={tableStyle}>
// //                                     <tbody>
// //                                         <tr style={evenRowStyle}>
// //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Name</strong></td>
// //                                             <td style={{ ...cellStyle, width: '70%' }}>                     </td>
// //                                         </tr>
// //                                         <tr>
// //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Designation(Principal Officer/Compliance Officer/MLRO)</strong></td>
// //                                             <td style={{ ...cellStyle, width: '70%' }}>                            </td>
// //                                         </tr>
// //                                         <tr style={evenRowStyle}>
// //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Signature</strong></td>
// //                                             <td style={{ ...cellStyle, width: '70%' }}>                          </td>
// //                                         </tr>
// //                                         <tr>
// //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Seal of the Member</strong></td>
// //                                             <td style={{ ...cellStyle, width: '70%' }}>                                   </td>
// //                                         </tr>
// //                                         <tr style={evenRowStyle}>
// //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Date</strong></td>
// //                                             <td style={{ ...cellStyle, width: '70%' }}>                     </td>
// //                                         </tr>
// //                                         <tr>
// //                                             <td style={{ ...cellStyle, width: '30%' }}><strong>Place</strong></td>
// //                                             <td style={{ ...cellStyle, width: '70%' }}>                      </td>
// //                                         </tr>
// //                                     </tbody>
// //                                 </table>

// //                             </div>



// //                         </div>

// //                     </LocalizationProvider>





// //                 </Container >

// //             </Card >
// //             <Card style={{ padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px' }}>




// //             </Card>

// //             {/* </Box>
// //             </Box> */}
// //         </>
// //     );
// // };

// // export default ApplicationForm;
// // import React, { useEffect, useState } from 'react';
// // import { Card, Container, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@mui/material';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import ApplicationfromeService from '../../../data/services/applicationfrom/applicationfrome-api-service';
// // import { AppFormData, QuestionType } from '../../../data/services/applicationfrom/applicationfrome-payload';

// // function ApplicationForm() {
// //     const [formData, setFormData] = useState<AppFormData>({
// //         applicantFormDto: {
// //             id: 0,
// //             name: '',
// //             numberOfPrint: 0,
// //             applicantFormDetailsData: [],
// //         },
// //     });
// //     const [fetchedQuestions, setFetchedQuestions] = useState<QuestionType[]>([]);
// //     const [sessionId, setSessionId] = useState<number | null>(null); // Assuming sessionId is a number

// //     const applicationfrome = new ApplicationfromeService();

// //     useEffect(() => {
// //         fetchQuestions();


// //         setSessionId(sessionId);
// //     }, []);

// //     const fetchQuestions = async () => {
// //         const applicationTypeId = 1;
// //         const accountTypeId = 2;
// //         try {
// //             const questions = await applicationfrome.getQuestionTypes(applicationTypeId, accountTypeId);
// //             setFetchedQuestions(questions);
// //         } catch (error) {
// //             console.error('Error fetching questions:', error);
// //         }
// //     };

// //     const handleSave = async () => {
// //         try {
// //             // Update numberOfPrint
// //             const updatedFormData = { ...formData, applicantFormDto: { ...formData.applicantFormDto, numberOfPrint: formData.applicantFormDto.numberOfPrint + 1 } };
// //             setFormData(updatedFormData);

// //             // Store Form Data
// //             const response = await applicationfrome.Apllicationinsert(updatedFormData);

// //             console.log('Form saved:', response);
// //         } catch (error) {
// //             console.error('Error saving form:', error);
// //         }
// //     };

// //     return (
// //         <Container>
// //             <Card>
// //                 <TableContainer component={Paper}>
// //                     <Table>
// //                         <TableHead>
// //                             <TableRow>
// //                                 <TableCell>Sl.no</TableCell>
// //                                 <TableCell>Question</TableCell>
// //                                 <TableCell>Answer</TableCell>
// //                             </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                             {fetchedQuestions.map((questionType, index) => (
// //                                 <TableRow key={questionType.questionDto.id}>
// //                                     <TableCell>{index + 1}</TableCell>
// //                                     <TableCell>{questionType.questionDto.name}</TableCell>
// //                                     <TableCell>
// //                                         {questionType.questionDto.answerTypeData.length > 0 && questionType.questionDto.ansTypeId === 2 ? (
// //                                             <FormControl fullWidth>
// //                                                 <Select>
// //                                                     {questionType.questionDto.answerTypeData.map((answer) => (
// //                                                         <MenuItem key={answer.id} value={answer.id}>
// //                                                             {answer.name}
// //                                                         </MenuItem>
// //                                                     ))}
// //                                                 </Select>
// //                                             </FormControl>
// //                                         ) : (
// //                                             <TextField fullWidth variant="outlined" />
// //                                         )}
// //                                     </TableCell>
// //                                 </TableRow>
// //                             ))}
// //                         </TableBody>
// //                     </Table>
// //                 </TableContainer>
// //                 <Button variant="contained" onClick={handleSave}>Save</Button>
// //                 {sessionId && <div>Session ID: {sessionId}</div>}
// //             </Card>
// //         </Container>
// //     );
// // }

// // export default ApplicationForm;

// import React, { useEffect, useRef, useState } from 'react';
// import { Box, TextField, Button, Grid, InputLabel, FormControl, Select, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
// import Header from '../../../layouts/header/header';
// import { Card } from 'react-bootstrap';
// import ApplicationfromeService from '../../../data/services/applicationfrom/applicationfrome-api-service';
// import { Type, AccountType, QuestionType, AppFormData, kycForm } from '../../../data/services/applicationfrom/applicationfrome-payload';
// import { SelectChangeEvent } from '@mui/material/Select';
// import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs, { Dayjs } from 'dayjs';
// import contactImage from '../../../assets/contact.png';

// import { useApplicationContext } from './ApplicationContext';
// import DocumentApiService from '../../../data/services/document/Document_api_service';
// import './Form.css';




// function ApplicationForm() {


//     const [formData, setFormData] = useState<AppFormData>({

//         applicantFormDto: {
//             id: 0,
//             name: '',
//             numberOfPrint: 0,
//             applicantFormDetailsData: [],
//         },
//     });

//     const documentApiService = new DocumentApiService();

//     const [typeOptions, setTypeOptions] = useState<Type[]>([]);
//     const [accountTypeOptions, setAccountTypeOptions] = useState<AccountType[]>([]);
//     const [fetchedQuestions, setFetchedQuestions] = useState<QuestionType[]>([]);
//     const [errors, setErrors] = useState<string[]>([]);
//     const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
//     const [dataFetched, setDataFetched] = useState(false);
//     const [downloadingPDF, setDownloadingPDF] = useState(false);
//     const applicationfrome = new ApplicationfromeService();
//     const { setResponseId } = useApplicationContext();
//     const [downloadCount, setDownloadCount] = useState(0);
//     const [isFormDataUpdated, setIsFormDataUpdated] = useState(false);
//     const [formFullyRendered, setFormFullyRendered] = useState(false);
//     const [showDownloadButton, setShowDownloadButton] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [formDatas, setFormDatas] = useState<kycForm[]>([]);
//     const contentRef = useRef<HTMLDivElement>(null);



//     useEffect(() => {

//         fetchQuestions()
//     }, []);


//     const fetchQuestions = async () => {
//         const applicationTypeId = 1; // Manually setting applicationTypeId to 1
//         const accountTypeId = 2; // Manually setting accountTypeId to 2
//         try {
//             const questions = await applicationfrome.getQuestionTypes(applicationTypeId, accountTypeId);
//             setFetchedQuestions(questions);
//             setDataFetched(true);
//             setFormData(prevState => {
//                 const updatedFormData = {
//                     ...prevState,
//                     applicantFormDto: {
//                         ...prevState.applicantFormDto,
//                         applicantFormDetailsData: questions.map((question: { questionDto: { id: any; ansTypeId: any; }; }) => ({
//                             id: 0,
//                             kycId: 0,
//                             accountTypeId,
//                             applicationTypeId,
//                             questionId: question.questionDto.id,
//                             ansTypeId: question.questionDto.ansTypeId,
//                             answer: '', // Initialize answer field
//                             score: 0, // Initialize score field
//                             uid: 0,
//                             subQuestionId: 0
//                         }))
//                     }
//                 };
//                 setIsFormDataUpdated(true);
//                 return updatedFormData;
//             });
//             console.log('formData:', questions);

//             setErrors(Array(questions.length).fill(''));
//             setFormFullyRendered(true);
//         } catch (error) {
//             console.error("Error fetching questions:", error);
//         }
//     };





//     const handleAnswerChange = (index: number, value: string) => {
//         const question = fetchedQuestions[index];
//         const answerTypeData = question.questionDto.answerTypeData.find(answer => answer.name === value);

//         const updatedFormDetails = formData.applicantFormDto.applicantFormDetailsData.map((item, idx) =>
//             idx === index ? {
//                 ...item,
//                 answer: value,
//                 score: answerTypeData ? answerTypeData.score : item.score,
//                 questionId: answerTypeData ? answerTypeData.questionId : item.questionId
//             } : item
//         );
//         setFormData({
//             ...formData,
//             applicantFormDto: {
//                 ...formData.applicantFormDto,
//                 applicantFormDetailsData: updatedFormDetails
//             }
//         });
//     };

//     const handleDropdownChange = (index: number, value: string) => {
//         const question = fetchedQuestions[index];
//         const answerTypeData = question.questionDto.answerTypeData.find(answer => answer.name === value);

//         const updatedFormDetails = formData.applicantFormDto.applicantFormDetailsData.map((item, idx) =>
//             idx === index ? {
//                 ...item,
//                 answer: value,
//                 score: answerTypeData ? answerTypeData.score : item.score,
//                 questionId: answerTypeData ? answerTypeData.questionId : item.questionId
//             } : item
//         );
//         setFormData({
//             ...formData,
//             applicantFormDto: {
//                 ...formData.applicantFormDto,
//                 applicantFormDetailsData: updatedFormDetails
//             }
//         });
//     };






//     const itemsPerPage = 10;

//     const splitDataIntoPages = (data: any[], itemsPerPage: number) => {
//         const pages = [];
//         for (let i = 0; i < data.length; i += itemsPerPage) {
//             pages.push(data.slice(i, i + itemsPerPage));
//         }
//         return pages;
//     };

//     const pages = splitDataIntoPages(fetchedQuestions, itemsPerPage);

//     const itemsPerPages = 12;

//     const splitDataIntoPage = (data: any[], itemsPerPages: number) => {
//         const pageView = [];
//         for (let i = 0; i < data.length; i += itemsPerPages) {
//             pageView.push(data.slice(i, i + itemsPerPages));
//         }
//         return pageView;
//     };

//     const pageView = splitDataIntoPage(formDatas, itemsPerPages);
//     const downloadPDFRef = React.useRef<() => void | null>(null);

//     const handleDownloadClick = () => {
//         if (downloadPDFRef.current) {
//             downloadPDFRef.current();
//         }
//     };

//     const [imageURL, setImageURL] = useState('');


//     const handleSubmit = async () => {
//         // Check for any errors in the form
//         const hasErrors = errors.some(error => error !== '');
//         if (hasErrors) {
//             return;
//         }

//         try {
//             // Get responseId from session storage
//             const responseId = sessionStorage.getItem('responseId');
//             if (!responseId) {
//                 console.error('No responseId found in session storage');
//                 return;
//             }

//             const responseIdNumber = Number(responseId);
//             if (isNaN(responseIdNumber)) {
//                 console.error('Invalid responseId found in session storage');
//                 return;
//             }

//             const updatedNumberOfPrint = formData.applicantFormDto.numberOfPrint + 1;

//             // Create updated form data
//             const updatedFormData = {
//                 ...formData,
//                 applicantFormDto: {
//                     ...formData.applicantFormDto,
//                     id: responseIdNumber,
//                     numberOfPrint: updatedNumberOfPrint,
//                 },
//             };

//             const response = await applicationfrome.Apllicationinsert(updatedFormData);
//             console.log('Updated formData:', updatedFormData);
//             console.log('Original formData:', formData.applicantFormDto);

//             // If response is valid and has an id
//             if (response && response.id) {
//                 if (!sessionStorage.getItem('responseId')) {
//                     console.log('Response ID:', response.id);
//                     sessionStorage.setItem('responseId', response.id.toString());
//                     setResponseId(response.id);
//                 }

//                 // Update the state and UI accordingly
//                 setDataFetched(true);
//                 setShowDownloadButton(true);
//                 setFormData(updatedFormData);
//             }
//         } catch (error) {
//             console.error("Error submitting form:", error);
//         }
//     };

//     return (
//         <>

//             <Card style={{ boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
//                 <Container style={{ width: '274mm', minHeight: '297mm', marginTop: '2%' }}>
//                     <LocalizationProvider dateAdapter={AdapterDayjs}>


//                         {pages.map((pageContent, pageIndex) => (
//                             <Paper key={pageIndex} style={{ marginBottom: '20px' }}>
//                                 <div style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '20px' }}>
//                                     <div>
//                                         {imageURL && (
//                                             <img
//                                                 src={imageURL}
//                                                 alt="Ponsun"
//                                                 style={{ display: 'block', margin: '0 auto', maxWidth: '35%', height: 'auto', maxHeight: '200px', marginBottom: '20px' }}
//                                             />
//                                         )}
//                                     </div>
//                                     <TableContainer>
//                                         <Table>
//                                             <TableHead>
//                                                 <TableRow sx={{ fontSize: 'small' }}>
//                                                     <TableCell sx={{ width: '10%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Sl.no</TableCell>
//                                                     <TableCell sx={{ width: '40%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Question</TableCell>
//                                                     <TableCell sx={{ width: '50%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Answer</TableCell>
//                                                 </TableRow>
//                                             </TableHead>
//                                             <TableBody>
//                                                 {pageContent.map((item, index) => (
//                                                     <React.Fragment key={index}>
//                                                         <TableRow>
//                                                             <TableCell sx={{ width: '10%', padding: '20px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
//                                                                 {index + 1 + pageIndex * itemsPerPage}
//                                                             </TableCell>
//                                                             <TableCell sx={{ width: '40%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
//                                                                 {item.questionDto.name}
//                                                                 {item.questionDto.ansTypeId === 2 && (
//                                                                     <Typography variant="body2" color="textSecondary">
//                                                                         {item.questionDto.description}
//                                                                     </Typography>
//                                                                 )}
//                                                             </TableCell>
//                                                             <TableCell sx={{ width: '50%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>
//                                                                 {item.questionDto.ansTypeId === 2 ? (
//                                                                     <Select
//                                                                         style={{ fontSize: 'small' }}
//                                                                         fullWidth
//                                                                         size='small'
//                                                                         value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.questionId === item.questionDto.id)?.answer || ''}
//                                                                         onChange={(e) => handleDropdownChange(index + pageIndex * itemsPerPage, e.target.value)}
//                                                                     >
//                                                                         {item.questionDto.answerTypeData.map((answer: { name: string }, answerIndex: React.Key) => (
//                                                                             <MenuItem
//                                                                                 style={{ height: '2rem', fontSize: '0.75rem' }}
//                                                                                 key={answerIndex}
//                                                                                 value={answer.name}
//                                                                             >
//                                                                                 {answer.name}
//                                                                             </MenuItem>
//                                                                         ))}
//                                                                     </Select>
//                                                                 ) : (
//                                                                     <TextField
//                                                                         sx={{ fontSize: 'x-small' }}
//                                                                         fullWidth
//                                                                         size='small'
//                                                                         autoComplete='off'
//                                                                         multiline
//                                                                         value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.questionId === item.questionDto.id)?.answer || ''}
//                                                                         onChange={(e) => handleAnswerChange(index + pageIndex * itemsPerPage, e.target.value)}
//                                                                     />
//                                                                 )}
//                                                                 {errors[index + pageIndex * itemsPerPage] && (
//                                                                     <Typography variant="caption" color="error">
//                                                                         {errors[index + pageIndex * itemsPerPage]}
//                                                                     </Typography>
//                                                                 )}
//                                                             </TableCell>
//                                                         </TableRow>


//                                                     </React.Fragment>
//                                                 ))}
//                                             </TableBody>
//                                         </Table>
//                                     </TableContainer>
//                                     <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} />
//                                     <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}>Page : {pageIndex + 1}</div>
//                                 </div>
//                                 <h3>Update: {formData.applicantFormDto.numberOfPrint}</h3>
//                             </Paper>
//                         ))}



//                         {dataFetched && isFormDataUpdated && formFullyRendered && (
//                             <div>
//                                 {formData.applicantFormDto.applicantFormDetailsData[0]?.applicationTypeId === 1 &&
//                                     formData.applicantFormDto.applicantFormDetailsData[0]?.accountTypeId === 2 && (
//                                         <div style={{ display: 'flex', alignItems: 'center' }}>
//                                             <div className="arroww" style={{ marginRight: '10px' }}>
//                                                 <span style={{ textAlign: 'center' }}>Step 1:</span>
//                                             </div>
//                                             <button style={{ width: '12%' }} className='btn btn-primary btn-sm' onClick={() => { handleSubmit() }}>Save</button>



//                                             <br />
//                                         </div>
//                                     )}


//                             </div>
//                         )}


//                         <br></br>
//                     </LocalizationProvider>
//                 </Container>
//             </Card>
//             <Card>






//             </Card>

//         </>
//     );
// }

// export default ApplicationForm;
