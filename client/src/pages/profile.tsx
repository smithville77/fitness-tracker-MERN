import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import axios from 'axios';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Make the GET request to your backend endpoint with the access token
    axios
      .get('http://localhost:3001/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setProfileData(response.data.profileData);
        setLoading(false); // Data fetching is complete
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setLoading(false); // Data fetching is complete, even if it failed
      });
  }, []); // Include accessToken in the dependencies array

  return (
    <div className="Profile">
      <Navigation />
      <h1>Fitbit Profile Data</h1>
      
      {loading ? (
        <p>Loading profile data...</p>
      ) : profileData ? (
        <div>
          <p>Name: {profileData.user.displayName}</p>
          <p>Age: {profileData.user.age}</p>
          <p>Gender: {profileData.user.gender}</p>
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
}

export default Profile;

