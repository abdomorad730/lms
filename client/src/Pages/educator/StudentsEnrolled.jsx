import React, { useContext } from 'react'
import Loading from '../../components/student/Loading'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const StudentsEnrolled = () => {
  const{backendUrl,getToken,isEducator}=useContext(AppContext)
  const [enrolledStudent, setEnrolledStudent] = React.useState(null)
  const fetchStudentsEnrolledData = async () => {
    try {
      const token =await getToken()
    const {data} = await axios.get(`${backendUrl}/api/educator/enrolled-students`,{headers:{Authorization:`Bearer ${token}`}})
    data.success ? setEnrolledStudent(data.enrolledStudents.reverse()): toast.error(data.message)

    } catch (error) {
      toast.error(error.message)
    }
  
  }
  React.useEffect(()=>{
    if(isEducator){
    fetchStudentsEnrolledData()

    }
  },[isEducator])
  return enrolledStudent ? (
     <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
        <div className='overflow-hidden w-full border border-gray-500/20  rounded-md flex flex-col items-center max-w-4xl bg-white'>
          <table className='md:table-auto table-fixed w-full overflow-hidden'>
            <thead className='border-b border-gray-500/20 text-sm  text-gray-900 text-left'>
              <tr className=''>
                <th className='px-4 py-3 font-semibold '>#</th>
                <th className='px-4 py-3 font-semibold '>Student Name</th>
                <th className='px-4 py-3 font-semibold '>Course Title</th>
                <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Date</th>


              </tr>
            </thead>
             <tbody className='text-sm text-gray-500'>
              {enrolledStudent.map((course, index) => (
                <tr key={index} className='border-b border-gray-500/20'>
                  <td className='px-2 py-3 hidden sm:table-cell text-center'>{index+1}</td>
                  <td className='md:px-4 py-3 truncate pl-2 md:pl-4 flex items-center space-x-3'>
                    <img src={course.student.imageUrl} alt="student image" srcset="" className='w-9 h-9 rounded-full' />
                    <span className='truncate'>{course.student.name}</span>
                  </td>
                  <td className='px-2 py-3 truncate'>{course.courseTitle}</td>
                  <td className='px-2 py-3 hidden sm:table-cell'>{new Date(course.purchaseDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
           
          </table>
        </div>

      </div>
  ):<Loading/>
}

export default StudentsEnrolled
