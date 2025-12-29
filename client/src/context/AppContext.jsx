import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from "react-toastify";
export const AppContext = createContext();
export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const backendUrl = import.meta.env.VITE_BACKEND;



    const navigate = useNavigate()
    const { getToken } = useAuth()
    const { user } = useUser()
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [userData, setUserData] = useState(null);


    const fetchAllCourses = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/course/all`)
            if (data.success) {
                setAllCourses(data.courses)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }

    const fetchUserData = async () => {
        if (user.publicMetadata.role === 'educator') {
            setIsEducator(true)
        }
        try {
            const token = await getToken()
            const { data } = await axios.get(`${backendUrl}/api/user/data`, { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }
    }

    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) return 0;
        let total = 0;
        course.courseRatings.forEach(review => {
            total += review.rating;
        });
        return Math.floor(total / course.courseRatings.length).toFixed(1);
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
        try {
            const token = await getToken()
            const { data } = await axios.get(`${backendUrl}/api/user/enrolled-courses`, { headers: { Authorization: `Bearer ${token}` } })
            if (data.success) {
                setEnrolledCourses(data.enrolledCourses.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }

    }

    const logToken = async () => {
        console.log(await getToken())
    }
    useEffect(() => {
        if (user) {
            fetchUserData()
            fetchEnrolledCourses();
        }
    }, [user])
    useEffect(() => {
        fetchAllCourses();
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
        enrolledCourses,
        userData, setUserData, getToken, fetchAllCourses,backendUrl

    }}>{props.children}</AppContext.Provider>
}
