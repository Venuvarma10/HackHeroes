import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex w-[100%] h-[80px] text-white leading-tight font-bold justify-between px-15 items-center absolute top-0 z-10'>
        <div>
            <p className='text-white'>Proj Name</p>
        </div>
        <div className='flex space-x-10'>
            <p className='cursor-pointer'><NavLink to={'/'}>Home</NavLink></p>
            <p className='cursor-pointer' ><NavLink to={'/aboutus'}>About us</NavLink></p>
            <p className='cursor-pointer'>Contact Us</p>
        </div>
        <div>
            <button className='cursor-pointer px-6 py-3 bg-blue-800 rounded-[15px]'>
                <NavLink to={'/login'}>Log In</NavLink>
            </button>
        </div>
    </div>
  )
}

export default Header