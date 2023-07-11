import React, { useState, useEffect } from 'react';
import './App.css';
import AppContainer from './Components/AppContainer/AppContainer';
import wallpaper from '../src/assets/notSpinner.png';
import wallpaperSm from '../src/assets/notSpinnerSm.png';

function App() {
  const [showWallpaper, setShowWallpaper] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWallpaper(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const isMobileDevice = window.innerWidth <= 1023;

  return (
    <div className="App">
      {showWallpaper ? (
        <img
          src={isMobileDevice ? wallpaperSm : wallpaper}
          alt="Wallpaper"
          className="wallpaper"
        />
      ) : (
        <AppContainer />
      )}
    </div>
  );
}

export default App;
