import React from 'react';
import axios from 'axios'; 

const FitbitAuthButton = () => {
  const handleFitbitAuth = async () => {
    try {
      // Make an API request to your backend to initiate the Fitbit OAuth2 flow
      await axios.get('http://localhost:3001/auth/fitbit');
      // You can also handle the response if needed
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the API request
    }
  };

  return (
    <button onClick={handleFitbitAuth}>Authorize with Fitbit</button>
  );
};

export default FitbitAuthButton;
