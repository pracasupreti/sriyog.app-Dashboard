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
    origin: function(origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        
        // Allow all localhost origins
        if (origin.includes('localhost')) {
            return callback(null, true);
        }
        
        // Allow all vercel.app subdomains
        if (origin.includes('vercel.app')) {
            return callback(null, true);
        }
        
        // Allow specific origins
        const allowedOrigins = [
            'https://sriyogappdashboard.vercel.app',
            'https://sriyog-app-dashboard-frontend.vercel.app',
        ];
        
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        
        return callback(new Error('Not allowed by CORS'));
    },
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