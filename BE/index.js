const express = require('express');
const serverless = require('serverless-http');
const userRouter = require('./routes/auth');
const workspaceRoute = require('./routes/workspace');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.listen(3000)

app.use('/api/auth', userRouter);
app.use('/api/workspace', workspaceRoute);

app.get('/api/test', (req, res) => {
  res.json({ message: 'BE is running!' });
});



module.exports.handler = serverless(app);