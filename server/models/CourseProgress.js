import mongoose from "mongoose";

const CourseProgressSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true },
    courseId: { type: mongoose.Types.ObjectId, ref: 'Course', required: true },
    completed: { type: Boolean, default: false },
    lectureCompleted: []

},{minimize:false})
export const CourseProgress =mongoose.model('CourseProgress',CourseProgressSchema)