const express = require('express');
const serverless = require('serverless-http');
const authRoute = require('./routes/auth');
const workspaceRoute = require('./routes/workspace');
const userRoute = require('./routes/user')
const commonRoute = require('./routes/common')
const projectRoute = require('./routes/project')
const cors = require('cors');
const authMiddleware = require('./middleware/auth')

const app = express();
app.use(cors({ origin: process.env.FE_DOMAIN, credentials: true }))

// app.use(authMiddleware)
app.use(express.json());
// app.listen(3000)

app.use('/api/auth', authRoute);
app.use('/api/workspace', authMiddleware, workspaceRoute);
app.use('/api/user', authMiddleware, userRoute);
app.use('/api/common', authMiddleware, commonRoute);
app.use('/api/project', authMiddleware, projectRoute);
app.get('/api/test', (req, res) => {
  res.json({ message: 'BE is running!' });
});
app.listen(3000, () => {
  console.log('BE listening on http://localhost:3000');
});


module.exports = app