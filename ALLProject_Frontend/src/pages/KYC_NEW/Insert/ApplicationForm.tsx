// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Grid,
//   InputLabel,
//   FormControl,
//   Select,
//   MenuItem,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Snackbar,
// } from "@mui/material";
// import Header from "../../../layouts/header/header";
// import { Card } from "react-bootstrap";
// import ApplicationfromeService from "../../../data/services/kyc/applicationfrom/applicationfrome-api-service";
// import {
//   Type,
//   AccountType,
//   QuestionType,
//   AppFormData,
//   kycForm,
//   AnswerTypeData,
//   ApplicantFormDetailsData,
// } from "../../../data/services/kyc/applicationfrom/applicationfrome-payload";
// import { SelectChangeEvent } from "@mui/material/Select";
// import {
//   Container,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs, { Dayjs } from "dayjs";
// import contactImage from "../../../assets/contact.png";
// import ponsunImage from "../../../assets/ponsun.png";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faDownload, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
// // import { useApplicationContext } from "./ApplicationContext";
// import DocumentApiService from "../../../data/services/document/Document_api_service";
// import "./Form.css";
// import { IconButton } from "@mui/material";
// import { CSSProperties } from "react";
// import Download from "./Download";
// import { Document, Page, pdfjs } from "react-pdf";
// import { useLocation, useParams } from "react-router-dom";
// import MuiAlert from "@mui/material/Alert";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   saveQuestionnaire,
// } from "./state/save-application-action";
// import { useApplicationContext } from "../../kyc/Insert/ApplicationContext";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pdf/dist/esm/Page/TextLayer.css";
// import CloseIcon from '@mui/icons-material/Close';
// import Loader from "../../loader/loader";
// import '../../CommonStyle/Style.css'
// import Autocomplete from "@mui/lab/Autocomplete";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// interface Image {
//   name: string;
//   uploading: boolean;
//   uploadSuccess: boolean;
// }

// interface CustomerData {
//   kycFormDto: kycForm;
// }
// const ApplicationForm = (props: any) => {
//   const [formData, setFormData] = useState<AppFormData>({
//     applicantFormDto: {
//       id: 0,
//       name: "",
//       numberOfPrint: 0,
//       isCompleted: 0,
//       isScreening: 0,
//       applicantFormDetailsData: [],
//     },
//   });
//   const initialImageState: Image = {
//     name: "",
//     uploading: false,
//     uploadSuccess: false,
//   };

//   const documentApiService = new DocumentApiService();

//   const [images, setImages] = useState<Image[]>([initialImageState]);
//   const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [typeOptions, setTypeOptions] = useState<Type[]>([]);
//   const [accountTypeOptions, setAccountTypeOptions] = useState<AccountType[]>(
//     []
//   );
//   const [fetchedQuestions, setFetchedQuestions] = useState<QuestionType[]>([]);
//   const [errors, setErrors] = useState<string[]>([]);
//   const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
//   const [dataFetched, setDataFetched] = useState(false);
//   const [downloadingPDF, setDownloadingPDF] = useState(false);
//   const applicationfrome = new ApplicationfromeService();
//   const { setResponseId } = useApplicationContext();
//   const [downloadCount, setDownloadCount] = useState(0);
//   const [isFormDataUpdated, setIsFormDataUpdated] = useState(false);
//   const [formFullyRendered, setFormFullyRendered] = useState(false);
//   const [showDownloadButton, setShowDownloadButton] = useState(false);
//   const [showSaveBtn, setShowSaveBtn] = useState(true);

//   // const [loading, setLoading] = useState(true);
//   const [formDatas, setFormDatas] = useState<kycForm[]>([]);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   // const [saveClicked, setSaveClicked] = useState(true);
//   const [saveClicked, setSaveClicked] = useState(false);
//   const [downlodClicked, setDownlodClicked] = useState(false);
//   const [signUploadBtnClicked, setSignUploadBtnClicked] = useState(false);
//   const [viewBtnClicked, setViewBtnClicked] = useState(false);
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
//   const [isErrorOpen, setIsErrorOpen] = useState(false);
//   const [isLevelcasedetailsOpen, setIsLevelcasedetailsOpen] = useState(false);
//   const [isUploadSectionOpen, setIsUploadSectionOpen] = useState(false); // New state to manage upload section visibility
//   const [showInputBox, setShowInputBox] = useState<{ [key: number]: boolean }>(
//     {}
//   );
//   const [additionalAnswers, setAdditionalAnswers] = useState<{
//     [key: number]: string;
//   }>({});
//   const kycApplication = useSelector(
//     (state: any) => state.kycApplication?.saveApplicationReducer
//   );
//   console.log("kycApplication", kycApplication);
//   const dispatch = useDispatch();
//   // const [noOfPrint, setNoOfPrint] = useState(0);
//   const { state } = useLocation();
//   const applicationTypeId = 1;//state.applicationTypeId;
//   const accountTypeId = 2; //state.accountTypeId;
//   const [customerdata, setcustomerData] = useState<kycForm[]>([]);
//   const [pageView, setPageView] = useState<any[]>([]);
//   const [pages, setPages] = useState<any[]>([]);
//   const [noOfPrint, setNoOfPrint] = useState<number>(formData.applicantFormDto.numberOfPrint || 1);
//   const responseId = sessionStorage.getItem("responseId");
//   const [loading, setLoading] = useState(false);
//   const [printNumber, setPrintNumber] = useState<string>(''); // State for print number


//   // useEffect(() => {
//   //   fetchType();
//   //   fetchQuestions(props.questionData);
//   // }, [props.questionData]);

//   const a4SheetStyle = {
//     width: "210mm",
//     minHeight: "297mm",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   };

//   const footerStyle: CSSProperties = {
//     flexShrink: 0,
//     display: "flex",
//     flexDirection: "column",
//     marginTop: "20px",
//   };

//   // const footerStyle: CSSProperties = {
//   //   position: 'absolute',
//   //   bottom: 0,
//   //   left: 0,
//   //   right: 0,
//   //   display: 'flex',
//   //   flexDirection: 'column',
//   //   marginTop: '20px',
//   // };
//   const tableStyle: React.CSSProperties = {
//     width: "100%",
//     borderCollapse: "collapse",
//     fontSize: "12px",
//   };

//   const cellStyle = {
//     padding: "8px",
//     border: "1px solid #000",
//   };

//   const evenRowStyle = {
//     backgroundColor: "#f2f2f2",
//   };

//   const pageContentStyle = {
//     flex: "1 0 auto",
//   };

//   const tableContainerStyle = {
//     width: "100%",
//     marginBottom: "20px",
//   };

//   const tableCellStyle = {
//     width: "10%",
//     padding: "5px",
//   };

//   const contactImageStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     maxWidth: "75%",
//   };

//   const contactImagesStyle: CSSProperties = {
//     display: "block",
//     margin: "20px auto 0",
//     maxWidth: "85%",
//     textAlign: "center" as "center",
//   };

//   const pageNumberStyle: React.CSSProperties = {
//     position: "relative",
//     bottom: "10px",
//     right: "20px",
//     fontSize: "small",
//     display: "flex",
//     justifyContent: "flex-end",
//   };

//   const a4SheetStyles = {
//     // width: "270mm",
//     // minHeight: '297mm',
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   };

//   const tableStyles: React.CSSProperties = {
//     width: "100%",
//     borderCollapse: "collapse",
//     fontSize: "12px",
//   };

//   const evenRowStyles = {
//     backgroundColor: "#f2f2f2",
//   };
//   useEffect(() => {
//     if (loading) {
//       document.body.classList.add('blur');
//     } else {
//       document.body.classList.remove('blur');
//     }
//   }, [loading]);

//   const fetchData = async (kycId: any, questions: any) => {
//     try {
//       setLoading(true);
//       const customerData: any[] = await applicationfrome.getkycData(kycId);
//       console.log("getfn:", customerData)
//       const response = await applicationfrome.getPrintNumber(responseId); // Ensure responseId is defined
//       setPrintNumber(response); // Set the print number in state
//       console.log("Print Number:", response);
//       setcustomerData(customerData);
//       updateUiWithSavedData(questions, customerData);
//       if (questions[0].questionDto) {
//         dispatch(saveQuestionnaire(questions));
//       }
//     } catch (error) {
//       setErrors(["Error fetching data"]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showSuccessMessage = (message: string) => {
//     setSuccessMessage(message);
//     setIsSuccessOpen(true);
//     setTimeout(() => {
//       setIsSuccessOpen(false);
//       setSuccessMessage("");
//     }, 1000);
//   };

//   const showErrorMessage = (message: string) => {
//     setErrorMessage(message);
//     setIsErrorOpen(true);
//   };
//   const itemsPerPagePdf = 12;
//   const itemsPerPage = 10;


//   useEffect(() => {
//     // setFetchedQuestions([]);
//     fetchQuestions(kycApplication);
//     setDataFetched(true);
//     splitDataIntoPage(kycApplication, itemsPerPagePdf);
//     splitDataIntoPages(kycApplication, itemsPerPage);

//   }, [kycApplication]);

//   const splitDataIntoPages = (data: any[], itemsPerPage: number) => {
//     if (!data) {
//       return;
//     }
//     const pages = [];
//     for (let i = 0; i < data.length; i += itemsPerPage) {
//       pages.push(data.slice(i, i + itemsPerPage));
//     }
//     setPages([...pages]);

//   };

//   const splitDataIntoPage = (data: any[], itemsPerPages: number) => {
//     if (!data) {
//       return;
//     }
//     const pageView = [];
//     for (let i = 0; i < data.length; i += itemsPerPages) {
//       pageView.push(data.slice(i, i + itemsPerPages));
//     }
//     setPageView([...pageView]);
//     return pageView;
//   };

//   console.log("pageView", pageView);

//   // sessionStorage.setItem('responseId', responseId);
//   console.log("kyc form responseId:", responseId);
//   useEffect(() => {
//     if (responseId || props.kycId) {
//       setShowSaveBtn(true);
//       // setSaveClicked(true);
//       fetchData(parseInt(responseId || props.kycId, 10), kycApplication);
//       console.log("Declaration responseId:", responseId);

//       setImages((prevImages) =>
//         prevImages.map((image) => ({
//           ...image,
//           kycId: parseInt(responseId || props.kycId, 10),
//         }))
//       );
//     }
//     if (props.kycId) {
//       setShowSaveBtn(true);
//       // setSaveClicked(false);
//     }
//   }, [responseId]);

//   const fetchQuestions = async (data?: any) => {
//     try {
//       setFetchedQuestions([...data]);
//       setDataFetched(true);
//       setErrors(Array(kycApplication.length).fill(""));
//       setFormFullyRendered(true);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//     }
//   };


//   const handleAnswerChange = (
//     index: number,
//     value: string,
//     isSubQuestion: boolean,
//     subQuestionId: number | null = null,
//   ) => {
//     const updatedList = fetchedQuestions.map((item: any, idx) => {
//       if (index === idx) {
//         if (
//           !item.questionDto.multiQuestion &&
//           item.questionDto.answerTypeData.length > 0
//         ) {
//           item.questionDto.selectedValue = value;
//           item.questionDto.textValue = value;
//           if (value === 'Under Process') {
//             setShowInputBox((prev) => ({ ...prev, [index]: true }));
//           } else {
//             setShowInputBox((prev) => ({ ...prev, [index]: false }));
//           }
//           return { ...item };
//         }
//         if (isSubQuestion && item.questionDto.subQuestionTypeData.length > 0) {
//           let subQuestion: any[] = item.questionDto.subQuestionTypeData;
//           for (let i = 0; i < subQuestion.length; i++) {
//             if (subQuestion[i].id == subQuestionId) {
//               subQuestion[i].textValue = value;
//             }
//           }
//           return { ...item };
//         } else {
//           item.questionDto.textValue = value;
//           item.questionDto.selectedValue = value;
//           return { ...item };
//         }
//       }
//       return item;
//     });

//     setFetchedQuestions(updatedList);
//     dispatch(saveQuestionnaire(updatedList));
//   };
//   // const constructSaveApplicationFormdata = () => {
//   //   let payload: AppFormData = {
//   //     applicantFormDto: {
//   //       id: props.kycId || responseId ? props.kycId || responseId : 0,
//   //       name: "",
//   //       numberOfPrint: noOfPrint,
//   //       isCompleted: 0,
//   //       isScreening: 0, // Add this line
//   //       applicantFormDetailsData: [],
//   //     },
//   //   };

//   //   let applicantFormDetailsData: ApplicantFormDetailsData[] = [];
//   //   console.log('fetchedQuestions final ======>', fetchedQuestions);

//   //   for (let i = 0; i < fetchedQuestions.length; i++) {
//   //     let question: any = fetchedQuestions[i].questionDto;
//   //     let applicantForm: any = {};

//   //     applicantForm.id = question.id;
//   //     applicantForm.kycId = props.kycId || responseId ? props.kycId || responseId : 0;
//   //     applicantForm.accountTypeId = question.accountTypeId;
//   //     applicantForm.applicationTypeId = question.applicationTypeId;
//   //     applicantForm.questionId = question.id;
//   //     applicantForm.subQuestionId = 0;
//   //     applicantForm.ansTypeId = question.ansTypeId;
//   //     applicantForm.isSubAnswer = 0;
//   //     applicantForm.answer = question.textValue ? question.textValue : question.selectedValue;
//   //     applicantForm.score = question.score ? question.score : 0;
//   //     applicantForm.uid = 0;
//   //     applicantForm.euid = 0;
//   //     applicantForm.ansId = null;
//   //     applicantForm.isScreening = 0; // Add isScreening here
//   //     if (question.selectedValue && question.id === 1) {
//   //       console.log("question.name:", question.selectedValue);
//   //       payload.applicantFormDto.name = question.selectedValue ?? "";
//   //     }
//   //     applicantFormDetailsData.push(applicantForm);

//   //     if (question.answerTypeData.length > 0) {
//   //       for (let j = 0; j < question.answerTypeData.length; j++) {
//   //         if (question.answerTypeData[j].name === question.selectedValue) {
//   //           applicantForm.ansId = question.answerTypeData[j].id;
//   //           applicantForm.score = question.answerTypeData[j].score || null;
//   //           applicantForm.uid = question.answerTypeData[j].uid;
//   //           applicantForm.euid = question.answerTypeData[j].euid;
//   //           break;
//   //         }
//   //       }
//   //     }

//   //     applicantFormDetailsData.push({ ...applicantForm });

//   //     if (question.subQuestionTypeData.length > 0) {
//   //       for (let k = 0; k < question.subQuestionTypeData.length; k++) {
//   //         console.error(question.subQuestionTypeData[k]);
//   //         let subApplicantForm = { ...applicantForm };
//   //         subApplicantForm.kycId = props.kycId || responseId ? props.kycId || responseId : 0;
//   //         subApplicantForm.score = question.score || 0;
//   //         subApplicantForm.uid = 0;
//   //         subApplicantForm.euid = 0;
//   //         subApplicantForm.id = 0;
//   //         subApplicantForm.isSubAnswer = 1;
//   //         subApplicantForm.subQuestionId = question.subQuestionTypeData[k].id;
//   //         subApplicantForm.answer = question.subQuestionTypeData[k].textValue;
//   //         subApplicantForm.accountTypeId = question.subQuestionTypeData[k].accountTypeId;
//   //         subApplicantForm.applicationTypeId = question.subQuestionTypeData[k].applicationTypeId;
//   //         subApplicantForm.questionId = question.subQuestionTypeData[k].questionId;
//   //         subApplicantForm.ansTypeId = question.subQuestionTypeData[k].ansTypeId;
//   //         subApplicantForm.ansId = question.subQuestionTypeData[k].id;
//   //         subApplicantForm.isScreening = 0; // Add isScreening here
//   //         applicantFormDetailsData.push(subApplicantForm);
//   //         console.error(applicantForm);
//   //       }
//   //     }
//   //   }

//   //   payload.applicantFormDto.applicantFormDetailsData = applicantFormDetailsData;
//   //   return payload;
//   // };
//   const constructSaveApplicationFormdata = () => {
//     let payload: AppFormData = {
//       applicantFormDto: {
//         id: props.kycId || responseId ? props.kycId || responseId : 0,
//         name: "",
//         numberOfPrint: noOfPrint,
//         isCompleted: 0,
//         isScreening: 0, // Add this line
//         applicantFormDetailsData: [],
//       },
//     };

//     let applicantFormDetailsData: ApplicantFormDetailsData[] = [];
//     console.log('fetchedQuestions final ======>', fetchedQuestions);

//     for (let i = 0; i < fetchedQuestions.length; i++) {
//       let question: any = fetchedQuestions[i].questionDto;
//       let applicantForm: any = {};

//       applicantForm.id = question.id;
//       applicantForm.kycId = props.kycId || responseId ? props.kycId || responseId : 0;
//       applicantForm.accountTypeId = question.accountTypeId;
//       applicantForm.applicationTypeId = question.applicationTypeId;
//       applicantForm.questionId = question.id;
//       applicantForm.subQuestionId = 0;
//       applicantForm.ansTypeId = question.ansTypeId;
//       applicantForm.isSubAnswer = 0;
//       applicantForm.answer = question.textValue ? question.textValue : question.selectedValue;
//       applicantForm.score = question.score ? question.score : 0;
//       applicantForm.uid = 0;
//       applicantForm.euid = 0;
//       applicantForm.ansId = null;
//       applicantForm.isScreening = 0; // Add isScreening here

//       if (question.selectedValue && question.id === 1) {
//         console.log("question.name:", question.selectedValue);
//         payload.applicantFormDto.name = question.selectedValue ?? "";
//       }

//       applicantFormDetailsData.push(applicantForm);

//       if (question.answerTypeData.length > 0) {
//         for (let j = 0; j < question.answerTypeData.length; j++) {
//           if (question.answerTypeData[j].name === question.selectedValue) {
//             applicantForm.ansId = question.answerTypeData[j].id;
//             applicantForm.score = question.answerTypeData[j].score || null;
//             applicantForm.uid = question.answerTypeData[j].uid;
//             applicantForm.euid = question.answerTypeData[j].euid;
//             break;
//           }
//         }
//       }

//       // applicantFormDetailsData.push({ ...applicantForm });

//       if (question.subQuestionTypeData.length > 0) {
//         for (let k = 0; k < question.subQuestionTypeData.length; k++) {
//           console.error(question.subQuestionTypeData[k]);
//           let subApplicantForm = { ...applicantForm };
//           subApplicantForm.kycId = props.kycId || responseId ? props.kycId || responseId : 0;
//           subApplicantForm.score = question.score || 0;
//           subApplicantForm.uid = 0;
//           subApplicantForm.euid = 0;
//           subApplicantForm.id = 0;
//           subApplicantForm.isSubAnswer = 1;
//           subApplicantForm.subQuestionId = question.subQuestionTypeData[k].id;
//           subApplicantForm.answer = question.subQuestionTypeData[k].textValue;
//           subApplicantForm.accountTypeId = question.subQuestionTypeData[k].accountTypeId;
//           subApplicantForm.applicationTypeId = question.subQuestionTypeData[k].applicationTypeId;
//           subApplicantForm.questionId = question.subQuestionTypeData[k].questionId;
//           subApplicantForm.ansTypeId = question.subQuestionTypeData[k].ansTypeId;
//           subApplicantForm.ansId = question.subQuestionTypeData[k].id;
//           subApplicantForm.isScreening = 0; // Add isScreening here
//           applicantFormDetailsData.push(subApplicantForm);
//           console.error(applicantForm);
//         }
//       }
//     }

//     payload.applicantFormDto.applicantFormDetailsData = applicantFormDetailsData;
//     return payload;
//   };


//   const updateUiWithSavedData = async (
//     questions: any[],
//     customerData: kycForm[]
//   ) => {
//     if (customerData && customerData.length > 0 && questions) {
//       console.error('customerData==========>>>', customerData);
//       console.error('questions==========>>>', questions);

//       for (let i = 0; i < questions.length; i++) {
//         let question: any = questions[i].questionDto;
//         let customerDataQuestion: any = customerData.find(
//           (item) => item.kycFormDto.id === question.id
//         );
//         if (customerDataQuestion) {
//           let value = customerDataQuestion.kycFormDto.kycAnswerData[0]?.answer;
//           if (question.answerTypeData.length > 0) {
//             for (let j = 0; j < question.answerTypeData.length; j++) {
//               if (question.answerTypeData[j].name == value) {
//                 question["selectedValue"] = question.answerTypeData[j].name;
//                 break;
//               }
//             }
//           }

//           if (question.subQuestionTypeData.length > 0) {
//             for (let k = 0; k < question.subQuestionTypeData.length; k++) {
//               let customerDataSubQuestion: any = customerDataQuestion.kycFormDto.kycSubQueFormData.find(
//                 (item: any) => item.subQuestionId === question.subQuestionTypeData[k].id
//               );
//               console.error('question.subQuestionTypeData[k]======>>>', question.subQuestionTypeData[k]);

//               if (question.subQuestionTypeData[k]?.name == customerDataSubQuestion?.name) {
//                 question.subQuestionTypeData[k]["selectedValue"] = customerDataSubQuestion.kycAnswerData[0].answer;
//                 question.subQuestionTypeData[k]["textValue"] = customerDataSubQuestion.kycAnswerData[0].answer;
//               }
//             }
//           }

//           else {
//             question["textValue"] = value;
//           }
//         }
//       }

//     } else {
//       setErrors([""]);
//     }
//   };

//   const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
//     if (event) {
//       event.preventDefault();
//     }
//     const nameQuestion = fetchedQuestions
//       .flatMap(question => question.questionDto)
//       .find((q: { name: string; }) => q.name === "Name");

//     const nameValue = nameQuestion ? nameQuestion.selectedValue : null;
//     if (!nameValue || nameValue.trim() === "") {
//       showErrorMessage("Name is required.");
//       return;
//     }
//     const hasErrors = errors.some((error) => error !== "");
//     if (hasErrors) {
//       showErrorMessage("Please fix the errors before submitting.");
//       return;
//     }

//     try {
//       setLoading(true);
//       let responseIdNumber;
//       let kycData: any = constructSaveApplicationFormdata();

//       console.error("kycData", kycData);
//       const initialResponse = await applicationfrome.Apllicationinsert(
//         kycData
//       );
//       fetchData(parseInt(initialResponse.id || props.kycId, 10), kycApplication);
//       // updateUiWithSavedData(kycApplication, customerdata);
//       setShowSaveBtn(true);
//       // setShowDownloadButton(true);
//       // props.renderDeclarationContent();
//       if (initialResponse && initialResponse.id) {
//         responseIdNumber = initialResponse.id;
//         sessionStorage.setItem("responseId", responseIdNumber.toString());
//         // setNoOfPrint(noOfPrint + 1);
//         setResponseId(responseIdNumber);
//         showSuccessMessage("Aml Kyc Questionnaire added successfully.");
//         setErrorMessage(null);
//         setTimeout(() => {
//           setSaveClicked(true);
//         }, 2000);
//         props.renderDeclarationContent();

//       } else {
//         console.error("Failed to generate a new responseId");
//         showErrorMessage("Failed to generate a new responseId");
//         return;
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       showErrorMessage("Error submitting form, please try again.");
//     }
//     finally {
//       setLoading(false);

//     }
//   };
//   const handlestep5Submit = async () => {
//     showSuccessMessage("Aml Kyc Questionnaire added successfully.");
//   };

//   const [kycId, setKycId] = useState(null);
//   // Initialize the button state based on session storage
//   useEffect(() => {
//     const buttonDisabled = sessionStorage.getItem("buttonDisabled") === "true";
//     setShowSaveBtn(!buttonDisabled);
//   }, []);



//   useEffect(() => {
//     if (!kycId) {
//       setShowSaveBtn(true); // Enable the button if kycId is cleared
//     }
//   }, [kycId]);
//   const handleAdditionalAnswerChange = (index: number, value: string) => {
//     const isSubAnswerNumber =
//       value.trim() === "" || isNaN(parseInt(value, 10))
//         ? 1
//         : parseInt(value, 10);

//     setAdditionalAnswers((prev) => ({ ...prev, [index]: value }));

//     setFormData((prevFormData) => {
//       const updatedFormDetails =
//         prevFormData.applicantFormDto.applicantFormDetailsData.map(
//           (item, idx) =>
//             idx === index ? { ...item, isSubAnswer: isSubAnswerNumber } : item
//         );
//       return {
//         ...prevFormData,
//         applicantFormDto: {
//           ...prevFormData.applicantFormDto,
//           applicantFormDetailsData: updatedFormDetails,
//         },
//       };
//     });
//   };

//   const formatDateToDDMMYYYY = (dateString: any) => {
//     if (!dateString) return "";
//     const [day, month, year] = dateString.split("-");
//     return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
//   };


//   const downloadPDFRef = React.useRef<() => void | null>(null);

//   const handleDownloadClick = () => {
//     if (downloadPDFRef.current) {
//       downloadPDFRef.current();
//     }
//   };

//   const downloadPDF = async () => {
//     setDownloadingPDF(true);
//     try {
//       const response = await applicationfrome.getPrintNumber(responseId);
//       const printNumber = response;
//       await new Promise((resolve) => setTimeout(resolve, 0));
//       const pdf = new jsPDF("p", "mm", "a4");
//       const content = document.getElementById("pdfContent");
//       if (!content) return;
//       pdf.setFontSize(10);
//       pdf.setFont("helvetica");
//       content.style.display = "block";
//       const padding = 10;
//       const scale = 2;
//       const pageWidth = 210;
//       const pageHeight = 297;
//       const contentWidth = pageWidth - 2 * padding;
//       const contentHeight = pageHeight - 2 * padding;
//       const totalPages = content.childNodes.length;
//       for (let i = 0; i < totalPages; i++) {
//         const page = content.childNodes[i];
//         const canvas = await html2canvas(page as HTMLElement, {
//           scale: scale,
//           useCORS: true,
//           logging: true,
//         });
//         const imgData = canvas.toDataURL("image/png");
//         if (i > 0) pdf.addPage();
//         const textWidth = pdf.getTextWidth(`Count: ${printNumber}`);
//         const xCoordinate = pageWidth - textWidth - padding;
//         pdf.text(`Update: ${printNumber}`, xCoordinate, padding);
//         pdf.addImage(
//           imgData,
//           "PNG",
//           padding,
//           padding,
//           contentWidth,
//           contentHeight
//         );
//         pdf.setLineWidth(0.2);
//         pdf.setDrawColor(0, 0, 0);
//         pdf.rect(padding, padding, contentWidth, contentHeight);
//       }
//       pdf.save("application_form.pdf");
//       setDownlodClicked(true);
//       showSuccessMessage("Download successfully.");
//     } catch (error) {
//       setErrors(["Error generating PDF"]);
//       setDownlodClicked(false);
//     } finally {
//       const content = document.getElementById("pdfContent");
//       if (content) content.style.display = "none";
//       setDownloadingPDF(false);
//       setDownloadCount((prevCount) => prevCount + 1);
//       setDownlodClicked(true);
//     }
//     setIsLevelcasedetailsOpen(true);
//     setIsUploadSectionOpen(false);
//   };

//   const Signonupload = async (event?: React.FormEvent<HTMLFormElement>) => {
//     if (event) {
//       event.preventDefault();
//     }
//     setLoading(true);
//     try {
//       const responseId = sessionStorage.getItem("responseId");
//       if (!responseId) {
//         console.error("No responseId found in session storage");
//         showErrorMessage("No responseId found in session storage");
//         setLoading(false);
//         return;
//       }
//       const documentTypeId = 1;

//       console.log("Selected files:", selectedFiles);

//       if (selectedFiles.length === 0) {
//         console.error("No files selected for submission");
//         showErrorMessage("No files selected for submission");
//         setLoading(false);
//         return;
//       }

//       console.log(
//         "Submitting files with responseId:",
//         responseId,
//         "and documentTypeId:",
//         documentTypeId
//       );
//       await documentApiService.saveFormCustomerRequest(
//         selectedFiles,
//         parseInt(responseId, 10),
//         documentTypeId
//       );
//       showSuccessMessage("Signonupload added successfully.");
//       setSignUploadBtnClicked(true);
//       console.log("Files submitted successfully");
//     } catch (error) {
//       setSignUploadBtnClicked(false);
//       console.error("Error submitting files:", error);
//       showErrorMessage("Error submitting files.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const filesArray = Array.from(event.target.files);
//       setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
//     }
//   };

//   const handleChooseImagesClick1 = (index1: number) => {
//     document.getElementById(`image-upload-input1-${index1}`)?.click();
//   };

//   const handleFileChange4 = (
//     index: number,
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const selectedFiles = Array.from(event.target.files) as File[];
//       const nameWithoutExtension = selectedFiles[0].name.replace(
//         /\.[^/.]+$/,
//         ""
//       );
//       setImages((prevFields) => {
//         const updatedFields = [...prevFields];
//         updatedFields[index] = {
//           ...updatedFields[index],
//           name: nameWithoutExtension,
//           uploading: false,
//           uploadSuccess: false,
//         };
//         return updatedFields;
//       });
//       setIsFileSelected(true);
//     } else {
//       setIsFileSelected(false);
//     }
//   };

//   const handleSubmits = async (event?: React.FormEvent<HTMLFormElement>) => {
//     if (event) {
//       event.preventDefault();
//     }
//     try {
//       const responseId = sessionStorage.getItem("responseId");
//       if (!responseId) {
//         console.error("No responseId found in session storage");
//         return;
//       }
//       const documentTypeId = 1;

//       console.log("Selected files:", selectedFiles);

//       if (selectedFiles.length === 0) {
//         console.error("No files selected for submission");
//         return;
//       }

//       console.log(
//         "Submitting files with responseId:",
//         responseId,
//         "and documentTypeId:",
//         documentTypeId
//       );
//       await documentApiService.saveCustomerRequest(
//         selectedFiles,
//         parseInt(responseId, 10),
//         documentTypeId
//       );
//       console.log("Files submitted successfully");
//       setViewBtnClicked(true);
//     } catch (error) {
//       setViewBtnClicked(false);
//       console.error("Error submitting files:", error);
//     }
//   };

//   const handlesave = async () => {
//     await handleSubmits();
//     // await Signonupload();
//   };

//   const [showImageModal, setShowImageModal] = useState(false);
//   const [showPdfModal, setShowPdfModal] = useState(false);
//   const [base64Image, setBase64Image] = useState<string | null>(null);
//   const [pdfData, setPdfData] = useState<{
//     base64: string | null;
//     filename: string | null;
//   }>({ base64: null, filename: null });
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const customerApiService = new DocumentApiService();

//   const handleView = async () => {
//     console.log("handleView called");
//     setLoading(true);
//     setShowPdfModal(true);
//     try {
//       const responseId = sessionStorage.getItem("responseId");
//       if (!responseId) {
//         console.error("No responseId found in session storage");
//         setLoading(false);
//         return;
//       }
//       const pdfData = await customerApiService.getkycPDF(responseId, 1);
//       console.log("PDF data:", pdfData);
//       setPdfData({ base64: pdfData.data, filename: pdfData.filename });
//       setShowPdfModal(true);
//       setLoading(false);
//       setViewBtnClicked(true);
//       console.log("PDF modal set to open");
//     } catch (error) {
//       console.error("Error fetching PDF:", error);
//       setPdfData({ base64: null, filename: null });
//       setErrorMessage("No PDF available");
//       setShowPdfModal(false);
//       setViewBtnClicked(false);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     console.log("Document loaded with", numPages, "pages"); // Added logging
//     setNumPages(numPages);
//   };

//   const handleCloseImageModal = () => {
//     setShowImageModal(false);
//   };

//   const handleClosePdfModal = () => {
//     setShowPdfModal(false);
//   };

//   const handlePrevPage = () => {
//     setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
//   };

//   const handleNextPage = () => {
//     setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages!));
//   };
//   const [imageURL, setImageURL] = useState("");

//   useEffect(() => {
//     const handleImageClick = async (branchId: number) => {
//       if (branchId) {
//         try {
//           const branchId = 1;
//           const imageData = await customerApiService.getLetterHead(branchId);
//           const base64String = arrayBufferToBase64(imageData);
//           setImageURL(base64String);
//           console.log("base64String", base64String);
//         } catch (error) {
//           console.error("Error fetching image:", error);
//           setImageURL("");
//           // setErrorMessage("No image available");
//         }
//       }
//     };

//     handleImageClick(1);
//   }, []);

//   const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
//     const binary = new Uint8Array(buffer);
//     const bytes = [];
//     for (let i = 0; i < binary.length; i++) {
//       bytes.push(String.fromCharCode(binary[i]));
//     }
//     return `data:image/png;base64,${btoa(bytes.join(""))}`;
//   };

//   return (
//     <>

//       <Container
//         style={{ width: "274mm", minHeight: "297mm", marginTop: "5%" }}
//       >
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           {pages && pages.map((pageContent, pageIndex) => (
//             <Paper key={pageIndex} elevation={10} style={{ marginBottom: "20px" }}>
//               <div
//                 style={{
//                   position: "relative",
//                   width: "100%",
//                   minHeight: "100%",
//                   padding: "20px",
//                 }}
//               >
//                 {/* <div>
//                   {imageURL && (
//                     <img
//                       src={imageURL}
//                       alt="Ponsun"
//                       style={{
//                         display: "block",
//                         margin: "0 auto",
//                         maxWidth: "35%",
//                         height: "auto",
//                         maxHeight: "200px",
//                         marginBottom: "20px",
//                       }}
//                     />
//                   )}
//                 </div> */}
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow sx={{ fontSize: "small" }}>
//                         <TableCell
//                           sx={{
//                             width: "10%",
//                             padding: "5px",
//                             fontSize: "0.875rem",
//                             backgroundColor: "#d6d0d09e",
//                           }}
//                         >
//                           Sl.no
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             width: "40%",
//                             padding: "5px",
//                             fontSize: "0.875rem",
//                             backgroundColor: "#d6d0d09e",
//                           }}
//                         >
//                           Question
//                         </TableCell>
//                         <TableCell
//                           sx={{
//                             width: "50%",
//                             padding: "5px",
//                             fontSize: "0.875rem",
//                             backgroundColor: "#d6d0d09e",
//                             margin: 'auto', textAlign: 'center'
//                           }}
//                         >
//                           Answer
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {pageContent.map((item: any, index: any) => (
//                         <React.Fragment key={index}>
//                           <TableRow>
//                             <TableCell
//                               sx={{
//                                 width: "10%",
//                                 padding: "20px",
//                                 fontSize: "0.75rem",
//                                 whiteSpace: "pre-wrap",
//                                 fontWeight: "900",
//                               }}
//                             >
//                               {index + 1 + pageIndex * itemsPerPage}
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 width: "40%",
//                                 padding: "4px",
//                                 fontSize: "0.75rem",
//                                 whiteSpace: "pre-wrap",
//                                 fontWeight: "900",
//                               }}
//                             >
//                               <span>{item.questionDto.name}</span>
//                               <span>{item.questionDto.multiQuestion === 1 &&
//                                 item.questionDto.subQuestionTypeData &&
//                                 item.questionDto.subQuestionTypeData.map(
//                                   (subQuestion: any) => (
//                                     <Typography key={subQuestion.id}>
//                                       <span>{subQuestion.name}:</span>
//                                     </Typography>
//                                   )
//                                 )}</span>
//                               <span>{item.questionDto.ansTypeId === 2 && (
//                                 <Typography
//                                   variant="body2"
//                                   color="textSecondary"
//                                 >
//                                   <span>{item.questionDto.description}</span>
//                                 </Typography>
//                               )}</span>
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 width: "50%",
//                                 padding: "4px",
//                                 fontSize: "0.75rem",
//                                 whiteSpace: "pre-wrap",
//                               }}
//                             >
//                               <span>{item.questionDto.multiQuestion === 1 &&
//                                 item.questionDto.subQuestionTypeData &&
//                                 item.questionDto.subQuestionTypeData.map(
//                                   (subQuestion: any, subIndex: number) => (
//                                     <React.Fragment key={subQuestion.id}>
//                                       <span>

//                                         {subQuestion.ansTypeId === 2 ? (
//                                           <>
//                                             <Select
//                                               style={{ fontSize: "small" }}
//                                               fullWidth
//                                               size="small"
//                                               value={
//                                                 subQuestion.textValue
//                                                   ? subQuestion.textValue
//                                                   : ''
//                                               }
//                                               // value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.subQuestionId === subQuestion.id)?.answer || ''}
//                                               onChange={(e) =>
//                                                 handleAnswerChange(
//                                                   index +
//                                                   pageIndex * itemsPerPage,
//                                                   e.target.value,
//                                                   true,
//                                                   subQuestion.id
//                                                 )
//                                               }
//                                             >

//                                             </Select>
//                                             {showInputBox[
//                                               index + pageIndex * itemsPerPage
//                                             ] && (
//                                                 <TextField
//                                                   sx={{
//                                                     fontSize: "x-small",
//                                                     marginTop: "10px",
//                                                   }}
//                                                   fullWidth
//                                                   size="small"
//                                                   autoComplete="off"
//                                                   multiline
//                                                   placeholder="Please provide additional details"
//                                                   value={
//                                                     additionalAnswers[
//                                                     index +
//                                                     pageIndex * itemsPerPage
//                                                     ]
//                                                   }
//                                                   InputLabelProps={{ className: 'inputFeild' }}
//                                                   InputProps={{ className: 'inputFeild' }}
//                                                   onChange={(e) =>
//                                                     handleAdditionalAnswerChange(
//                                                       index +
//                                                       pageIndex * itemsPerPage,
//                                                       e.target.value
//                                                     )
//                                                   }
//                                                 />
//                                               )}
//                                           </>
//                                         ) : (
//                                           <TextField
//                                             sx={{ fontSize: "x-small" }}
//                                             fullWidth
//                                             size="small"
//                                             autoComplete="off"
//                                             multiline
//                                             placeholder="name text"
//                                             value={subQuestion.textValue}
//                                             InputLabelProps={{ className: 'inputFeild' }}
//                                             InputProps={{ className: 'inputFeild' }}
//                                             onChange={(e) =>
//                                               handleAnswerChange(
//                                                 index +
//                                                 pageIndex * itemsPerPage,
//                                                 e.target.value,
//                                                 true,
//                                                 subQuestion.id
//                                               )
//                                             }
//                                           />
//                                         )}
//                                       </span>
//                                       {errors[
//                                         index + pageIndex * itemsPerPage
//                                       ] && (
//                                           <Typography
//                                             variant="caption"
//                                             color="error"
//                                           >
//                                             {
//                                               errors[
//                                               index + pageIndex * itemsPerPage
//                                               ]
//                                             }
//                                           </Typography>
//                                         )}
//                                     </React.Fragment>
//                                   )
//                                 )}</span>
//                               <span>
                             
//                                 {!item.questionDto.multiQuestion &&
//                                   item.questionDto.ansTypeId === 2 && (
//                                     <>
//                                       <Select
//                                         style={{ fontSize: "small" }}
//                                         fullWidth
//                                         size="small"
//                                         value={
//                                           item.questionDto.selectedValue
//                                             ? item.questionDto.selectedValue
//                                             : ""
//                                         }
//                                         // value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.questionId === item.questionDto.id)?.answer || ''}
//                                         onChange={(e) =>
//                                           handleAnswerChange(
//                                             index +
//                                             pageIndex * itemsPerPage,
//                                             e.target.value,
//                                             false
//                                           )
//                                         }
//                                       >
//                                         {item.questionDto.answerTypeData.map(
//                                           (
//                                             answer: { name: string },
//                                             answerIndex: React.Key
//                                           ) => (
//                                             <MenuItem
//                                               style={{
//                                                 height: "2rem",
//                                                 fontSize: "0.75rem",
//                                               }}
//                                               key={answerIndex}
//                                               value={answer.name}
//                                             >
//                                               <span>{answer.name}</span>
//                                             </MenuItem>
//                                           )
//                                         )}
//                                       </Select>
//                                       {showInputBox[
//                                         index + pageIndex * itemsPerPage
//                                       ] && (
//                                           <TextField
//                                             sx={{
//                                               fontSize: "x-small",
//                                               marginTop: "10px",
//                                             }}
//                                             fullWidth
//                                             size="small"
//                                             autoComplete="off"
//                                             multiline
//                                             placeholder="Please provide additional details"
//                                             value={
//                                               additionalAnswers[
//                                               index + pageIndex * itemsPerPage
//                                               ]
//                                             }
//                                             InputLabelProps={{ className: 'inputFeild' }}
//                                             InputProps={{ className: 'inputFeild' }}
//                                             onChange={(e) =>
//                                               handleAdditionalAnswerChange(
//                                                 index + pageIndex * itemsPerPage,
//                                                 e.target.value
//                                               )
//                                             }
//                                           />
//                                         )}
//                                     </>
//                                   )}
//                               </span>
//                                   {/* <span>
//                                 {!item.questionDto.multiQuestion && item.questionDto.ansTypeId === 2 && (
//                                   <>
//                                     <Autocomplete
//                                       options={item.questionDto.answerTypeData.map((answer: { name: string }) => answer.name)}
//                                       getOptionLabel={(option) => option}
//                                       style={{ width: '100%', fontSize: 'small' }}
//                                       isOptionEqualToValue={(option, value) => option === value}

//                                       onChange={(event, value) => {
//                                         handleAnswerChange(
//                                           index + pageIndex * itemsPerPage,
//                                           value || '',
//                                           false
//                                         );
//                                       }}

//                                       renderInput={(params) => (
//                                         <TextField
//                                           {...params}
//                                           size="small"
//                                           variant="outlined"
//                                           fullWidth
//                                           onKeyDown={(event) => {
//                                             const inputValue = params.inputProps.value as string | undefined;


//                                             if (event.key === 'Tab' && inputValue) {
//                                               const matchedOption = item.questionDto.answerTypeData.find(
//                                                 (answer: any) =>
//                                                   typeof answer.name === 'string' &&
//                                                   answer.name.toLowerCase().startsWith(inputValue.toLowerCase())
//                                               );

//                                               if (matchedOption) {

//                                                 item.questionDto.selectedValue = matchedOption.name;
//                                                 handleAnswerChange(
//                                                   index + pageIndex * itemsPerPage,
//                                                   matchedOption.name,
//                                                   false
//                                                 );
//                                               }

//                                             }
//                                           }}
//                                         />
//                                       )}


//                                       value={item.questionDto.selectedValue || ''}


//                                       onInputChange={(event, newInputValue) => {
//                                         if (newInputValue) {
//                                           item.questionDto.selectedValue = newInputValue;

//                                           const matchedOption = item.questionDto.answerTypeData.find(
//                                             (answer: any) =>
//                                               typeof answer.name === 'string' &&
//                                               answer.name.toLowerCase().startsWith(newInputValue.toLowerCase())
//                                           );

//                                           if (matchedOption) {
//                                             item.questionDto.selectedValue = matchedOption.name;
//                                             handleAnswerChange(
//                                               index + pageIndex * itemsPerPage,
//                                               matchedOption.name,
//                                               false
//                                             );
//                                           }
//                                         }
//                                       }}
//                                     />

                                   
//                                     {showInputBox[index + pageIndex * itemsPerPage] && (
//                                       <TextField
//                                         sx={{ fontSize: 'x-small', marginTop: '10px' }}
//                                         fullWidth
//                                         size="small"
//                                         autoComplete="off"
//                                         multiline
//                                         placeholder="Please provide additional details"
//                                         value={additionalAnswers[index + pageIndex * itemsPerPage] || ''}
//                                         InputLabelProps={{ className: 'inputFeild' }}
//                                         InputProps={{ className: 'inputFeild' }}
//                                         onChange={(e) =>
//                                           handleAdditionalAnswerChange(
//                                             index + pageIndex * itemsPerPage,
//                                             e.target.value
//                                           )
//                                         }
//                                       />
//                                     )}
//                                   </>
//                                 )}
//                               </span> */}

//                               <span>

//                                 {!item.questionDto.multiQuestion &&
//                                   item.questionDto.ansTypeId !== 2 && (
//                                     <TextField
//                                       sx={{ fontSize: "x-small" }}
//                                       fullWidth
//                                       size="small"
//                                       autoComplete="off"
//                                       placeholder="text field"
//                                       // value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.questionId === item.questionDto.id)?.answer || ''}
//                                       value={item.questionDto.textValue}
//                                       InputLabelProps={{ className: 'inputFeild' }}
//                                       InputProps={{ className: 'inputFeild' }}
//                                       onChange={(e) =>
//                                         handleAnswerChange(
//                                           index + pageIndex * itemsPerPage,
//                                           e.target.value,
//                                           false
//                                         )
//                                       }
//                                     />
//                                   )}
//                                 {errors[index + pageIndex * itemsPerPage] && (
//                                   <Typography variant="caption" color="error">
//                                     {errors[index + pageIndex * itemsPerPage]}
//                                   </Typography>
//                                 )}
//                               </span>

//                             </TableCell>
//                           </TableRow>
//                         </React.Fragment>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>

//                 <div
//                   style={{
//                     textAlign: "right",
//                     marginTop: "16px",
//                     position: "absolute",
//                     right: "20px",
//                     fontSize: "small",
//                     bottom: "0px",

//                   }}
//                 >
//                   Page : {pageIndex + 1}
//                 </div>
//                 <div
//                   style={{
//                     textAlign: "right",
//                     position: "absolute",
//                     fontSize: "small",
//                     // bottom: "15px",

//                   }}
//                 >
//                   Update: {printNumber}
//                 </div>
//               </div>


//             </Paper>
//           ))}
//           <Paper elevation={10} style={{ marginBottom: "20px" }}>
//             <div
//               style={{
//                 position: "relative",
//                 width: "100%",
//                 minHeight: "100%",
//                 padding: "20px",
//               }}
//             >

//               <div style={a4SheetStyles}>

//                 <table style={tableStyles}>
//                   <tbody>
//                     <tr style={evenRowStyles}>
//                       <td style={{ ...cellStyle, width: "30%" }}>
//                         <strong>Name</strong>
//                       </td>
//                       <td style={{ ...cellStyle, width: "70%" }}> </td>
//                     </tr>
//                     <tr>
//                       <td style={{ ...cellStyle, width: "30%" }}>
//                         <strong>Designation</strong>
//                       </td>
//                       <td style={{ ...cellStyle, width: "70%" }}> </td>
//                     </tr>
//                     <tr style={evenRowStyles}>
//                       <td style={{ ...cellStyle, width: "30%" }}>
//                         <strong>Signature</strong>
//                       </td>
//                       <td style={{ ...cellStyle, width: "70%" }}> </td>
//                     </tr>
//                     <tr>
//                       <td style={{ ...cellStyle, width: "30%" }}>
//                         <strong>Seal of the Member</strong>
//                       </td>
//                       <td style={{ ...cellStyle, width: "70%" }}> </td>
//                     </tr>
//                     <tr style={evenRowStyles}>
//                       <td style={{ ...cellStyle, width: "30%" }}>
//                         <strong>Date</strong>
//                       </td>
//                       <td style={{ ...cellStyle, width: "70%" }}> </td>
//                     </tr>
//                     <tr>
//                       <td style={{ ...cellStyle, width: "30%" }}>
//                         <strong>Place</strong>
//                       </td>
//                       <td style={{ ...cellStyle, width: "70%" }}> </td>
//                     </tr>
//                   </tbody>
//                 </table>

//                 {/* <img
//                   src={contactImage}
//                   alt="Contact"
//                   style={{
//                     display: "block",
//                     margin: "20px auto 0",
//                     maxWidth: "55%",
//                   }}
//                 /> */}
//                 <div
//                   style={{
//                     textAlign: "right",
//                     marginTop: "16px",
//                     position: "absolute",
//                     right: "20px",
//                     fontSize: "small",
//                     bottom: "15px",

//                   }}
//                 >
//                   Page : {6}
//                 </div>
//                 <div
//                   style={{
//                     textAlign: "right",
//                     position: "absolute",
//                     fontSize: "small",
//                     bottom: "15px",

//                   }}
//                 >
//                   Update: {printNumber}
//                 </div>
//               </div>
//             </div>
//           </Paper>


//           {dataFetched && (
//             <div>
//               {applicationTypeId === 1 && accountTypeId === 2 && (
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   <div className="arroww" style={{ marginRight: "10px" }}>
//                     <span style={{ textAlign: "center" }}>Step 1:</span>
//                   </div>

//                   <button style={{ width: '12%' }}
//                     className='btn btn-primary btn-sm'
//                     onClick={() => {
//                       handleSubmit();


//                     }}

//                     disabled={!showSaveBtn}
//                   >
//                     Save</button>

//                   <br />

//                 </div>
//               )}
//               <br></br>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <div className="arroww" style={{ marginRight: "10px" }}>
//                   <span style={{ textAlign: "center" }}>Step 2:</span>
//                 </div>
//                 <button style={{ width: '12%' }} className={`btn btn-sm ${saveClicked ? 'btn-primary' : 'btn-secondary'}`} onClick={downloadPDF} disabled={!saveClicked}>Download</button>

//               </div>

//               <br></br>
//               {downloadingPDF && (
//                 <p style={{ color: "red" }}>
//                   Please wait for the download...
//                 </p>
//               )}
//               {isLevelcasedetailsOpen && (
//                 <Grid container spacing={1}>
//                   <Grid item xs={12}>
//                     <Grid container spacing={1}>
//                       {images.map((image, index) => (
//                         <Grid item xs={12} key={index}>
//                           <form
//                             onSubmit={handleSubmits}
//                             encType="multipart/form-data"
//                           >
//                             <div className="person-container">
//                               <div className="field-group">
//                                 <div className="field-group-column">
//                                   <input
//                                     type="file"
//                                     id={`image-upload-input1-${index}`}
//                                     accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                                     onChange={(event) => {
//                                       handleFileChange(event);
//                                       handleFileChange4(index, event);
//                                     }}
//                                     style={{ display: "none" }}
//                                     multiple
//                                   />

//                                   <Button
//                                     variant="outlined"
//                                     onClick={() =>
//                                       handleChooseImagesClick1(index)
//                                     }
//                                     style={{ marginRight: "10px" }}
//                                   >
//                                     Document
//                                   </Button>
//                                   <TextField
//                                     style={{ width: "50%" }}
//                                     label="Attachment"
//                                     type="text"
//                                     size="small"
//                                     variant="outlined"
//                                     value={image.name}
//                                     disabled
//                                     fullWidth
//                                   />
//                                 </div>
//                               </div>
//                             </div>
//                           </form>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               )}
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <div className="arroww" style={{ marginRight: "10px" }}>
//                   <span style={{ textAlign: "center" }}>Step 3:</span>
//                 </div>
//                 {/* <button className='btn btn-primary btn-sm' onClick={Signonupload}>Sign on upload</button> */}
//                 <form onSubmit={Signonupload} style={{ width: "11%" }}>
//                   <button
//                     style={{ width: '109%', marginLeft: '-1%' }}  // Matching the width style
//                     className={`btn btn-sm ${downlodClicked ? 'btn-primary' : 'btn-secondary'}`}  // Matching the class names and conditional styling
//                     disabled={!downlodClicked}  // Matching the disabled condition
//                   >
//                     Sign on upload
//                   </button>
//                 </form>
//                 {loading && <Loader />}

//               </div>

//               <br></br>

//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <div className="arroww" style={{ marginRight: "10px" }}>
//                   <span style={{ textAlign: "center" }}>Step 4:</span>
//                 </div>
//                 {/* <button
//                   style={{ width: "12%" }}
//                   className="btn btn-primary btn-sm"
//                   disabled={!signUploadBtnClicked}
//                   onClick={handleView}
//                 >
//                   View
//                 </button> */}
//                 <button
//                   style={{ width: "12%" }}
//                   className={`btn btn-sm ${signUploadBtnClicked ? 'btn-primary' : 'btn-secondary'}`}
//                   disabled={!signUploadBtnClicked}
//                   onClick={handleView}
//                 >
//                   View
//                 </button>
//                 {errorMessage && (
//                   <Typography
//                     variant="body1"
//                     style={{ color: "red", textAlign: "center", marginLeft: '1%' }}
//                   >
//                     {errorMessage}
//                   </Typography>
//                 )}
//               </div>
//               <br></br>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <div className="arroww" style={{ marginRight: "10px" }}>
//                   <span style={{ textAlign: "center" }}>Step 5:</span>
//                 </div>
//                 <div style={{ width: '6%' }}>
//                   {/* <button
//                     style={{ width: "200%" }}
//                     className="btn btn-primary btn-sm"
//                     onClick={handlesave}
//                     disabled={!viewBtnClicked}
//                   >
//                     Submit
//                   </button> */}
//                   <button
//                     style={{ width: "200%" }}
//                     className={`btn btn-sm ${viewBtnClicked ? 'btn-primary' : 'btn-secondary'}`}
//                     // onClick={handlesave}
//                     onClick={() => {
//                       handlestep5Submit();

//                       // setSaveClicked(true);

//                     }}
//                     disabled={!viewBtnClicked}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <br></br>
//         </LocalizationProvider>
//       </Container>

//       <Card>
//         <div>
//           <Dialog
//             open={showImageModal}
//             onClose={handleCloseImageModal}
//             fullWidth
//             maxWidth="xl"
//           >
//             <DialogTitle>Image Preview</DialogTitle>
//             <DialogContent>
//               {base64Image && (
//                 <img
//                   src={`data:image/png;base64,${base64Image}`}
//                   alt="Image Preview"
//                 />
//               )}
//               {errorMessage && (
//                 <Typography variant="body1">{errorMessage}</Typography>
//               )}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseImageModal}>Close</Button>
//             </DialogActions>
//           </Dialog>

//           <Dialog open={showPdfModal} onClose={handleClosePdfModal} maxWidth="md">
//             {loading && <Loader />}
//             <DialogTitle>
//               PDF Preview
//               <IconButton
//                 aria-label="close"
//                 onClick={handleClosePdfModal}
//                 style={{ position: "absolute", right: 8, top: 8, color: "#aaa" }}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </DialogTitle>
//             <DialogContent
//               dividers={true}
//               style={{
//                 overflow: "auto",
//                 padding: 0,
//                 margin: 0,
//               }}
//             >
//               {pdfData.base64 && (
//                 <div
//                   style={{
//                     border: "1px solid #e0e0e0",
//                     padding: 0,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     height: '100%',
//                     overflow: 'hidden',
//                   }}
//                 >
//                   <Document
//                     file={`data:application/pdf;base64,${pdfData.base64}`}
//                     onLoadSuccess={onDocumentLoadSuccess}
//                     className="pdf-document"
//                   >
//                     {Array.from(new Array(numPages), (el, index) => (
//                       <div
//                         key={`page_${index + 1}`}
//                         style={{
//                           margin: 0,
//                           padding: 0,
//                           display: "flex",
//                           justifyContent: "center",
//                           overflow: "hidden",
//                           height: 'auto',
//                         }}
//                       >
//                         <Page
//                           pageNumber={index + 1}
//                           width={Math.min(window.innerWidth * 0.85, 800)}
//                           scale={1.1}
//                         />
//                       </div>
//                     ))}
//                   </Document>
//                 </div>
//               )}
//             </DialogContent>
//             <DialogActions>
//               {pdfData.filename && (
//                 <Button
//                   href={`data:application/pdf;base64,${pdfData.base64}`}
//                   download={pdfData.filename}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   variant="contained"
//                 >
//                   Download PDF
//                 </Button>
//               )}
//             </DialogActions>
//           </Dialog>
//         </div>

//         <div
//           id="pdfContent"
//           style={{ display: "none", fontFamily: "Arial, sans-serif" }}
//         >
//           {pageView && pageView.map((pageContent, pageIndex) => (
//             <div key={pageIndex} style={a4SheetStyle}>
//               <Paper
//                 style={{
//                   marginBottom: "20px",
//                   flex: "1",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <div ref={contentRef} style={pageContentStyle}>
//                   <img
//                     src={imageURL}
//                     alt="Ponsun"
//                     style={{ ...contactImageStyle, marginBottom: "20px" }}
//                   />
//                   <TableContainer style={tableContainerStyle}>
//                     <Table>
//                       <TableHead>
//                         <TableRow
//                           style={{
//                             fontSize: "12px",
//                             backgroundColor: "#d6d0d09e",
//                           }}
//                         >
//                           <TableCell style={tableCellStyle}>Sl.no</TableCell>
//                           <TableCell
//                             style={{ ...tableCellStyle, width: "60%" }}
//                           >
//                             Question
//                           </TableCell>
//                           <TableCell
//                             style={{ ...tableCellStyle, width: "30%" }}
//                           >
//                             Answer
//                           </TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {pageContent &&
//                           pageContent.map((item: any, index: any) => (
//                             <TableRow key={index}>
//                               <TableCell
//                                 style={{
//                                   ...tableCellStyle,
//                                   fontWeight: "bold",
//                                 }}
//                               >
//                                 {index + 1 + pageIndex * itemsPerPagePdf}{" "}
//                               </TableCell>
//                               {/* <TableCell
//                                 style={{ width: "40%", padding: "4px" }}
//                               >
//                                 {item && item.questionDto.name}
//                                 {item && item.questionDto.description && (
//                                   <Typography
//                                     variant="body2"
//                                     color="textSecondary"
//                                   >
//                                     {item.description}
//                                   </Typography>
//                                 )}
//                               </TableCell>
//                               <TableCell>
//                                 {(item && item.questionDto.selectedValue) ||
//                                   item.questionDto.textValue ||
//                                   "No answer available"}
//                                 {errors[index + pageIndex * itemsPerPage] && (
//                                   <Typography variant="caption" color="error">
//                                     {errors[index + pageIndex * itemsPerPage]}
//                                   </Typography>
//                                 )}
//                               </TableCell> */}
//                               <TableCell
//                                 style={{ width: "40%", padding: "4px" }}
//                               >
//                                 {item && item.questionDto ? (
//                                   <>
//                                     {item.questionDto.name}
//                                     {console.log(item.questionDto)}
//                                     {item.questionDto.description && (
//                                       <Typography
//                                         variant="body2"
//                                         color="textSecondary"
//                                       >
//                                         {item.questionDto.description}
//                                       </Typography>
//                                     )}
//                                   </>
//                                 ) : null}
//                               </TableCell>
//                               <TableCell>
//                                 {item && item.questionDto ? (
//                                   item.questionDto.id === 17 ? (
//                                     <>
//                                       <Typography variant="body2" color="textSecondary">
//                                         {item.questionDto.subQuestionTypeData.map((subQuestion: any) => (
//                                           <div key={subQuestion.id}>
//                                             <strong>{subQuestion.name}:</strong> {subQuestion.selectedValue || "No answer available"}
//                                           </div>
//                                         ))}
//                                       </Typography>
//                                     </>
//                                   ) : (
//                                     <>
//                                       {(item.questionDto.selectedValue || item.questionDto.textValue) || "No answer available"}
//                                     </>
//                                   )
//                                 ) : null}
//                                 {errors[index + pageIndex * itemsPerPage] && (
//                                   <Typography variant="caption" color="error">
//                                     {errors[index + pageIndex * itemsPerPage]}
//                                   </Typography>
//                                 )}
//                               </TableCell>
//                             </TableRow>
//                           ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                   <div style={footerStyle}>
//                     {/* <img
//                       src={contactImage}
//                       alt="Contact"
//                       style={{ maxWidth: '55%' }}
//                     /> */}
//                     <div style={pageNumberStyle}>
//                       {/* Update: {formData.applicantFormDto.numberOfPrint}, Page :{" "} */}
//                       {pageIndex + 1}
//                     </div>
//                   </div>
//                 </div>

//               </Paper>
//             </div>
//           ))}
//           <div style={a4SheetStyle}>
//             {/* <img
//               src={imageURL}
//               alt="Ponsun"
//               style={{ ...contactImageStyle, marginBottom: "20px" }}
//             /> */}
//             <table style={tableStyle}>
//               <tbody>
//                 <tr style={evenRowStyle}>
//                   <td style={{ ...cellStyle, width: "30%" }}>
//                     <strong>Name</strong>
//                   </td>
//                   <td style={{ ...cellStyle, width: "70%" }}> </td>
//                 </tr>
//                 <tr>
//                   <td style={{ ...cellStyle, width: "30%" }}>
//                     <strong>Designation</strong>
//                   </td>
//                   <td style={{ ...cellStyle, width: "70%" }}> </td>
//                 </tr>
//                 <tr style={evenRowStyle}>
//                   <td style={{ ...cellStyle, width: "30%" }}>
//                     <strong>Signature</strong>
//                   </td>
//                   <td style={{ ...cellStyle, width: "70%" }}> </td>
//                 </tr>
//                 <tr>
//                   <td style={{ ...cellStyle, width: "30%" }}>
//                     <strong>Seal of the Member</strong>
//                   </td>
//                   <td style={{ ...cellStyle, width: "70%" }}> </td>
//                 </tr>
//                 <tr style={evenRowStyle}>
//                   <td style={{ ...cellStyle, width: "30%" }}>
//                     <strong>Date</strong>
//                   </td>
//                   <td style={{ ...cellStyle, width: "70%" }}> </td>
//                 </tr>
//                 <tr>
//                   <td style={{ ...cellStyle, width: "30%" }}>
//                     <strong>Place</strong>
//                   </td>
//                   <td style={{ ...cellStyle, width: "70%" }}> </td>
//                 </tr>
//               </tbody>
//             </table>
//             <div style={footerStyle}>
//               <img
//                 src={contactImage}
//                 alt="Contact"
//                 style={{ maxWidth: '55%' }}
//               />
//               <div style={pageNumberStyle}>
//                 Update: {formData.applicantFormDto.numberOfPrint}, Page :{" "}
//                 {1}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Card>
//       <Snackbar
//         open={isSuccessOpen}
//         autoHideDuration={5000}
//         onClose={() => setIsSuccessOpen(false)}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <MuiAlert
//           elevation={6}
//           variant="filled"
//           severity="success"
//           onClose={() => setIsSuccessOpen(false)}
//         >
//           {successMessage}
//         </MuiAlert>
//       </Snackbar>
//       <Snackbar
//         open={isErrorOpen}
//         autoHideDuration={5000}
//         onClose={() => setIsErrorOpen(false)}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <MuiAlert
//           elevation={6}
//           variant="filled"
//           severity="error"
//           onClose={() => setIsErrorOpen(false)}
//         >
//           {errorMessage}
//         </MuiAlert>
//       </Snackbar>
//       {/* </Box>
//             </Box> */}
//     </>
//   );
// };

// export default ApplicationForm;


import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import Header from "../../../layouts/header/header";
import { Card } from "react-bootstrap";
import ApplicationfromeService from "../../../data/services/kyc/applicationfrom/applicationfrome-api-service";
import {
  Type,
  AccountType,
  QuestionType,
  AppFormData,
  kycForm,
  AnswerTypeData,
  ApplicantFormDetailsData,
} from "../../../data/services/kyc/applicationfrom/applicationfrome-payload";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import contactImage from "../../../assets/contact.png";
import ponsunImage from "../../../assets/ponsun.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { useApplicationContext } from "./ApplicationContext";
import DocumentApiService from "../../../data/services/document/Document_api_service";
import "./Form.css";
import { IconButton } from "@mui/material";
import { CSSProperties } from "react";
import Download from "./Download";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation, useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  saveQuestionnaire,
} from "./state/save-application-action";
import { useApplicationContext } from "../../kyc/Insert/ApplicationContext";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import CloseIcon from '@mui/icons-material/Close';
import Loader from "../../loader/loader";
import '../../CommonStyle/Style.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface Image {
  name: string;
  uploading: boolean;
  uploadSuccess: boolean;
}

interface CustomerData {
  kycFormDto: kycForm;
}
const ApplicationForm = (props: any) => {
  const [formData, setFormData] = useState<AppFormData>({
    applicantFormDto: {
      id: 0,
      name: "",
      numberOfPrint: 0,
      isCompleted: 0,
      isScreening: 0,
      applicantFormDetailsData: [],
    },
  });
  const initialImageState: Image = {
    name: "",
    uploading: false,
    uploadSuccess: false,
  };

  const documentApiService = new DocumentApiService();

  const [images, setImages] = useState<Image[]>([initialImageState]);
  const [isFileSelected, setIsFileSelected] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [typeOptions, setTypeOptions] = useState<Type[]>([]);
  const [accountTypeOptions, setAccountTypeOptions] = useState<AccountType[]>(
    []
  );
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
  const [showSaveBtn, setShowSaveBtn] = useState(true);

  // const [loading, setLoading] = useState(true);
  const [formDatas, setFormDatas] = useState<kycForm[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [successMessage, setSuccessMessage] = useState("");
  // const [saveClicked, setSaveClicked] = useState(true);
  const [saveClicked, setSaveClicked] = useState(false);
  const [downlodClicked, setDownlodClicked] = useState(false);
  const [signUploadBtnClicked, setSignUploadBtnClicked] = useState(false);
  const [viewBtnClicked, setViewBtnClicked] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLevelcasedetailsOpen, setIsLevelcasedetailsOpen] = useState(false);
  const [isUploadSectionOpen, setIsUploadSectionOpen] = useState(false); // New state to manage upload section visibility
  const [showInputBox, setShowInputBox] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [additionalAnswers, setAdditionalAnswers] = useState<{
    [key: number]: string;
  }>({});
  const kycApplication = useSelector(
    (state: any) => state.kycApplication?.saveApplicationReducer
  );
  console.log("kycApplication", kycApplication);
  const dispatch = useDispatch();
  // const [noOfPrint, setNoOfPrint] = useState(0);
  const { state } = useLocation();
  const applicationTypeId = 1;//state.applicationTypeId;
  const accountTypeId = 2; //state.accountTypeId;
  const [customerdata, setcustomerData] = useState<kycForm[]>([]);
  const [pageView, setPageView] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [noOfPrint, setNoOfPrint] = useState<number>(formData.applicantFormDto.numberOfPrint || 1);
  const responseId = sessionStorage.getItem("responseId");
  const [loading, setLoading] = useState(false);
  const [printNumber, setPrintNumber] = useState<string>(''); // State for print number


  // useEffect(() => {
  //   fetchType();
  //   fetchQuestions(props.questionData);
  // }, [props.questionData]);

  const a4SheetStyle = {
    width: "210mm",
    minHeight: "297mm",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const footerStyle: CSSProperties = {
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  };

  // const footerStyle: CSSProperties = {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   marginTop: '20px',
  // };
  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12px",
  };

  const cellStyle = {
    padding: "8px",
    border: "1px solid #000",
  };

  const evenRowStyle = {
    backgroundColor: "#f2f2f2",
  };

  const pageContentStyle = {
    flex: "1 0 auto",
  };

  const tableContainerStyle = {
    width: "100%",
    marginBottom: "20px",
  };

  const tableCellStyle = {
    width: "10%",
    padding: "5px",
  };

  const contactImageStyle = {
    display: "block",
    margin: "20px auto 0",
    maxWidth: "75%",
  };

  const contactImagesStyle: CSSProperties = {
    display: "block",
    margin: "20px auto 0",
    maxWidth: "85%",
    textAlign: "center" as "center",
  };

  const pageNumberStyle: React.CSSProperties = {
    position: "relative",
    bottom: "10px",
    right: "20px",
    fontSize: "small",
    display: "flex",
    justifyContent: "flex-end",
  };

  const a4SheetStyles = {
    // width: "270mm",
    // minHeight: '297mm',
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const tableStyles: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12px",
  };

  const evenRowStyles = {
    backgroundColor: "#f2f2f2",
  };
  useEffect(() => {
    if (loading) {
      document.body.classList.add('blur');
    } else {
      document.body.classList.remove('blur');
    }
  }, [loading]);

  const fetchData = async (kycId: any, questions: any) => {
    try {
      setLoading(true);
      const customerData: any[] = await applicationfrome.getkycData(kycId);
      console.log("getfn:", customerData)
      const response = await applicationfrome.getPrintNumber(responseId); // Ensure responseId is defined
      setPrintNumber(response); // Set the print number in state
      console.log("Print Number:", response);
      setcustomerData(customerData);
      updateUiWithSavedData(questions, customerData);
      if (questions[0].questionDto) {
        dispatch(saveQuestionnaire(questions));
      }
    } catch (error) {
      setErrors(["Error fetching data"]);
    } finally {
      setLoading(false);
    }
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setIsSuccessOpen(true);
    setTimeout(() => {
      setIsSuccessOpen(false);
      setSuccessMessage("");
    }, 1000);
  };

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setIsErrorOpen(true);
  };
  const itemsPerPagePdf = 12;
  const itemsPerPage = 10;


  useEffect(() => {
    // setFetchedQuestions([]);
    fetchQuestions(kycApplication);
    setDataFetched(true);
    splitDataIntoPage(kycApplication, itemsPerPagePdf);
    splitDataIntoPages(kycApplication, itemsPerPage);

  }, [kycApplication]);

  const splitDataIntoPages = (data: any[], itemsPerPage: number) => {
    if (!data) {
      return;
    }
    const pages = [];
    for (let i = 0; i < data.length; i += itemsPerPage) {
      pages.push(data.slice(i, i + itemsPerPage));
    }
    setPages([...pages]);

  };

  const splitDataIntoPage = (data: any[], itemsPerPages: number) => {
    if (!data) {
      return;
    }
    const pageView = [];
    for (let i = 0; i < data.length; i += itemsPerPages) {
      pageView.push(data.slice(i, i + itemsPerPages));
    }
    setPageView([...pageView]);
    return pageView;
  };

  console.log("pageView", pageView);

  // sessionStorage.setItem('responseId', responseId);
  console.log("kyc form responseId:", responseId);
  useEffect(() => {
    if (responseId || props.kycId) {
      setShowSaveBtn(true);
      // setSaveClicked(true);
      fetchData(parseInt(responseId || props.kycId, 10), kycApplication);
      console.log("Declaration responseId:", responseId);

      setImages((prevImages) =>
        prevImages.map((image) => ({
          ...image,
          kycId: parseInt(responseId || props.kycId, 10),
        }))
      );
    }
    if (props.kycId) {
      setShowSaveBtn(true);
      // setSaveClicked(false);
    }
  }, [responseId]);

  const fetchQuestions = async (data?: any) => {
    try {
      setFetchedQuestions([...data]);
      setDataFetched(true);
      setErrors(Array(kycApplication.length).fill(""));
      setFormFullyRendered(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };


  const handleAnswerChange = (
    index: number,
    value: string,
    isSubQuestion: boolean,
    subQuestionId: number | null = null,
  ) => {
    const updatedList = fetchedQuestions.map((item: any, idx) => {
      if (index === idx) {
        if (
          !item.questionDto.multiQuestion &&
          item.questionDto.answerTypeData.length > 0
        ) {
          item.questionDto.selectedValue = value;
          item.questionDto.textValue = value;
          if (value === 'Under Process') {
            setShowInputBox((prev) => ({ ...prev, [index]: true }));
          } else {
            setShowInputBox((prev) => ({ ...prev, [index]: false }));
          }
          return { ...item };
        }
        if (isSubQuestion && item.questionDto.subQuestionTypeData.length > 0) {
          let subQuestion: any[] = item.questionDto.subQuestionTypeData;
          for (let i = 0; i < subQuestion.length; i++) {
            if (subQuestion[i].id == subQuestionId) {
              subQuestion[i].textValue = value;
            }
          }
          return { ...item };
        } else {
          item.questionDto.textValue = value;
          item.questionDto.selectedValue = value;
          return { ...item };
        }
      }
      return item;
    });

    setFetchedQuestions(updatedList);
    dispatch(saveQuestionnaire(updatedList));
  };
  // const constructSaveApplicationFormdata = () => {
  //   let payload: AppFormData = {
  //     applicantFormDto: {
  //       id: props.kycId || responseId ? props.kycId || responseId : 0,
  //       name: "",
  //       numberOfPrint: noOfPrint,
  //       isCompleted: 0,
  //       isScreening: 0, // Add this line
  //       applicantFormDetailsData: [],
  //     },
  //   };

  //   let applicantFormDetailsData: ApplicantFormDetailsData[] = [];
  //   console.log('fetchedQuestions final ======>', fetchedQuestions);

  //   for (let i = 0; i < fetchedQuestions.length; i++) {
  //     let question: any = fetchedQuestions[i].questionDto;
  //     let applicantForm: any = {};

  //     applicantForm.id = question.id;
  //     applicantForm.kycId = props.kycId || responseId ? props.kycId || responseId : 0;
  //     applicantForm.accountTypeId = question.accountTypeId;
  //     applicantForm.applicationTypeId = question.applicationTypeId;
  //     applicantForm.questionId = question.id;
  //     applicantForm.subQuestionId = 0;
  //     applicantForm.ansTypeId = question.ansTypeId;
  //     applicantForm.isSubAnswer = 0;
  //     applicantForm.answer = question.textValue ? question.textValue : question.selectedValue;
  //     applicantForm.score = question.score ? question.score : 0;
  //     applicantForm.uid = 0;
  //     applicantForm.euid = 0;
  //     applicantForm.ansId = null;
  //     applicantForm.isScreening = 0; // Add isScreening here
  //     if (question.selectedValue && question.id === 1) {
  //       console.log("question.name:", question.selectedValue);
  //       payload.applicantFormDto.name = question.selectedValue ?? "";
  //     }
  //     applicantFormDetailsData.push(applicantForm);

  //     if (question.answerTypeData.length > 0) {
  //       for (let j = 0; j < question.answerTypeData.length; j++) {
  //         if (question.answerTypeData[j].name === question.selectedValue) {
  //           applicantForm.ansId = question.answerTypeData[j].id;
  //           applicantForm.score = question.answerTypeData[j].score || null;
  //           applicantForm.uid = question.answerTypeData[j].uid;
  //           applicantForm.euid = question.answerTypeData[j].euid;
  //           break;
  //         }
  //       }
  //     }

  //     applicantFormDetailsData.push({ ...applicantForm });

  //     if (question.subQuestionTypeData.length > 0) {
  //       for (let k = 0; k < question.subQuestionTypeData.length; k++) {
  //         console.error(question.subQuestionTypeData[k]);
  //         let subApplicantForm = { ...applicantForm };
  //         subApplicantForm.kycId = props.kycId || responseId ? props.kycId || responseId : 0;
  //         subApplicantForm.score = question.score || 0;
  //         subApplicantForm.uid = 0;
  //         subApplicantForm.euid = 0;
  //         subApplicantForm.id = 0;
  //         subApplicantForm.isSubAnswer = 1;
  //         subApplicantForm.subQuestionId = question.subQuestionTypeData[k].id;
  //         subApplicantForm.answer = question.subQuestionTypeData[k].textValue;
  //         subApplicantForm.accountTypeId = question.subQuestionTypeData[k].accountTypeId;
  //         subApplicantForm.applicationTypeId = question.subQuestionTypeData[k].applicationTypeId;
  //         subApplicantForm.questionId = question.subQuestionTypeData[k].questionId;
  //         subApplicantForm.ansTypeId = question.subQuestionTypeData[k].ansTypeId;
  //         subApplicantForm.ansId = question.subQuestionTypeData[k].id;
  //         subApplicantForm.isScreening = 0; // Add isScreening here
  //         applicantFormDetailsData.push(subApplicantForm);
  //         console.error(applicantForm);
  //       }
  //     }
  //   }

  //   payload.applicantFormDto.applicantFormDetailsData = applicantFormDetailsData;
  //   return payload;
  // };
  const constructSaveApplicationFormdata = () => {
    let payload: AppFormData = {
      applicantFormDto: {
        id: props.kycId || responseId ? props.kycId || responseId : 0,
        name: "",
        numberOfPrint: noOfPrint,
        isCompleted: 0,
        isScreening: 0, // Add this line
        applicantFormDetailsData: [],
      },
    };

    let applicantFormDetailsData: ApplicantFormDetailsData[] = [];
    console.log('fetchedQuestions final ======>', fetchedQuestions);

    for (let i = 0; i < fetchedQuestions.length; i++) {
      let question: any = fetchedQuestions[i].questionDto;
      let applicantForm: any = {};

      applicantForm.id = question.id;
      applicantForm.kycId = props.kycId || responseId ? props.kycId || responseId : 0;
      applicantForm.accountTypeId = question.accountTypeId;
      applicantForm.applicationTypeId = question.applicationTypeId;
      applicantForm.questionId = question.id;
      applicantForm.subQuestionId = 0;
      applicantForm.ansTypeId = question.ansTypeId;
      applicantForm.isSubAnswer = 0;
      applicantForm.answer = question.textValue ? question.textValue : question.selectedValue;
      applicantForm.score = question.score ? question.score : 0;
      applicantForm.uid = 0;
      applicantForm.euid = 0;
      applicantForm.ansId = null;
      applicantForm.isScreening = 0; // Add isScreening here

      if (question.selectedValue && question.id === 1) {
        console.log("question.name:", question.selectedValue);
        payload.applicantFormDto.name = question.selectedValue ?? "";
      }

      applicantFormDetailsData.push(applicantForm);

      if (question.answerTypeData.length > 0) {
        for (let j = 0; j < question.answerTypeData.length; j++) {
          if (question.answerTypeData[j].name === question.selectedValue) {
            applicantForm.ansId = question.answerTypeData[j].id;
            applicantForm.score = question.answerTypeData[j].score || null;
            applicantForm.uid = question.answerTypeData[j].uid;
            applicantForm.euid = question.answerTypeData[j].euid;
            break;
          }
        }
      }

      // applicantFormDetailsData.push({ ...applicantForm });

      if (question.subQuestionTypeData.length > 0) {
        for (let k = 0; k < question.subQuestionTypeData.length; k++) {
          console.error(question.subQuestionTypeData[k]);
          let subApplicantForm = { ...applicantForm };
          subApplicantForm.kycId = props.kycId || responseId ? props.kycId || responseId : 0;
          subApplicantForm.score = question.score || 0;
          subApplicantForm.uid = 0;
          subApplicantForm.euid = 0;
          subApplicantForm.id = 0;
          subApplicantForm.isSubAnswer = 1;
          subApplicantForm.subQuestionId = question.subQuestionTypeData[k].id;
          subApplicantForm.answer = question.subQuestionTypeData[k].textValue;
          subApplicantForm.accountTypeId = question.subQuestionTypeData[k].accountTypeId;
          subApplicantForm.applicationTypeId = question.subQuestionTypeData[k].applicationTypeId;
          subApplicantForm.questionId = question.subQuestionTypeData[k].questionId;
          subApplicantForm.ansTypeId = question.subQuestionTypeData[k].ansTypeId;
          subApplicantForm.ansId = question.subQuestionTypeData[k].id;
          subApplicantForm.isScreening = 0; // Add isScreening here
          applicantFormDetailsData.push(subApplicantForm);
          console.error(applicantForm);
        }
      }
    }

    payload.applicantFormDto.applicantFormDetailsData = applicantFormDetailsData;
    return payload;
  };


  const updateUiWithSavedData = async (
    questions: any[],
    customerData: kycForm[]
  ) => {
    if (customerData && customerData.length > 0 && questions) {
      console.error('customerData==========>>>', customerData);
      console.error('questions==========>>>', questions);

      for (let i = 0; i < questions.length; i++) {
        let question: any = questions[i].questionDto;
        let customerDataQuestion: any = customerData.find(
          (item) => item.kycFormDto.id === question.id
        );
        if (customerDataQuestion) {
          let value = customerDataQuestion.kycFormDto.kycAnswerData[0]?.answer;
          if (question.answerTypeData.length > 0) {
            for (let j = 0; j < question.answerTypeData.length; j++) {
              if (question.answerTypeData[j].name == value) {
                question["selectedValue"] = question.answerTypeData[j].name;
                break;
              }
            }
          }

          if (question.subQuestionTypeData.length > 0) {
            for (let k = 0; k < question.subQuestionTypeData.length; k++) {
              let customerDataSubQuestion: any = customerDataQuestion.kycFormDto.kycSubQueFormData.find(
                (item: any) => item.subQuestionId === question.subQuestionTypeData[k].id
              );
              console.error('question.subQuestionTypeData[k]======>>>', question.subQuestionTypeData[k]);

              if (question.subQuestionTypeData[k]?.name == customerDataSubQuestion?.name) {
                question.subQuestionTypeData[k]["selectedValue"] = customerDataSubQuestion.kycAnswerData[0].answer;
                question.subQuestionTypeData[k]["textValue"] = customerDataSubQuestion.kycAnswerData[0].answer;
              }
            }
          }

          else {
            question["textValue"] = value;
          }
        }
      }

    } else {
      setErrors([""]);
    }
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    const nameQuestion = fetchedQuestions
      .flatMap(question => question.questionDto)
      .find((q: { name: string; }) => q.name === "Name");

    const nameValue = nameQuestion ? nameQuestion.selectedValue : null;
    if (!nameValue || nameValue.trim() === "") {
      showErrorMessage("Name is required.");
      return;
    }
    const hasErrors = errors.some((error) => error !== "");
    if (hasErrors) {
      showErrorMessage("Please fix the errors before submitting.");
      return;
    }

    try {
      setLoading(true);
      let responseIdNumber;
      let kycData: any = constructSaveApplicationFormdata();

      console.error("kycData", kycData);
      const initialResponse = await applicationfrome.Apllicationinsert(
        kycData
      );
      fetchData(parseInt(initialResponse.id || props.kycId, 10), kycApplication);
      // updateUiWithSavedData(kycApplication, customerdata);
      setShowSaveBtn(true);
      // setShowDownloadButton(true);
      // props.renderDeclarationContent();
      if (initialResponse && initialResponse.id) {
        responseIdNumber = initialResponse.id;
        sessionStorage.setItem("responseId", responseIdNumber.toString());
        // setNoOfPrint(noOfPrint + 1);
        setResponseId(responseIdNumber);
        showSuccessMessage("Aml Kyc Questionnaire added successfully.");
        setErrorMessage(null);
        setTimeout(() => {
          setSaveClicked(true);
        }, 2000);
        props.renderDeclarationContent();

      } else {
        console.error("Failed to generate a new responseId");
        showErrorMessage("Failed to generate a new responseId");
        return;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showErrorMessage("Error submitting form, please try again.");
    }
    finally {
      setLoading(false);

    }
  };
  const handlestep5Submit = async () => {
    showSuccessMessage("Aml Kyc Questionnaire added successfully.");
  };

  const [kycId, setKycId] = useState(null);
  // Initialize the button state based on session storage
  useEffect(() => {
    const buttonDisabled = sessionStorage.getItem("buttonDisabled") === "true";
    setShowSaveBtn(!buttonDisabled);
  }, []);



  useEffect(() => {
    if (!kycId) {
      setShowSaveBtn(true); // Enable the button if kycId is cleared
    }
  }, [kycId]);
  const handleAdditionalAnswerChange = (index: number, value: string) => {
    const isSubAnswerNumber =
      value.trim() === "" || isNaN(parseInt(value, 10))
        ? 1
        : parseInt(value, 10);

    setAdditionalAnswers((prev) => ({ ...prev, [index]: value }));

    setFormData((prevFormData) => {
      const updatedFormDetails =
        prevFormData.applicantFormDto.applicantFormDetailsData.map(
          (item, idx) =>
            idx === index ? { ...item, isSubAnswer: isSubAnswerNumber } : item
        );
      return {
        ...prevFormData,
        applicantFormDto: {
          ...prevFormData.applicantFormDto,
          applicantFormDetailsData: updatedFormDetails,
        },
      };
    });
  };

  const formatDateToDDMMYYYY = (dateString: any) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("-");
    return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
  };


  const downloadPDFRef = React.useRef<() => void | null>(null);

  const handleDownloadClick = () => {
    if (downloadPDFRef.current) {
      downloadPDFRef.current();
    }
  };

  const downloadPDF = async () => {
    setDownloadingPDF(true);
    try {
      const response = await applicationfrome.getPrintNumber(responseId);
      const printNumber = response;
      await new Promise((resolve) => setTimeout(resolve, 0));
      const pdf = new jsPDF("p", "mm", "a4");
      const content = document.getElementById("pdfContent");
      if (!content) return;
      pdf.setFontSize(10);
      pdf.setFont("helvetica");
      content.style.display = "block";
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
        const imgData = canvas.toDataURL("image/png");
        if (i > 0) pdf.addPage();
        const textWidth = pdf.getTextWidth(`Count: ${printNumber}`);
        const xCoordinate = pageWidth - textWidth - padding;
        pdf.text(`Update: ${printNumber}`, xCoordinate, padding);
        pdf.addImage(
          imgData,
          "PNG",
          padding,
          padding,
          contentWidth,
          contentHeight
        );
        pdf.setLineWidth(0.2);
        pdf.setDrawColor(0, 0, 0);
        pdf.rect(padding, padding, contentWidth, contentHeight);
      }
      pdf.save("application_form.pdf");
      setDownlodClicked(true);
      showSuccessMessage("Download successfully.");
    } catch (error) {
      setErrors(["Error generating PDF"]);
      setDownlodClicked(false);
    } finally {
      const content = document.getElementById("pdfContent");
      if (content) content.style.display = "none";
      setDownloadingPDF(false);
      setDownloadCount((prevCount) => prevCount + 1);
      setDownlodClicked(true);
    }
    setIsLevelcasedetailsOpen(true);
    setIsUploadSectionOpen(false);
  };

  const Signonupload = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    setLoading(true);
    try {
      const responseId = sessionStorage.getItem("responseId");
      if (!responseId) {
        console.error("No responseId found in session storage");
        showErrorMessage("No responseId found in session storage");
        setLoading(false);
        return;
      }
      const documentTypeId = 1;

      console.log("Selected files:", selectedFiles);

      if (selectedFiles.length === 0) {
        console.error("No files selected for submission");
        showErrorMessage("No files selected for submission");
        setLoading(false);
        return;
      }

      console.log(
        "Submitting files with responseId:",
        responseId,
        "and documentTypeId:",
        documentTypeId
      );
      await documentApiService.saveFormCustomerRequest(
        selectedFiles,
        parseInt(responseId, 10),
        documentTypeId
      );
      showSuccessMessage("Signonupload added successfully.");
      setSignUploadBtnClicked(true);
      console.log("Files submitted successfully");
    } catch (error) {
      setSignUploadBtnClicked(false);
      console.error("Error submitting files:", error);
      showErrorMessage("Error submitting files.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const handleChooseImagesClick1 = (index1: number) => {
    document.getElementById(`image-upload-input1-${index1}`)?.click();
  };

  const handleFileChange4 = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files) as File[];
      const nameWithoutExtension = selectedFiles[0].name.replace(
        /\.[^/.]+$/,
        ""
      );
      setImages((prevFields) => {
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

  const handleSubmits = async (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    try {
      const responseId = sessionStorage.getItem("responseId");
      if (!responseId) {
        console.error("No responseId found in session storage");
        return;
      }
      const documentTypeId = 1;

      console.log("Selected files:", selectedFiles);

      if (selectedFiles.length === 0) {
        console.error("No files selected for submission");
        return;
      }

      console.log(
        "Submitting files with responseId:",
        responseId,
        "and documentTypeId:",
        documentTypeId
      );
      await documentApiService.saveCustomerRequest(
        selectedFiles,
        parseInt(responseId, 10),
        documentTypeId
      );
      console.log("Files submitted successfully");
      setViewBtnClicked(true);
    } catch (error) {
      setViewBtnClicked(false);
      console.error("Error submitting files:", error);
    }
  };

  const handlesave = async () => {
    await handleSubmits();
    // await Signonupload();
  };

  const [showImageModal, setShowImageModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [pdfData, setPdfData] = useState<{
    base64: string | null;
    filename: string | null;
  }>({ base64: null, filename: null });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const customerApiService = new DocumentApiService();

  const handleView = async () => {
    console.log("handleView called");
    setLoading(true);
    setShowPdfModal(true);
    try {
      const responseId = sessionStorage.getItem("responseId");
      if (!responseId) {
        console.error("No responseId found in session storage");
        setLoading(false);
        return;
      }
      const pdfData = await customerApiService.getkycPDF(responseId, 1);
      console.log("PDF data:", pdfData);
      setPdfData({ base64: pdfData.data, filename: pdfData.filename });
      setShowPdfModal(true);
      setLoading(false);
      setViewBtnClicked(true);
      console.log("PDF modal set to open");
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setPdfData({ base64: null, filename: null });
      setErrorMessage("No PDF available");
      setShowPdfModal(false);
      setViewBtnClicked(false);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log("Document loaded with", numPages, "pages"); // Added logging
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
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const handleImageClick = async (branchId: number) => {
      if (branchId) {
        try {
          const branchId = 1;
          const imageData = await customerApiService.getLetterHead(branchId);
          const base64String = arrayBufferToBase64(imageData);
          setImageURL(base64String);
          console.log("base64String", base64String);
        } catch (error) {
          console.error("Error fetching image:", error);
          setImageURL("");
          // setErrorMessage("No image available");
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
    return `data:image/png;base64,${btoa(bytes.join(""))}`;
  };

  return (
    <>

      <Container
        style={{ width: "274mm", minHeight: "297mm", marginTop: "5%" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {pages && pages.map((pageContent, pageIndex) => (
            <Paper key={pageIndex} elevation={10} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: "100%",
                  padding: "20px",
                }}
              >
                {/* <div>
                  {imageURL && (
                    <img
                      src={imageURL}
                      alt="Ponsun"
                      style={{
                        display: "block",
                        margin: "0 auto",
                        maxWidth: "35%",
                        height: "auto",
                        maxHeight: "200px",
                        marginBottom: "20px",
                      }}
                    />
                  )}
                </div> */}
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ fontSize: "small" }}>
                        <TableCell
                          sx={{
                            width: "10%",
                            padding: "5px",
                            fontSize: "0.875rem",
                            backgroundColor: "#d6d0d09e",
                          }}
                        >
                          Sl.no
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "40%",
                            padding: "5px",
                            fontSize: "0.875rem",
                            backgroundColor: "#d6d0d09e",
                          }}
                        >
                          Question
                        </TableCell>
                        <TableCell
                          sx={{
                            width: "50%",
                            padding: "5px",
                            fontSize: "0.875rem",
                            backgroundColor: "#d6d0d09e",
                            margin: 'auto', textAlign: 'center'
                          }}
                        >
                          Answer
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pageContent.map((item: any, index: any) => (
                        <React.Fragment key={index}>
                          <TableRow>
                            <TableCell
                              sx={{
                                width: "10%",
                                padding: "20px",
                                fontSize: "0.75rem",
                                whiteSpace: "pre-wrap",
                                fontWeight: "900",
                              }}
                            >
                              {index + 1 + pageIndex * itemsPerPage}
                            </TableCell>
                            <TableCell
                              sx={{
                                width: "40%",
                                padding: "4px",
                                fontSize: "0.75rem",
                                whiteSpace: "pre-wrap",
                                fontWeight: "900",
                              }}
                            >
                              <span>{item.questionDto.name}</span>
                              <span>{item.questionDto.multiQuestion === 1 &&
                                item.questionDto.subQuestionTypeData &&
                                item.questionDto.subQuestionTypeData.map(
                                  (subQuestion: any) => (
                                    <Typography key={subQuestion.id}>
                                      <span>{subQuestion.name}:</span>
                                    </Typography>
                                  )
                                )}</span>
                              <span>{item.questionDto.ansTypeId === 2 && (
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  <span>{item.questionDto.description}</span>
                                </Typography>
                              )}</span>
                            </TableCell>
                            <TableCell
                              sx={{
                                width: "50%",
                                padding: "4px",
                                fontSize: "0.75rem",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              <span>{item.questionDto.multiQuestion === 1 &&
                                item.questionDto.subQuestionTypeData &&
                                item.questionDto.subQuestionTypeData.map(
                                  (subQuestion: any, subIndex: number) => (
                                    <React.Fragment key={subQuestion.id}>
                                      <span>

                                        {subQuestion.ansTypeId === 2 ? (
                                          <>
                                            <Select
                                              style={{ fontSize: "small" }}
                                              fullWidth
                                              size="small"
                                              value={
                                                subQuestion.textValue
                                                  ? subQuestion.textValue
                                                  : ''
                                              }
                                              // value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.subQuestionId === subQuestion.id)?.answer || ''}
                                              onChange={(e) =>
                                                handleAnswerChange(
                                                  index +
                                                  pageIndex * itemsPerPage,
                                                  e.target.value,
                                                  true,
                                                  subQuestion.id
                                                )
                                              }
                                            >

                                            </Select>
                                            {showInputBox[
                                              index + pageIndex * itemsPerPage
                                            ] && (
                                                <TextField
                                                  sx={{
                                                    fontSize: "x-small",
                                                    marginTop: "10px",
                                                  }}
                                                  fullWidth
                                                  size="small"
                                                  autoComplete="off"
                                                  multiline
                                                  placeholder="Please provide additional details"
                                                  value={
                                                    additionalAnswers[
                                                    index +
                                                    pageIndex * itemsPerPage
                                                    ]
                                                  }
                                                  InputLabelProps={{ className: 'inputFeild' }}
                                                  InputProps={{ className: 'inputFeild' }}
                                                  onChange={(e) =>
                                                    handleAdditionalAnswerChange(
                                                      index +
                                                      pageIndex * itemsPerPage,
                                                      e.target.value
                                                    )
                                                  }
                                                />
                                              )}
                                          </>
                                        ) : (
                                          <TextField
                                            sx={{ fontSize: "x-small" }}
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            multiline
                                            placeholder="name text"
                                            value={subQuestion.textValue}
                                            InputLabelProps={{ className: 'inputFeild' }}
                                            InputProps={{ className: 'inputFeild' }}
                                            onChange={(e) =>
                                              handleAnswerChange(
                                                index +
                                                pageIndex * itemsPerPage,
                                                e.target.value,
                                                true,
                                                subQuestion.id
                                              )
                                            }
                                          />
                                        )}
                                      </span>
                                      {errors[
                                        index + pageIndex * itemsPerPage
                                      ] && (
                                          <Typography
                                            variant="caption"
                                            color="error"
                                          >
                                            {
                                              errors[
                                              index + pageIndex * itemsPerPage
                                              ]
                                            }
                                          </Typography>
                                        )}
                                    </React.Fragment>
                                  )
                                )}</span>
                              <span>
                                {!item.questionDto.multiQuestion &&
                                  item.questionDto.ansTypeId === 2 && (
                                    <>
                                      <Select
                                        style={{ fontSize: "small" }}
                                        fullWidth
                                        size="small"
                                        value={
                                          item.questionDto.selectedValue
                                            ? item.questionDto.selectedValue
                                            : ""
                                        }
                                        // value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.questionId === item.questionDto.id)?.answer || ''}
                                        onChange={(e) =>
                                          handleAnswerChange(
                                            index +
                                            pageIndex * itemsPerPage,
                                            e.target.value,
                                            false
                                          )
                                        }
                                      >
                                        {item.questionDto.answerTypeData.map(
                                          (
                                            answer: { name: string },
                                            answerIndex: React.Key
                                          ) => (
                                            <MenuItem
                                              style={{
                                                height: "2rem",
                                                fontSize: "0.75rem",
                                              }}
                                              key={answerIndex}
                                              value={answer.name}
                                            >
                                              <span>{answer.name}</span>
                                            </MenuItem>
                                          )
                                        )}
                                      </Select>
                                      {showInputBox[
                                        index + pageIndex * itemsPerPage
                                      ] && (
                                          <TextField
                                            sx={{
                                              fontSize: "x-small",
                                              marginTop: "10px",
                                            }}
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            multiline
                                            placeholder="Please provide additional details"
                                            value={
                                              additionalAnswers[
                                              index + pageIndex * itemsPerPage
                                              ]
                                            }
                                            InputLabelProps={{ className: 'inputFeild' }}
                                            InputProps={{ className: 'inputFeild' }}
                                            onChange={(e) =>
                                              handleAdditionalAnswerChange(
                                                index + pageIndex * itemsPerPage,
                                                e.target.value
                                              )
                                            }
                                          />
                                        )}
                                    </>
                                  )}
                              </span>
                              <span>

                                {!item.questionDto.multiQuestion &&
                                  item.questionDto.ansTypeId !== 2 && (
                                    <TextField
                                      sx={{ fontSize: "x-small" }}
                                      fullWidth
                                      size="small"
                                      autoComplete="off"
                                      placeholder="text field"
                                      // value={formData.applicantFormDto.applicantFormDetailsData.find(detail => detail.questionId === item.questionDto.id)?.answer || ''}
                                      value={item.questionDto.textValue}
                                      InputLabelProps={{ className: 'inputFeild' }}
                                      InputProps={{ className: 'inputFeild' }}
                                      onChange={(e) =>
                                        handleAnswerChange(
                                          index + pageIndex * itemsPerPage,
                                          e.target.value,
                                          false
                                        )
                                      }
                                    />
                                  )}
                                {errors[index + pageIndex * itemsPerPage] && (
                                  <Typography variant="caption" color="error">
                                    {errors[index + pageIndex * itemsPerPage]}
                                  </Typography>
                                )}
                              </span>

                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <div
                  style={{
                    textAlign: "right",
                    marginTop: "16px",
                    position: "absolute",
                    right: "20px",
                    fontSize: "small",
                    bottom: "0px",

                  }}
                >
                  Page : {pageIndex + 1}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    position: "absolute",
                    fontSize: "small",
                    // bottom: "15px",

                  }}
                >
                  Update: {printNumber}
                </div>
              </div>


            </Paper>
          ))}
          <Paper elevation={10} style={{ marginBottom: "20px" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                minHeight: "100%",
                padding: "20px",
              }}
            >

              <div style={a4SheetStyles}>

                <table style={tableStyles}>
                  <tbody>
                    <tr style={evenRowStyles}>
                      <td style={{ ...cellStyle, width: "30%" }}>
                        <strong>Name</strong>
                      </td>
                      <td style={{ ...cellStyle, width: "70%" }}> </td>
                    </tr>
                    <tr>
                      <td style={{ ...cellStyle, width: "30%" }}>
                        <strong>Designation</strong>
                      </td>
                      <td style={{ ...cellStyle, width: "70%" }}> </td>
                    </tr>
                    <tr style={evenRowStyles}>
                      <td style={{ ...cellStyle, width: "30%" }}>
                        <strong>Signature</strong>
                      </td>
                      <td style={{ ...cellStyle, width: "70%" }}> </td>
                    </tr>
                    <tr>
                      <td style={{ ...cellStyle, width: "30%" }}>
                        <strong>Seal of the Member</strong>
                      </td>
                      <td style={{ ...cellStyle, width: "70%" }}> </td>
                    </tr>
                    <tr style={evenRowStyles}>
                      <td style={{ ...cellStyle, width: "30%" }}>
                        <strong>Date</strong>
                      </td>
                      <td style={{ ...cellStyle, width: "70%" }}> </td>
                    </tr>
                    <tr>
                      <td style={{ ...cellStyle, width: "30%" }}>
                        <strong>Place</strong>
                      </td>
                      <td style={{ ...cellStyle, width: "70%" }}> </td>
                    </tr>
                  </tbody>
                </table>

                {/* <img
                  src={contactImage}
                  alt="Contact"
                  style={{
                    display: "block",
                    margin: "20px auto 0",
                    maxWidth: "55%",
                  }}
                /> */}
                <div
                  style={{
                    textAlign: "right",
                    marginTop: "16px",
                    position: "absolute",
                    right: "20px",
                    fontSize: "small",
                    bottom: "15px",

                  }}
                >
                  Page : {6}
                </div>
                <div
                  style={{
                    textAlign: "right",
                    position: "absolute",
                    fontSize: "small",
                    bottom: "15px",

                  }}
                >
                  Update: {printNumber}
                </div>
              </div>
            </div>
          </Paper>


          {dataFetched && (
            <div>
              {applicationTypeId === 1 && accountTypeId === 2 && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className="arroww" style={{ marginRight: "10px" }}>
                    <span style={{ textAlign: "center" }}>Step 1:</span>
                  </div>

                  <button style={{ width: '12%' }}
                    className='btn btn-primary btn-sm'
                    onClick={() => {
                      handleSubmit();


                    }}

                    disabled={!showSaveBtn}
                  >
                    Save</button>

                  <br />

                </div>
              )}
              <br></br>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="arroww" style={{ marginRight: "10px" }}>
                  <span style={{ textAlign: "center" }}>Step 2:</span>
                </div>
                <button style={{ width: '12%' }} className={`btn btn-sm ${saveClicked ? 'btn-primary' : 'btn-secondary'}`} onClick={downloadPDF} disabled={!saveClicked}>Download</button>

              </div>

              <br></br>
              {downloadingPDF && (
                <p style={{ color: "red" }}>
                  Please wait for the download...
                </p>
              )}
              {isLevelcasedetailsOpen && (
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      {images.map((image, index) => (
                        <Grid item xs={12} key={index}>
                          <form
                            onSubmit={handleSubmits}
                            encType="multipart/form-data"
                          >
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
                                    style={{ display: "none" }}
                                    multiple
                                  />

                                  <Button
                                    variant="outlined"
                                    onClick={() =>
                                      handleChooseImagesClick1(index)
                                    }
                                    style={{ marginRight: "10px" }}
                                  >
                                    Document
                                  </Button>
                                  <TextField
                                    style={{ width: "50%" }}
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="arroww" style={{ marginRight: "10px" }}>
                  <span style={{ textAlign: "center" }}>Step 3:</span>
                </div>
                {/* <button className='btn btn-primary btn-sm' onClick={Signonupload}>Sign on upload</button> */}
                <form onSubmit={Signonupload} style={{ width: "11%" }}>
                  <button
                    style={{ width: '109%', marginLeft: '-1%' }}  // Matching the width style
                    className={`btn btn-sm ${downlodClicked ? 'btn-primary' : 'btn-secondary'}`}  // Matching the class names and conditional styling
                    disabled={!downlodClicked}  // Matching the disabled condition
                  >
                    Sign on upload
                  </button>
                </form>
                {loading && <Loader />}

              </div>

              <br></br>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="arroww" style={{ marginRight: "10px" }}>
                  <span style={{ textAlign: "center" }}>Step 4:</span>
                </div>
                {/* <button
                  style={{ width: "12%" }}
                  className="btn btn-primary btn-sm"
                  disabled={!signUploadBtnClicked}
                  onClick={handleView}
                >
                  View
                </button> */}
                <button
                  style={{ width: "12%" }}
                  className={`btn btn-sm ${signUploadBtnClicked ? 'btn-primary' : 'btn-secondary'}`}
                  disabled={!signUploadBtnClicked}
                  onClick={handleView}
                >
                  View
                </button>
                {errorMessage && (
                  <Typography
                    variant="body1"
                    style={{ color: "red", textAlign: "center", marginLeft: '1%' }}
                  >
                    {errorMessage}
                  </Typography>
                )}
              </div>
              <br></br>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="arroww" style={{ marginRight: "10px" }}>
                  <span style={{ textAlign: "center" }}>Step 5:</span>
                </div>
                <div style={{ width: '6%' }}>
                  {/* <button
                    style={{ width: "200%" }}
                    className="btn btn-primary btn-sm"
                    onClick={handlesave}
                    disabled={!viewBtnClicked}
                  >
                    Submit
                  </button> */}
                  <button
                    style={{ width: "200%" }}
                    className={`btn btn-sm ${viewBtnClicked ? 'btn-primary' : 'btn-secondary'}`}
                    // onClick={handlesave}
                    onClick={() => {
                      handlestep5Submit();

                      // setSaveClicked(true);

                    }}
                    disabled={!viewBtnClicked}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          <br></br>
        </LocalizationProvider>
      </Container>

      <Card>
        <div>
          <Dialog
            open={showImageModal}
            onClose={handleCloseImageModal}
            fullWidth
            maxWidth="xl"
          >
            <DialogTitle>Image Preview</DialogTitle>
            <DialogContent>
              {base64Image && (
                <img
                  src={`data:image/png;base64,${base64Image}`}
                  alt="Image Preview"
                />
              )}
              {errorMessage && (
                <Typography variant="body1">{errorMessage}</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseImageModal}>Close</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={showPdfModal} onClose={handleClosePdfModal} maxWidth="md">
            {loading && <Loader />}
            <DialogTitle>
              PDF Preview
              <IconButton
                aria-label="close"
                onClick={handleClosePdfModal}
                style={{ position: "absolute", right: 8, top: 8, color: "#aaa" }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent
              dividers={true}
              style={{
                overflow: "auto",
                padding: 0,
                margin: 0,
              }}
            >
              {pdfData.base64 && (
                <div
                  style={{
                    border: "1px solid #e0e0e0",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: '100%',
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
                          margin: 0,
                          padding: 0,
                          display: "flex",
                          justifyContent: "center",
                          overflow: "hidden",
                          height: 'auto',
                        }}
                      >
                        <Page
                          pageNumber={index + 1}
                          width={Math.min(window.innerWidth * 0.85, 800)}
                          scale={1.1}
                        />
                      </div>
                    ))}
                  </Document>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              {pdfData.filename && (
                <Button
                  href={`data:application/pdf;base64,${pdfData.base64}`}
                  download={pdfData.filename}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                >
                  Download PDF
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </div>

        <div
          id="pdfContent"
          style={{ display: "none", fontFamily: "Arial, sans-serif" }}
        >
          {pageView && pageView.map((pageContent, pageIndex) => (
            <div key={pageIndex} style={a4SheetStyle}>
              <Paper
                style={{
                  marginBottom: "20px",
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div ref={contentRef} style={pageContentStyle}>
                  <img
                    src={imageURL}
                    alt="Ponsun"
                    style={{ ...contactImageStyle, marginBottom: "20px" }}
                  />
                  <TableContainer style={tableContainerStyle}>
                    <Table>
                      <TableHead>
                        <TableRow
                          style={{
                            fontSize: "12px",
                            backgroundColor: "#d6d0d09e",
                          }}
                        >
                          <TableCell style={tableCellStyle}>Sl.no</TableCell>
                          <TableCell
                            style={{ ...tableCellStyle, width: "60%" }}
                          >
                            Question
                          </TableCell>
                          <TableCell
                            style={{ ...tableCellStyle, width: "30%" }}
                          >
                            Answer
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pageContent &&
                          pageContent.map((item: any, index: any) => (
                            <TableRow key={index}>
                              <TableCell
                                style={{
                                  ...tableCellStyle,
                                  fontWeight: "bold",
                                }}
                              >
                                {index + 1 + pageIndex * itemsPerPagePdf}{" "}
                              </TableCell>
                              {/* <TableCell
                                style={{ width: "40%", padding: "4px" }}
                              >
                                {item && item.questionDto.name}
                                {item && item.questionDto.description && (
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                  >
                                    {item.description}
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell>
                                {(item && item.questionDto.selectedValue) ||
                                  item.questionDto.textValue ||
                                  "No answer available"}
                                {errors[index + pageIndex * itemsPerPage] && (
                                  <Typography variant="caption" color="error">
                                    {errors[index + pageIndex * itemsPerPage]}
                                  </Typography>
                                )}
                              </TableCell> */}
                              <TableCell
                                style={{ width: "40%", padding: "4px" }}
                              >
                                {item && item.questionDto ? (
                                  <>
                                    {item.questionDto.name}
                                    {console.log(item.questionDto)}
                                    {item.questionDto.description && (
                                      <Typography
                                        variant="body2"
                                        color="textSecondary"
                                      >
                                        {item.questionDto.description}
                                      </Typography>
                                    )}
                                  </>
                                ) : null}
                              </TableCell>
                              <TableCell>
                                {item && item.questionDto ? (
                                  item.questionDto.id === 17 ? (
                                    <>
                                      <Typography variant="body2" color="textSecondary">
                                        {item.questionDto.subQuestionTypeData.map((subQuestion: any) => (
                                          <div key={subQuestion.id}>
                                            <strong>{subQuestion.name}:</strong> {subQuestion.selectedValue || "No answer available"}
                                          </div>
                                        ))}
                                      </Typography>
                                    </>
                                  ) : (
                                    <>
                                      {(item.questionDto.selectedValue || item.questionDto.textValue) || "No answer available"}
                                    </>
                                  )
                                ) : null}
                                {errors[index + pageIndex * itemsPerPage] && (
                                  <Typography variant="caption" color="error">
                                    {errors[index + pageIndex * itemsPerPage]}
                                  </Typography>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <div style={footerStyle}>
                    {/* <img
                      src={contactImage}
                      alt="Contact"
                      style={{ maxWidth: '55%' }}
                    /> */}
                    <div style={pageNumberStyle}>
                      {/* Update: {formData.applicantFormDto.numberOfPrint}, Page :{" "} */}
                      {pageIndex + 1}
                    </div>
                  </div>
                </div>

              </Paper>
            </div>
          ))}
          <div style={a4SheetStyle}>
            {/* <img
              src={imageURL}
              alt="Ponsun"
              style={{ ...contactImageStyle, marginBottom: "20px" }}
            /> */}
            <table style={tableStyle}>
              <tbody>
                <tr style={evenRowStyle}>
                  <td style={{ ...cellStyle, width: "30%" }}>
                    <strong>Name</strong>
                  </td>
                  <td style={{ ...cellStyle, width: "70%" }}> </td>
                </tr>
                <tr>
                  <td style={{ ...cellStyle, width: "30%" }}>
                    <strong>Designation</strong>
                  </td>
                  <td style={{ ...cellStyle, width: "70%" }}> </td>
                </tr>
                <tr style={evenRowStyle}>
                  <td style={{ ...cellStyle, width: "30%" }}>
                    <strong>Signature</strong>
                  </td>
                  <td style={{ ...cellStyle, width: "70%" }}> </td>
                </tr>
                <tr>
                  <td style={{ ...cellStyle, width: "30%" }}>
                    <strong>Seal of the Member</strong>
                  </td>
                  <td style={{ ...cellStyle, width: "70%" }}> </td>
                </tr>
                <tr style={evenRowStyle}>
                  <td style={{ ...cellStyle, width: "30%" }}>
                    <strong>Date</strong>
                  </td>
                  <td style={{ ...cellStyle, width: "70%" }}> </td>
                </tr>
                <tr>
                  <td style={{ ...cellStyle, width: "30%" }}>
                    <strong>Place</strong>
                  </td>
                  <td style={{ ...cellStyle, width: "70%" }}> </td>
                </tr>
              </tbody>
            </table>
            <div style={footerStyle}>
              <img
                src={contactImage}
                alt="Contact"
                style={{ maxWidth: '55%' }}
              />
              <div style={pageNumberStyle}>
                Update: {formData.applicantFormDto.numberOfPrint}, Page :{" "}
                {1}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Snackbar
        open={isSuccessOpen}
        autoHideDuration={5000}
        onClose={() => setIsSuccessOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
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
          vertical: "top",
          horizontal: "right",
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
      {/* </Box>
            </Box> */}
    </>
  );
};

export default ApplicationForm;


