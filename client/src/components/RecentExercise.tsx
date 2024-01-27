import React from 'react';
import { AccessibleForward, DirectionsRun, SportsSoccer, FitnessCenter } from '@mui/icons-material'; 
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import SportsGymnasticsRoundedIcon from '@mui/icons-material/SportsGymnasticsRounded';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';
import { Card, Title } from "@tremor/react";


interface RecentExerciseProps {
  name: string;
  length: any;
  date: any;
  calories: number;
}

const RecentExercise: React.FC<RecentExerciseProps> = ({ name, length, date, calories }) => {
  // Map exercise names to corresponding icons
  const exerciseIcons: { [key: string]: JSX.Element } = {
    Run: <DirectionsRunRoundedIcon />,
    Treadmill: <DirectionsRunRoundedIcon />,
    Walk: <DirectionsWalkRoundedIcon  />,
    Workout: <SportsGymnasticsRoundedIcon />,
    Weights: <FitnessCenterRoundedIcon />,
    Default: <SportsGymnasticsRoundedIcon />
  };

 
  const exerciseIcon = exerciseIcons[name] || exerciseIcons.Default;

  return (
    <Card className="max-w-xs mx-auto exercise-card" >
    <div className="recent-exercise">
      <div className="recent-top">
        <div className="exercise-name-icon">
          {exerciseIcon}
          <h6>{name}</h6>
        </div>
        
        <p className="recent-exercise-date"><em>{date}</em></p>
      </div>
      <div className="time-container">
        <p><span className="recent-ex-length">{length}</span> mins</p>
        <p><span className="recent-ex-length">{calories}</span> cals</p>
      </div>
    </div>
    </Card>
  );
};



export default RecentExercise;
