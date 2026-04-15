import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartPage from './StartPage.tsx'
import CreateGame from './CreateGame.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/create-game" element={<CreateGame />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)