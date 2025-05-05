import React, { useEffect, useState } from 'react';

const labirintos = [
  [
    ['W','W','W','W','W','W','W','W','W','W'],
    ['W',' ',' ',' ',' ','W',' ',' ',' ','W'],
    ['W',' ','W','W',' ','W',' ','W',' ','W'],
    ['W',' ','W',' ',' ',' ',' ','W',' ','W'],
    ['W',' ','W',' ','W','W',' ','W',' ','W'],
    ['W',' ','W',' ',' ',' ',' ','W',' ','W'],
    ['W',' ','W','W','W','W',' ','W',' ','W'],
    ['W',' ',' ',' ',' ',' ',' ',' ',' ','W'],
    ['W','W','W','W','W','W','W','W',' ','W'],
    ['W','W','W','W','W','W','W','W','W','W'],
  ],
  [
    ['W','W','W','W','W','W','W','W','W','W'],
    ['W',' ',' ',' ','W',' ',' ',' ',' ','W'],
    ['W',' ','W',' ','W',' ','W','W',' ','W'],
    ['W',' ','W',' ',' ',' ','W',' ',' ','W'],
    ['W',' ','W','W','W',' ','W',' ','W','W'],
    ['W',' ',' ',' ','W',' ','W',' ',' ','W'],
    ['W','W','W',' ','W',' ','W','W',' ','W'],
    ['W',' ',' ',' ',' ',' ',' ','W',' ','W'],
    ['W',' ','W','W','W','W',' ',' ',' ','W'],
    ['W','W','W','W','W','W','W','W','W','W'],
  ],
  [
    ['W','W','W','W','W','W','W','W','W','W'],
    ['W',' ',' ',' ',' ',' ',' ',' ',' ','W'],
    ['W',' ','W','W','W','W','W','W',' ','W'],
    ['W',' ','W',' ',' ',' ',' ','W',' ','W'],
    ['W',' ','W',' ','W','W',' ','W',' ','W'],
    ['W',' ','W',' ',' ',' ',' ','W',' ','W'],
    ['W',' ','W','W','W','W',' ','W',' ','W'],
    ['W',' ',' ',' ',' ','W',' ',' ',' ','W'],
    ['W','W','W','W',' ','W','W','W','W','W'],
    ['W','W','W','W','W','W','W','W','W','W'],
  ]
];

function Game() {
  const [labIndex, setLabIndex] = useState(0);
  const [labirintoAtual, setLabirintoAtual] = useState(labirintos[0]);
  const [rato, setRato] = useState({ x: 1, y: 1 });
  const [gato, setGato] = useState({ x: 8, y: 8 });
  const [angulo, setAngulo] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [tempo, setTempo] = useState(60);
  const [vidas, setVidas] = useState(5);
  const [fimDeJogo, setFimDeJogo] = useState(false);

  const centro = { x: 5, y: 5 };
  const raio = 3;

  const queijoX = centro.x + raio * Math.cos((angulo * Math.PI) / 180);
  const queijoY = centro.y + raio * Math.sin((angulo * Math.PI) / 180);

  // Movimento do rato
  useEffect(() => {
    const handleKeyDown = (e) => {
      const direcoes = {
        ArrowUp: { dx: 0, dy: -1 },
        ArrowDown: { dx: 0, dy: 1 },
        ArrowLeft: { dx: -1, dy: 0 },
        ArrowRight: { dx: 1, dy: 0 },
      };

      const move = direcoes[e.key];
      if (move) {
        const novoX = rato.x + move.dx;
        const novoY = rato.y + move.dy;

        if (labirintoAtual[novoY][novoX] === ' ') {
          setRato({ x: novoX, y: novoY });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rato, labirintoAtual]);

  // Temporizador
  useEffect(() => {
    if (fimDeJogo) return;
    const intervalo = setInterval(() => {
      setTempo((t) => {
        if (t <= 1) {
          clearInterval(intervalo);
          setFimDeJogo(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalo);
  }, [fimDeJogo]);

  // Órbita do queijo
  useEffect(() => {
    if (fimDeJogo) return;
    const intervalo = setInterval(() => {
      setAngulo((a) => (a + 5) % 360);
    }, 100);
    return () => clearInterval(intervalo);
  }, [fimDeJogo]);

  // Gato persegue o rato
  useEffect(() => {
    if (fimDeJogo) return;
    const intervalo = setInterval(() => {
      let dx = rato.x - gato.x;
      let dy = rato.y - gato.y;

      let stepX = dx !== 0 ? dx / Math.abs(dx) : 0;
      let stepY = dy !== 0 ? dy / Math.abs(dy) : 0;

      const tentarMover = (x, y) =>
        labirintoAtual[y] && labirintoAtual[y][x] === ' ';

      let novoX = gato.x;
      let novoY = gato.y;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (tentarMover(gato.x + stepX, gato.y)) {
          novoX += stepX;
        } else if (tentarMover(gato.x, gato.y + stepY)) {
          novoY += stepY;
        }
      } else {
        if (tentarMover(gato.x, gato.y + stepY)) {
          novoY += stepY;
        } else if (tentarMover(gato.x + stepX, gato.y)) {
          novoX += stepX;
        }
      }

      setGato({ x: novoX, y: novoY });

      // Verificar colisão com o rato
      if (novoX === rato.x && novoY === rato.y) {
        setVidas((v) => {
          const novaVida = v - 1;
          if (novaVida <= 0) {
            setFimDeJogo(true);
          }
          return novaVida;
        });
        setRato({ x: 1, y: 1 });
        setGato({ x: 8, y: 8 });
      }
    }, 400);

    return () => clearInterval(intervalo);
  }, [rato, gato, labirintoAtual, fimDeJogo]);

  // Colisão com o queijo
  useEffect(() => {
    const dist = Math.sqrt((rato.x - queijoX) ** 2 + (rato.y - queijoY) ** 2);
    if (dist < 0.5) {
      setPontos((p) => p + 1);
      const novoIndex = (labIndex + 1) % labirintos.length;
      setLabIndex(novoIndex);
      setLabirintoAtual(labirintos[novoIndex]);
      setRato({ x: 1, y: 1 });
      setGato({ x: 8, y: 8 });
    }
  }, [rato, queijoX, queijoY]);

  if (fimDeJogo) {
    return (
      <div className="text-center text-white">
        <h2 className="text-3xl font-bold">🎮 Fim de Jogo</h2>
        <p className="text-xl mt-2">🏆 Pontuação final: {pontos}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-white mb-2">
        ⏰ Tempo: {tempo}s | 🧀 Pontos: {pontos} | ❤️ Vidas: {vidas}
      </div>
      <div className="grid grid-cols-10 gap-1 bg-gray-800 p-2 rounded-md">
        {labirintoAtual.map((linha, y) =>
          linha.map((celula, x) => {
            const isRato = rato.x === x && rato.y === y;
            const isGato = gato.x === x && gato.y === y;
            const isQueijo =
              Math.floor(queijoX) === x && Math.floor(queijoY) === y;

            return (
              <div
                key={`${x}-${y}`}
                className={`w-6 h-6 flex items-center justify-center text-sm ${
                  celula === 'W' ? 'bg-gray-900' : 'bg-white'
                }`}
              >
                {isRato ? '🐭' : isGato ? '🐱' : isQueijo ? '🧀' : ''}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Game;
