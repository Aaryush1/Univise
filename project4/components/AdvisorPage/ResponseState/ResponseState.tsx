// components/AdvisorPage/ResponseState.tsx
import { Box, Typography } from '@mui/material';

interface ResponseStateProps {
  question: string;
}

const ResponseState: React.FC<ResponseStateProps> = ({ question }) => {
  return (
    <Box>
      <Typography variant="h5">{question}</Typography>
      {/* ... Display the response here */}
    </Box>
  );
};

export default ResponseState;
