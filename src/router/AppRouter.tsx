import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Profile } from '../pages/dashboard/Profile'
import { EditProfile } from '../pages/dashboard/EditProfile'
import { Users } from '../pages/dashboard/Users'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { PrivateRoute } from './PrivateRouter'
import { Home } from '../pages/Home'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<Users />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="edit" element={<EditProfile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
