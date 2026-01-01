import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import {UserButton , useUser} from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();
  return (
    <div className='w-full flex items-center justify-between md:px-8 border-b border-gray-500 px-4 py-3'>
      <Link to="/">
      <img src={assets.brain} alt="logo" srcset="" className='w-48'/>
      </Link>
      <div className='flex items-center gap-5 text-gray-500 relative'>
        <p className='text-gray-700 hidden md:block'>Hello, {user?.fullName || 'Developers'}</p>
        {user? <UserButton afterSignOutUrl='/'/> : <img src={assets.profile_img} alt='user icon' className=' max-w-8 '/>}
      </div>
    </div>
  )
}

export default Navbar
