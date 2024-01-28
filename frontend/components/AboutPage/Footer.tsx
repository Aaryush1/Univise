import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '12vh', 
        backgroundColor: 'black', 
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1">
      © 2023 Univise.org  |  
      <a href="https://www.aaryush.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
        Aaryush Gupta
      </a>  |  
      <a href="https://www.harrisonroloff.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
        Harrison Roloff
      </a>
    </Typography>
    </Box>
  );
};

export default Footer;