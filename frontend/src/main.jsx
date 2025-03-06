import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WorkoutsContextProvider } from '../contexts/WorkoutContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
  </StrictMode>,
)
