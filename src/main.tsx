import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartPage from './StartPage.tsx'
import Lobby from './Lobby.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/create-game/:gameCode" element={<Lobby isHost={true} />} />
        <Route path="/join-game" element={<Lobby isHost={false} />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)