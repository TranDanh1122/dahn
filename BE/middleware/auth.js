const cookie = require('cookie')
const { createClient } = require('@supabase/supabase-js')

async function authMiddleware(req, res, next) {
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = cookies['access_token']
    if (!token) return res.status(401).json({ error: 'No token' })

    const supabase = createClient(process.env.AUTH_DOMAIN, process.env.AUTH_API_KEY, {
        global: { headers: { Authorization: `Bearer ${token}` } },
    })
    req.supabase = supabase
    const { data: { user : authUser }, error: authError } = await supabase.auth.getUser()
    if (authError || !authUser) {
        return res.status(401).json({ error: 'Invalid user' })
    }
    const { data : [user], error } = await supabase.from("users").select().eq("user_id", authUser.id)
    if (error || !user) {
        return res.status(401).json({ error: 'Invalid user' })
    }
    req.user = user

    next()
}

module.exports = authMiddleware