import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage.tsx';
import GameTime from './GameTime.tsx';
import Lobby from './Lobby.tsx';
import GamePage from './gamePage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game-Time" element={<GameTime />} />
        <Route path="/create-game/:gameCode" element={<Lobby isHost={true} />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/join-game/:gameCode" element={<Lobby isHost={false} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);