import { Outlet } from 'react-router-dom'
import { SideBar } from '../components/SideBar'
import { HeadInfoBanner } from '../components/HeadInfoBanner'

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <HeadInfoBanner />
        <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
