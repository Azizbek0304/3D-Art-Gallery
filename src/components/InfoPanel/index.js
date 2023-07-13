import React from 'react';
import './infoPanel.css';

const InfoPanel = ({ artwork }) => {
  return (
    <div className="info-panel">
      <h3>{artwork.title}</h3>
      <p>Artist: {artwork.artist}</p>
      <p>Description: {artwork.description}</p>
      <p>Year: {artwork.year}</p>
    </div>
  );
};

export default InfoPanel;
