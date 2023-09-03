// useAuth.js
import { useState, useEffect } from 'react';

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      setAuthenticated(true);
      console.log(authenticated)
    } else {
      setAuthenticated(false);
      console.log(authenticated)
    }
    console.log('User authenticated: ' + authenticated);
  }, []);

  const login = () => {
    // Perform your login logic here
    // If login is successful, set the authenticated state to true
    setAuthenticated(true);
    console.log("logged in")
  };

  const logout = () => {
    // Perform your logout logic here
    // Clear the token and set the authenticated state to false
    localStorage.removeItem('token');
    setAuthenticated(false);
    console.log("logged out")
  };

  return { authenticated, login, logout, setAuthenticated };
}
