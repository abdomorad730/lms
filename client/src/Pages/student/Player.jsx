import React, { use } from 'react'
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';
import { assets } from '../../assets/assets';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';

const Player = () => {
  const {enrolledCourses, calculateChapterDuration} = React.useContext(AppContext);
  const{courseId}=useParams();
  const [courseData,setCourseData]=React.useState(null);
  const [openSection, setOpenSection] = React.useState({});
  const [playerData,setPlayerData]=React.useState(null);

  React.useEffect(()=>{
    const course=enrolledCourses.find((course)=>course._id===courseId);
    setCourseData(course);
  },[enrolledCourses,courseId]);
  const toggleSection = (index) => {
    setOpenSection((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }
  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        {/*left content*/}
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course structure</h2>
          <div className='pt-5'>
            {courseData &&courseData.courseContent.map((chapter, index) => (
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
                        <img src={false?assets.blue_tick_icon: assets.play_icon} alt="play-icon" className='w-4 h-4 mt-1' />
                        <div className='flex justify-between w-full items-center text-xs md:text-defualt text-gray-800'>
                          <p className='md:text-base text-sm font-medium text-gray-700'>{content.lectureTitle}</p>
                          <div className='flex gap-2 '>
                            {content.lectureUrl && <p onClick={() => {
                              setPlayerData({
                                ...content, chapter:index+1, lecture:idx+1})
                            }} className=' cursor-pointer text-blue-500 '>Watch</p>}
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
          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this course:</h1>
            <Rating initialRating={0} />
          </div>
        </div>
        {/*right content*/}
        <div className='md:mt-10'>
          {playerData ? (
            <div className=''>
              <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video '  opts={{playerVars: {autoplay:0}}}/>
              <div className='flex justify-between items-center mt-1'>
                <p>{`${playerData.chapter}.${playerData.lecture} ${playerData.lectureTitle}`}</p>
                <button className='text-blue-600'>{false ? "Completed" : "Mark as complete"}</button>
              </div>
            </div>) : <img src={courseData? courseData.courseThumbnail:''} alt="" srcset="" />}
        </div>
      </div>
          <Footer />
    </>
  )
}

export default Player
