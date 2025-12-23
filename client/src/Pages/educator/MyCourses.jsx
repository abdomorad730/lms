import React from 'react'
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';

const MyCourses = () => {
  const { currency, allCourses } = React.useContext(AppContext);
  const [courses, setCourses] = React.useState(null);
  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };
  React.useEffect(() => {
    fetchEducatorCourses();
  }, [allCourses]);
  return courses ? (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='text-lg font-medium pb-4'>My Courses</h2>
        <div className='overflow-hidden w-full border border-gray-500/20  rounded-md flex flex-col items-center max-w-4xl bg-white'>
          <table className='md:table-auto table-fixed w-full overflow-hidden'>
            <thead className='border-b border-gray-500/20 text-sm  text-gray-900 text-left'>
              <tr className=''>
                <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                <th className='px-4 py-3 font-semibold truncate'>Students</th>
                <th className='px-4 py-3 font-semibold truncate'>Publish On</th>


              </tr>
            </thead>
             <tbody className='text-sm text-gray-500'>
              {courses.map((course, index) => (
                <tr key={index} className='border-b border-gray-500/20'>
                  <td className='md:px-4 py-3 truncate pl-2 md:pl-4 flex items-center space-x-3'><img src={course.courseThumbnail} alt="Course image" srcset="" className='w-16' /><span className='truncate hidden md:block'>{course.courseTitle}</span></td>
                  <td className='px-2 py-3'>{currency}{Math.floor(course.enrolledStudents.length*(course.coursePrice-course.coursePrice*course.discount / 100))}</td>
                  <td className='px-2 py-3'>{course.enrolledStudents.length}</td>
                  <td className='px-2 py-3'>{new Date(course.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
           
          </table>
        </div>

      </div>
    </div>
  ) : <Loading />;
}

export default MyCourses
