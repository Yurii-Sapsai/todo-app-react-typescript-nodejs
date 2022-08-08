import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';

import tasksRoutes from './routes/tasks.js';



const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();



app.use('/tasks', tasksRoutes);



mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('db OK!'))
    .catch((err) => console.log('db ERROR!', err))

app.listen(process.env.PORT || 80, (error) => {
    if (error) {
        return console.log(error);
    }
    console.log("Server start!");
})