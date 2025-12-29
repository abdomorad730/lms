import { Router } from "express";
import { AddUserRatings, getUserCourseProgress, getUserData, purchaseCourse, updateUserCouseProgress, userEnrolledCourse } from "../controllers/user.controller.js";

const userRouter =  Router()
userRouter.get('/data',getUserData)
userRouter.get('/enrolled-courses',userEnrolledCourse)
userRouter.post('/purchase',purchaseCourse)
userRouter.post('/update-course-progress',updateUserCouseProgress)
userRouter.post('/get-course-progress',getUserCourseProgress)
userRouter.post('/add-rating',AddUserRatings)

export default userRouter