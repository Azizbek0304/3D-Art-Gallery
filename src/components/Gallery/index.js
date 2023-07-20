import React, { useState } from 'react';
import VirtualGallery from '../../components/VirtualGallery';
import Navigation from './Navigation';
import './gallery.css'; // Import your CSS file for styling

const Gallery = () => {
  // Sample exhibitions data with id and name
  const exhibitions = [
    { id: 1, name: 'Exhibition 1' },
    { id: 2, name: 'Exhibition 2' },
    // Add more exhibitions here as needed
  ];

  // State to keep track of the active exhibition
  const [activeExhibition, setActiveExhibition] = useState(exhibitions[0].id);

  // Handler function to update the active exhibition
  const handleExhibitionChange = (exhibitionId) => {
    setActiveExhibition(exhibitionId);
    // You can add additional logic here, like fetching new artworks based on the selected exhibition.
  };
  const artworks = [
    { id: 1, name: 'Artwork 1', url: './public/Model/artgallery.glb' },
    { id: 2, name: 'Artwork 2', url: './public/Model/artgallery.glb' },
    // Add more artworks here as needed
  ];
  console.log(artworks);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleArtworkClick = (artwork) => {
    // Implement your artwork selection logic here
    setSelectedArtwork(artwork);
    console.log(`Selected artwork: ${artwork.name}`);
  };

  return (
    <div className="app">
      <Navigation
        exhibitions={exhibitions}
        activeExhibition={activeExhibition}
        onExhibitionChange={handleExhibitionChange}
      />
      {/* <VirtualGallery activeExhibition={activeExhibition} /> */}
    </div>
  );
};

export default Gallery;
