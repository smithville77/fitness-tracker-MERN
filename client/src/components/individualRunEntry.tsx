import React from "react";

interface RunEntryProps {
  onClick: (runData: any) => void;
  run: any;
}

const RunEntry: React.FC<RunEntryProps> = ({ onClick, run }) => {
  const { originalStartTime, distance, speed } = run;
  const handleClick = () => {
    // Call the passed-in onClick handler with the entire run object
    onClick(run);
  };

  return (
    <div className="run-entry" onClick={handleClick}>
      <div className="run-entry-top">
        <div className="entry-top-emoji">
          {speed >= 11.0 ? <p data-tooltip-target="tooltip-dark">🔥</p> : ""}
          {distance >= 4.0 ? <p>🏃🏼‍♀️</p> : ""}
        </div>
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
