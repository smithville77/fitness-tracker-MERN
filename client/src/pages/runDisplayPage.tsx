import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import axios from 'axios';

function RunDisplayPage() {
  const [runData, setRunData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);

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

  const filteredData = filterData();

  return (
    <div className="Profile">
      <Navigation />
      <p>Recent runs total: {runData.length}</p>
      <p>Select runs by distance</p>
      <select id="range-dropdown" onChange={handleRangeChange}>
        {ranges.map((range, index) => (
          <option key={index} value={index}>
            {range.label}
          </option>
        ))}
      </select>
      <div>
        {loading ? (
          <p>Loading run data...</p>
        ) : filteredData.length > 0 ? (
          <div>
            {filteredData.map((item, index) => (
              <div key={index}>
                <p>Run distance: {item.distance} Run speed: {parseFloat(item.speed).toFixed(2)}</p>
                
              </div>
            ))}
          </div>
        ) : (
          <p>No run data available for the selected range</p>
        )}
      </div>
    </div>
  );
}

export default RunDisplayPage;
