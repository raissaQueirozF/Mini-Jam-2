// src/App.jsx
import React, { useState, useEffect } from 'react';
import Game from './components/Game';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameStarted(true);
    }, 2000); // 2 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center p-8 text-white">
      {gameStarted ? (
        <Game />
      ) : (
        <>
          <h1 className="text-4xl font-bold text-purple-600">Rato em Órbita</h1>
          <p className="mt-4 text-lg">Seu jogo vai começar em breve!</p>
        </>
      )}
    </div>
  );
}

export default App;
