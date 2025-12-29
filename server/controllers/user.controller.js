import Stripe from "stripe"
import User from "../models/User.js"
import Course from "../models/Course.js"
import { Purchase } from "../models/Purchase.js"
import { CourseProgress } from "../models/CourseProgress.js"

export const getUserData = async (req, res) => {
    try {
        const userId = req.auth.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.json({ success: false, message: 'User Not Found' })
        }
        res.json({ success: true, user })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



export const userEnrolledCourse = async (req, res) => {
    try {
        const userId = req.auth.userId
        const user = await User.findById(userId).populate('enrolledCourses')
        res.json({ success: true, enrolledCourses: user.enrolledCourses })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}



export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const { origin } = req.headers
        const userId = req.auth.userId
        const courseData = await Course.findById(courseId)
        const userData = await User.findById(userId)

        if (!userData || !courseData) {
            return res.json({ success: false, message: 'Data Not Found' })
        }
        const purchaseData = {
            courseId: courseData._id,
            userId,
            amount: (courseData.coursePrice - courseData.coursePrice * courseData.discount / 100).toFixed(2)
        }
        const newPurchase = await Purchase.create(purchaseData)
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
        const currency = process.env.CURRENCY.toLowerCase()
        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: courseData.courseTitle,
                },
                unit_amount: Math.floor(newPurchase.amount) * 100
            },
            quantity: 1
        }]
        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-enrollments`,
            cancel_url: `${origin}/`,
            line_items,
            mode: "payment",
            metadata: {
                purchaseId: newPurchase._id.toString()
            }
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}



export const updateUserCouseProgress = async (req, res) => {
    try {
        const { userId } = req.auth
        const { courseId, lectureId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })
        if (progressData) {
            if (progressData.lectureCompleted.includes(lectureId)) {
                return res.json({ success: true, message: 'Lecture Already Completed' })
            }
            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
        } else {
            await CourseProgress.create({ userId, courseId, lectureCompleted: [lectureId] })
        }
        res.json({ success: true, message: 'Progress Updated' })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}


export const getUserCourseProgress = async (req, res) => {
    try {
        const { userId } = req.auth
        const { courseId } = req.body
        const progressData = await CourseProgress.findOne({ userId, courseId })
        res.json({ success: true, progressData })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}


export const AddUserRatings = async (req, res) => {
    const { userId } = req.auth
    const { courseId, rating } = req.body
    if (!userId || !courseId || !rating || rating < 1 || rating > 5) {
        return res.json({ success: false, message: 'Invaild Details' })

    }
    try {
        const course = await Course.findById(courseId)
        if (!course) {
            return res.json({ success: false, message: ' Course Not Found  ' })
        }
        const user = await User.findById(userId)
        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.json({ success: false, message: ' User Has Not Purchase This Course  ' })
        }
        const existIndexRating = course.courseRatings.findIndex(r => r.userId === userId)
        if (existIndexRating > -1) {
            course.courseRatings[existIndexRating].rating = rating
            await course.save()
        } else {
            course.courseRatings.push({ userId, rating })
            await course.save()
        }

        res.json({ success: true, message: 'Rating Added' })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }


}

