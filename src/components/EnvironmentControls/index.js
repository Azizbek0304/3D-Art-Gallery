import React, { useState } from 'react';
import './envCont.css';

const EnvironmentControls = () => {
  const [isNight, setIsNight] = useState(false);

  const handleToggle = () => {
    setIsNight((prevIsNight) => !prevIsNight);
  };

  return (
    <div className="environment-controls">
      <button className={isNight ? 'active' : ''} onClick={handleToggle}>
        {isNight ? 'Day' : 'Night'}
      </button>
    </div>
  );
};

export default EnvironmentControls;
