import React from 'react'
import { AppContext } from '../../context/AppContext';
import {Line} from 'rc-progress'
import Footer from '../../components/student/Footer';

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration ,navigate } = React.useContext(AppContext);
  const [progressArray, setProgressArray] = React.useState([{ completedLectures: 4, totalLectures: 10},
  { completedLectures: 7, totalLectures: 15},
  { completedLectures: 2, totalLectures: 8},
  { completedLectures: 10, totalLectures: 10},
  { completedLectures: 5, totalLectures: 12},
  { completedLectures: 3, totalLectures: 9},
  {completedLectures: 6, totalLectures: 14},
  { completedLectures: 1, totalLectures: 5},
  { completedLectures: 8, totalLectures: 16},
  { completedLectures: 0, totalLectures: 7}

]);

  return (
    <>
      <div className='md:px-36 px-8 pt-10'>
        <h1 className='text-2xl font-semibold '>My Enrollments</h1>
        <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
            <tr>
              <th className='px-4 py-3 font-semibold truncate'>Course</th>
              <th className='px-4 py-3 font-semibold truncate'>Duration</th>
              <th className='px-4 py-3 font-semibold truncate'>Completed</th>
              <th className='px-4 py-3 font-semibold truncate'>Status</th>

            </tr>
          </thead>
          <tbody className='text-gray-700 '>
            {/* Enrollment rows will go here */}
            {enrolledCourses.map((course, index) => (
              <tr key={index} className='border-b border-gray-500/20 hover:bg-gray-100/50 '>
                <td className='md:px-4 md:pl-4 pl-2 flex items-center space-x-3 py-3'>
                  <img src={course.courseThumbnail} alt="Course Thumbnail" className='w-14 sm:w-24 h-16 md:w-28 ' />
                  <div className='flex-1 '>
                    <p className='mb-1 max-sm:text-sm '>{course.courseTitle}</p>
                    <Line
                      percent={progressArray[index] ? (progressArray[index].completedLectures / progressArray[index].totalLectures) * 100 : 0}
                       strokeWidth={2} className='bg-gray-300 rounded-full' />
                  </div>
                </td>
                <td className='px-4 py-3 max-sm:hidden'>{calculateCourseDuration(course)}</td>
                <td className='px-4 py-3 max-sm:hidden'>{progressArray[index] &&`${progressArray[index].completedLectures} / ${progressArray[index].totalLectures}`}   <span>Lectures</span></td>
                <td className='px-4 py-3 max-sm:text-right'><button className='px-3 py-1.5 sm:px-5 sm:py-2 bg-blue-600 max-sm:text-xs text-white rounded' onClick={()=>{navigate(`/player/${course._id}`)}}>{progressArray[index] && progressArray[index].completedLectures === progressArray[index].totalLectures ? "Completed" : "On Going"}</button></td>
              </tr>))}
        </tbody>
        </table>
      </div>
      <Footer />
    </>
  )
}

export default MyEnrollments
