import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import AdvisorFooter from '../AdvisorFooter';
import Header from '../Header';
import CapabilitiesPopup from '../CapabilitesPopup';

type InitialStateProps = {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  handleSendClick: () => void;
};

const InitialState: React.FC<InitialStateProps> = ({ question, setQuestion, handleSendClick }) => {
  // State for managing the visibility of the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to open the popup
  const openPopup = () => setIsPopupOpen(true);

  // Function to close the popup
  const closePopup = () => setIsPopupOpen(false);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onOpenCapabilities={openPopup} />

      {/* Main content */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="subtitle1" color="textSecondary" sx={{ textAlign: 'center' }}>
          Ask anything related to advising and enrollment
        </Typography>
      </Box>

      <AdvisorFooter
        question={question}
        setQuestion={setQuestion}
        handleSendClick={handleSendClick}
      />

      {/* Capabilities Popup */}
      <CapabilitiesPopup open={isPopupOpen} onClose={closePopup} />
    </Box>
  );
};

export default InitialState;
