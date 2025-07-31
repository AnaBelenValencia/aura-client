import { NavLink } from 'react-router-dom'
import { logout } from '../utils/logout.js'
import auraLogo from '../assets/Logo_min_white.png'
import { Users, User, UserPen, LogOut } from 'lucide-react'
import { TooltipWrapper } from '../components/TooltipWrapper'

export function SideBar() {
  return (
    <aside className="w-20 bg-[#1B093C] text-white flex flex-col justify-between py-6 px-4">
      <div>
        <img src={auraLogo} alt="Aura Logo" className="w-20 h-auto mb-10 mx-auto" />
        <nav className="flex flex-col gap-4">
          <TooltipWrapper label="Registered users">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `p-2 rounded hover:bg-white/10 ${
                  isActive ? 'bg-white/20 text-white' : ''
                }`
              }
            >
              <Users />
            </NavLink>
          </TooltipWrapper>
        </nav>
      </div>

      <nav className="flex flex-col gap-4">
        <TooltipWrapper label="Profile">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `p-2 rounded hover:bg-white/10 ${
                isActive ? 'bg-white/20 text-white' : ''
              }`
            }
          >
            <User />
          </NavLink>
        </TooltipWrapper>

        <TooltipWrapper label="Edit profile">
          <NavLink
            to="/dashboard/edit"
            className={({ isActive }) =>
              `p-2 rounded hover:bg-white/10 ${
                isActive ? 'bg-white/20 text-white' : ''
              }`
            }
          >
            <UserPen />
          </NavLink>
        </TooltipWrapper>

        <TooltipWrapper label="Logout">
          <button
            onClick={logout}
            className="p-2 mt-6 rounded hover:bg-white/10"
          >
            <LogOut />
          </button>
        </TooltipWrapper>
      </nav>
    </aside>
  )
}