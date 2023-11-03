// // useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
    console.log('User authenticated: ' + authenticated);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        username,
        password,
      });
      
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log("Token:", token);
        setAuthenticated(true); // Update the authentication state
      } else {
        throw new Error("Login failed"); // Handle other status codes
      }
    } catch (error) {
      console.log("Login error:", error);
      // Handle errors here if needed
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    console.log("logged out");
  };

  return { authenticated, login, logout, setAuthenticated };
}
