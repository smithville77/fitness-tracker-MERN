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
    
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/users/login', {
        username,
        password,
      });
      
      if (response.status === 200) {
        const token = response.data.token;
        const refreshToken = response.data.refreshToken;
        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refreshToken);
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

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post('http://localhost:3001/refresh-token', {
        refreshToken,
      });

      if (response.status === 200) {
        const newAccessToken = response.data.access_token;

        // Update the locally stored access token with the new one
        localStorage.setItem('token', newAccessToken);

        return newAccessToken;
      } else {
        throw new Error('Refresh token failed');
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };
const logout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    console.log("logged out");
  };


  return { authenticated, login, logout, setAuthenticated, refreshAccessToken };

  

}
