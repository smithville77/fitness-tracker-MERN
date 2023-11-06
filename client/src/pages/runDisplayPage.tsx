import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import RunEntry from '@/components/individualRunEntry';
import Square from '@/components/Square';
import axios from 'axios';

function RunDisplayPage() {
  const [runData, setRunData] = useState([]);
  const [currentRun, setCurrentRun] = useState(null)
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);
  const [tcxLink, setTcxLink] = useState(null);

const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    // Retrieve the access token from localStorage
    
    console.log("new useEffect triggerd")
    // Make the GET request to your backend endpoint with the access token
    axios
      .get('http://localhost:3001/runDisplayPage', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          
        },
      })
      .then((response) => {
        console.log('API Response:', response.data.runData);
        setRunData(response.data.runData);
        setCurrentRun(response.data.runData[0])
        setTcxLink(response.data.runData[0].tcxLink)
        setLoading(false);
      })
      
      .catch((error) => {
        console.error('Error fetching run data:', error);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   setCurrentRun(runData[0])
  // }, [])
  
 
  fetch(tcxLink, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((xmlData) => {
      console.log(xmlData);
    })
    .catch((error) => console.error("Error:", error));
  


  
    

  const ranges = [
    { label: 'All Ranges', min: 0, max: 1000 }, 
    { label: '0 - 4.9 km', min: 0, max: 4.9 },
    { label: '5 - 9.9 km', min: 5, max: 9.9 },
    { label: '10 - 14.9 km', min: 10, max: 14.9 },
    { label: 'greater than 15 km', min: 15, max: 1000 },
  ];

  // Function to filter data based on the selected range
  const filterData = () => {
    if (!selectedRange) return runData; // Return all data if no range is selected

    const filteredData = runData.filter((item) => {
      const distance = item.distance;
      return distance >= selectedRange.min && distance <= selectedRange.max;
    });

    return filteredData;
  };

  const handleRangeChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedRange = ranges[selectedIndex];
    setSelectedRange(selectedRange);
  };

  const filterBySpeedData = () => {
    const speedData = runData.sort((a, b) => {
      return b.speed - a.speed
    })
    
    setRunData([...speedData])
    console.log('reached')
  }

  const filterByDistance = () => {
    const distanceData = runData.sort((a, b) => {
      return b.distance - a.distance
    })
    setRunData([...distanceData])
  }

 

  const filteredData = filterData();
  
  

  return (
    <div className="run-display">
      <Navigation />
      
      <div id="run-display-grid-container">
      <div id="display-container">
      <div id="left-section">
        {loading ? (
          <p>Loading run data...</p>
        ) : filteredData.length > 0 ? (
          <div>
            

            {filteredData.map((item, index) => (
              <RunEntry
                key={index}
                date={new Date(item.originalStartTime).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'numeric',
                }) + " " + new Date(item.originalStartTime).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
                distance={parseFloat(item.distance).toFixed(2)}
                speed={parseFloat(item.speed).toFixed(2)}
              />
              
            ))}
          </div>
        ) : (
          <p>No run data available for the selected range</p>
        )}
      </div>
      <div id="depth-sidebar">
      <div id="filter-data-section">
        <div id="top-filter">
            <p>Recent runs total: {runData.length}</p>
            <p>Select range: 
            <select id="range-dropdown" onChange={handleRangeChange}>
              {ranges.map((range, index) => (
                <option key={index} value={index}>
                  {range.label}
                </option>
              ))}
            </select>
            </p>
            </div>
            <div id="bottom-filter">
            <button id="speed-sort" onClick={filterBySpeedData}>
              Filter By Speed
            </button>
            <button id="distance-sort" onClick={filterByDistance}>
              Filter By Distance
            </button>
            </div>
          </div>
          {currentRun && (
  <div id="stats-container">
    <span>
      <p>Run Stats</p>
    </span>
    {new Date(currentRun.originalStartTime).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'numeric',
    }) + " " + new Date(currentRun.originalStartTime).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })}

    <p>distance {parseInt(currentRun.distance).toFixed(2)}</p>
    <p>HR{currentRun.averageHeartRate}</p>
    <p> avg Speed:{currentRun.speed.toFixed(2)}</p>
    <p> duration: {currentRun.duration / 60000}</p>
  </div>
)}
{currentRun && (
  <div id="weekly-goals-container">
    <span>
      <p>Effect on your day</p>
    </span>
    <p>total zone minutes {currentRun.activeZoneMinutes.totalMinutes}</p>
    <p>Cals: {currentRun.calories}</p>
    <p>Floors: {currentRun.elevationGain}</p>
    <p>Steps:{currentRun.steps}</p>
  </div>
)}
{currentRun && (
  <div id="map-container">
    <span>
      <p>Run Map</p>
    </span>
    {/* Add the content for the Run Map */}
  </div>
)}

           
      </div>
      
           
          
    </div>
    </div>
          
            
          
          
    </div>
  );
}

export default RunDisplayPage;
