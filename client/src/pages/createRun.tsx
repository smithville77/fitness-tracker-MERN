

import React from "react";
import { useAuth } from "@/components/UseAuth";
import LoginForm from "@/components/LoginForm";
import Navigation from "@/components/Navigation";
import CreateRunForm from "@/components/createRun";

function LoginPage() {
  const { authenticated, login } = useAuth();

  // Function to handle successful login
  // const handleLogin = async () => {
  //  login();
  // };
  

  return (
    <div>
      {/* Display navigation or header if needed */}
      <Navigation />

      <h1 className="flex justify-center mt-5">Create Run Page</h1>

      {authenticated ? (
        <CreateRunForm />
      ) : (
        // Render the login form 
        <LoginForm onSuccess={login} />
      )}
    </div>
  );
}

export default LoginPage;
