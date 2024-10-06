import './App.css';
// import ProductForm from './components/ProductForm';
// import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "./TileCatalog.css";
import React, { useState } from "react";


const tilesData = [
  { id: 1, name: "Tile 1", size: "30x30 cm", images: ["https://i.pinimg.com/736x/be/9d/ec/be9dec42c9059f051c86364ec6dd278c.jpg", "https://i.pinimg.com/236x/ae/0d/49/ae0d4907d66df756a0690b845f668812.jpg"] },
  { id: 2, name: "Tile 2", size: "60x60 cm", images: ["https://i.pinimg.com/474x/ea/4a/c2/ea4ac29eb049ef7cc6e600cbbc9aeed4.jpg", "https://i.pinimg.com/236x/ff/2b/de/ff2bdeb580621245cac045e744f858db.jpg"] },
  { id: 3, name: "Tile 3", size: "45x45 cm", images: ["https://i.pinimg.com/736x/ec/5c/7e/ec5c7edcca14afc8588b7c243adfcadf.jpg"] },
  { id: 4, name: "Tile 4", size: "50x50 cm", images: ["https://i.pinimg.com/736x/3e/d5/99/3ed5992f9ec60f28aaaa50b29ee71398.jpg"] },
  { id: 5, name: "Tile 5", size: "50x50 cm", images: ["https://res.cloudinary.com/dvekid8m4/image/upload/v1710612499/hjinqx4nuep1tbkkfn74.jpg"] },
  { id: 6, name: "Tile 6", size: "50x50 cm", images: ["https://res.cloudinary.com/dvekid8m4/image/upload/v1728206245/Screenshot_303_jjqkp6.png"] },
  { id: 7, name: "Tile 7", size: "50x50 cm", images: ["https://via.placeholder.com/150"] },
  { id: 8, name: "Tile 8", size: "50x50 cm", images: ["https://via.placeholder.com/150"] },
  { id: 9, name: "Tile 9", size: "50x50 cm", images: ["https://via.placeholder.com/150"] },
  { id: 10, name: "Tile 10", size: "50x50 cm", images: ["https://via.placeholder.com/150"] },
  { id: 11, name: "Tile 11", size: "50x50 cm", images: ["https://via.placeholder.com/150"] },
  // You can add more tiles dynamically by adding more objects here
];



function App() {

  const [selectedTile, setSelectedTile] = useState(null);
  const [selectedTileIndex, setSelectedTileIndex] = useState(0);


  const [imageIndexes, setImageIndexes] = useState(
    tilesData.map(() => 0) // Keep track of the current image index for each tile card
  );
  const handleTileClick = (tileIndex) => {
    setSelectedTile(tilesData[tileIndex]);
    setSelectedTileIndex(tileIndex); // Set the tile index for the enlarged view
  };

  const handleClose = () => {
    setSelectedTile(null);
  };

  const handleNextImage = (tileIndex) => {
    setImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[tileIndex] = (prevIndexes[tileIndex] + 1) % tilesData[tileIndex].images.length;
      return newIndexes;
    });
  };

  const handlePrevImage = (tileIndex) => {
    setImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      newIndexes[tileIndex] = (prevIndexes[tileIndex] - 1 + tilesData[tileIndex].images.length) % tilesData[tileIndex].images.length;
      return newIndexes;
    });
  };


  // Touch event handlers
  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX; // Record the initial touch position
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX; // Current touch position
    const diffX = startX - currentX; // Calculate the difference

    if (Math.abs(diffX) > 30) { // Only consider swipes with sufficient movement
      if (diffX > 0) {
        // Swipe Left
        handleNextImage(selectedTileIndex);
      } else {
        // Swipe Right
        handlePrevImage(selectedTileIndex);
      }
      startX = currentX; // Reset start position to current position
    }
  };



  return (
    <>
      <div className="catalog">
        <h1 className="title">Tile Catalogue</h1>
        <div className="tile-grid">
          {tilesData.map((tile, tileIndex) => (
            <div
              key={tile.id}
              className="tile-card"
              onClick={() => handleTileClick(tileIndex)}
            >
              <div className="tile-image-container">
                <img
                  src={tile.images[imageIndexes[tileIndex]]}
                  alt={tile.name}
                  className="tile-image"
                />
                <h2>{tile.name}</h2>
                <p>{tile.size}</p>
                {/* Buttons for sliding between images on the card */}
                <button
                  className="prev-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage(tileIndex);
                  }}
                >
                  Prev
                </button>
                <button
                  className="next-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage(tileIndex);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedTile && (
          <div className="overlay" onClick={handleClose}>
            <div className="enlarged-tile" onClick={(e) => e.stopPropagation()}>
              <div className="tile-image-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}>
                <img
                  src={selectedTile.images[imageIndexes[selectedTileIndex]]}
                  alt={selectedTile.name}
                  className="enlarged-image"
                />
                {/* Buttons for sliding between images in enlarged view */}
                <button className="prev-btn" onClick={() => handlePrevImage(selectedTileIndex)}>
                  Prev
                </button>
                <button className="next-btn" onClick={() => handleNextImage(selectedTileIndex)}>
                  Next
                </button>
              </div>
              <h2>{selectedTile.name}</h2>
              <p>{selectedTile.size}</p>
              <button onClick={handleClose} className="close-btn">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
