import React, { useEffect, useRef, useState } from 'react';

import { Box, Card, Grid, Typography, Button, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, SelectChangeEvent, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { EntityScore, NegativeScore, PepScore, RiskRange, Score, ScoreDocument, kycForm } from '../../../data/services/kyc/applicationfrom/applicationfrome-payload';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import ponsunImage from '../../../assets/ponsun.png';
import contactImage from '../../../assets/contact.png';

// import ponsunImage from '../../../src/assets/ponsun.png';
// import contactImage from '../../../src/assets/contact.png';
import ApplicationfromeService from '../../../data/services/kyc/applicationfrom/applicationfrome-api-service';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useApplicationContext } from '../../kyc/Insert/ApplicationContext';
// import { useApplicationContext } from '../kyc/Insert/ApplicationContext';
import { useParams } from 'react-router-dom';
interface DocumentUploadProps {
    label: string;
    pepScore?: PepScore[];
    negativeScore?: NegativeScore[];
    entityScore?: EntityScore[];
    selectedValue: string;
    handleScoreChange: (event: SelectChangeEvent) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface CustomerData {
    kycFormDto: kycForm;
};

interface PepScores {
    id: number;
    name: string,
    score: number,
};



const DocumentUpload: React.FC<DocumentUploadProps> = ({ label, pepScore,
    negativeScore,
    entityScore,
    selectedValue,
    handleScoreChange, handleFileChange }) => (

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <label htmlFor="file-input">
            <IconButton component="span" sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}>
                <CloudUploadIcon />
            </IconButton>
        </label>
        <input id="file-input" type="file" hidden multiple onChange={handleFileChange} />
        {pepScore && (
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id={`${label}-pep-label`}>Pep</InputLabel>
                <Select labelId={`${label}-pep-label`} label="Pep" value={selectedValue} onChange={handleScoreChange}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {pepScore.map(score => (
                        <MenuItem key={score.id} value={score.id}>
                            {score.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )}
        {negativeScore && (
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id={`${label}-negative-label`}>Negative Score</InputLabel>
                <Select
                    labelId={`${label}-negative-label`}
                    label="Negative Score"
                    value={selectedValue}
                    onChange={handleScoreChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {negativeScore.map(score => (
                        <MenuItem key={score.id} value={score.id}>
                            {score.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )}
        {entityScore && (
            <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id={`${label}-entity-label`}>Entity Score</InputLabel>
                <Select
                    labelId={`${label}-entity-label`}
                    label="Entity Score"
                    value={selectedValue}
                    onChange={handleScoreChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {entityScore.map(score => (
                        <MenuItem key={score.id} value={score.id}>
                            {score.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        )}
    </Box>
);
const defaultScoreDocument: ScoreDocument = {
    id: 0,
    kycId: 0,
    pepScoreId: 0,
    negativeMediaId: 0,
    entityId: 0,
    pepScore: 0,
    negativeMediaScore: 0,
    entityScore: 0,
    questionnairsScore: 0,
    uid: 0,
    euid: 0
};

const Periodic = () => {
    const [pepFiles, setPepFiles] = useState<File[]>([]);
    const [negativeFiles, setNegativeFiles] = useState<File[]>([]);
    const [entityFiles, setEntityFiles] = useState<File[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const contentRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<kycForm[]>([]);
    const [loading, setLoading] = useState(true);
    const applicationfrome = new ApplicationfromeService();

    const { kycId } = useParams<{ kycId: string }>();
    const kycIds = kycId ? parseInt(kycId, 10) : 0;
    const [kycIdState, setKycId] = useState<number | null>(null);


    console.log('sessionStorage kycId:', kycIds);
    const [pepScore, setPepScore] = useState<PepScores[]>([]);
    const [negativeScore, setNegativeScore] = useState<NegativeScore[]>([]);
    const [entityScore, setEntityScore] = useState<EntityScore[]>([]);
    const [score, setScore] = useState<Score[]>([]);
    const [riskRange, setRiskRange] = useState<RiskRange[]>([]);
    const [riskClassification, setRiskClassification] = useState<string>('');
    const [selectedPepScore, setSelectedPepScore] = useState<string>("");
    const [selectedNegativeScore, setSelectedNegativeScore] = useState<string>("");
    const [selectedEntityScore, setSelectedEntityScore] = useState<string>("");
    const [averagePepScore, setAveragePepScore] = useState<number>(0);
    const [averageNegativeScore, setAverageNegativeScore] = useState<number>(0);
    const [averageEntityScore, setAverageEntityScore] = useState<number>(0);
    const [files, setFiles] = useState<File[]>([]);
    const [pathId, setPathId] = useState<number[]>([]);
    const [pathId1, setPathId1] = useState<number[]>([]);
    const [pathId2, setPathId2] = useState<number[]>([]);
    const [scoreDocument, setScoreDocument] = useState<ScoreDocument>(defaultScoreDocument);

    const [isChecked, setIsChecked] = useState<number[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, category: 'pep' | 'negative' | 'entity') => {
        if (event.target.files && event.target.files.length > 0) {
            const filesArray = Array.from(event.target.files);
            switch (category) {
                case 'pep':
                    setPepFiles(prevFiles => [...prevFiles, ...filesArray]);
                    break;
                case 'negative':
                    setNegativeFiles(prevFiles => [...prevFiles, ...filesArray]);
                    break;
                case 'entity':
                    setEntityFiles(prevFiles => [...prevFiles, ...filesArray]);
                    break;
                default:
                    break;
            }
        }
    };

    const handlePepScoreChange = (event: SelectChangeEvent<string>) => {
        const selectedScoreId = parseInt(event.target.value, 10);
        const selectedScore = pepScore.find(score => score.id === selectedScoreId);
        if (selectedScore) {
            console.log('Selected Pep Score:', selectedScore);
        }
        setSelectedPepScore(event.target.value);
    };

    const handleNegativeScoreChange = (event: SelectChangeEvent<string>) => {
        const selectedScoreId = parseInt(event.target.value, 10);
        const selectedScore = negativeScore.find(score => score.id === selectedScoreId);
        if (selectedScore) {
            console.log('Selected Negative Score:', selectedScore);
        }
        setSelectedNegativeScore(event.target.value);
    };

    const handleEntityScoreChange = (event: SelectChangeEvent<string>) => {
        const selectedScoreId = parseInt(event.target.value, 10);
        const selectedScore = entityScore.find(score => score.id === selectedScoreId);
        if (selectedScore) {
            console.log('Selected Entity Score:', selectedScore.id);
        }
        setSelectedEntityScore(event.target.value);
    };


    useEffect(() => {
        if (kycId) {
            fetchScore(kycId.toString());
            console.log('kycId:', kycId);

        }
    }, [kycId]);
    useEffect(() => {
        fetchPepScore();
        fetchNegativeSearch();
        fetchEntityScore();
        fetchRiskRange();

    }, []);


    const fetchPepScore = async () => {
        try {
            const pepScore = await applicationfrome.getPepScore();
            setPepScore(pepScore);
            setPathId([1]);
        } catch (error) {
            console.error("Error fetching application types:", error);
        }
    };
    const fetchNegativeSearch = async () => {
        try {
            const negativeScore = await applicationfrome.getNegativeSearch();
            setNegativeScore(negativeScore);
            setPathId1([2]);
        } catch (error) {
            console.error("Error fetching application types:", error);
        }
    };
    const fetchEntityScore = async () => {
        try {
            const entityScore = await applicationfrome.getEntityScore();
            setEntityScore(entityScore);
            setPathId2([3]);
        } catch (error) {
            console.error("Error fetching application types:", error);
        }
    };
    const fetchScore = async (kycId: string) => {
        try {
            const score = await applicationfrome.getScore(kycId);
            setScore(score);
            console.log("score", score)
        } catch (error) {
            console.error("Error fetching application types:", error);
        }
    };
    const fetchRiskRange = async () => {
        try {
            const response = await applicationfrome.getRiskRange();
            setRiskRange(response);
        } catch (error) {
            console.error("Error fetching risk range:", error);
        }
    };
    const calculateAverageScore = (score: number) => {
        return (score / 100) * 20;
    };

    // const calculateAverageScores = () => {
    //     const selectedPep = pepScore.find(score => score.id === parseInt(selectedPepScore));
    //     const selectedNegative = negativeScore.find(score => score.id === parseInt(selectedNegativeScore));
    //     const selectedEntity = entityScore.find(score => score.id === parseInt(selectedEntityScore));

    //     if (selectedPep && selectedNegative && selectedEntity) {
    //         const averagePep = (selectedPep.score / 100) * 20;
    //         const averageNegative = (selectedNegative.score / 100) * 20;
    //         const averageEntity = (selectedEntity.score / 100) * 20;

    //         setAveragePepScore(averagePep);
    //         setAverageNegativeScore(averageNegative);
    //         setAverageEntityScore(averageEntity);

    //         return { averagePep, averageNegative, averageEntity };
    //     } else {
    //         console.error("Unable to calculate average scores: Invalid selected scores");
    //         return null;
    //     }
    // };

    // const classifyRisk = (averageTotal: number) => {
    //     let classification = 'Unknown';
    //     riskRange.forEach(range => {
    //         if (averageTotal >= range.rangeFrm && averageTotal <= range.rangeTo) {
    //             classification = range.risk_classification;
    //         }
    //     });
    //     return classification;
    // };

    // const createScoreCalculationRequest = (averagePep: number, averageNegative: number, averageEntity: number) => {
    //     if (kycIds === null) {
    //         console.error('Invalid kycIds');
    //         return null;
    //     }
    //     return {
    //         id: scoreDocument.id,
    //         kycId: kycIds,
    //         pepScoreId: selectedPepScore ? parseInt(selectedPepScore, 10) : 0,
    //         negativeMediaId: selectedNegativeScore ? parseInt(selectedNegativeScore, 10) : 0,
    //         entityId: selectedEntityScore ? parseInt(selectedEntityScore, 10) : 0,
    //         pepScore: averagePep,
    //         negativeMediaScore: averageNegative,
    //         entityScore: averageEntity,
    //         questionnairsScore: scoreDocument.questionnairsScore,
    //         uid: scoreDocument.uid,
    //         euid: scoreDocument.euid
    //     };
    // };

    // const handleSaveButtonClick = async () => {
    //     const scores = calculateAverageScores();

    //     if (scores && riskRange && riskRange.length > 0) {
    //         const { averagePep, averageNegative, averageEntity } = scores;
    //         const averageTotal = (averagePep + averageNegative + averageEntity) / 3;
    //         const classification = classifyRisk(averageTotal);

    //         const scoreCalculationRequest = createScoreCalculationRequest(averagePep, averageNegative, averageEntity);
    //         const allFiles = [...pepFiles, ...negativeFiles, ...entityFiles];
    //         const allPathIds = [...pathId, ...pathId1, ...pathId2];

    //         try {
    //             const response = await applicationfrome.uploadScoreDocument(allFiles, [kycId], allPathIds, scoreCalculationRequest);
    //             console.log('Response:', response);
    //         } catch (error) {
    //             console.error(`Error uploading score document: ${error}`);
    //         }

    //         setRiskClassification(classification);
    //     } else {
    //         console.error("Unable to calculate risk classification: Risk range data is not available");
    //     }
    // };

    const calculateAverageScores = () => {
        const selectedPep = pepScore.find(score => score.id === parseInt(selectedPepScore));
        const selectedNegative = negativeScore.find(score => score.id === parseInt(selectedNegativeScore));
        const selectedEntity = entityScore.find(score => score.id === parseInt(selectedEntityScore));

        if (selectedPep && selectedNegative && selectedEntity) {
            const averagePep = (selectedPep.score / 100) * 20;
            const averageNegative = (selectedNegative.score / 100) * 20;
            const averageEntity = (selectedEntity.score / 100) * 20;

            setAveragePepScore(averagePep);
            setAverageNegativeScore(averageNegative);
            setAverageEntityScore(averageEntity);

            return { averagePep, averageNegative, averageEntity };
        } else {
            console.error("Unable to calculate average scores: Invalid selected scores");
            return null;
        }
    };

    const classifyRisk = (averageTotal: number) => {
        let classification = 'Unknown';
        riskRange.forEach(range => {
            if (averageTotal >= range.rangeFrm && averageTotal <= range.rangeTo) {
                classification = range.risk_classification;
            }
        });
        return classification;
    };

    const createScoreCalculationRequest = (averagePep: number, averageNegative: number, averageEntity: number): ScoreDocument | null => {

        return {
            id: scoreDocument.id,
            kycId: kycIds,
            pepScoreId: selectedPepScore ? parseInt(selectedPepScore, 10) : 0,
            negativeMediaId: selectedNegativeScore ? parseInt(selectedNegativeScore, 10) : 0,
            entityId: selectedEntityScore ? parseInt(selectedEntityScore, 10) : 0,
            pepScore: averagePep,
            negativeMediaScore: averageNegative,
            entityScore: averageEntity,
            questionnairsScore: scoreDocument.questionnairsScore,
            uid: scoreDocument.uid,
            euid: scoreDocument.euid
        };
    };

    const handleSaveButtonClick = async () => {
        const scores = calculateAverageScores();

        if (scores && riskRange && riskRange.length > 0) {
            const { averagePep, averageNegative, averageEntity } = scores;
            const averageTotal = (averagePep + averageNegative + averageEntity) / 3;
            const classification = classifyRisk(averageTotal);

            const scoreCalculationRequest = createScoreCalculationRequest(averagePep, averageNegative, averageEntity);

            if (!scoreCalculationRequest) {
                console.error('Error creating score calculation request');
                return;
            }

            const allFiles = [...pepFiles, ...negativeFiles, ...entityFiles];
            const allPathIds = [...pathId, ...pathId1, ...pathId2];

            try {
                const response = await applicationfrome.uploadScoreDocument(allFiles, [kycIds], allPathIds, scoreCalculationRequest);
                console.log('Response:', response);
            } catch (error) {
                console.error(`Error uploading score document: ${error}`);
            }

            setRiskClassification(classification);
        } else {
            console.error("Unable to calculate risk classification: Risk range data is not available");
        }
    };

    // const handleSaveButtonClick = async () => {
    //     const selectedPep = pepScore.find(score => score.id === parseInt(selectedPepScore));
    //     const selectedNegative = negativeScore.find(score => score.id === parseInt(selectedNegativeScore));
    //     const selectedEntity = entityScore.find(score => score.id === parseInt(selectedEntityScore));

    //     if (selectedPep && selectedNegative && selectedEntity && riskRange && riskRange.length > 0) {
    //         const averagePep = (selectedPep.score / 100) * 20;
    //         const averageNegative = (selectedNegative.score / 100) * 20;
    //         const averageEntity = (selectedEntity.score / 100) * 20;

    //         const averageTotal = (averagePep + averageNegative + averageEntity) / 3;

    //         setAveragePepScore(averagePep);
    //         setAverageNegativeScore(averageNegative);
    //         setAverageEntityScore(averageEntity);

    //         let classification = 'Unknown';
    //         riskRange.forEach(range => {
    //             if (averageTotal >= range.rangeFrm && averageTotal <= range.rangeTo) {
    //                 classification = range.risk_classification;
    //             }
    //         });

    //         const createScoreCalculationRequest: ScoreDocument = {
    //             id: scoreDocument.id,
    //             kycId: kycIds,
    //             pepScoreId: selectedPepScore ? parseInt(selectedPepScore, 10) : 0,
    //             negativeMediaId: selectedNegativeScore ? parseInt(selectedNegativeScore, 10) : 0,
    //             entityId: selectedEntityScore ? parseInt(selectedEntityScore, 10) : 0,
    //             pepScore: averagePepScore,
    //             negativeMediaScore: averageNegativeScore,
    //             entityScore: averageEntityScore,
    //             questionnairsScore: scoreDocument.questionnairsScore,
    //             uid: scoreDocument.uid,
    //             euid: scoreDocument.euid
    //         };

    //         const allFiles = [...pepFiles, ...negativeFiles, ...entityFiles];
    //         const allpathId = [...pathId, ...pathId1, ...pathId2];
    //         try {
    //             const response = await applicationfrome.uploadScoreDocument(allFiles, [kycId], allpathId, createScoreCalculationRequest);
    //             console.log('Response:', response);
    //         } catch (error) {
    //             console.error(`Error uploading score document: ${error}`);
    //         }

    //         setRiskClassification(classification);
    //     } else {
    //         console.error("Unable to calculate risk classification: Risk range data is not available");
    //     }

    // };

    // selectedPathId,createScoreCalculationRequest

    useEffect(() => {
        const fetchData = async (kycId: string) => {
            try {
                setLoading(true);
                const customerData: CustomerData[] = await applicationfrome.getkycData(kycId);
                if (customerData && customerData.length > 0) {
                    setFormData(customerData.map((data: CustomerData) => data.kycFormDto));
                } else {
                    setErrors(["No data found"]);
                }
            } catch (error) {
                setErrors(["Error fetching data"]);
            } finally {
                setLoading(false);
            }
        };
        const storedResponseId = (kycId);
        if (storedResponseId) {
            setKycId(parseInt(storedResponseId, 10));
            fetchData(storedResponseId);
        } else {
            setKycId(0);
        }
    }, [kycId]);

    const itemsPerPage = 10;
    const splitDataIntoPages = (data: any[], itemsPerPage: number) => {
        const pages = [];
        for (let i = 0; i < data.length; i += itemsPerPage) {
            pages.push(data.slice(i, i + itemsPerPage));
        }
        return pages;
    };
    const pages = splitDataIntoPages(formData, itemsPerPage);

    return (
        <>
            <Box component="main" sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Card sx={{ p: 3, boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={3}>
                           <DocumentUpload
                                label="Pep"
                                pepScore={pepScore}
                                selectedValue={selectedPepScore}
                                handleScoreChange={handlePepScoreChange}
                                handleFileChange={(e) => handleFileChange(e, 'pep')}
                            />

                        </Grid>
                        <Grid item xs={12} md={3}>
                           <DocumentUpload
                                label="Negative"
                                negativeScore={negativeScore}
                                selectedValue={selectedNegativeScore}
                                handleScoreChange={handleNegativeScoreChange}
                                handleFileChange={(e) => handleFileChange(e, 'negative')}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <DocumentUpload
                                label="Entity"
                                entityScore={entityScore}
                                selectedValue={selectedEntityScore}
                                handleScoreChange={handleEntityScoreChange}
                                handleFileChange={(e) => handleFileChange(e, 'entity')}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} container alignItems="flex-end" justifyContent={{ md: 'flex-end' }} wrap="nowrap">
                            <Button variant="outlined" sx={{ mx: 1 }} onClick={handleSaveButtonClick}>Save</Button>
                            <Button variant="outlined" sx={{ mx: 1 }}>Edit</Button>
                            <Button variant="outlined" sx={{ mx: 1 }} onClick={handleSaveButtonClick}>Submit</Button>
                        </Grid>
                    </Grid>
                </Card>
                <Card style={{ marginTop: '1%', padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%', height: '400px', overflow: 'auto' }}>
                    <Container style={{ width: '274mm', minHeight: '297mm' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div id="pdfContent">
                                {pages.map((pageContent, pageIndex) => (
                                    <Paper key={pageIndex} style={{ marginBottom: '20px' }}>
                                        <div ref={contentRef} style={{ position: 'relative', width: '100%', minHeight: '100%', padding: '15px' }}>
                                            {/* <img src={ponsunImage} alt="Ponsun" style={{ display: 'block', margin: '0 auto', maxWidth: '45%', marginBottom: '20px' }} /> */}
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow sx={{ fontSize: 'small' }}>
                                                            <TableCell sx={{ width: '10%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Sl.no</TableCell>
                                                            <TableCell sx={{ width: '60%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Question</TableCell>
                                                            <TableCell sx={{ width: '30%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Answer</TableCell>
                                                            <TableCell sx={{ width: '30%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Score</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {pageContent && pageContent.map((item, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell sx={{ width: '10%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
                                                                    {index + 1 + pageIndex * itemsPerPage}
                                                                </TableCell>
                                                                <TableCell sx={{ width: '40%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
                                                                    {item && item.name}
                                                                    {item && item.description && (
                                                                        <Typography variant="body2" color="textSecondary">
                                                                            {item.description}
                                                                        </Typography>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {item && item.kycAnswerData && item.kycAnswerData.length > 0 ? item.kycAnswerData[0]?.answer : 'No answer available'}
                                                                    {errors[index + pageIndex * itemsPerPage] && (
                                                                        <Typography variant="caption" color="error">
                                                                            {errors[index + pageIndex * itemsPerPage]}
                                                                        </Typography>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell sx={{ width: '40%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
                                                                    {/* {item && item.score} */}
                                                                    {item && item.kycAnswerData && item.kycAnswerData.length > 0 ? item.kycAnswerData[0]?.score : 'No answer available'}

                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            {/* <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} /> */}
                                            <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}>Page : {pageIndex + 1}</div>
                                        </div>
                                    </Paper>
                                ))}
                            </div>
                        </LocalizationProvider>
                    </Container>
                </Card>
                <Card sx={{ mt: 1,mb:10, p: 3, boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                        Risk Calculation
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1">Questionnaire</Typography>
                            <Typography variant="subtitle1">{score !== null ? `${score[0] !== null ? `${score[0]}%` : '0'}` : 'Loading...'}</Typography>

                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1">Pep</Typography>
                            <Typography variant="subtitle1">{`${averagePepScore}%`}</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1">Negative Search</Typography>
                            <Typography variant="subtitle1">{`${averageNegativeScore}%`}</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1">Entity</Typography>
                            <Typography variant="subtitle1">{`${averageEntityScore}%`}</Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1">RiskScore</Typography>
                            <Typography variant="subtitle1">{riskClassification}</Typography>
                        </Box>
                    </Box>

                </Card>
            </Box>
        </>
    );
};

export default Periodic;




// import React, { useEffect, useRef, useState } from 'react';
// import Header from '../../layouts/header/header';
// import { Box, Card, Grid, Typography, Button, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, SelectChangeEvent, IconButton } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { EntityScore, NegativeScore, PepScore, RiskRange, Score, kycForm } from '../../data/services/applicationfrom/applicationfrome-payload';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import ponsunImage from '../../../src/assets/ponsun.png';
// import contactImage from '../../../src/assets/contact.png';
// import ApplicationfromeService from '../../data/services/applicationfrom/applicationfrome-api-service';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// interface DocumentUploadProps {
//     label: string;
//     pepScore?: PepScore[];
//     negativeScore?: NegativeScore[];
//     entityScore?: EntityScore[];
//     selectedValue: string;
//     handleScoreChange: (event: SelectChangeEvent) => void;
// }
// interface CustomerData {
//     kycFormDto: kycForm;
// };


// const DocumentUpload: React.FC<DocumentUploadProps> = ({ label, pepScore,
//     negativeScore,
//     entityScore,
//     selectedValue,
//     handleScoreChange }) => (

//     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//         {/* <Button variant="contained" component="label" sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}>
//             Upload Files
//             <input type="file" hidden multiple />
//         </Button> */}
//         <label htmlFor="file-input">
//             <IconButton component="span" sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#115293' } }}>
//                 <CloudUploadIcon />
//             </IconButton>
//         </label>
//         {pepScore && (
//             <FormControl sx={{ minWidth: 200 }}>
//                 <InputLabel id={`${label}-pep-label`}>Pep</InputLabel>
//                 <Select labelId={`${label}-pep-label`} label="Pep" value={selectedValue} onChange={handleScoreChange}>
//                     <MenuItem value="">
//                         <em>None</em>
//                     </MenuItem>
//                     {pepScore.map(score => (
//                         <MenuItem key={score.id} value={score.id}>
//                             {score.name}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         )}
//         {negativeScore && (
//             <FormControl sx={{ minWidth: 200 }}>
//                 <InputLabel id={`${label}-negative-label`}>Negative Score</InputLabel>
//                 <Select
//                     labelId={`${label}-negative-label`}
//                     label="Negative Score"
//                     value={selectedValue}
//                     onChange={handleScoreChange}
//                 >
//                     <MenuItem value="">
//                         <em>None</em>
//                     </MenuItem>
//                     {negativeScore.map(score => (
//                         <MenuItem key={score.id} value={score.id}>
//                             {score.name}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         )}
//         {entityScore && (
//             <FormControl sx={{ minWidth: 200 }}>
//                 <InputLabel id={`${label}-entity-label`}>Entity Score</InputLabel>
//                 <Select
//                     labelId={`${label}-entity-label`}
//                     label="Entity Score"
//                     value={selectedValue}
//                     onChange={handleScoreChange}
//                 >
//                     <MenuItem value="">
//                         <em>None</em>
//                     </MenuItem>
//                     {entityScore.map(score => (
//                         <MenuItem key={score.id} value={score.id}>
//                             {score.name}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         )}
//     </Box>
// );
// const Periodic = () => {
//     const [kycId, setKycId] = useState<string | null>(null);
//     const [errors, setErrors] = useState<string[]>([]);
//     const contentRef = useRef<HTMLDivElement>(null);a
//     const [formData, setFormData] = useState<kycForm[]>([]);
//     const [loading, setLoading] = useState(true);
//     const applicationfrome = new ApplicationfromeService();
//     const responseId = sessionStorage.getItem('responseId');
//     console.log('sessionStorage responseId:', responseId);
//     const [pepScore, setPepScore] = useState<PepScore[]>([]);
//     const [negativeScore, setNegativeScore] = useState<NegativeScore[]>([]);
//     const [entityScore, setEntityScore] = useState<EntityScore[]>([]);
//     const [score, setScore] = useState<Score[]>([]);
//     const [riskRange, setRiskRange] = useState<RiskRange[]>([]);
//     const [riskClassification, setRiskClassification] = useState<string>('');
//     const [selectedPepScore, setSelectedPepScore] = useState<string>("");
//     const [selectedNegativeScore, setSelectedNegativeScore] = useState<string>("");
//     const [selectedEntityScore, setSelectedEntityScore] = useState<string>("");
//     const [averagePepScore, setAveragePepScore] = useState<number>(0);
//     const [averageNegativeScore, setAverageNegativeScore] = useState<number>(0);
//     const [averageEntityScore, setAverageEntityScore] = useState<number>(0);
//     const handlePepScoreChange = (event: SelectChangeEvent<string>) => {
//         const selectedScoreId = parseInt(event.target.value, 10); // Parse string to number
//         const selectedScore = pepScore.find(score => score.id === selectedScoreId);
//         if (selectedScore) {
//             console.log('Selected Pep Score:', selectedScore);
//         }
//         setSelectedPepScore(event.target.value);
//     };

//     const handleNegativeScoreChange = (event: SelectChangeEvent<string>) => {
//         const selectedScoreId = parseInt(event.target.value, 10); // Parse string to number
//         const selectedScore = negativeScore.find(score => score.id === selectedScoreId);
//         if (selectedScore) {
//             console.log('Selected Negative Score:', selectedScore);
//         }
//         setSelectedNegativeScore(event.target.value);
//     };

//     const handleEntityScoreChange = (event: SelectChangeEvent<string>) => {
//         const selectedScoreId = parseInt(event.target.value, 10); // Parse string to number
//         const selectedScore = entityScore.find(score => score.id === selectedScoreId);
//         if (selectedScore) {
//             console.log('Selected Entity Score:', selectedScore);
//         }
//         setSelectedEntityScore(event.target.value);
//     };


//     useEffect(() => {
//         if (responseId) {
//             fetchScore(responseId.toString());
//             console.log('responseId:', responseId);

//         }
//     }, [responseId]);
//     useEffect(() => {
//         fetchPepScore();
//         fetchNegativeSearch();
//         fetchEntityScore();
//         fetchRiskRange();

//     }, []);


//     const fetchPepScore = async () => {
//         try {
//             const pepScore = await applicationfrome.getPepScore();
//             setPepScore(pepScore);
//         } catch (error) {
//             console.error("Error fetching application types:", error);
//         }
//     };
//     const fetchNegativeSearch = async () => {
//         try {
//             const negativeScore = await applicationfrome.getNegativeSearch();
//             setNegativeScore(negativeScore);
//         } catch (error) {
//             console.error("Error fetching application types:", error);
//         }
//     };
//     const fetchEntityScore = async () => {
//         try {
//             const entityScore = await applicationfrome.getEntityScore();
//             setEntityScore(entityScore);
//         } catch (error) {
//             console.error("Error fetching application types:", error);
//         }
//     };
//     const fetchScore = async (responseId: string) => {
//         try {
//             const score = await applicationfrome.getScore(responseId);
//             setScore(score);
//             console.log("score", score)
//         } catch (error) {
//             console.error("Error fetching application types:", error);
//         }
//     };
//     const fetchRiskRange = async () => {
//         try {
//             const response = await applicationfrome.getRiskRange();
//             setRiskRange(response);
//         } catch (error) {
//             console.error("Error fetching risk range:", error);
//         }
//     };
//     const calculateAverageScore = (score: number) => {
//         return (score / 100) * 20;
//     };

//     const handleSaveButtonClick = () => {
//         const selectedPep = pepScore.find(score => score.id === parseInt(selectedPepScore));
//         const selectedNegative = negativeScore.find(score => score.id === parseInt(selectedNegativeScore));
//         const selectedEntity = entityScore.find(score => score.id === parseInt(selectedEntityScore));

//         if (selectedPep && selectedNegative && selectedEntity) {
//             const averagePep = (selectedPep.score / 100) * 20;
//             const averageNegative = (selectedNegative.score / 100) * 20;
//             const averageEntity = (selectedEntity.score / 100) * 20;

//             const averageTotal = (averagePep + averageNegative + averageEntity) / 3;

//             setAveragePepScore(averagePep);
//             setAverageNegativeScore(averageNegative);
//             setAverageEntityScore(averageEntity);

//             // Determine risk classification
//             let classification = 'Unknown';
//             riskRange.forEach(range => {
//                 if (averageTotal >= range.rangeFrm && averageTotal <= range.rangeTo) {
//                     classification = range.risk_classification;
//                 }
//             });



//             setRiskClassification(classification);
//         }
//     };

//     // const handleSaveButtonClick = () => {
//     //     const selectedPep = pepScore.find(score => score.id === parseInt(selectedPepScore));
//     //     const selectedNegative = negativeScore.find(score => score.id === parseInt(selectedNegativeScore));
//     //     const selectedEntity = entityScore.find(score => score.id === parseInt(selectedEntityScore));

//     //     if (selectedPep && selectedNegative && selectedEntity) {
//     //         const averagePep = (selectedPep.score / 100) * 20;
//     //         const averageNegative = (selectedNegative.score / 100) * 20;
//     //         const averageEntity = (selectedEntity.score / 100) * 20;

//     //         setAveragePepScore(averagePep);
//     //         setAverageNegativeScore(averageNegative);
//     //         setAverageEntityScore(averageEntity);

//     //         const averageTotal = (averagePep + averageNegative + averageEntity) / 3;

//     //         // Determine risk classification
//     //         let classification = 'Unknown';
//     //         riskRange.forEach(range => {
//     //             if (averageTotal >= range.rangeFrm && averageTotal <= range.rangeTo) {
//     //                 classification = range.risk_classification;
//     //             }
//     //         });
//     //         setRiskClassification(classification);
//     //     }
//     // };


//     useEffect(() => {
//         const fetchData = async (kycId: string) => {
//             try {
//                 setLoading(true);
//                 const customerData: CustomerData[] = await applicationfrome.getkycData(kycId);
//                 if (customerData && customerData.length > 0) {
//                     setFormData(customerData.map((data: CustomerData) => data.kycFormDto));
//                 } else {
//                     setErrors(["No data found"]);
//                 }
//             } catch (error) {
//                 setErrors(["Error fetching data"]);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         const storedResponseId = sessionStorage.getItem('responseId');
//         if (storedResponseId) {
//             setKycId(storedResponseId);
//             fetchData(storedResponseId);
//         } else {
//             setKycId(null);
//         }
//     }, [responseId]);

//     const itemsPerPage = 10;
//     const splitDataIntoPages = (data: any[], itemsPerPage: number) => {
//         const pages = [];
//         for (let i = 0; i < data.length; i += itemsPerPage) {
//             pages.push(data.slice(i, i + itemsPerPage));
//         }
//         return pages;
//     };
//     const pages = splitDataIntoPages(formData, itemsPerPage);

//     return (
//         <>
//             {/* <Box sx={{ display: 'flex' }}>
//                 <Header /> */}
//             <Box mt={2}>
//                 <Card style={{ padding: '2%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>

//                     <Box component="main" sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
//                         <Card sx={{ p: 2, boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%', }}>
//                             <Grid container spacing={3}>
//                                 <Grid item xs={12} md={3}>
//                                     <Typography variant="subtitle1" gutterBottom>Pep</Typography>
//                                     <DocumentUpload
//                                         label="Pep"
//                                         pepScore={pepScore}
//                                         selectedValue={selectedPepScore}
//                                         handleScoreChange={handlePepScoreChange}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} md={3}>
//                                     <Typography variant="subtitle1" gutterBottom>Negative Search</Typography>
//                                     <DocumentUpload
//                                         label="Negative"
//                                         negativeScore={negativeScore}
//                                         selectedValue={selectedNegativeScore}
//                                         handleScoreChange={handleNegativeScoreChange}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} md={3}>
//                                     <Typography variant="subtitle1" gutterBottom>Entity</Typography>
//                                     <DocumentUpload
//                                         label="Entity"
//                                         entityScore={entityScore}
//                                         selectedValue={selectedEntityScore}
//                                         handleScoreChange={handleEntityScoreChange}
//                                     />
//                                 </Grid>
//                                 <Grid item xs={12} md={3} container alignItems="flex-end" justifyContent={{ md: 'flex-end' }}>
//                                     <Button variant="outlined" sx={{ mx: 1 }} onClick={handleSaveButtonClick}>Save</Button>
//                                     <Button variant="outlined" sx={{ mx: 1 }}>Edit</Button>
//                                     <Button variant="outlined" sx={{ mx: 1 }}>Submit</Button>
//                                 </Grid>
//                             </Grid>
//                         </Card>
//                         <Card style={{ marginTop: '1%', padding: '1%', boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%', height: '400px', overflow: 'auto' }}>
//                             <Container style={{ width: '274mm', minHeight: '297mm' }}>
//                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                     <div id="pdfContent">
//                                         {pages.map((pageContent, pageIndex) => (
//                                             <Paper key={pageIndex} style={{ marginBottom: '20px' }}>
//                                                 <div ref={contentRef} style={{ position: 'relative', width: '100%', minHeight: '100%', }}>
//                                                     <img src={ponsunImage} alt="Ponsun" style={{ display: 'block', margin: '0 auto', maxWidth: '45%', marginBottom: '20px' }} />
//                                                     <TableContainer>
//                                                         <Table>
//                                                             <TableHead>
//                                                                 <TableRow sx={{ fontSize: 'small' }}>
//                                                                     <TableCell sx={{ width: '10%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Sl.no</TableCell>
//                                                                     <TableCell sx={{ width: '60%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Question</TableCell>
//                                                                     <TableCell sx={{ width: '30%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Answer</TableCell>
//                                                                     <TableCell sx={{ width: '30%', padding: '5px', fontSize: '0.875rem', backgroundColor: '#d6d0d09e' }}>Score</TableCell>
//                                                                 </TableRow>
//                                                             </TableHead>
//                                                             <TableBody>
//                                                                 {pageContent && pageContent.map((item, index) => (
//                                                                     <TableRow key={index}>
//                                                                         <TableCell sx={{ width: '10%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
//                                                                             {index + 1 + pageIndex * itemsPerPage}
//                                                                         </TableCell>
//                                                                         <TableCell sx={{ width: '40%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
//                                                                             {item && item.name}
//                                                                             {item && item.description && (
//                                                                                 <Typography variant="body2" color="textSecondary">
//                                                                                     {item.description}
//                                                                                 </Typography>
//                                                                             )}
//                                                                         </TableCell>
//                                                                         <TableCell>
//                                                                             {item && item.kycAnswerData && item.kycAnswerData.length > 0 ? item.kycAnswerData[0]?.answer : 'No answer available'}
//                                                                             {errors[index + pageIndex * itemsPerPage] && (
//                                                                                 <Typography variant="caption" color="error">
//                                                                                     {errors[index + pageIndex * itemsPerPage]}
//                                                                                 </Typography>
//                                                                             )}
//                                                                         </TableCell>
//                                                                         <TableCell sx={{ width: '40%', padding: '4px', fontSize: '0.75rem', whiteSpace: 'pre-wrap', fontWeight: '900' }}>
//                                                                             {item && item.score}

//                                                                         </TableCell>
//                                                                     </TableRow>
//                                                                 ))}
//                                                             </TableBody>
//                                                         </Table>
//                                                     </TableContainer>
//                                                     <img src={contactImage} alt="Contact" style={{ display: 'block', margin: '20px auto 0', maxWidth: '55%' }} />
//                                                     <div style={{ textAlign: 'right', marginTop: '10px', position: 'absolute', bottom: '20px', right: '20px', fontSize: 'small' }}>Page : {pageIndex + 1}</div>
//                                                 </div>
//                                             </Paper>
//                                         ))}
//                                     </div>
//                                 </LocalizationProvider>
//                             </Container>
//                         </Card>
//                         <Card sx={{ mt: 1, p: 2, boxShadow: 'rgb(0 0 0 / 28%) 0px 4px 8px', width: '100%' }}>
//                             <Typography variant="h6" gutterBottom>
//                                 Risk Calculation
//                             </Typography>
//                             <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
//                                 <Box sx={{ flex: 1 }}>
//                                     <Typography variant="subtitle1">Questionnaire</Typography>
//                                     <Typography variant="subtitle1">{score !== null ? `${score[0] !== null ? `${score[0]}%` : '0'}` : 'Loading...'}</Typography>

//                                 </Box>
//                                 <Box sx={{ flex: 1 }}>
//                                     <Typography variant="subtitle1">Pep</Typography>
//                                     <Typography variant="subtitle1">{`${averagePepScore}%`}</Typography>
//                                 </Box>
//                                 <Box sx={{ flex: 1 }}>
//                                     <Typography variant="subtitle1">Negative Search</Typography>
//                                     <Typography variant="subtitle1">{`${averageNegativeScore}%`}</Typography>
//                                 </Box>
//                                 <Box sx={{ flex: 1 }}>
//                                     <Typography variant="subtitle1">Entity</Typography>
//                                     <Typography variant="subtitle1">{`${averageEntityScore}%`}</Typography>
//                                 </Box>
//                                 <Box sx={{ flex: 1 }}>
//                                     <Typography variant="subtitle1">RiskScore</Typography>
//                                     <Typography variant="subtitle1">{riskClassification}</Typography>
//                                 </Box>
//                             </Box>

//                         </Card>
//                     </Box>
//                 </Card>
//             </Box>
//             {/* </Box> */}
//         </>
//     );
// };

// export default Periodic;
