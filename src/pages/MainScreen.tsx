import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      color="text.primary"
    >
      <Typography variant="h4" gutterBottom>
        Hardship Management
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width="300px"
        padding="16px"
        bgcolor="background.paper"
        borderRadius="8px"
        boxShadow="0 4px 10px rgba(0, 0, 0, 0.3)"
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'secondary.main',
            },
          }}
          onClick={() => navigate('/hardship/create')}
        >
          Create New Hardship
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'secondary.main',
            },
          }}
          onClick={() => navigate('/debts')}
        >
          View All Hardship
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'secondary.main',
            },
          }}
          onClick={() => navigate('/hardship/edit')}
        >
          Edit Hardship
        </Button>
      </Box>
    </Box>
  );
}

export default MainScreen;
