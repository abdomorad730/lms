import express from 'express' 
import cors from 'cors' 
import 'dotenv/config' 
import connectDB from './configs/mongodb.js' 
import { clerkWebhooks } from './controllers/webhooks.js' 
const app = express() 
const port = process.env.PORT || 5000 
// Connect DB
  connectDB()
  app.use(cors()) 
  // 👇 Webhook route (RAW BODY)
   app.post( "/clerk", express.raw({ type: "application/json" }), clerkWebhooks );
   app.use(express.json()) 
   app.get('/', (req, res) => res.send('Hello World!')) 
   app.listen(port, () => console.log(`Server running on port ${port}`) )