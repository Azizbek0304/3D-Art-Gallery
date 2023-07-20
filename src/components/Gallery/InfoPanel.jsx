import React from 'react';

const InfoPanel = ({ selectedArtwork }) => {
  return (
    <div className="information-panel">
      {selectedArtwork ? (
        <div>
          <h2>{selectedArtwork.name}</h2>
          <p>{selectedArtwork.description}</p>
          {/* Add more details about the artwork or exhibition here */}
        </div>
      ) : (
        <p>Please select an artwork from the gallery.</p>
      )}
    </div>
  );
};

export default InfoPanel;
