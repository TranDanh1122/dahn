const express = require('express');
const serverless = require('serverless-http');
const authRoute = require('./routes/auth');
const workspaceRoute = require('./routes/workspace');
const userRoute = require('./routes/user')
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
app.get('/api/test', (req, res) => {
  res.json({ message: 'BE is running!' });
});



module.exports.handler = serverless(app);
module.exports = app