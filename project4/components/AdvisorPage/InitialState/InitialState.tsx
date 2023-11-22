// components/AdvisorPage/InitialState/InitialState.tsx
import { Box } from '@mui/material';
import AdvisorFooter from '../AdvisorFooter'; // Import the AdvisorFooter component
import Header from '../Header'; // Import the Header component

type InitialStateProps = {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  handleSendClick: () => void;
};

const InitialState: React.FC<InitialStateProps> = ({ question, setQuestion, handleSendClick }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Include the Header component */}
      <Header />

      {/* Content area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Placeholder for any additional content */}
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
