import React from "react";

interface RunEntryProps {
  onClick: (runData: any) => void; // Use the appropriate type for your runData
  run: any; // Use the appropriate type for your run object
}

const RunEntry: React.FC<RunEntryProps> = ({ onClick, run }) => {
  const { originalStartTime, distance, speed } = run; // Destructure date, distance, and speed from run

  const handleClick = () => {
    // Call the passed-in onClick handler with the entire run object
    onClick(run);
  };

  return (
    <div className="run-entry" onClick={handleClick}>
      <div className="run-entry-top">
        {new Date(originalStartTime).toLocaleString("en-GB", {
          day: "numeric",
          month: "numeric",
        }) +
          " " +
          new Date(originalStartTime).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
      </div>
      <div className="run-entry-bottom">
        <p>Distance: {parseFloat(distance).toFixed(2)}</p>
        <p>Speed: {parseFloat(speed).toFixed(2)} km/h</p>
      </div>
    </div>
  );
};

export default RunEntry;
