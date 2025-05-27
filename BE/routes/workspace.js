const express = require('express');
const router = express.Router();


/**
 * Again, im not backend dev, so you beter not use this code in production
 */



router.post('/create-workspace', async (req, res) => {

  if (req.method !== 'POST') return res.status(405).end()
  const supabase = req.supabase
  const user = req.user
  const { email, description, members } = req.body
  const { data, error } = await supabase.from('workspaces').insert({
    name: email,
    description: description,
    owner_id: user.id
  }).select()

  if (error) return res.status(error.status ?? 400).json(error.message ?? 'Error')

  if (members && members.length > 0) {
    // Insert members into workspace_invited table
    const memberData = members.map(member => {
      return {
        workspace: data[0].id,
        user_id: member.id
      }

    })
    const { error: memberError } = await supabase.from('workspace_invited').insert(memberData)
    if (memberError) return res.status(memberError.status ?? 400).json(memberError.message ?? 'Error')
  }

  return res.status(200).json({ success: true, workspace: data })
});

module.exports = router;