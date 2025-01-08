import express from 'express';
import userRouter from './routes/User.js';
import cookieParser from 'cookie-parser';
import taskRouter from './routes/tasks.js';
import { errorMiddleware } from './middlewares/error.js';
import cors from "cors"
import 'dotenv/config'

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods : ["GET","POST","PUT","DELETE", "PATCH", "OPTIONS"],
    credentials: true,

}));


app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);

// express built-in error handler
app.use(errorMiddleware);


