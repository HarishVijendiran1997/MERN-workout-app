// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WorkoutsContextProvider } from '../contexts/WorkoutContext.jsx'
import { AuthContextProvider } from '../contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  // <>
  <AuthContextProvider>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </AuthContextProvider>
  // </StrictMode>,
)
