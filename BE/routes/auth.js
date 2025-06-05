const express = require('express');
const router = express.Router();
const cookie = require('cookie');
const crypto = require('crypto');
const createClient = require('@supabase/supabase-js');


const setHTTPOnlyCookie = (res, cookies) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const sameSite = isProduction ? '; SameSite=None' : '; SameSite=Strict';

  const cookieOptions = `Path=/; HttpOnly${sameSite}; Max-Age=`;
  const secureOption = isProduction ? '; Secure' : '';

  const cookieHeaders = cookies.map(({ name, value, expires }) => {
    return `${name}=${value}; ${cookieOptions}${expires}${secureOption}`;
  });
  res.setHeader('Set-Cookie', cookieHeaders);
}
const secretKey = crypto.pbkdf2Sync(process.env.AUTH_SECRET_KEY, "somesalt", 100000, 32, "sha256");
function encrypt(text) {
  try {
    if (!text || typeof text !== "string") {
      throw new Error("Input text must be a non-empty string");
    }

    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
  } catch (error) {
    throw new Error(`Encryption failed: ${error.message}`);
  }
}

function decrypt(data) {
  try {
    if (!data || typeof data !== "string") {
      throw new Error("Input data must be a non-empty string");
    }

    const [ivHex, encryptedData] = data.split(":");
    if (!ivHex || !encryptedData) {
      throw new Error("Invalid encrypted data format");
    }

    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
}
const supabase = require("../utls/supabase")

/**
 * A serverless function send login data from FE
 * Main task: Set HTTPOnly Cookies that what i know

 * @param req 
 * @param res 
 * @returns 
 */
router.post('/register', async (req, res) => {

  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) return res.status(error.status ?? 400).json({ message: error.message ?? 'Error' })

  const { error: otpError } = await supabase.auth.signInWithOtp({ email })

  if (otpError) return res.status(otpError.status ?? 400).json({ message: otpError.message ?? 'Error' })

  // setHTTPOnlyCookie(res, [
  //   { name: 'access_token', value: data.session.access_token, expires: data.session.expires_in },
  //   { name: 'refresh_token', value: data.session.refresh_token, expires: 604800 }
  // ])

  return res.status(200).json({ success: true })
});

/**
 * A serverless function send login request with OTP from FE

 * @param req 
 * @param res 
 * @returns 
 */
router.post('/login', async (req, res) => {

  if (req.method !== 'POST') return res.status(405).end()

  const { data, error } = await supabase.auth.signInWithPassword(req.body);

  if (error) return res.status(error.status ?? 400).json({ message: error.message ?? 'Error' })

  const { email } = req.body

  const { error: otpError } = await supabase.auth.signInWithOtp({ email })

  if (otpError) return res.status(otpError.status ?? 400).json({ message: otpError.message ?? 'Error' })

  return res.status(200).json({ success: true, user: { id: data.user.id, ...data.user.user_metadata } })
});


router.post('/send-otp', async (req, res) => {

  if (req.method !== 'POST') return res.status(405).end()


  const { email } = req.body

  const { error: otpError } = await supabase.auth.signInWithOtp({ email })

  if (otpError) return res.status(otpError.status ?? 400).json({ message: otpError.message ?? 'Error' })

  return res.status(200).json({ success: true })
});

/**
 * A serverless function send OTP from FE
 * Main task: Set HTTPOnly Cookies that what i know

 * @param req 
 * @param res 
 * @returns 
 */

router.post('/login-otp', async (req, res) => {

  if (req.method !== 'POST') return res.status(405).end()

  const { email, otp: token } = req.body
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })

  if (error) return res.status(error.status ?? 400).json({ message: error.message ?? 'Error' })

  setHTTPOnlyCookie(res, [
    { name: 'access_token', value: data.session.access_token, expires: data.session.expires_in },
    { name: 'refresh_token', value: data.session.refresh_token, expires: 604800 }
  ])
  return res.status(200).json({ success: true, user: { id: data.user.id, ...data.user.user_metadata } })
});


/**
 * A serverless function send reset password request
 * Main task: send reset password request, Set HTTPOnly Cookies, 5min lifetime, to validate user

 * @param req 
 * @param res 
 * @returns 
 */
router.post('/forgot-password', async (req, res) => {

  if (req.method !== 'POST') return res.status(405).end()

  const { email } = req.body;

  const { data, error } = await supabase.auth.resetPasswordForEmail(
    email.trim().toLowerCase(),
    { redirectTo: `${process.env.FE_DOMAIN}/auth/reset-password` }
  );

  if (error) return res.status(error.status ?? 400).json({ message: error.message ?? 'Error' })
  const token = encrypt(email.trim().toLowerCase())
  console.log(token)

  setHTTPOnlyCookie(res, [
    { name: 'reset_password', value: token, expires: 900 },
  ])
  return res.status(200).json({ success: true })
});


router.post('/reset-password', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()
  const cookies = cookie.parse(req.headers.cookie || '');
  const resetCookies = cookies['reset_password'];
  if (!resetCookies) {
    return res.status(401).json({ message: 'Expired request, please send another reset password request' });
  }
  const email = decrypt(resetCookies)
  const { password } = req.body;
  const supabaseAdmin = createClient.createClient(process.env.AUTH_DOMAIN, process.env.AUTH_SERVICE_KEY);

  const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers({ email });

  if (listError || !users || users.length === 0) return res.status((listError.status) ?? 400).json({ message: (listError?.message) ?? 'Error' })
  if (!users.users || users.user.length === 0) return res.status(400).json({ message: 'Error' })

  const user = users.users[0];

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, { password });

  if (updateError) return res.status((updateError.status) ?? 400).json({ message: (updateError.message) ?? 'Error' })

  return res.status(200).json({ success: true })
});


/**
 * A serverless function send refresh token request
 * Main task: Set HTTPOnly Cookies

 * @param req 
 * @param res 
 * @returns 
 */
router.post('/refresh-token', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()
  const cookies = cookie.parse(req.headers.cookie || '');
  const refreshToken = cookies['refresh_token'];
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token found' });

  const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken })
  const { session } = data

  if (error) return res.status(error.status ?? 400).json({ message: error.message ?? 'Error wwhen refresh token' })

  setHTTPOnlyCookie(res, [
    { name: 'access_token', value: session.access_token, expires: session.expires_in },
    { name: 'refresh_token', value: session.refresh_token, expires: 604800 },
  ])

  return res.status(200).json({ success: true, user: { id: data.user.id, ...data.user.user_metadata } })
});

router.get('/userinfo', async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end()
  const cookies = cookie.parse(req.headers.cookie || '');
  const access_token = cookies['access_token'];
  if (!access_token) {
    return res.status(401).json({ message: 'No access token found' });
  }
  // const resp = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${access_token}` },
  // })

  // if (!resp.ok) {
  //   return res.status(401).json({ error: resp.error_description || 'get user failed' })
  // }
  // const user = await resp.json()

  return res.status(200).json({ success: true })
});

/**
 * A serverless function send get access token request
 * It use PKCE method, with ServerCode, and Client Code
 * Main task: Set HTTPOnly Cookies

 * @param req 
 * @param res 
 * @returns 
 */

router.post('/pkce-token', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end()
  const supabasePKCE = createClient.createClient(
    process.env.AUTH_DOMAIN,
    process.env.AUTH_API_KEY,
    {
      auth: {
        flowType: 'pkce',
      }
    }
  );
  const { code, code_verifier } = req.body;

  if (!code || !code_verifier) {
    return res.status(400).json({ message: 'Missing code or code_verifier' });
  }
  const { data, error } = await supabasePKCE.auth.exchangeCodeForSession(code, code_verifier);

  if (error) {
    return res.status(error.status ?? 400).json({ message: error.message ?? 'Error' })
  }

  setHTTPOnlyCookie(res, [
    { name: 'access_token', value: data.session.access_token, expires: data.session.expires_in },
    { name: 'refresh_token', value: data.session.refresh_token, expires: 604800 },
  ])

  return res.status(200).json({ success: true, user: { id: data.user.id, ...data.user.user_metadata } })
});


module.exports = router;