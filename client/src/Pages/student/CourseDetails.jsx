import React from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import Footer from '../../components/student/Footer';
import YouTube from 'react-youtube';

const CourseDetails = () => {
  const { id } = useParams();
  const {
    allCourses,
    calculateRating,
    calculateCourseDuration,
    calculateNumberOfLectures,
    calculateChapterDuration,
    currency
  } = React.useContext(AppContext);
  const [openSection, setOpenSection] = React.useState({});
  const [courseData, setCourseData] = React.useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = React.useState(true);
  const [playerData, setPlayerData] = React.useState(null);

  const fetchCourseData = () => {
    const course = allCourses.find((course) => course._id === id);
    setCourseData(course);
  }

  React.useEffect(() => {
    fetchCourseData()
  },[allCourses]);
  const toggleSection = (index) => {
    setOpenSection((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }
  return courseData ? (
    <><div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left'>
      <div className='absolute top-0 left-0 w-full   bg-gradient-to-b md:pt-36 pt-20 px-7 md:px-0 space-y-7 h-custom from-cyan-100/70'>
      </div>
      {/* left sidebar content */}
      <div className='max-w-xl z-10 text-gray-500'>
        <h1 className='font-semibold text-gray-800 md:text-custom-lg text-custom-sm'>{courseData?.courseTitle}</h1>
        <p dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }} className='pt-4 md:text-base text-sm'></p>
        {/*review section*/}
        <div className='  flex items-center  space-x-2  text-sm pt-3 pb-1 '>
          <p>{calculateRating(courseData)}</p>
          <div className='flex'>{[...Array(5)].map((_, i) => <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} alt='star' className='w-3.5 h-3.5' />)}</div>
          <p className='text-blue-600'>({courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? ' ratings' : ' rating'})</p>
          <p className=''>{courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? ' students' : ' student'}</p>
        </div>
        <p className=' text-sm '>Course by <span className='text-blue-600 underline'>GreatStack</span></p>
        <div className='pt-8 text-gray-800'>
          <h2 className='font-semibold text-xl '>Course Structure</h2>
          <div className='pt-5'>
            {courseData.courseContent?.map((chapter, index) => (
              <div key={index} className='border border-gray-300 rounded bg-white mb-2'>
                <div onClick={() => { toggleSection(index) }} className='flex justify-between px-4 py-3 hover:bg-gray-100 items-center select-none cursor-pointer'>
                  <div className='flex items-center gap-2'>
                    <img src={assets.down_arrow_icon} alt='arrow icon' className={'transition-transform transform duration-300 ' + (openSection[index] ? 'rotate-180' : '')} />
                    <p className='font-medium text-sm md:text-base'>{chapter.chapterTitle}</p>
                  </div>
                  <p className='text-sm md:text-defualt'>{chapter.chapterContent.length} lectures - {humanizeDuration(calculateChapterDuration(chapter) * 1000 * 60, { units: ['h', 'm'] })}</p>
                </div>
                <div className={' overflow-hidden transition-all duration-300 ' + (openSection[index] ? ' max-h-96' : ' max-h-0')}>
                  <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                    {chapter.chapterContent.map((content, idx) => (
                      <li key={idx} className='flex  items-start gap-2 py-1'>
                        <img src={assets.play_icon} alt="play-icon" className='w-4 h-4 mt-1' />
                        <div className='flex justify-between w-full items-center text-xs md:text-defualt text-gray-800'>
                          <p className='md:text-base text-sm font-medium text-gray-700'>{content.lectureTitle}</p>
                          <div className='flex gap-2 '>
                            {content.isPreviewFree && <p onClick={()=>{setPlayerData({
                              videoId:content.lectureUrl.split('/').pop()
                            })}} className=' cursor-pointer text-blue-500 '>Preview</p>}
                            <p>{humanizeDuration(content.lectureDuration * 1000 * 60, { units: ['h', 'm'] })} </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='py-20 text-sm md:text-defualt'>
          <h3 className='text-xl font-semibold text-gray-800'>Course descriptions</h3>
          <p className='pt-3   rich-text' dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}></p>
        </div>
      </div>

      {/*right main content */}
      <div className='max-w-[424px]   z-10  md:rounded-none overflow-hidden min-w-[300px] sm:min-w-[420px] bg-white  custom-card rounded-t'>
       {
              playerData ? <YouTube videoId={playerData.videoId} opts={{playerVars:{autoplay:1}}} iframeClassName='w-full aspect-video'/> 

            : <img src={courseData.courseThumbnail} alt="Course Image" />}
        <div className='p-5'>
          <div className='flex items-center gap-2'>
            <img src={assets.time_left_clock_icon} alt="time" srcset="" className='w-3.5' />
            <p className='text-red-500'><span className='font-medium'>5 days</span> left at this price</p>
          </div>
          <div className='flex gap-3 items-center pt-2'>
            <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>{currency}{(courseData.coursePrice - courseData.coursePrice * courseData.discount / 100).toFixed(2)}</p>
            <p className='md:text-lg text-gray-500 line-through'>{currency}{courseData.coursePrice.toFixed(2)}</p>
            <p className='md:text-lg text-gray-500'>{courseData.discount}% off</p>
          </div>
          <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>
            <div className='flex items-center gap-1 '>
              <img src={assets.star} alt="star-icon" />
              <p>{calculateRating(courseData)}</p>
            </div>
            <div className='h-4 w-px bg-gray-500/40'></div>
            <div className='flex items-center gap-1 '>
              <img src={assets.time_clock_icon} alt="clock-icon" />
              <p>{calculateCourseDuration(courseData)}</p>
            </div>
            <div className='h-4 w-px bg-gray-500/40'></div>
            <div className='flex items-center gap-1 '>
              <img src={assets.lesson_icon} alt="clock-icon" />
              <p>{calculateNumberOfLectures(courseData)} lessons</p>
            </div>
          </div>
          <button className='bg-blue-600 md:mt-6 mt-4 py-3 w-full rounded text-white font-medium'>{isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}</button>
          <div className='pt-6'>
            <p className='md:text-xl text-lg font-medium text-gray-800 '>What's in the course?</p>
            <ul className='ml-4 text-sm md:text-default list-disc text-gray-500'>
              <li>Understand the basics of programming</li>
              <li>Learn how to manipulate the DOM</li>
              <li>Create dynamic web applications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </>
  ) : <Loading />;
}

export default CourseDetails
