import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import axios from 'axios';

function RunDisplayPage() {
  const [runData, setRunData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem('accessToken');

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
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching run data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="Profile">
      <Navigation />
      {loading ? (
        <p>Loading profile data...</p>
      ) : runData && runData.length > 0 ? (
        <div>
          {runData.map((item, index) => (
            <div key={index}>
              <p>Run distance: {item.distance}</p>
              {/* You can display other information here */}
            </div>
          ))}
        </div>
      ) : (
        <p>No run data available</p>
      )}
    </div>
  );
}

export default RunDisplayPage;
