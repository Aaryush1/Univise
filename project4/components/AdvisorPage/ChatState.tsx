// components/AdvisorPage/ChatState.tsx
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person'; // Human icon
import AndroidIcon from '@mui/icons-material/Android'; // Robot icon
import React from 'react';
import Header from './Header';
import AdvisorFooter from './AdvisorFooter';
import CapabilitiesPopup from './CapabilitiesPopup';

interface ChatStateProps {
  chatHistory: { type: string, text: string }[];
  currentQuestion: string;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<string>>;
  handleSendClick: () => void;
}

const ChatState: React.FC<ChatStateProps> = ({ chatHistory, currentQuestion, setCurrentQuestion, handleSendClick }) => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onOpenCapabilities={openPopup} />

      {/* Chat history or initial subtitle */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 4, marginTop: '15vh', marginBottom: '15vh' }}>
      <List>
        {chatHistory.map((message, index) => (
          <ListItem key={index} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: message.type === 'question' ? 'flex-start' : 'flex-end',
          }}>
            <Box sx={{ display: 'flex', flexDirection: message.type === 'question' ? 'row' : 'row-reverse' }}>
              <ListItemIcon sx={{ minWidth: 'auto', marginRight: message.type === 'question' ? 1 : 0, marginLeft: message.type === 'response' ? 1 : 0 }}>
                {message.type === 'question' ? <PersonIcon color="primary" /> : <AndroidIcon color="secondary" />}
              </ListItemIcon>
              <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: message.type === 'question' ? 'left' : 'left' }}>
                {message.type === 'question' ? 'YOU' : 'ADVISOR'}
              </Typography>
            </Box>
            <Typography sx={{ textAlign: 'left' }}>
              {message.text}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>

      <AdvisorFooter
        question={currentQuestion}
        setQuestion={setCurrentQuestion}
        handleSendClick={handleSendClick}
      />

      <CapabilitiesPopup open={isPopupOpen} onClose={closePopup} />
    </Box>
  );
};

export default ChatState;
