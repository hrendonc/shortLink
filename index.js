import 'dotenv/config'
import express from "express";
import cors from 'cors'
import './database/connectDB.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';

const app = express()
app.use(cors())

app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes)
app.use(express.static('public'))

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log("http://localhost:" + PORT))