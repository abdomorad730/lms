import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialsSection = () => {
  return (
    <div className='pb-14 sm:px-8 md:px-40   '>
      <h2 className='text-3xl  font-Semibold mb-4 text-gray-800'>Testimonials</h2>
      <p className='md:text-base mt-3 text-gray-500'>Hear from our learners as they share their journeys of transformation, success, and how our <br/>platform has made a difference in their lives.</p>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14'>
        {dummyTestimonial.map((item, index) => (
          <div key={index} className='text-sm text-left border border-gray-500/30 bg-white  rounded-lg pb-6 shadow-[0_4px_15px_-0px]  overflow-hidden shadow-black/5 '>
            <div className='flex items-center gap-4 px-5 py-5 bg-gray-500/10'>
              <img src={item.image} alt={item.name} className='w-12 h-12 rounded-full ' />
              <div className=''>
                <h1 className='text-lg font-medium text-gray-800'>{item.name}</h1>
                <p className='text-gray-800/80'>{item.role}</p>
              </div>
              
            </div>
            <div className='p-5 pb-7'>
              <div className='flex gap-0.5'>
                {[...Array(5)].map((_,i) => (
                  <img key={i} src={i<Math.floor(item.rating)? assets.star : assets.star_blank} alt='star' className='  h-5' />
                ))}
              </div>

              <p className='text-gray-500 mt-5'>{item.feedback}</p>
            </div>
            <a href="#"  rel="noreferrer" className='text-blue-500 hover:underline px-5'>Read more</a>
         </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsSection
