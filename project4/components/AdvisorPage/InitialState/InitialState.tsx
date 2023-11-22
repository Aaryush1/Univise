// components/AdvisorPage/InitialState/InitialState.tsx
import { Box, Typography, Button } from '@mui/material';
import AdvisorFooter from '../AdvisorFooter'; // Import the AdvisorFooter component

type InitialStateProps = {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  handleSendClick: () => void;
};

const InitialState: React.FC<InitialStateProps> = ({ question, setQuestion, handleSendClick }) => {
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
          Univise 0.1.0
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Subtext description of model
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 4 }}>
        <Button variant="outlined">Sample Question 1</Button>
        <Button variant="outlined">Sample Question 2</Button>
      </Box>

      {/* Include the AdvisorFooter component */}
      <AdvisorFooter
        question={question}
        setQuestion={setQuestion}
        handleSendClick={handleSendClick}
      />
    </Box>
  );
};

export default InitialState;
