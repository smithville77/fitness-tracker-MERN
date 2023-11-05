import React from "react";
import { useAuth } from "@/components/UseAuth";
import LoginForm from "@/components/LoginForm";
import Profile from "./profile";
import Navigation from "@/components/Navigation";

function LoginPage() {
  const { authenticated, login } = useAuth();

  // Function to handle successful login
  // const handleLogin = async () => {
  //  login();
  // };
  

  return (
    <div>
  
      {authenticated ? (
        <Profile />
      ) : (
        // Render the login form
        <>
          <Navigation />
          <LoginForm onSuccess={login} />
        </>
        
      )}
    </div>
  );
}

export default LoginPage;
