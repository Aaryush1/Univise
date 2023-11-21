// components/AdvisorPage/InitialState.tsx
import { Box, Typography, Stack } from '@mui/material';
import UniviseButton from '../UniviseButton';
import CapabilitiesButton from '../CapabilitiesButton';
import SampleQuestions from './SampleQuestions';
import QuestionInput from '../QuestionInput';

interface InitialStateProps {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  handleSendClick: () => void;
}

// components/AdvisorPage/InitialState.tsx
// ... (other imports remain unchanged)

const InitialState: React.FC<InitialStateProps> = ({ question, setQuestion, handleSendClick }) => {
    return (
      <Stack
        sx={{
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'center', // Centers content vertically
          alignItems: 'center', // Centers content horizontally
          padding: 4,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ width: '100%', textAlign: 'center' }}>
        <UniviseButton />
          <Typography variant="h4" component="h1" gutterBottom>
            Univise 0.1.0
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Subtext description of model
          </Typography>
          <SampleQuestions />
        </Box>
        
        <QuestionInput 
          question={question}
          setQuestion={setQuestion}
          handleSend={handleSendClick}
        />
  
        <CapabilitiesButton />
      </Stack>
    );
  };
  
export default InitialState;
  