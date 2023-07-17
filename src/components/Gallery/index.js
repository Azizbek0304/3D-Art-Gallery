import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import './gallery.css';
import Artwork from '../Artwork';
import InfoPanel from '../InfoPanel';
import VirtualGallery from './VirtualGallery';

const Gallery = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const artworks = [
    {
      id: 1,
      title: 'Artwork 1',
      imageUrl: 'path/to/artwork1.jpg',
      artist: 'Artist 1',
      description: 'Lorem ipsum dolor sit amet.',
      year: 2021,
    },
    {
      id: 2,
      title: 'Artwork 2',
      imageUrl: 'path/to/artwork2.jpg',
      artist: 'Artist 2',
      description: 'Consectetur adipiscing elit.',
      year: 2022,
    },
    {
      id: 3,
      title: 'Artwork 3',
      imageUrl: 'path/to/artwork3.jpg',
      artist: 'Artist 3',
      description:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      year: 2023,
    },
    // Add more artworks as needed
  ];

  return (
    <div className="gallery-container">
      <h2>Gallery</h2>
      {/* <Canvas>
        <VirtualGallery />
      </Canvas> */}
      <div className="artwork-list">
        {artworks.map((artwork) => (
          <Artwork
            key={artwork.id}
            artwork={artwork}
            onClick={() => handleArtworkClick(artwork)}
          />
        ))}
      </div>
      {selectedArtwork && <InfoPanel artwork={selectedArtwork} />}
    </div>
  );
};

export default Gallery;
