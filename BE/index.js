const express = require('express');
const serverless = require('serverless-http');
const userRouter = require('./routes/auth');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.listen(3000)
// Đăng ký các router
app.use('/api/auth', userRouter);
// app.use('/api/products', productRouter);
// app.use('/api/auth', authRouter);
app.get('/api/test', (req, res) => {
  res.json({ message: 'BE is running!' });
});
module.exports.handler = serverless(app);