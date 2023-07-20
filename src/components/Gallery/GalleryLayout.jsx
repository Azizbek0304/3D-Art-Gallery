import React from 'react';
// import VirtualGallery from '../VirtualGallery';
import Navigation from './Navigation';
import InformationPanel from './InfoPanel';

const GalleryLayout = ({ exhibitions, artworks }) => {
  // State to keep track of the active exhibition and selected artwork
  const [activeExhibition, setActiveExhibition] = React.useState(
    exhibitions[0].id
  );
  const [selectedArtwork, setSelectedArtwork] = React.useState(null);

  // Handler function to update the active exhibition and selected artwork
  const handleExhibitionChange = (exhibitionId) => {
    setActiveExhibition(exhibitionId);
    setSelectedArtwork(null); // Reset selected artwork when changing the exhibition
    // You can add additional logic here, like fetching new artworks based on the selected exhibition.
  };

  // Handler function to update the selected artwork when clicked in the gallery
  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  return (
    <div className="gallery-layout">
      <div className="navigation-panel">
        <Navigation
          exhibitions={exhibitions}
          activeExhibition={activeExhibition}
          onExhibitionChange={handleExhibitionChange}
        />
      </div>
      <div className="gallery-panel">
        {/* <VirtualGallery
          artworks={artworks}
          activeExhibition={activeExhibition}
          onArtworkClick={handleArtworkClick}
        /> */}
      </div>
      <div className="information-panel">
        <InformationPanel selectedArtwork={selectedArtwork} />
      </div>
    </div>
  );
};

export default GalleryLayout;
