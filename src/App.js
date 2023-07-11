import React, { useState, useEffect } from 'react';
import './App.css';
import AppContainer from './Components/AppContainer/AppContainer';
import wallpaper from '../src/assets/notSpinner.png'

function App() {
  const [showWallpaper, setShowWallpaper] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWallpaper(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showWallpaper ? (
        <img src={wallpaper} alt="Wallpaper" className="wallpaper"/>
      ) : (
        <AppContainer />
      )}
    </div>
  );
}

export default App;