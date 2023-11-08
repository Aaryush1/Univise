// src/pages/Landing.tsx
import Container from '@mui/material/Container';
import MainContent from '../components/LandingPage/MainContent';
import Footer from '../components/shared/Footer';
import OurStory from '../components/LandingPage/OurStory';

const Landing = () => {
  return (
    <Container maxWidth={false} disableGutters>
      <MainContent />
      <OurStory />
      <Footer />
    </Container>
  );
};

export default Landing;
