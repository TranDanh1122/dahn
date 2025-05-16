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
  const tokenRes = await fetch(`https://${process.env.VITE_AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  })

  const tokens = await tokenRes.json()

  if (!tokenRes.ok) {
    return res.status(401).json({ error: tokens.error_description || 'Login failed' })
  }

  // Set cookies (HttpOnly + Secure)
  res.setHeader('Set-Cookie', [
    `access_token=${tokens.access_token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=900`,
    `refresh_token=${tokens.refresh_token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`,
  ])

  return res.status(200).json({ success: true })
});

module.exports = router;