import React from 'react';
import './Controls.css';

const Controls = () => {
  return (
    <div className="controls-container">
      <button className="control-btn">Go</button>
      <div className="arrow-controls">
        <button className="arrow-btn">&#8592;</button>
        <button className="arrow-btn">&#8593;</button>
        <button className="arrow-btn">&#8594;</button>
        <button className="arrow-btn">&#8595;</button>
      </div>
      <button className="control-btn">360&deg;</button>
    </div>
  );
};

export default Controls;
