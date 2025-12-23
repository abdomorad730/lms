import React from 'react'
import { AppContext } from '../../context/AppContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const Dashboard = () => {
  const { currency } = React.useContext(AppContext);
  const [dashboardData, setDashboardData] = React.useState(null);
  const fetchDashboardData = async () => {
    //fetch dashboard data from backend
    setDashboardData(dummyDashboardData);
  }
  React.useEffect(() => {
    fetchDashboardData();
  }, [])
  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 pb-0 pt-8 '>
      <div className='space-y-5'>
        <div className='flex flex-wrap gap-5 items-center'>
          <div className='flex items-center gap-3 custom-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.patients_icon} alt="patients-icon" srcset="" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.enrolledStudentsData.length}</p>
              <p className='text-base text-gray-500'>TotalEnrollments</p>
            </div>
          </div>
          <div className='flex items-center gap-3 custom-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.appointments_icon} alt="appointments-icon" srcset="" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalCourses}</p>
              <p className='text-base text-gray-500'>Total Courses</p>
            </div>
          </div>
          <div className='flex items-center gap-3 custom-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.earning_icon} alt="earning-icon" srcset="" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{currency}{dashboardData.totalEarnings}</p>
              <p className='text-base text-gray-500'>Total Earnings</p>
            </div>
          </div>


        </div>
        <div className=''>
          <h2 className='pb-4 text-lg font-medium'>Latest Enrollments</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md border border-gray-500/20 bg-white'>
            <table className='w-full table-fixed md:table-auto  overflow-hidden'>
              <thead className='text-gray-900 text-sm text-left border-b border-gray-500/20'>
                <tr>
                  <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
                  <th className='py-3 px-4 font-semibold'>Student Name</th>
                  <th className='py-3 px-4 font-semibold'>Course Title</th>
                </tr>
              </thead>
              <tbody className='text-sm text-gray-500'>
                {dashboardData.enrolledStudentsData.map((enrollment, index) => (
                  <tr key={index} className='border-b border-gray-500/20 '>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>
                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3'><img src={enrollment.student.imageUrl} alt="profile" srcset="" className='w-9 h-9 rounded-full'/><span className='truncate'>{enrollment.student.name}</span></td>
                    <td className='px-4 py-3 truncate'>{enrollment.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />;
}

export default Dashboard
