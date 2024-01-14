import React from "react";

interface RunEntryProps {
  date: string;
  distance: string;
  speed: any;
}

const RunEntry: React.FC<RunEntryProps> = ({ date, distance, speed }) => {
  return (
    <div className="run-entry">
      <div className="run-entry-top">{date}</div>
      <div className="run-entry-bottom">
        <p>{distance} km</p>
        <p>Pace: {speed}</p>
      </div>
    </div>
  );
};

export default RunEntry;
