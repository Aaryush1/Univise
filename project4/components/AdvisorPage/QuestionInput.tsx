// components/QuestionInput.tsx
import { Box, Input, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface QuestionInputProps {
  question: string;
  setQuestion: (question: string) => void;
  handleSend: () => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ question, setQuestion, handleSend }) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
    >
      <Input
        placeholder="Ask any question ..."
        fullWidth
        value={question}
        inputProps={{ 'aria-label': 'Ask any question' }}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <IconButton type="submit" color="primary" size="large">
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
};

export default QuestionInput;
