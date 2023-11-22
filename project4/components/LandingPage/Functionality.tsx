import { Grid, Typography, Box } from '@mui/material';

const OurStory = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 2,
        minHeight: '40vh', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(138deg, rgba(153,27,27,1) 0%, rgba(230,46,46,1) 50%, rgba(153,27,27,1) 100%)',
        color: 'white',
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column"> {/* Adjust spacing as needed */}
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom align="center" sx={{ color: 'white' }}>
            Functionality
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} lg={6}> {/* Adjust width as needed */}
          <Typography variant="body1" align="center" sx={{ color: 'white' }}>
          Usage of generative AI and RAG technologies on public data from the University of Wisconsin-Madison.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OurStory;