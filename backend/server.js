import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.js"
import professionalUserRoutes from "./routes/professionalUse.route.js"
import cors from 'cors'

import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
dotenv.config()



const app=express()

await connectDB();

app.use(cors({
    origin: [
        'http://localhost:3000',                    // Next.js dev server
        'http://localhost:3001',                    // Next.js dev server
        'http://localhost:5173',                    // Vite dev server  
        'http://localhost:5174',                    // Vite dev server (alternative port)
        'http://192.168.1.69:3000',               // Your local network IP
        'https://sriyogappdashboard.vercel.app',   // Old Vercel deployment
        'https://dashboard.sriyog.app',            // ✅ NEW: Your frontend domain
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    optionsSuccessStatus: 200
}));
    
app.use(express.json({limit: "100mb"}));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cookieParser())
    
app.use("/api/auth",authRoutes)
app.use("/api/professionaluser",professionalUserRoutes)


const PORT=process.env.PORT || 3000

app.listen(PORT,async()=>{
    console.log(`Server is running on port ${PORT}`);

})