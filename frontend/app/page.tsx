"use client";

import React, { useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import Image from 'next/image';
import capIcon from './capIcon.png';

const HomePage = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const handleContinue = () => {
    setPageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <Box display="flex" style={{ minHeight: '100vh' }}>
      {pageIndex === 1 && (
        <>
          <Box
            sx={{
              backgroundColor: '#2E2C2B',
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="center" sx={{ padding: { xs: 2, md: 4 } }}>
              <Box style={{ background: '#f5e4db', padding: '10px 20px', borderRadius: '25px', position: 'absolute', top: '10%', left: '10%', width: 'fit-content' }}>
                <Typography variant="body1" sx={{ fontFamily: 'Playfair Display' }}>
                  easy literature course?
                </Typography>
              </Box>
              <Box style={{ background: '#f5e4db', padding: '10px 20px', borderRadius: '25px', position: 'absolute', top: '50%', left: '30%', width: 'fit-content' }}>
                <Typography variant="body1" sx={{ fontFamily: 'Playfair Display' }}>
                  computer science 4 year plan
                </Typography>
              </Box>
              <Box style={{ background: '#f5e4db', padding: '10px 20px', borderRadius: '25px', position: 'absolute', top: '80%', left: '10%', width: 'fit-content' }}>
                <Typography variant="body1" sx={{ fontFamily: 'Playfair Display' }}>
                  freshman business classes
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: '#fff',
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: { xs: 2, md: 4 }
            }}
          >
            <Box textAlign="left" sx={{ padding: { xs: 2, md: 4 } }}>
              <Typography variant="h2" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                Unlimited Access
                <br />
                To Your Own
                <br />
                AI Academic Advisor
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                Welcome to Univise.org
                <br />
                Ask AI questions & get instant answers.
                <br />
                Specific to you & your University/College.
              </Typography>
              <Box
                component="button"
                sx={{ backgroundColor: '#333', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', mt: 2, fontFamily: 'Playfair Display' }}
                onClick={handleContinue}
              >
                Continue
              </Box>
            </Box>
          </Box>
        </>
      )}
      {pageIndex === 2 && (
        <>
          <Box
            sx={{
              backgroundColor: '#2E2C2B',
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center" sx={{ padding: { xs: 2, md: 4 } }} >
              <Box style={{ background: '#f5e4db', padding: '10px 20px', borderRadius: '25px', position: 'absolute', top: '20%', left: '10%', width: 'fit-content' }}>
                <Typography variant="body1" sx={{ fontFamily: 'Playfair Display' }}>
                  introductory computer science course for freshman at UW-Madison?
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                style={{ background: '#f5e4db', padding: '10px 20px', borderRadius: '25px', position: 'absolute', top: '50%', left: '10%', width: 'fit-content' }}
                sx={{ transform: 'translate(-5%, -5%)' }}
              >
                <Image src={capIcon} alt="Cap Icon" width={52} height={52} style={{ marginRight: 8 }} />
                <Typography variant="body1" sx={{ fontFamily: 'Playfair Display' }}>
                  Based on your status as a freshman in computer science looking for an introductory course, it's important to find courses that are open to first-year students and designed to provide a solid foundation in computer science fundamentals ...
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: '#fff',
              width: { xs: '100%', md: '50%' },
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: { xs: 2, md: 4 }
            }}
          >
            <Box textAlign="left" sx={{ padding: { xs: 2, md: 4 } }}>
              <Typography variant="h2" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                Get Instant
                <br />
                Answers.
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Playfair Display' }}>
                The Univise Chatbot is
                <br />
                capable of setting you up
                <br />
                for success in college.
              </Typography>
              <Box
                component="button"
                sx={{ backgroundColor: '#333', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', mt: 2, fontFamily: 'Playfair Display' }}
                onClick={handleContinue}
              >
                Continue
              </Box>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default HomePage;