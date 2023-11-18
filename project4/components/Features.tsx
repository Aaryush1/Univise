// components/Features.tsx
import { Grid, Typography, Box } from '@mui/material';

const Features = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4, textAlign: 'center' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Features
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <img src="/icons/1.png" alt="Feature 1" style={{ width: '50%', height: 'auto' }} />
          <Typography>
            Custom tailored to your preferences and journey
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <img src="/icons/2.png" alt="Feature 2" style={{ width: '50%', height: 'auto' }} />
          <Typography>
            24/7 access to free chatbot
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <img src="/icons/3.png" alt="Feature 3" style={{ width: '50%', height: 'auto' }} />
          <Typography>
            Scheduling and enrollment recommendations
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <img src="/icons/4.png" alt="Feature 4" style={{ width: '50%', height: 'auto' }} />
          <Typography>
            Degree and graduation planning
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Features;
