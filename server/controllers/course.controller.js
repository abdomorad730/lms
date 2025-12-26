import Course from "../models/Course.js";

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).
            select(['-enrolledStudents', '-courseContent']).
            populate({ path: 'educator' })
        res.json({ success: true, courses })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}
export const getCourseId = async (req, res) => {
    try {
        const {id} =req.params
        const course = await Course.findOne({_id:id }).populate({ path: 'educator' })
        course.courseContent.forEach(chapter=>{
            chapter.chapterContent.forEach(lecture=>{
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl="";
                }
            })
        })
        res.json({ success: true, course })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}
