import React, { useState, useEffect } from 'react';
import Game from './components/Game';

function App() {
  const instructions = [
    "Use as setas do teclado (↑ ↓ ← →) para mover o rato.",
    "Pegue o queijo 🧀 que gira no centro do mapa! Mas cuidado: o movimento do queijo pode te enganar...",
    "Evite o gato 🐱 — ele está atrás de você!",
    "Você tem 3 vidas e 60 segundos. Boa sorte!",
  ];

  const [step, setStep] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (step < instructions.length) {
      const timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-100 to-purple-300 overflow-hidden">
      {/* Animação background */}
      <div className="absolute inset-0 pointer-events-none z-0 animate-background-flow text-5xl opacity-20">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              top: `-${Math.random() * 20 + 10}%`,
            }}
          >
            {Math.random() > 0.5 ? '🧀' : '🐭'}
          </div>
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center p-8 text-black">
        {gameStarted ? (
          <Game />
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-purple-800 mb-10 animate-bounce drop-shadow-lg">
              🧀 Caça ao Queijo 🧀
            </h1>

            {instructions.slice(0, step).map((text, index) => (
              <div
                key={index}
                className="mx-auto mb-4 max-w-xl p-4 bg-white bg-opacity-90 rounded-xl shadow-lg transform transition-all duration-700 animate-fade-in"
              >
                <p className="text-lg text-gray-800">{text}</p>
              </div>
            ))}

            {step === instructions.length && (
              <button
                onClick={handleStartGame}
                className="mt-8 bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-purple-700 transition duration-300 animate-pulse"
              >
                Começar Jogo
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
