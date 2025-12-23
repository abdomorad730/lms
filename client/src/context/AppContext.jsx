import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
export const AppContext = createContext();
export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate()
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses);
    }

    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) return 0;
        let total = 0;
        course.courseRatings.forEach(review => {
            total += review.rating;
        });
        return (total / course.courseRatings.length).toFixed(1);
    }

    const calculateChapterDuration = (chapter) => {
        let totalDuration = 0;
        chapter.chapterContent.map((content) => {
            totalDuration += content.lectureDuration;
        });
        return totalDuration;
    }
    const calculateCourseDuration = (course) => {
        let totalDuration = 0;
        course.courseContent.map((chapter) => {
            totalDuration += calculateChapterDuration(chapter);
        });
        return humanizeDuration(totalDuration * 1000 * 60, { units: ['h', 'm'] });
    }
    const calculateNumberOfLectures = (course) => {
        let totalLectures = 0;
        course.courseContent.map((chapter) => {
            totalLectures += chapter.chapterContent.length;
        });
        return totalLectures;
    }
    const fetchEnrolledCourses = async () => {
       setEnrolledCourses(dummyCourses) // Fetch enrolled courses logic here
    }
    useEffect(() => {
        fetchAllCourses();
        fetchEnrolledCourses();
    }, [])
    return <AppContext.Provider value={{
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator,
        setIsEducator,
        calculateChapterDuration,
        calculateCourseDuration,
        calculateNumberOfLectures,
        fetchEnrolledCourses,
        enrolledCourses
    }}>{props.children}</AppContext.Provider>
}
