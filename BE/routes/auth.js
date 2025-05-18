const express = require('express');
const router = express.Router();
const cookie = require('cookie');

/**
 * A serverless function send login data from FE to AUTH0
 * Main task: Set HTTPOnly Cookies that what i know
 * ChatGPT write this fn
 * @param req 
 * @param res 
 * @returns 
 */
router.post('/login', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()
  const tokenRes = await fetch(`https://dev-hofbpgthf4zpl0rz.us.auth0.com/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  })

  const tokens = await tokenRes.json()

  if (!tokenRes.ok) {
    return res.status(401).json({ error: tokens.error_description || 'Login failed' })
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = `Path=/; HttpOnly; SameSite=Strict; Max-Age=`;
  const secureOption = isProduction ? '; Secure' : '';

  res.setHeader('Set-Cookie', [
    `access_token=${tokens.access_token}; ${cookieOptions}900${secureOption}`,
    `refresh_token=${tokens.refresh_token}; ${cookieOptions}604800${secureOption}`,
  ]);

  return res.status(200).json({ success: true })
});
/**
 * A serverless function send refresh token request to auth0
 * Main task: Set HTTPOnly Cookies
 * ChatGPT write this fn
 * @param req 
 * @param res 
 * @returns 
 */
router.post('/refresh-token', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()
  const cookies = cookie.parse(req.headers.cookie || '');
  const refreshToken = cookies['refresh_token'];
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token found' });
  }

  const tokenRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      ...req.body,
      refresh_token: refreshToken,
    }),
  })

  const tokens = await tokenRes.json()

  if (!tokenRes.ok) {
    return res.status(401).json({ error: tokens.error_description || 'Refresh token failed' })
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = `Path=/; HttpOnly; SameSite=Strict; Max-Age=`;
  const secureOption = isProduction ? '; Secure' : '';
  res.setHeader('Set-Cookie', [
    `access_token=${tokens.access_token}; ${cookieOptions}900${secureOption}`,
    `refresh_token=${tokens.refresh_token}; ${cookieOptions}604800${secureOption}`,
  ]);

  return res.status(200).json({ success: true })
});

router.get('/userinfo', async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end()
  const cookies = cookie.parse(req.headers.cookie || '');
  const access_token = cookies['access_token'];
  if (!access_token) {
    return res.status(401).json({ message: 'No access token found' });
  }
  const resp = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${access_token}` },
  })


  if (!resp.ok) {
    return res.status(401).json({ error: resp.error_description || 'get user failed' })
  }
  const user = await resp.json()

  return res.status(200).json({ success: true, user })
});

/**
 * A serverless function send get access token request to auth0
 * It use PKCE method, with ServerCode, and Client Code
 * Main task: Set HTTPOnly Cookies
 * ChatGPT write this fn
 * @param req 
 * @param res 
 * @returns 
 */
router.post('/pkce-token', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  const tokenRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  })

  const tokens = await tokenRes.json()

  if (!tokenRes.ok) {
    return res.status(401).json({ error: tokens.error_description || 'Refresh token failed' })
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = `Path=/; HttpOnly; SameSite=Strict; Max-Age=`;
  const secureOption = isProduction ? '; Secure' : '';
  res.setHeader('Set-Cookie', [
    `access_token=${tokens.access_token}; ${cookieOptions}900${secureOption}`,
    `refresh_token=${tokens.refresh_token}; ${cookieOptions}604800${secureOption}`,
  ]);

  return res.status(200).json({ success: true })
});

/**
 * A serverless function send data from FE to AUTH0
 * Main task: Reset account password with new pass
 * ChatGPT write this fn
 * @param req 
 * @param res 
 * @returns 
 */
// router.post('/reset-password', async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end()
//   const {  password } = req.body
//   try {
//     const token = await getToken()
//     const userId = await getUserId(token)
//     const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
//       method: 'POST',
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({password : password}),
//     })
//     console.log(response)
//     if (!response.ok) {
//       const err = await response.text()
//       return res.status(500).json({ error: err })
//     }

//     return res.status(200).json({ message: 'Password reset successful' , response : JSON.stringify(response.body) })
//   } catch (err) {
//     return res.status(500).json({ error: err.message })
//   }
// })


// const getToken = async () => {
//   try {
//     const res = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         grant_type: 'client_credentials',
//         client_id: process.env.AUTH0_CLIENT_ID,
//         client_secret: process.env.AUTH0_CLIENT_SECRET,
//         audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
//       })
//     });
//     const { access_token } = await res.json();
//     return access_token
//   }catch(e) {
//     throw new Error(e)
//   }
// }
// const getUserId = async (token, email) => {
//   try {
//     const res =  await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users-by-email`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email })
//     });
//     const data  = await res.json()
//     if(data.length == 0) throw new Error("Error")
//     return data[0].user_id
//   }catch(e) {
//     throw new Error(e)
//   }
// }
module.exports = router;