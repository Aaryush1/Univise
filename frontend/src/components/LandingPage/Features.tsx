// src/components/LandingPage/Features.tsx
import { Grid, Typography, Box } from '@mui/material';
// Import your icon images
import Icon1 from '../../assets/icons/1.png';
import Icon2 from '../../assets/icons/2.png';
import Icon3 from '../../assets/icons/3.png';
import Icon4 from '../../assets/icons/4.png';

const Features = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Features
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <img src={Icon1} alt="Feature 1" style={{ width: '50%', height: 'auto' }} />
          <Typography>
            Custom tailored to your preferences and journey
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <img src={Icon2} alt="Feature 2" style={{ width: '50%', height: 'auto' }} />
          <Typography>
            24/7 access to free chatbot
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <img src={Icon3} alt="Feature 3" style={{ width: '50%', height: 'auto' }} />
          <Typography>
            Scheduling and enrollment recommendations
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <img src={Icon4} alt="Feature 4" style={{ width: '50%', height: 'auto' }} />
          <Typography>
            Degree and graduation planning
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Features;
