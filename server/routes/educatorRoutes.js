import { Router } from "express";
import { addCourse, getEducatorCourses, getEducatorDashboard, getEnrolledStudentsData, updateRoleToEducator } from "../controllers/educator.controller.js";
import upload from "../configs/multer.js";
import { protectEducator } from "../middlewares/authMiddleware.js";

const educatorRouter = Router();

// PATCH /api/educator/update-role
educatorRouter.get('/update-role',updateRoleToEducator);
educatorRouter.post('/add-course',upload.single('image'),protectEducator, addCourse)
educatorRouter.get('/courses',protectEducator,getEducatorCourses)
educatorRouter.get('/dashboard',protectEducator,getEducatorDashboard)
educatorRouter.get('/enrolled-students',protectEducator,getEnrolledStudentsData)




export default educatorRouter;
