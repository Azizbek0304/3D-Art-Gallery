import React from 'react';
import './artwork.css';

const Artwork = ({ artwork }) => {
  return (
    <div className="artwork">
      <img
        className="artwork-image"
        src={artwork.imageUrl}
        alt={artwork.title}
      />
      <h3 className="artwork-title">{artwork.title}</h3>
      <p className="artwork-artist">By {artwork.artist}</p>
    </div>
  );
};

export default Artwork;
