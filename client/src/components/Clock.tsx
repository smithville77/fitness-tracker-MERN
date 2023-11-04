import React, { useEffect, useState } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(updateClock, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const updateClock = () => {
    const now = new Date();
    setTime(now);
  };

  const formatDate = (date: Date) => {
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="datetime">
      <div className="date">
        {formatDate(time)}
      </div>
      <div className="time">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default Clock;
