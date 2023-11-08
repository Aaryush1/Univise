// src/components/LandingPage/MainContent.tsx
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const navigate = useNavigate();

  const handleAdvisorPageRedirect = () => {
    navigate('/advisor'); // Replace with your actual path to AdvisorPage
  };

  return (
    <Box
      sx={{
        height: '88vh', // 80% of the viewport height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: 'grey', // Directly setting a light grey background color
        color: 'white', // Text color set to white for contrast
        width: '100vw', // Full width to remove any margin/border whitespace
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom sx={{ mb: 0 }}>
        Univise
      </Typography>
      <Typography variant="h5" component="h2" sx={{ mt: 1, mb: 2 }}>
        Transforming Advising, One Chat at a Time
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 2, // Adjusted margin-top to create space between the subtitle and the button
          borderRadius: 50, // This gives the button an oval shape
          backgroundColor: '#ff0000', // Directly setting a bold red background color
          color: 'white', // Text color inside the button
          '&:hover': {
            backgroundColor: '#cc0000', // A darker red for when the button is hovered over
          },
        }}
        onClick={handleAdvisorPageRedirect}
      >
        Meet Advisor
      </Button>
    </Box>
  );
};

export default MainContent;
