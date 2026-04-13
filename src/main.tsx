import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import StartPage from './StartPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StartPage />
  </StrictMode>,
)
