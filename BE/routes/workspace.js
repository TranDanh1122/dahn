const express = require('express');
const router = express.Router();
router.post('/register', async (req, res) => {

    if (req.method !== 'POST') return res.status(405).end()
    const {email , password } = req.body
    const { data, error } = await supabase.auth.signUp({email , password});
  
    if (error) return res.status(error.status ?? 400).json(error.message ?? 'Error')
  
    const { error: otpError } = await supabase.auth.signInWithOtp({email})
  
    if (otpError) return res.status(otpError.status ?? 400).json(otpError.message ?? 'Error')
  
    // setHTTPOnlyCookie(res, [
    //   { name: 'access_token', value: data.session.access_token, expires: data.session.expires_in },
    //   { name: 'refresh_token', value: data.session.refresh_token, expires: 604800 }
    // ])
  
    return res.status(200).json({ success: true })
  });

  module.exports = router;