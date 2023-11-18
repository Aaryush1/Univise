// components/Functionality.tsx
import { Grid, Typography, Box } from '@mui/material';

const Functionality = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}> {/* Adjust padding as needed */}
      <Grid container spacing={2}> {/* Adjust spacing as needed */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            Functionality
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">
            Usage of generative AI and RAG technologies on public data from the University of Wisconsin-Madison.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Functionality;
