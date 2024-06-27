import React from 'react'
import { Typography, Grid, Box, Container } from '@mui/material'
import { HeroSection } from '../components/HeroSection'
import { Button } from '../components/CustomButton'
import { Card } from '../components/Card'
import SchoolIcon from '@mui/icons-material/School'
import ChatIcon from '@mui/icons-material/Chat'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
          Why Choose Univise?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card
              title="Connect with Peers"
              content={
                <Box display="flex" flexDirection="column" alignItems="center">
                  <EmojiPeopleIcon fontSize="large" color="primary" sx={{ mb: 2 }} />
                  <Typography>
                    Build a network with students from your university and beyond.
                  </Typography>
                </Box>
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              title="Get Expert Advice"
              content={
                <Box display="flex" flexDirection="column" alignItems="center">
                  <SchoolIcon fontSize="large" color="primary" sx={{ mb: 2 }} />
                  <Typography>
                    Receive guidance from experienced students and mentors.
                  </Typography>
                </Box>
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              title="AI-Powered Chats"
              content={
                <Box display="flex" flexDirection="column" alignItems="center">
                  <ChatIcon fontSize="large" color="primary" sx={{ mb: 2 }} />
                  <Typography>
                    Get instant answers with our AI academic advisor.
                  </Typography>
                </Box>
              }
            />
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1" textAlign="center" paragraph>
            Join Univise today and take the first step towards a more connected and informed university experience.
          </Typography>
          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="contained" color="primary" size="large" href="/login">
              Sign Up Now
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
}