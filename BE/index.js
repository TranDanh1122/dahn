const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
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

// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: 'https://YOUR_DOMAIN/.well-known/jwks.json',
//   }),

//   audience: 'https://myapi.example.com',
//   issuer: 'https://YOUR_DOMAIN/',
//   algorithms: ['RS256'],
// });

app.get('/api/test', (req, res) => {
  res.json({ message: 'BE is running!' });
});



module.exports.handler = serverless(app);