import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-gray-900 text-white px-6 py-4 shadow-md flex justify-center gap-8'>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
            : "hover:text-blue-300 transition duration-200"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          isActive
            ? "text-blue-400 font-semibold border-b-2 border-blue-400 pb-1"
            : "hover:text-blue-300 transition duration-200"
        }
      >
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar

