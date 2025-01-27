import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';

const CURRENT_YEAR = 2025;

interface HardshipFormData {
  debtID?: number;
  hardshipTypeID?: number;
  name?: string;
  dob?: string;
  income?: number;
  expenses?: number;
  comments?: string;
}

const HardshipFormScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const existingData = location.state?.hardshipData as HardshipFormData | undefined;
  const disabledDebtID = !!existingData?.debtID;

  const [debtID, setDebtID] = useState<string>(existingData?.debtID?.toString() ?? '');
  const [hardshipTypeID, setHardshipTypeId] = useState<string>(existingData?.hardshipTypeID?.toString() ?? '');
  const [customerName, setCustomerName] = useState<string>(existingData?.name ?? '');
  const [dob, setDob] = useState<Dayjs | null>(
    existingData?.dob ? dayjs(existingData.dob) : null
  );
  const [income, setIncome] = useState<string>(existingData?.income?.toString() ?? '');
  const [expenses, setExpenses] = useState<string>(existingData?.expenses?.toString() ?? '');
  const [comments, setComments] = useState<string>(existingData?.comments ?? '');

  const [debtIDError, setDebtIDError] = useState('');
  const [nameError, setNameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [incomeError, setIncomeError] = useState('');
  const [expensesError, setExpensesError] = useState('');
  const [commentsError, setCommentsError] = useState('');
  const [finishedText, setFinishedText] = useState('');
  const [hardshipTypeError, setHardshipTypeError] = useState('');

  const handleDebtIDChange = (value: string) => {
    if (isNaN(Number(value)) || Number(value) < 0) {
      setDebtIDError("Debt ID must be a valid number");
    } else if (value.length > 10) {
      setDebtIDError("Maximum digits for debt ID is 10")
    } else {
      setDebtIDError('');
    }
    setDebtID(value);
  };

  const handleNameChange = (value: string) => {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(value)) {
      setNameError('No special characters allowed.');
    } else {
      setNameError('');
    }
    setCustomerName(value);
  };

  const handleDOBChange = (date: Dayjs | null) => {
    if (!date) {
      setDobError('Please select a valid date');
      setDob(null);
      return;
    }

    const year = date.year();
    if (year > CURRENT_YEAR) {
      setDobError(`Year cannot exceed ${CURRENT_YEAR}.`);
    } else {
      setDobError('');
    }
    setDob(date);
  };

  const handleIncomeChange = (value: string) => {
    if (isNaN(Number(value)) || Number(value) < 0) {
      setIncomeError('Income must be a valid number.');
    } else if (value.length > 8) {
      setDebtIDError("Maximum digits for income 8")
    } else {
      setIncomeError('');
    }
    setIncome(value);
  };

  const handleExpensesChange = (value: string) => {
    if (isNaN(Number(value)) || Number(value) < 0) {
      setExpensesError('Expenses must be a valid number.');
    } else if (value.length > 8) {
      setDebtIDError("Maximum digits for expenses is 8")
    } else {
      setExpensesError('');
    }
    setExpenses(value);
  };

  const handleCommentsChange = (value: string) => {
    const words = value.trim().split(/\s+/).filter(Boolean).length;
    if (words > 100) {
      setCommentsError('Maximum 100 words allowed.');
    } else {
      setCommentsError('');
    }
    setComments(value);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setHardshipTypeError('');
    setFinishedText('');

    let hasErrors = false;


    if (!hardshipTypeID) {
      setHardshipTypeError('Please select a hardship type');
      hasErrors = true;
    }

    const validations = [
      { field: debtID, error: debtIDError, setError: setDebtIDError, message: "Debt ID must be a valid number" },
      { field: customerName, error: nameError, setError: setNameError, message: "No special characters allowed" },
      { field: dob, error: dobError, setError: setDobError, message: "Please select a valid date" },
      { field: income, error: incomeError, setError: setIncomeError, message: "Income must be a valid number" },
      { field: expenses, error: expensesError, setError: setExpensesError, message: "Expenses must be a valid number" },
    ];

    validations.forEach(({ field, error, setError, message }) => {
      if (!field || (typeof field === 'string' && field.trim() === '')) {
        setError(`${message} is required`);
        hasErrors = true;
      } else if (error) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setFinishedText('Please fix validation errors before submitting.');
      return;
    }

    const isEditMode = !!existingData;
    const isoDate = dob?.toISOString().split('T')[0];

    const requestBody = {
      debtID: Number(debtID),
      hardshipTypeID: Number(hardshipTypeID),
      name: customerName,
      dob: isoDate,
      income: Number(income),
      expenses: Number(expenses),
      comments,
    };

    try {
      if (isEditMode) {
        const editRequestBody = {
          hardshipTypeID: Number(hardshipTypeID),
          name: customerName,
          dob: isoDate,
          income: Number(income),
          expenses: Number(expenses),
          comments,

        }

        await axios.put(`https://localhost:7241/Hardships/edit/${debtID}`, editRequestBody);
        setFinishedText('Hardship updated successfully!');
      } else {
        // Create new hardship
        await axios.post('https://localhost:7241/Hardships', requestBody);
        setFinishedText('Hardship created successfully!');
      }
    } catch (error) {
      let errorMessage
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data
      }
      else {
        errorMessage = " An unknown error has occurred"
      }
      setFinishedText(errorMessage);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          <IconButton onClick={() => navigate('/')} sx={{ alignSelf: 'start' }}>
            <ArrowBackIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h5" align="center" gutterBottom>
            {existingData ? 'Edit Hardship' : 'Create Hardship'}
          </Typography>

          {/* DebtID Input (only visible in Edit mode) */}
          <FormControl>
            <TextField
              label="Debt ID"
              variant="outlined"
              fullWidth
              required
              value={debtID}
              onChange={(e) => handleDebtIDChange(e.target.value)}
              error={!!debtIDError}
              helperText={debtIDError}
              disabled={disabledDebtID}
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
          </FormControl>

          <FormControl>
            <FormLabel sx={{ color: hardshipTypeError ? 'error.main' : 'text.primary' }}>Hardship Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="hardship-type-radio-group"
              name="hardshipType"
              value={hardshipTypeID}
              onChange={(e) => { setHardshipTypeId(e.target.value); setHardshipTypeError(''); }}
              sx={{ justifyContent: "center" }}
            >
              <FormControlLabel
                value="1"
                control={<Radio sx={{ color: 'text.primary' }} />}
                label="Financial"
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.primary' } }}
              />
              <FormControlLabel
                value="2"
                control={<Radio sx={{ color: 'text.primary' }} />}
                label="Medical"
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.primary' } }}
              />
              <FormControlLabel
                value="3"
                control={<Radio sx={{ color: 'text.primary' }} />}
                label="Economic"
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.primary' } }}
              />
            </RadioGroup>
            {hardshipTypeError && (
              <Typography color="error" variant="caption">
                {hardshipTypeError}
              </Typography>
            )}
          </FormControl>

          {/* Customer Name */}
          <FormControl>
            <TextField
              label="Customer Name"
              variant="outlined"
              fullWidth
              required
              value={customerName}
              onChange={(e) => handleNameChange(e.target.value)}
              error={!!nameError}
              helperText={nameError}
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
          </FormControl>

          {/* Date of Birth */}
          <FormControl fullWidth>
            <DatePicker
              label="Date of Birth"
              value={dob}
              onChange={handleDOBChange}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  required: true,
                  error: !!dobError,
                  helperText: dobError,
                },
              }}
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
          </FormControl>

          {/* Income */}
          <FormControl>
            <TextField
              label="Income"
              variant="outlined"
              fullWidth
              required
              value={income}
              onChange={(e) => handleIncomeChange(e.target.value)}
              error={!!incomeError}
              helperText={incomeError}
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
          </FormControl>

          {/* Expenses */}
          <FormControl>
            <TextField
              label="Expenses"
              variant="outlined"
              fullWidth
              required
              value={expenses}
              onChange={(e) => handleExpensesChange(e.target.value)}
              error={!!expensesError}
              helperText={expensesError}
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
          </FormControl>

          {/* Comments */}
          <FormControl>
            <TextField
              label="Comments"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={comments}
              onChange={(e) => handleCommentsChange(e.target.value)}
              error={!!commentsError}
              helperText={commentsError || `${comments.trim().split(/\s+/).filter(Boolean).length}/100 words`}
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
          </FormControl>

          {/* Submit Button */}
          <Button variant="contained" color="primary" type="submit" fullWidth>
            {existingData ? 'Update Hardship' : 'Create Hardship'}
          </Button>
          {finishedText && <Typography style={{ alignSelf: "center" }} color="secondary">{finishedText}</Typography>}

        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default HardshipFormScreen;
