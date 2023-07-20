import React from 'react';
import GalleryLayout from './GalleryLayout';

const Gallery = () => {
  // Sample exhibitions data with id and name
  const exhibitions = [
    { id: 1, name: 'Exhibition 1' },
    { id: 2, name: 'Exhibition 2' },
    // Add more exhibitions here as needed
  ];

  // Sample artworks data with id, name, and description
  const artworks = [
    {
      id: 1,
      name: 'Artwork 1',
      description: 'Description of Artwork 1',
      imageUrl: '/path/to/artwork1.jpg',
    },
    {
      id: 2,
      name: 'Artwork 2',
      description: 'Description of Artwork 2',
      imageUrl: '/path/to/artwork2.jpg',
    },
    // Add more artworks here as needed
  ];

  return (
    <div className="app">
      <GalleryLayout exhibitions={exhibitions} artworks={artworks} />
    </div>
  );
};

export default Gallery;
