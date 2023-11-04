
import React, { useState } from 'react';
import axios from 'axios';

const FitbitAuthButton = () => {
  const [authorizationUrl, setAuthorizationUrl] = useState('');

  const initiateFitbitAuth = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auth/fitbit');
      const { authorizationUrl } = response.data;
      window.location.href = authorizationUrl; 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="py-2 px-4 mx-2 rounded cursor-pointer" onClick={initiateFitbitAuth}>Authorize with Fitbit</button>
  );
};

export default FitbitAuthButton;
