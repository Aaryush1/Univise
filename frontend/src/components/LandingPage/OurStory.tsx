// src/components/LandingPage/OurStory.tsx
import { Grid, Typography, Box } from '@mui/material';

const OurStory = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}> {/* Adjust padding as needed */}
      <Grid container spacing={2}> {/* Adjust spacing as needed */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            Our Story
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            There are so many complex pieces to a successful advising and enrollment experience, all scattered throughout the university's resources. Why not consolidate it all here, and receive it through natural language!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OurStory;
