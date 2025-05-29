const express = require('express');
const router = express.Router();


/**
 * Again, im not backend dev, so you beter not use this code in production
 */



router.post('/', async (req, res) => {

  if (req.method !== 'POST') return res.status(405).end()
  const supabase = req.supabase
  const user = req.user
  const { name, description, members } = req.body
  const { data, error } = await supabase.from('workspace').insert({
    name,
    description,
    owner: user.id
  }).select()

  if (error) return res.status(error.status ?? 400).json(error.message ?? 'Error when trying to create workspace')

  const memberData = members.filter(el => el.id)
  if (memberData && memberData.length > 0) {
    // Insert members into workspace_invited table
    const memberData = members.map(member => {
      return {
        workspace: data[0].id,
        users: member.id
      }

    })
    const { error: memberError } = await supabase.from('workspace_invited').insert(memberData)
    if (memberError) return res.status(memberError.status ?? 400).json(memberError.message ?? 'Error')
  }
  return res.status(200).json({ success: true, workspace: data.workspaces })
});

router.get("/", async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end()
  const supabase = req.supabase
  const user = req.user
  const { data, error } = await supabase.from('workspace').select().eq("owner", user.id).limit(3)
  if (error) return res.status(error?.status ?? 400).json(error?.message ?? "Error when try to fetch workspace")
  return res.status(200).json({ success: true, data: data })
})

router.delete("/:id", async (req, res) => {
  if (req.method != "DELETE") return res.status(405).end()
  const supabase = req.supabase
  const user = req.user
  const id = req.params.id
  const { data, error } = await supabase.from('workspace').delete().eq('id', id)
  if (error) return res.status(error?.status ?? 400).json(error?.message ?? "Error when try to delete workspace")
  return res.status(200).json({ success: true, data })

})
module.exports = router;