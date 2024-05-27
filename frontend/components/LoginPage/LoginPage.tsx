import { FC, useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Typography } from "@mui/material";
import { signInWithGoogle, signInWithEmailAndPassword } from "@/services/firebase";

const LoginPage: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginClick = async () => {
    console.log("handleLoginClick called");
    try {
      await signInWithGoogle();
      console.log("Sign-in with Google successful");
      router.push("/advisor");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleEmailLogin = async () => {
    setErrorMessage('');
    try {
      await signInWithEmailAndPassword(email, password);
      console.log("Sign-in with email and password successful");
      router.push("/advisor");
    } catch (error: any) { // or catch (error: Error) if you prefer
      console.error("Error signing in with email and password:", error);
      if (error.message && error.message.includes('Only .edu email addresses are allowed')) {
        setErrorMessage('Only .edu email addresses are allowed');
      } else {
        setErrorMessage('Invalid email or password');
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Button variant="contained" onClick={handleLoginClick}>
        Sign In with Google
      </Button>
      <div>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleEmailLogin}>
          Sign In with Email and Password
        </Button>
        {errorMessage && (
          <Typography color="error">{errorMessage}</Typography>
        )}
      </div>
    </div>
  );
};

export default LoginPage;