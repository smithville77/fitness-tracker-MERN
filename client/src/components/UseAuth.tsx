// useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

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
        console.log('Token:', token);
        setAuthenticated(true);
      } else {
        throw new Error('Login failed'); codes
      }
    } catch (error) {
      console.log('Login error:', error);
     
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

  const resetAuthState = () => {
    setAuthenticated(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    resetAuthState(); // Call the function to reset the state
    console.log('logged out');
  };

  return { authenticated, login, logout, resetAuthState, refreshAccessToken };
}
