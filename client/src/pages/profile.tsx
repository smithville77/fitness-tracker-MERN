import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Square from '@/components/Square';
import RecentExercise from '@/components/RecentExercise';
import { Card, LineChart, Title } from "@tremor/react";





import { ProgressCircle } from "@tremor/react";

import axios from 'axios';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [dashData, setDashData] = useState(null)
  const [recentExercise, setRecentExercise] = useState(null)
  const [recentRuns, setRecentRuns] = useState(null)
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
        setRecentRuns(response.data.recentRuns)
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setLoading(false); 
      });
  }, []); 

  console.log(recentRuns)

  let totalDistance, distGoal, distPct;
  let steps,stepGoal, stepPct;
  let activeMins, activeMinGoal, activeMinsPct;
  let calories, caloriesGoal, calPct;
  if (dashData) {
    totalDistance = dashData.summary.distances.find(item => item.activity === "total")

    steps = dashData.summary.steps;
    stepGoal = dashData.goals.steps;
    stepPct = Math.floor((steps / stepGoal) * 100);

    activeMins = dashData.summary.veryActiveMinutes;
    activeMinGoal = dashData.goals.activeMinutes;
    activeMinsPct = Math.floor((activeMins / activeMinGoal) * 100);

    distGoal = dashData.goals.distance;
    distPct = Math.floor((totalDistance.distance / distGoal) * 100)  
    
    calories = dashData.summary.caloriesOut;
    caloriesGoal = dashData.goals.caloriesOut
    calPct = Math.floor((calories / caloriesGoal) * 100)



  }
  let reducedData;
  if (recentRuns) {
      reducedData = recentRuns.map(entry => ({
      distance: entry.distance,
      date: new Date(entry.originalStartTime).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'numeric',
      }) + " " + new Date(entry.originalStartTime).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
    }));
  }
  

  
  
  console.log(totalDistance)


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
            <h1 id="welcome-text">Welcome, {profileData.user.displayName}!</h1>
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
                    color={stepPct > 100 ? "green" : "indigo"}
                  >
                  <p>{dashData.summary.steps}</p>   
                  </ ProgressCircle>
                  <p>Steps</p>
              </div>

            </Square> 
            <Square >
              <div className='inner-square'>
                <ProgressCircle
                    value={activeMinsPct}
                    radius={60}
                    strokeWidth={20}
                    tooltip="radius: 50, strokeWidth: 8"
                    showAnimation={true}
                    color={activeMinsPct > 100 ? "green" : "indigo"}
                  >
                  <p>{activeMins}</p>
                  </ProgressCircle>
                  <p>zone minutes</p>
                </div>
            </Square>
            <Square >
              <div className='inner-square'>
                <ProgressCircle
                    value={distPct}
                    radius={60}
                    strokeWidth={20}
                    tooltip="radius: 50, strokeWidth: 8"
                    showAnimation={true}
                    
                    color={distPct > 100 ? "green" : "indigo"}
                  >
                  <p>{totalDistance.distance}Km</p>
                  </ProgressCircle>
                  <p>Total Distance</p>
                </div>
            </Square>
              
            <Square >
              <div className='inner-square'>
                <ProgressCircle
                    value={calPct}
                    radius={60}
                    strokeWidth={20}
                    tooltip="radius: 50, strokeWidth: 8"
                    showAnimation={true}
                    
                    color={calPct > 100 ? "green" : "indigo"}
                  >
                  <p>{calories}kCal</p>
                  </ProgressCircle>
                  <p>Total Calories</p>
                </div>
            </Square>
          
         

          </div>


          <div id="recent-data">
            <Square  style={{ border: 'none', width: '100%', height: '100%' }}>
              <Card id="recent-runs" style={{ border: 'none', width: '100%', height: '100%' }}>
                <Title>Recent Runs</Title>
                <LineChart
                  className="line-graph"
                  data={reducedData}
                  index="date"
                  categories={["distance"]}
                  decoration={"bottom"}
                  decorationColor="indigo"
                  colors={["blue"]}
                  showAnimation={true}
                  yAxisWidth={50}
                  
                />
              </Card>

              
            </Square><Square height={200} width={200}>
              <p>Today's calories burnt: {dashData.summary.caloriesOut}</p>
            </Square><Square height={200} width={200}>
              <p>Today's calories burnt: {dashData.summary.caloriesOut}</p>
            </Square>
          </div>


          <div id="sidebar">
            <p>Recent Activity</p>
            {recentExercise.activities.slice(0,10).map( exercise => (
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

