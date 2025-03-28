import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App, { ShowImg, ShowImg2 } from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ShowImg2 />
  </StrictMode>
)
