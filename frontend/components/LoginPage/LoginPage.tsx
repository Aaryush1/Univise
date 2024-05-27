import React, { useState } from 'react';
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";
import { signInWithGoogle } from "@/services/firebase";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginClick = async () => {
    try {
      await signInWithGoogle();
      router.push("/advisor");
    } catch (error: any) { // or catch (error: Error)
      if (error.message === 'Only .edu email addresses are allowed') {
        setErrorMessage('Only .edu email addresses are allowed');
      } else {
        setErrorMessage('Error signing in with Google');
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Button variant="contained" onClick={handleLoginClick}>
        Sign In with Google
      </Button>
      {errorMessage && (
        <Typography color="error">{errorMessage}</Typography>
      )}
    </div>
  );
};

export default LoginPage;