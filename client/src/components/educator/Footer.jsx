import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="flex items-center justify-between md:flex-row flex-col-reverse text-left w-full px-8 border-t">
      <div className="flex items-center gap-4 ">
        <img src={assets.brain} alt="logo" srcset="" className='hidden md:block w-20' />
        <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">© 2025 LMS. All rights reserved.</p>
      </div>
      <div className='flex items-center gap-3 max-md:mt-4'>
        <a href="#"><img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6 mr-4" /></a>
        <a href="#"><img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6 mr-4" /></a>
        <a href="#"><img src={assets.instagram_icon} alt="Instagram" className="w-6 h-6 mr-4" /></a>

      </div>
    </footer>
  )
}

export default Footer
