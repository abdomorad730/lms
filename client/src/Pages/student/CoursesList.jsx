import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';

const CoursesList = () => {
  const {navigate,allCourses} = useContext(AppContext);
  const {input}=useParams();
  const [filteredCourses, setFilteredCourses] = React.useState([]);

  React.useEffect(() => { 
    if (allCourses.length > 0 &&allCourses) {
      const tempCourses = allCourses.slice(); // Create a copy of allCourses
    input ? setFilteredCourses(
        tempCourses.filter(course =>
          course.courseTitle.toLowerCase().includes(input.toLowerCase())
        )
      ) : setFilteredCourses(tempCourses);
    }
  }, [input, allCourses]);
  return (
    <>
      <div className='relative text-left pt-20 md:px-36 px-8 '>
        <div className='flex flex-col md:flex-row justify-between  items-start gap-6 w-full '>
        <div>
          <h1 className='text-gray-800 font-semibold text-4xl'>Course List</h1>
          <p className='text-gray-500'><span onClick={()=>{navigate('/')}} className='text-blue-600 cursor-pointer'>Home</span> / <span>Course List</span></p>
        </div>
        <SearchBar  data={input}/>
        </div>
        {
        input &&<div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600'> 
        <p className=' text-gray-600'>{input}</p>
          <img src={assets.cross_icon} alt="" className='cursor-pointer' onClick={()=>{navigate('/course-list')}} /></div>
        }
        <div className='grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2 md:p-0  my-16'>
          {/* Course list content goes here */}
          {filteredCourses.map((course, index) => (<CourseCard key={index} course={course} />))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CoursesList
