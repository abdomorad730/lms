import React from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = React.useContext(AppContext);
  return (
    <Link to={`/course/${course._id}`} onClick={() => scrollTo(0, 0)} className='border border-gray-500/30 overflow-hidden  rounded-lg pb-6  '>
      <img src={course.courseThumbnail} alt="course thumbnail" className='w-full mb-3' />
      <div className='px-3   text-left'>
        <h3 className='text-base font-semibold '>{course.courseTitle}</h3>
        <p className='text-gray-500'>{course.educator.name}</p>
      </div>
      <div className='px-3  flex items-center  space-x-2 '>
        <p>{calculateRating(course)}</p>
        <div className='flex'>{[...Array(5)].map((_, i) => <img key={i} src={i<Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt='star' className='w-3.5 h-3.5' />)}</div>
        <p className='text-gray-500'>{course.courseRatings.length}</p>
      </div>
      <p className='text-base text-left px-3  font-semibold text-gray-800'>{currency}{(course.coursePrice - course.coursePrice * course.discount / 100).toFixed(2)}</p>
    </Link >
  )
}

export default CourseCard
