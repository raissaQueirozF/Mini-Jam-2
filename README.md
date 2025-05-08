<h1>🧀 Caça ao Queijo </h1>
<p> Um jogo casual feito com React e P5.js, onde você controla um rato em busca de queijo enquanto foge de um gato faminto! Com trilha sonora animada, animação de introdução e uma experiência divertida de 60 segundos. Ideal para iniciantes e nostálgicos de joguinhos simples. </p>
###
<h2>🎮 Como Jogar</h2>
Use as setas do teclado (↑ ↓ ← →) para mover o rato 🐭.

Pegue o queijo 🧀 que orbita no centro do mapa.

Cuidado com o gato! Ele te persegue sem parar 🐱.

Você tem 3 vidas e 60 segundos para fazer a maior pontuação possível.

A música começa junto com o jogo e para automaticamente após 1 minuto.
###
<h2>🧠 Tecnologias Utilizadas</h2>
React (JavaScript Framework)

P5.js (Biblioteca para gráficos e animação)

TailwindCSS (Estilo responsivo e animado)

Vite (Dev server e build rápido)

MP3 Audio (Trilha sonora de fundo)

React Hooks (useState, useEffect, useRef)
###
<h2>▶️ Instruções para Executar Localmente</h2>
<p>Clone o repositório:</p>

git clone https://github.com/seu-usuario/ratozi-game.git
cd ratozi-game
Instale as dependências:

npm install
Inicie o servidor de desenvolvimento:

npm run dev
<p> Acesse o jogo em:</p>
http://localhost:5173
###
📁 Estrutura do Projeto

MINI-JAM-2/
├── node_modules/
├── src/
│   ├── assets/         # Música
│   ├── components/
│   │   ├── Game.jsx    # Lógica e renderização do jogo
│   │
│   ├── App.jsx         # Intro animada + controle de estados
│   ├── index.css       # Estilo dos botões, etc
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
