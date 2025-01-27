import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography, Accordion, AccordionSummary, AccordionDetails, TableContainer, Paper, Table, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Hardship } from '../types/hardship';

const HardshipsListScreen: React.FC = () => {
    const navigate = useNavigate();

    const [hardships, setHardships] = useState<Hardship[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchHardships = async () => {
        setLoading(true);
        try {
            const response = await axios.get<Hardship[]>('https://localhost:7241/Hardships');
            setHardships(response.data);
            setLoading(false);
        } catch (error) {
            let errorMessage
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data.detail
            }
            else {
                errorMessage = " An unknown error has occurred"
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHardships();
    }, []);

    const handleBack = () => {
        navigate('/');
    };

    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: '16px',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                {/* Back Button */}
                <IconButton onClick={handleBack} style={{ backgroundColor: 'white' }} sx={{ alignSelf: 'start' }}>
                    <ArrowBackIcon />
                </IconButton>

                {loading ? <CircularProgress /> : hardships && hardships.length > 0 ? <Typography variant="h5" align="center" gutterBottom>
                    List of hardships
                </Typography> : <Typography variant="h5" align="center" gutterBottom>
                    No records
                </Typography>}

                {hardships && hardships.map((hardships, index) => {
                    return (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant='h5' style={{ marginLeft: '150px' }} color='secondary'>Debt ID: </Typography>
                                <Typography variant='h6' style={{ marginLeft: '250px' }} >{hardships.debtID}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Typography variant='h6' color='secondary'>
                                                        Name:
                                                    </Typography>
                                                    {hardships.name}
                                                </TableCell>
                                                <TableCell align="right"><Typography variant='h6' color='secondary'>Hardship Type:</Typography> {hardships.hardshipTypeName}</TableCell>
                                                <TableCell align="right"><Typography variant='h6' color='secondary' >Date of Birth:</Typography> {hardships.dob.toString().split('T')[0]}</TableCell>
                                                <TableCell align="right"><Typography variant='h6' color='secondary'>Income:</Typography> {hardships.income}</TableCell>
                                                <TableCell align="right"><Typography variant='h6' color='secondary'>Expenses:</Typography> {hardships.expenses}</TableCell>
                                                <TableCell align="right"><Typography variant='h6' color='secondary'>Comment:</Typography> {hardships.comments ? hardships.comments : "None"}</TableCell>

                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    )

                })}
            </Box>
        </Box>
    );
};

export default HardshipsListScreen;
