import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import RunEntry from "@/components/individualRunEntry";
import RunDisplaySkeleton from "@/components/runDisplaySkeleton";
import ScrollTop from "@/components/ScrollTop";
import { useAuth } from "../components/UseAuth";
import { useRouter } from "next/router";
import axios from "axios";

function RunDisplayPage() {
  const { authenticated, logout } = useAuth();
  const [runData, setRunData] = useState([]);
  const [currentRun, setCurrentRun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRange, setSelectedRange] = useState(null);
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // const [tcxLink, setTcxLink] = useState("");
  const router = useRouter();
  const [token, setToken] = useState(accessToken);

  const resetState = () => {
    setRunData([]);
    setCurrentRun(null);
    setSelectedRange(null);
    setLoading(true);
  };

  useEffect(() => {
    resetState();
  }, []);

  console.log(token);
  useEffect(() => {
    if (token) {
      // setToken(accessToken);

      axios
        .get("http://localhost:3001/runDisplayPage", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log("API Response:", response.data.runData);
          setRunData(response.data.runData);
          setCurrentRun(response.data.runData[0]);
          // setTcxLink(response.data.runData[0].tcxLink)
          const tcxResponse = response.data.runData[0].tcxLink;
          const userId = response.data.userId;

          // setTcxLink(tcxResponse + "?includePartialTCX=true")
          // Replace the '-/' in the TCX link with the actual user ID
          // const updatedTcxLink = tcxResponse.replace(/\/user\/-/, `/user/${userId}`);
          // setTcxLink(updatedTcxLink);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching run data:", error);
          setLoading(false);
        });
    }
  }, []);

  const ranges = [
    { label: "All Ranges", min: 0, max: 1000 },
    { label: "0 - 4.9 km", min: 0, max: 4.9 },
    { label: "5 - 9.9 km", min: 5, max: 9.9 },
    { label: "10 - 14.9 km", min: 10, max: 14.9 },
    { label: "greater than 15 km", min: 15, max: 1000 },
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
      return b.speed - a.speed;
    });

    setRunData([...speedData]);
    console.log("reached");
  };

  const filterByDistance = () => {
    const distanceData = runData.sort((a, b) => {
      return b.distance - a.distance;
    });
    setRunData([...distanceData]);
  };

  const filteredData = filterData();

  const handleSelectedRunStats = (selectedRun: any) => {
    setCurrentRun(selectedRun);
    console.log(selectedRun);
  };

  return (
    <div className="run-display">
      <Navigation />
      {loading ? (
        <RunDisplaySkeleton />
      ) : filteredData.length > 0 ? (
        <div id="run-display-grid-container">
          <div id="display-container">
            <div id="depth-sidebar">
              <div id="filter-data-section">
                <div id="top-filter">
                  <p>Recent runs total: {runData.length}</p>
                  <p>
                    Select range &nbsp;
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
                  <button
                    className="border-solid bg-indigo-400 border-2 border-indigo-600 p-2 rounded m-2 hover:bg-indigo-600 hover:text-white"
                    id="speed-sort"
                    onClick={filterBySpeedData}
                  >
                    Filter By Speed
                  </button>
                  <button
                    className="border-solid bg-indigo-400 border-2 border-indigo-600 p-2 rounded m-2 hover:bg-indigo-600 hover:text-white"
                    id="distance-sort"
                    onClick={filterByDistance}
                  >
                    Filter By Distance
                  </button>
                </div>
              </div>
              {currentRun && (
                <div id="stats-container" className="grid grid-cols-2 gap-2">
                  <span>
                    <p>Run Stats</p>
                  </span>

                  <p className="stats-entry p-2 rounded">
                    <h5>Date:</h5>
                    <p>
                      {new Date(currentRun.originalStartTime).toLocaleString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "numeric",
                        }
                      ) +
                        " " +
                        new Date(currentRun.originalStartTime).toLocaleString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                    </p>
                  </p>
                  <p className="stats-entry p-2 rounded">
                    <h5>Distance</h5>
                    <p>{parseInt(currentRun.distance).toFixed(2)}</p>
                  </p>
                  <p className="stats-entry p-2 rounded">
                    <h5>Heart Rate</h5> <p> {currentRun.averageHeartRate}</p>
                  </p>
                  <p className="stats-entry p-2 rounded">
                    <h5>Avg Speed</h5> <p>{currentRun.speed.toFixed(2)}</p>
                  </p>
                  <p className="stats-entry p-2 rounded">
                    {" "}
                    <h5>Duration</h5>{" "}
                    <p>{parseInt(currentRun.duration / 60000).toFixed(0)} </p>
                    minutes
                  </p>
                </div>
              )}
              {currentRun && (
                <div
                  id="weekly-goals-container"
                  className="grid grid-cols-2 gap-2"
                >
                  <span>
                    <p>Effect on your day</p>
                  </span>
                  <p className="stats-entry p-2 rounded">
                    <h5>total zone minutes </h5>
                    <p>{currentRun.activeZoneMinutes.totalMinutes}</p>
                  </p>
                  <p className="stats-entry p-2 rounded">
                    <h5>Calories:</h5> <p>{currentRun.calories}</p>
                  </p>
                  <p className="stats-entry p-2 rounded">
                    <h5>Floors: </h5> <p>{currentRun.elevationGain}</p>
                  </p>
                  <p className="stats-entry p-2 rounded">
                    <h5>Steps:</h5> <p>{currentRun.steps}</p>
                  </p>
                </div>
              )}
              {currentRun && (
                <div
                  id="map-container"
                  className="hidden lg:flex"
                  style={{ width: "100%", height: "100%" }}
                >
                  <span>
                    <p>Run Map</p>
                  </span>
                  <img
                    src="/images/orange-world-map.svg.hi.png"
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
            <div id="left-section" className="mr-5">
              <div>
                {filteredData.map((item, index) => (
                  <RunEntry
                    onClick={(runData) => handleSelectedRunStats(runData)}
                    key={index}
                    run={item}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No run data available for the selected range</p>
      )}
      <ScrollTop />
    </div>
  );
}

export default RunDisplayPage;
