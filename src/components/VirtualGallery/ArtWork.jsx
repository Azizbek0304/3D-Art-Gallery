import React from 'react';

const ArtWork = ({ name, description, imageUrl }) => {
  return (
    <div className="artwork">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ArtWork;
