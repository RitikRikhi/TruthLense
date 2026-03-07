import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import path from 'path';
dotenv.config();
import connectDB from './config/db.js';
const app = express();

import analyzeRouter from './routes/analyzeRouter.js';

app.use(cors());
app.use(express.json());


connectDB();

app.use('/api', analyzeRouter);
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
