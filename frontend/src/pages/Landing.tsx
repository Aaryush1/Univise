// src/pages/Landing.tsx
import Container from '@mui/material/Container';
import MainContent from '../components/LandingPage/MainContent';
import Footer from '../components/shared/Footer';

const Landing = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <MainContent />
      <Footer />
    </Container>
  );
};

export default Landing;
