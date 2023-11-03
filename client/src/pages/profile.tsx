import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Square from '@/components/Square';
import RecentExercise from '@/components/RecentExercise';


import { ProgressCircle } from "@tremor/react";

import axios from 'axios';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [dashData, setDashData] = useState(null)
  const [recentExercise, setRecentExercise] = useState(null)
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
        setDashData(response.data.dashData);
        setRecentExercise(response.data.recentActivities)
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setLoading(false); 
      });
  }, []); 

  let totalDistance;
  if (dashData) {
    totalDistance = dashData.summary.distances.find(item => item.activity === "total")
  }
  
  const steps = dashData.summary.steps;
  const stepGoal = dashData.goals.steps;
  const stepPct = Math.floor((steps / stepGoal) * 100);

  // const activeMins = dashData.summary.veryActiveMinutes;
  // const activeMinGoal = dashData.goals.activeMinutes;
  // const activeMinsPct = Math.floor((activeMins / activeMinGoals) * 100);

  console.log(stepPct)
  
  console.log(recentExercise)


  return (
    <div className="Profile">
      <Navigation />
      {/* <h1>Welcome to your Dashboard</h1> */}
      
      {loading ? (
        <p>Loading profile data...</p>
      ) : profileData ? (
        <div id='grid-container'>
          <div id='greet'>
          <div>
            <h1>Welcome, {profileData.user.displayName}!</h1>
            <h3>Take a look at your day so far..</h3>

          </div>

              
          </div>
          <div id='daily-data'>
            <Square >
              <div className='inner-square'>
                
                <ProgressCircle
                    value={stepPct}
                    radius={60}
                    strokeWidth={20}
                    tooltip="radius: 50, strokeWidth: 8"
                    showAnimation={true}
                    color={"indigo"}
                  >
                  <p>{dashData.summary.steps}</p>   
                  </ ProgressCircle>
                  <p>Steps</p>
              </div>

            </Square> 
            {/* <Square >
            <ProgressCircle
                    value={activeMinsPct}
                    radius={60}
                    strokeWidth={20}
                    tooltip="radius: 50, strokeWidth: 8"
                    showAnimation={true}
                    color={"indigo"}
                  >
                  <p>{dashData.summary.steps}</p>   
                  </ProgressCircle>
                  <p>zone minutes</p>
            </Square> */}
            <Square >
              <p>Today's total distance: {totalDistance.distance} Kms</p>
            </Square>
            <Square >
              <p>Today's calories burnt: {dashData.summary.caloriesOut}</p>
            </Square>
          
         

          </div>
          <div id="recent-data">
            <Square height={200} width={200}>
                <p>Today's calories burnt: {dashData.summary.caloriesOut}</p>
            </Square><Square height={200} width={200}>
              <p>Today's calories burnt: {dashData.summary.caloriesOut}</p>
            </Square><Square height={200} width={200}>
              <p>Today's calories burnt: {dashData.summary.caloriesOut}</p>
            </Square>
          </div>
          <div id="sidebar">
            <p>Recent Activity</p>
            {recentExercise.activities.map( exercise => (
              <RecentExercise
                key={exercise.id}
                name={exercise.activityName}
                length={`${Math.floor((exercise.duration % 3600000) / 60000)} minutes`}
                date={new Date(exercise.originalStartTime).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'numeric',
                }) + " " + new Date(exercise.originalStartTime).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
                calories={exercise.calories}
              />
            ))}


          </div>
        </div>
        
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
}

export default Profile;

