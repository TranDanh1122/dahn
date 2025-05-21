const express = require('express');
const router = express.Router();
const cookie = require('cookie');
const createClient = require('@supabase/supabase-js');
const supabase = createClient.createClient(
  process.env.AUTH_DOMAIN,
  process.env.AUTH_API_KEY,
  {
    auth: {
      flowType: 'pkce',
    }
  }
);

const supabaseAdmin = createClient.createClient(process.env.AUTH_DOMAIN, process.env.AUTH_SERVICE_KEY);

/**
 * A serverless function send login data from FE
 * Main task: Set HTTPOnly Cookies that what i know
 * ChatGPT write this fn
 * @param req 
 * @param res 
 * @returns 
 */
router.post('/register', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()
  const { data, error } = await supabase.auth.signUp(req.body);
  if (error) {
    return res.status(error.status ?? 400).json(error.code ?? 'Error')
  }
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = `Path=/; HttpOnly; SameSite=Strict; Max-Age=`;
  const secureOption = isProduction ? '; Secure' : '';

  res.setHeader('Set-Cookie', [
    `access_token=${data.session.access_token}; ${cookieOptions}${data.session.expires_in}${secureOption}`,
    `refresh_token=${data.session.refresh_token}; ${cookieOptions}604800${secureOption}`,
  ]);

  return res.status(200).json({ success: true })
});

/**
 * A serverless function send login data from FE
 * Main task: Set HTTPOnly Cookies that what i know
 * ChatGPT write this fn
 * @param req 
 * @param res 
 * @returns 
 */
router.post('/login', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()
  const { data, error } = await supabase.auth.signInWithPassword(req.body);
  console.log('data', req.body)
  console.log('data', data)
  console.log('error', error)
  if (error) {
    return res.status(error.status ?? 400).json(error.code ?? 'Error')
  }
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = `Path=/; HttpOnly; SameSite=Strict; Max-Age=`;
  const secureOption = isProduction ? '; Secure' : '';

  res.setHeader('Set-Cookie', [
    `access_token=${data.session.access_token}; ${cookieOptions}${data.session.expires_in}${secureOption}`,
    `refresh_token=${data.session.refresh_token}; ${cookieOptions}604800${secureOption}`,
  ]);

  return res.status(200).json({ success: true })
});

router.post('/forgot-password', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()
  const { email } = req.body;
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    { redirectTo: 'http://localhost:5173/auth/reset-password' }
  );

  if (error) {
    return res.status(error.status ?? 400).json(error.code ?? 'Error')
  }
  return res.status(200).json({ success: true })
});

router.post('/reset-password', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()
  const { password } = req.body;
  const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers({ email });
  if (listError || !users || users.length === 0)   return res.status((listError.status) ?? 400).json((listError?.message) ?? 'Error')
  const user = users[0];
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, { password });
  console.log('data', updateError)
  if (updateError)  return res.status((updateError.status) ?? 400).json((updateError.code) ?? 'Error')
f
  return res.status(200).json({ success: true })
});


/**
 * A serverless function send refresh token request
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
 * A serverless function send get access token request
 * It use PKCE method, with ServerCode, and Client Code
 * Main task: Set HTTPOnly Cookies
 * ChatGPT write this fn
 * @param req 
 * @param res 
 * @returns 
 */
router.post('/pkce-token', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()

  const { code, code_verifier } = req.body;

  if (!code || !code_verifier) {
    return res.status(400).json({ error: 'Missing code or code_verifier' });
  }
  const { data, error } = await supabase.auth.exchangeCodeForSession(code, code_verifier);

  if (error) {
    return res.status(error.status ?? 400).json(error.code ?? 'Error')
  }
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = `Path=/; HttpOnly; SameSite=Strict; Max-Age=`;
  const secureOption = isProduction ? '; Secure' : '';
  res.setHeader('Set-Cookie', [
    `access_token=${data.session.access_token}; ${cookieOptions}${data.session.expires_in}${secureOption}`,
    `refresh_token=${data.session.refresh_token}; ${cookieOptions}604800${secureOption}`,
  ]);

  return res.status(200).json({ success: true })
});


module.exports = router;