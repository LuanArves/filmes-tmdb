import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.scss'
import Home from './assets/Pages/Home.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Home />
  </StrictMode>,
)
