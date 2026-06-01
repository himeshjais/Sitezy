import express from 'express'
import dotenv from 'dotenv'
import connectDB from './databse/db.js'
import authRoute from "./routes/authRoute.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import websiteRoute from "./routes/websiteRoute.js"
import paymentRoute from './routes/paymentRoute.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

// middleware
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true // Frontend ko allow karo ki wo cookies ke saath request bhej sake
}))

// 1
app.use("/api/auth", authRoute)

// Now our api will look like this
// http://localhost:8000/api/auth/google
// http://localhost:8000/api/auth/logout

// 2
app.use("/api/website", websiteRoute)

// 3
app.use('/api/payment', paymentRoute)


app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port ${port}`)
})

