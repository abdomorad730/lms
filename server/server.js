import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
const app = express()
connectDB()
app.use(cors())
const port = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.post(
  "/webhooks/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhooks
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))