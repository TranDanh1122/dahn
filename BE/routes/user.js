const express = require('express');
const router = express.Router();


/**
 * Again, im not backend dev, so you beter not use this code in production
 */



router.post('/search', async (req, res) => {

    if (req.method !== 'GET') return res.status(405).end()
    const supabase = req.supabase
    const { search, workspace } = req.body
    if (workspace) {
        const { data, error } = await supabase.from('workspace_members')
            .select(
            `joined_at,
             users(id, email, full_name, avatar_url)`)
            .eq("workspace", workspace)
            .ilike('users.email', `%${search}%`)
        if (error) return res.status(error.status ?? 400).json(error.message ?? 'Error')
        return res.status(200).json({ success: true, users: data })
    } else {
        const { data, error } = await supabase.from('users')
            .select('*')
            .ilike('email', `%${search}%`)
        if (error) return res.status(error.status ?? 400).json(error.message ?? 'Error')
        return res.status(200).json({ success: true, users: data })
    }
    
});

module.exports = router;