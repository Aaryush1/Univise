import { FC } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { signInWithGoogle } from "@/services/firebase";

const LoginPage: FC = () => {
  const router = useRouter();

  const handleLoginClick = async () => {
    console.log("handleLoginClick called");
    try {
      await signInWithGoogle();
      console.log("Sign-in successful");
      router.push("/advisor");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  
  return (
    <div>
      <h1>Login Page</h1>
      <Button variant="contained" onClick={handleLoginClick}>
        Sign In with Google
      </Button>
    </div>
  );
};

export default LoginPage;