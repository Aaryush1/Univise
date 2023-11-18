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
          Instantaneous, 24/7 enrollment and advising advice powered through generative AI technologies.           </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OurStory;
