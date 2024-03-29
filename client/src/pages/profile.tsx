import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Square from "@/components/Square";
import Clock from "@/components/Clock";
import RecentExercise from "@/components/RecentExercise";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import { Card, AreaChart, Title, BarList, BarChart } from "@tremor/react";
import { useAuth } from "../components/UseAuth";
import { useRouter } from "next/router";
import { ProgressCircle } from "@tremor/react";

import axios from "axios";

function Profile() {
  const { authenticated, logout, resetAuthState } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [dashData, setDashData] = useState(null);
  const [recentExercise, setRecentExercise] = useState(null);
  const [recentRuns, setRecentRuns] = useState(null);
  const [recentSteps, setRecentSteps] = useState(null);
  const [loading, setLoading] = useState(true);

  const resetState = () => {
    setProfileData(null);
    setDashData(null);
    setRecentExercise(null);
    setRecentRuns(null);
    setRecentSteps(null);
    setLoading(true); // Reset loading state to true
  };

  useEffect(() => {
    resetState(); // Call resetState when the component mounts
  }, []);

  useEffect(() => {
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem("token");

    // Make the GET request to your backend endpoint with the access token
    axios
      .get("http://localhost:3001/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        setProfileData(response.data.profileData);
        setDashData(response.data.dashData);
        setRecentExercise(response.data.recentActivities);
        setRecentRuns(response.data.recentRuns);
        setRecentSteps(response.data.weeklySteps);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  }, []);

  console.log(recentSteps);

  let totalDistance, distGoal, distPct;
  let steps, stepGoal, stepPct;
  let activeMins, activeMinGoal, activeMinsPct;
  let calories, caloriesGoal, calPct;
  if (dashData) {
    totalDistance = dashData.summary.distances.find(
      (item) => item.activity === "total"
    );

    steps = dashData.summary.steps;
    stepGoal = dashData.goals.steps;
    stepPct = Math.floor((steps / stepGoal) * 100);

    activeMins = dashData.summary.veryActiveMinutes;
    activeMinGoal = dashData.goals.activeMinutes;
    activeMinsPct = Math.floor((activeMins / activeMinGoal) * 100);

    distGoal = dashData.goals.distance;
    distPct = Math.floor((totalDistance.distance / distGoal) * 100);

    calories = dashData.summary.caloriesOut;
    caloriesGoal = dashData.goals.caloriesOut;
    calPct = Math.floor((calories / caloriesGoal) * 100);
  }
  let reducedData;
  if (recentRuns) {
    reducedData = recentRuns.map((entry) => ({
      distance: entry.distance,
      date:
        new Date(entry.originalStartTime).toLocaleString("en-GB", {
          day: "numeric",
          month: "numeric",
        }) +
        " " +
        new Date(entry.originalStartTime).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
    }));
  }

  let weeklyStepData;
  console.log(recentSteps);
  if (recentSteps) {
    weeklyStepData = recentSteps["activities-steps"].map((item) => {
      const inputDate = new Date(item.dateTime);

      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      const dayIndex = inputDate.getDay();

      const dayName = dayNames[dayIndex];

      return {
        day: dayName,
        steps: item.value,
      };
    });
  }
  const valueFormatter = (number) =>
    `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

  let topBadges;
  if (profileData) {
    topBadges = profileData.user.topBadges;
  }

  console.log(totalDistance);

  return (
    <div className="Profile">
      <Navigation />

      {loading ? (
        <ProfileSkeleton />
      ) : profileData ? (
        <div id="grid-container">
          <div id="greet">
            <div>
              <h3 id="welcome-text">
                Welcome, <strong>{profileData.user.displayName}</strong>!
              </h3>
              <h3>Let's take a look at your day so far..</h3>
            </div>
            <span>
              <Clock />
            </span>
          </div>
          <div id="daily-data">
            <Square>
              <div className="inner-square">
                <ProgressCircle
                  value={stepPct}
                  radius={60}
                  strokeWidth={20}
                  tooltip="Total steps today"
                  showAnimation={true}
                  color={stepPct > 100 ? "green" : "indigo"}
                >
                  <p>{dashData.summary.steps}</p>
                </ProgressCircle>
                <p>Steps</p>
              </div>
            </Square>
            <Square>
              <div className="inner-square">
                <ProgressCircle
                  value={activeMinsPct}
                  radius={60}
                  strokeWidth={20}
                  tooltip="Total active minutes today"
                  showAnimation={true}
                  color={activeMinsPct > 100 ? "green" : "indigo"}
                >
                  <p>{activeMins}</p>
                </ProgressCircle>
                <p>zone minutes</p>
              </div>
            </Square>
            <Square>
              <div className="inner-square">
                <ProgressCircle
                  value={distPct}
                  radius={60}
                  strokeWidth={20}
                  tooltip="Total daily distance"
                  showAnimation={true}
                  color={distPct > 100 ? "green" : "indigo"}
                >
                  <p>{totalDistance.distance}Km</p>
                </ProgressCircle>
                <p>Total Distance</p>
              </div>
            </Square>

            <Square>
              <div className="inner-square">
                <ProgressCircle
                  value={calPct}
                  radius={60}
                  strokeWidth={20}
                  tooltip="Total expended calories today"
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
            {/* <Card id="recent-runs" style={{ border: 'none', width: '100%', height: '100%' }}> */}
            <Square>
              <div id="recent-runs">
                <Title className="graph-title justify-center items-center">
                  Recent Runs
                </Title>
                <AreaChart
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
              </div>
              {/* </Card> */}
            </Square>

            <Square>
              <div id="recent-steps">
                <Title className="graph-title">Daily Steps - Past Week</Title>
                <BarChart
                  className="h-72 mt-4"
                  data={weeklyStepData}
                  index="day"
                  categories={["steps"]}
                  colors={["blue"]}
                  yAxisWidth={30}
                />
              </div>
            </Square>

            <Square>
              <div id="outer-container">
                <Title>Top Badges</Title>
                <div id="top-badges-container">
                  {topBadges.map((badge) => (
                    <div key={badge.id} className="badge-item">
                      <img src={badge.image75px} alt={badge.description} />
                      <p>{badge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Square>
          </div>

          <div id="sidebar">
            <p>Recent Activity</p>
            {recentExercise.activities.slice(0, 8).map((exercise) => (
              <RecentExercise
                key={exercise.id}
                name={exercise.activityName}
                length={`${Math.floor((exercise.duration % 3600000) / 60000)}`}
                date={
                  new Date(exercise.originalStartTime).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "numeric",
                  }) +
                  " " +
                  new Date(exercise.originalStartTime).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })
                }
                calories={exercise.calories}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Profile Data is unavailable, try authenticating with FitBit</p>
      )}
    </div>
  );
}

export default Profile;
