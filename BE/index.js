const express = require('express');
const serverless = require('serverless-http');
const userRouter = require('./routes/auth');

const app = express();
app.use(express.json());

// Đăng ký các router
app.use('/api/auth', userRouter);
// app.use('/api/products', productRouter);
// app.use('/api/auth', authRouter);

module.exports.handler = serverless(app);