import { Webhook } from "svix";
import User from "../models/User.js";

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

    console.log("Webhook:", type);

    const userData = {
      name: data.first_name || "User",
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
