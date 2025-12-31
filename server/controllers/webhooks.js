import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from 'stripe'
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body;
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const event = whook.verify(payload, headers);
    const { data, type } = event;


    const userData = {
      name: data.first_name + ' ' + data.last_name || "User",
      email: data.email_addresses?.[0]?.email_address || "",
      imageUrl: data.image_url || "",
    };

    switch (type) {
      case "user.created":
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData, {
          upsert: true,
          new: true,
        });
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("CLERK WEBHOOK ERROR:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};


const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET_KEY
    );
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;

        const sessions = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1
        });

        if (!sessions.data.length) break;

        const { purchaseId } = sessions.data[0].metadata;

        const purchaseData = await Purchase.findById(purchaseId);
        if (!purchaseData) break;

        const userData = await User.findById(purchaseData.userId);
        const courseData = await Course.findById(purchaseData.courseId);

        if (
          !courseData.enrolledStudents.includes(userData._id) &&
          !userData.enrolledCourses.includes(courseData._id)
        ) {
          courseData.enrolledStudents.push(userData._id);
          userData.enrolledCourses.push(courseData._id);

          await courseData.save();
          await userData.save();
        }

        purchaseData.status = 'completed';
        await purchaseData.save();
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;

        const sessions = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1
        });

        if (!sessions.data.length) break;

        const { purchaseId } = sessions.data[0].metadata;

        const purchaseData = await Purchase.findById(purchaseId);
        if (!purchaseData) break;

        purchaseData.status = 'failed';
        await purchaseData.save();
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};

