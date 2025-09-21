import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.js"
import professionalUserRoutes from "./routes/professionalUse.route.js"
import cors from 'cors'

import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
dotenv.config()

const app=express()

// app.use(cors({
    //   origin: ['http://localhost:5173','http://localhost:5174','http://192.168.1.83:5173'], // replace with your frontend URL
    //   credentials: true                // allow cookies/auth headers
    // }));
    
app.use(express.json({limit: "100mb"}));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser())
    
app.use("/api/auth",authRoutes)
app.use("/api/professionaluser",professionalUserRoutes)


const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("server is running on localhost:" +PORT);
    connectDB();
})