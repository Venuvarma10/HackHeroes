import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from './ContextAPI/ShopContext'
import logo from '../assets/Frame.png'

const Header = () => {
    const navigate=useNavigate();
    const {user,setUser}=useContext(ShopContext);
    const handleLogOut=()=>{
        setUser({userName:"",token:""});
        navigate('/')
    }
  return (
    <div className='flex w-[100%] h-[80px] text-white leading-tight font-bold justify-between px-15 items-center absolute top-0 z-10'>
        <div>
            <img src={logo} className='w-[150px]'/>
        </div>
        <div className='flex space-x-10'>
            <p className='cursor-pointer'><NavLink to={'/'}>Home</NavLink></p>
            <p className='cursor-pointer' ><NavLink to={'/aboutus'}>About us</NavLink></p>
            <p className='cursor-pointer'>Contact Us</p>
        </div>
        <div>
            {!user.token?
            <button className='cursor-pointer px-6 py-3 bg-blue-800 rounded-[15px]'>
                <NavLink to={'/login'}>Log In</NavLink>
            </button>:<button className='cursor-pointer px-6 py-3 bg-blue-800 rounded-[15px]' onClick={handleLogOut}>Log Out
            </button>
            }
        </div>
    </div>
  )
}

export default Header