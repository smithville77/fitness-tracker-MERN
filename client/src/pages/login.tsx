import React from "react";
import { useAuth } from "@/components/UseAuth";
import LoginForm from "@/components/LoginForm";
import Navigation from "@/components/Navigation";

function LoginPage() {
  const { authenticated, login } = useAuth();

  // Function to handle successful login
  const handleLogin = async () => {
   login();
  };

  return (
    <div>
      {/* Display navigation or header if needed */}
      <Navigation />

      <h1>Login Page</h1>

      {authenticated ? (
        <p>You are already logged in.</p>
      ) : (
        // Render the login form
        <LoginForm onSuccess={handleLogin} />
      )}
    </div>
  );
}

export default LoginPage;
