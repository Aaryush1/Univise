import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '12vh', // 12% of the viewport height
        backgroundColor: 'darkGrey', // Replace with actual color code or MUI theme color
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1">
        © 2023 Your Company Name. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;