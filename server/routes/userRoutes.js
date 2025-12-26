import { Router } from "express";
import { getUserData, purchaseCourse, userEnrolledCourse } from "../controllers/user.controller.js";

const userRouter =  Router()
userRouter.get('/data',getUserData)
userRouter.get('/enrolled-courses',userEnrolledCourse)
userRouter.post('/purchase',purchaseCourse)
export default userRouter