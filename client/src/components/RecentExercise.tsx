import React from 'react';
import { AccessibleForward, DirectionsRun, SportsSoccer, FitnessCenter, Pool, FreeBreakfast } from '@mui/icons-material'; 
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import SportsGymnasticsRoundedIcon from '@mui/icons-material/SportsGymnasticsRounded';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import DirectionsWalkRoundedIcon from '@mui/icons-material/DirectionsWalkRounded';

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

  // Get the corresponding icon for the exercise (or use the default icon)
  const exerciseIcon = exerciseIcons[name] || exerciseIcons.Default;

  return (
    <div className="recent-exercise">
      <div className="recent-top">
        {exerciseIcon}
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
