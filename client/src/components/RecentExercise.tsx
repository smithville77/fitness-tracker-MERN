import React from 'react';

interface RecentExerciseProps {
  name: string;
  length: any;
  date: any;
  calories: number;
}

const RecentExercise: React.FC<RecentExerciseProps> = ({ name, length, date, calories }) => {
 

  return (
    <div className="recent-exercise">
      
      <div className="recent-top">
        <h6>{name}</h6>
        <p>{date}</p>
      </div>
      
      <div className="time-container">
        
        <p>{length}</p>
        <p>cals:{calories}</p>
      </div>
      <hr />
    </div>
  );
};

export default RecentExercise;
