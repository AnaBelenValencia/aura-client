import { Navigate, Outlet } from 'react-router-dom'

export function PrivateRoute() {
  const isAuthenticated = !!localStorage.getItem('token') // mock temporal

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
