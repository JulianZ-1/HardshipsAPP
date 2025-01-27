import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Hardship } from '../types/hardship';

const HardshipEditScreen: React.FC = () => {
  const navigate = useNavigate();
  const [debtId, setDebtId] = useState('');
  const [finishedText, setFinishedText] = useState('')

  const handleBack = () => {
    navigate('/');
  };

  const handleDebtIdChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '');
    setDebtId(digitsOnly);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!debtId) {
      setFinishedText('Please enter a valid DebtID.');
      return;
    }

    try {
      const response = await axios.get<Hardship>(`https://localhost:7241/Hardships/get-debt/${debtId}`);

      navigate('/hardship/form', { state: { hardshipData: response.data } });
    } catch (error) {
      let errorMessage
      if (error instanceof AxiosError) {
        errorMessage = error.request.response
      } else {
        errorMessage = "An unknown error has occurred"
      }
      setFinishedText(errorMessage);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
          width: '400px',
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

        <Typography variant="h5" align="center" gutterBottom>
          Edit Hardship
        </Typography>

        {/* DebtID Input (digits only) */}
        <TextField
          label="DebtID"
          type="text"
          variant="outlined"
          fullWidth
          required
          value={debtId}
          onChange={(e) => handleDebtIdChange(e.target.value)}
          sx={{
            '& .MuiInputLabel-root': {
              color: 'text.primary',
            },
            '& .MuiOutlinedInput-root': {
              color: 'text.primary',
              '& fieldset': {
                borderColor: 'text.secondary',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'secondary.main',
              },
            },
          }}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
        {finishedText && <Typography style={{ alignSelf: "center" }} color="secondary">{finishedText}</Typography>}
      </Box>
    </Box>
  );
};

export default HardshipEditScreen;
