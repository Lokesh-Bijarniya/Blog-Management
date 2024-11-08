import express from 'express';
import mongoose from "mongoose";
import authorRouter from './routers/authorRouter.js';
import blogRouter from './routers/blogRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();

app.use(express.json());


app.use(cors());

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=> console.log("Database connected successfully")).catch(err => console.error(err));

app.use('/authors', authorRouter);
app.use('/blogs', blogRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at ${process.env.PORT}`);
})
