import React from 'react';

const Navigation = ({ exhibitions, activeExhibition, onExhibitionChange }) => {
  return (
    <div className="navigation">
      <h2>Exhibitions:</h2>
      <ul>
        {exhibitions.map((exhibition) => (
          <li key={exhibition.id}>
            <button
              onClick={() => onExhibitionChange(exhibition.id)}
              className={exhibition.id === activeExhibition ? 'active' : ''}
            >
              {exhibition.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
