const express = require('express');
const router = express.Router();

/**
 * A serverless function send data from FE to AUTH0
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

module.exports = router;