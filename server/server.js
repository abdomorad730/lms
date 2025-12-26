import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks, stripeWebhook } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js';
import courseRouter from './routes/courseRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

// Connect DB
await connectDB();
await connectCloudinary()

app.use(cors());

// Webhook route (RAW BODY)
app.post("/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

//app.use(express.json());
app.use(clerkMiddleware());
app.get ('/' , (req,res)=>{res.send('hi')})


// Educator routes
app.use('/api/educator',express.json(), educatorRouter);
app.use('/api/course',express.json(),courseRouter)
app.use('/api/user',express.json(),userRouter)
app.post('/stripe',express.raw({type:'application/json'}),stripeWebhook)


app.listen(port, () => console.log(`Server running on port ${port}`));
