import { Navigate } from 'react-router-dom'
import { Login } from './Login'
import auraLogo from '../assets/Logo_small_white.svg'

export function Home() {
  const token = localStorage.getItem('token')

  if (token) {
    return <Navigate to="/dashboard/profile" />
  }

  return (
    <div className="bg-[#1B093C] min-h-screen flex items-center justify-center">
      <img
        src={auraLogo}
        alt="Aura Logo"
        className="absolute top-6 left-6 w-24 h-auto"
      />
      <Login />
    </div>
  )
}
