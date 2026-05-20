import "dotenv/config";
import express from 'express'
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
dotenv.config();

import connectionDB from './db/connect.db.js';
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import postRoute from './routes/post.route.js'
import msgRoute from './routes/msg.route.js'
import notificationRoute from './routes/notification.route.js'


const app= express();
const port = process.env.BACKEND_PORT || 4000
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json({
    limit: "50mb"
}));

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)
app.use('/api/msg',msgRoute)
app.use('/api/notification',notificationRoute)
app.use('/',(req,res)=>{
    res.send('hello')
})
connectionDB();
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})