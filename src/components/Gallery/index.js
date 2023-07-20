import React, { useState } from 'react';
import VirtualGallery from '../../components/VirtualGallery';
import './gallery.css'; // Import your CSS file for styling

const Gallery = () => {
  const artworks = [
    { id: 1, name: 'Artwork 1', url: '/path/to/artwork1.glb' },
    { id: 2, name: 'Artwork 2', url: '/path/to/artwork2.glb' },
    // Add more artworks here as needed
  ];
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleArtworkClick = (artwork) => {
    // Implement your artwork selection logic here
    setSelectedArtwork(artwork);
    console.log(`Selected artwork: ${artwork.name}`);
  };

  return (
    <div className="app">
      <h1>Welcome to the 3D Gallery!</h1>
      <Gallery artworks={artworks} onArtworkClick={handleArtworkClick} />
      {selectedArtwork && (
        <div>
          <h2>Selected Artwork:</h2>
          <p>{selectedArtwork.name}</p>
        </div>
      )}
    </div>
  );
};
};

export default Gallery;
