import './utils/env.js'; // require('dotenv').config()
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

import errorHandlerMiddleware from './middleware/error-handler-middleware.js';

import authRoute from './routes/user-route.js';
import todoRoute from './routes/todo-route.js';

const app = express();

// 미들웨어
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.json('HiHiHi');
});

// 라우트
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/todo', todoRoute);

// 에러 미들웨어
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB 연결됨');
    app.listen(PORT, () => {
      console.log(`서버 running.. on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
