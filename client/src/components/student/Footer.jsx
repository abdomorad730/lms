import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col  md:items-start items-center w-full'>
          <img src={assets.logo_dark} alt="logo"  />
          <p className='mt-6 text-center md:text-left text-sm text-white/80'>Lorem ipsum is simply dummy text of the printing and typesetting industry.Lorem ipsum has been the industry's standard dummy text .</p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-white mb-5'>Company</h2>
          <ul className='w-full flex md:flex-col md:space-y-2 md:gap-0 gap-2 text-white/80 text-sm'>
            <li ><a href="#" rel="noreferrer" >Home</a></li>
          
            <li><a href="#" rel="noreferrer" >About Us</a></li>
            <li><a href="#" rel="noreferrer" >Contact Us</a></li>
            <li><a href="#" rel="noreferrer" >Privacy Policy</a></li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
          <p className='text-sm text-white/80'>The latest news, articles, and resources, sent to your inbox weekly.</p>
          <div className='flex items-center gap-2 pt-4'>
            <input className='w-64 h-9 text-sm px-2  rounded border placeholder-gray-500 outline-none border-gray-500/30 bg-gray-800 text-white' type="email" placeholder='Enter your email' />
            <button className='bg-blue-600 hover:bg-blue-700 text-white h-9 w-24  rounded'>Subscribe</button>
          </div>
        </div>

      </div>
      <p className='text-center text-white/60 py-4 text-xs md:text-sm' > Copyright 2025 © Edemy. All Right Reserved.</p>
    </footer>
  )
}

export default Footer
