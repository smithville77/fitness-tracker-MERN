// import React from 'react';
// import axios from 'axios'; 
// axios.defaults.baseURL = 'http://localhost:3001';



// const FitbitAuthButton = () => {
//   const handleFitbitAuth = async () => {
//     try {
//       console.log('Sending request to /auth/fitbit'); 
//       // Make an API request to your backend to initiate the Fitbit OAuth2 flow
//       await axios.get('/auth/fitbit');
//       // You can also handle the response if needed
      
//     } catch (error) {
//       console.error(error);
//       // Handle any errors that occur during the API request
//     }
//   };

//   return (
//     <button onClick={handleFitbitAuth}>Authorize with Fitbit</button>
//   );
// };

// export default FitbitAuthButton;


import React, { useState } from 'react';
import axios from 'axios';

const FitbitAuthButton = () => {
  const [authorizationUrl, setAuthorizationUrl] = useState('');

  const initiateFitbitAuth = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auth/fitbit');
      const { authorizationUrl } = response.data;
      window.location.href = authorizationUrl; // Redirect the user to Fitbit
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="bg-red-500 hover:bg-green-600 text-white py-2 px-4 mx-2 rounded cursor-pointer" onClick={initiateFitbitAuth}>Authorize with Fitbit</button>
  );
};

export default FitbitAuthButton;
