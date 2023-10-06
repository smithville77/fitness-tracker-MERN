import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import axios from 'axios';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [dashData, setDashData] = useState(null)
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
        setDashData(response.data.dashData)
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setLoading(false); 
      });
  }, []); 

  return (
    <div className="Profile">
      <Navigation />
      <h1>Welcome to your Dashboard</h1>
      
      {loading ? (
        <p>Loading profile data...</p>
      ) : profileData ? (
        <>
          <div>
            <p>Welcome, {profileData.user.displayName}!</p>
            <p>Age: {profileData.user.age}</p>
            <p>Gender: {profileData.user.gender}</p>
          </div>
          <div>
          <p>Today's Steps: {dashData.summary.steps}</p>
          <p>Today's floors: {dashData.summary.floors}</p>
          <p>Today's total distance: {dashData.summary.distances[1].distance}</p>
          <p>Today's calories burnt: {dashData.summary.caloriesOut}</p>
          <p>Today's zone minutes: {dashData.summary.veryActiveMinutes}</p>


          </div>
        </>
        
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
}

export default Profile;

