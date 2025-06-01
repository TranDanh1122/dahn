const express = require('express');
const router = express.Router();
const sendMail = require('../utls/sendmail')
const jwt = require("jsonwebtoken")
/**
 * Again, im not backend dev, so you beter not use this code in production
 */
const upload = require("../middleware/upload");
const { uploadToCloudinary, deleteFromCloudinary } = require('../utls/upload');


router.post('/', upload.single("thumbnail"), async (req, res) => {

  if (req.method !== 'POST') return res.status(405).end()
  const supabase = req.supabase
  const user = req.user
  const { name, description, members } = req.body

  const { data: oldWorkspaces, error: gError } = await supabase.from("workspace").select().eq("owner", user.id)
  if (gError) return res.status(gError.status ?? 400).json(gError.message ?? 'Error when trying to create workspace')
  if (oldWorkspaces.length > 2) return res.status(400).json("Workspace limit per account is 3 due to free-tier database storage limits")

  const { data, error } = await supabase.from('workspace').insert({
    name,
    description,
    owner: user.id
  }).select().single()

  if (error) return res.status(error.status ?? 400).json(error.message ?? 'Error when trying to create workspace')
  const membersArr = JSON.parse(members)
  const memberData = membersArr.filter(el => el.id)
  if (memberData && memberData.length > 0) {
    // Insert members into workspace_invited table
    const memberData = membersArr.map(member => {
      return {
        workspace: data.id,
        users: member.id
      }

    })
    const { error: memberError } = await supabase.from('workspace_invited').insert(memberData)
    if (memberError) return res.status(memberError.status ?? 400).json(memberError.message ?? 'Error')

    membersArr.forEach(el => {
      const token = jwt.sign({
        salary: el.avg_salary,
        user: el.id,
        workspace: data.id,
        type: "invite"
      }, process.env.AUTH_SECRET_KEY, { expiresIn: '3d' })
      sendMail({
        to: el.email,
        subject: 'Dahn',
        html: `${user.full_name || user.email} invited you to join their workspace. Average pay: $${el.avg_salary}/h. <a href="${process.env.FE_DOMAIN}/workspace/invite-accepted?token=${token}">Click here (expired in 3 day)</a>`
      })
    })
  }
  try {
    const file = req.file.path
    const [result] = await uploadToCloudinary(file)

    const { data: workspace, error: uError } = await supabase
      .from("workspace")
      .update({ image: result.url })
      .eq("id", data.id)
      .select()
      .single();
    return res.status(200).json({ success: true, workspace })

  }
  catch (e) {
    return res.status(400).json(e.message ?? 'Error when upload image')
  }

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
  const { data, error } = await supabase.from('workspace').delete().eq('id', id).single()
  if (error) return res.status(error?.status ?? 400).json(error?.message ?? "Error when try to delete workspace")
  return res.status(200).json({ success: true, data })

})
router.post("/accepted", async (req, res) => {
  if (req.method != "POST") return res.status(405).end()
  const supabase = req.supabase
  const user = req.user
  const { token } = req.body
  try {
    const decode = jwt.verify(token, process.env.AUTH_SECRET_KEY)
    if (decode.type !== "invite") return res.status(400).json("Token type not correct")
    const { workspace, user, salary } = decode

    const { data: oInvite, error: oError } = await supabase.from("workspace_invited").select().eq("workspace", workspace).eq("users", user).eq("accepted", true)
    if (oError) return res.status(oError.status || 400).json(oError.message || "Error when try to check history")
    if (oInvite.length > 0) return res.status(400).json("You have been accepted this invited")

    const { error: iError } = await supabase.from("workspace_members")
      .insert({ user, workspace, avg_salary: salary }).select()
    if (iError) return res.status(iError.status ?? 400).json(iError.message ?? "Error when try to add new members")

    const { error: uError } = await supabase.from("workspace_invited").update({ accepted: true }).eq("workspace", workspace).eq("users", user)
    if (uError) return res.status(uError.status || 400).json(uError.message || "Update Invite Status Error")

    const { data, error } = await supabase.from("workspace").select().eq("id", workspace).single()
    if (error) return res.status(error.status || 400).json(error.message || "Error when try to get workspace")

    return res.status(200).json({ success: true, data })
  } catch (e) {
    return res.status(400).json("Expired token!")
  }
})

router.get("/:id", async (req, res) => {
  if (req.method != "GET") return res.status(405).end()
  const supabase = req.supabase
  const id = req.params.id
  const { data, error } = await supabase.from("workspace").select("*, workspace_members(* , users (id , full_name, email))").eq("id", id).single()
  if (error) return res.status(error.status || 400).json(error.message || "Error when try to get data")
  return res.status(200).json(data)
})

router.put("/:id", upload.single("thumbnail"), async (req, res) => {
  // Kiểm tra phương thức
  if (req.method !== "PUT") return res.status(405).json({ error: "Method not allowed" });

  const supabase = req.supabase;
  const user = req.user;
  const id = req.params.id;
  const { name, description, thumbnail: image, members } = req.body;

  // Kiểm tra đầu vào
  if (!id) return res.status(400).json({ error: "Workspace ID is required" });
  if (!name) return res.status(400).json({ error: "Name and description are required" });

  let membersArr = [];
  try {
    if (members) {
      membersArr = JSON.parse(members);
      if (!Array.isArray(membersArr)) throw new Error("Members must be an array");
      if (membersArr.some(el => !el.id || !el.email || !el.avg_salary)) {
        throw new Error("Each member must have id, email, and avg_salary");
      }
    }
  } catch (e) {
    return res.status(400).json({ error: `Invalid members format: ${e.message}` });
  }

  // Kiểm tra workspace tồn tại và quyền
  const { data: oldWorkspace, error: oError } = await supabase
    .from("workspace")
    .select("*, workspace_members(*)")
    .eq("id", id)
    .eq("owner", user.id) // Đảm bảo user là owner
    .single();
  if (oError || !oldWorkspace) {
    console.error("Error fetching workspace:", oError);
    return res.status(oError?.status ?? 404).json({
      error: oError?.message ?? "Workspace not found or you lack permission",
    });
  }

  // Xử lý upload ảnh
  let updateData = { name, description, image };
  if (req.file) {
    try {
      const result = await uploadToCloudinary(req.file.path);
      console.log("Cloudinary result:", result);
      if (!result?.url) throw new Error("Invalid Cloudinary URL");
      updateData.image = result.url;
      if (oldWorkspace.image) {
        await deleteFromCloudinary(oldWorkspace.image);
      }
    } catch (e) {
      console.error("Error uploading image:", e);
      return res.status(400).json({ error: e.message ?? "Error uploading image" });
    }
  } else if (!image) {
    updateData.image = ""
    if (oldWorkspace.image) {
      try {
        await deleteFromCloudinary(oldWorkspace.image);
      } catch (e) {
        console.error("Error deleting old image:", e);
      }
    }
  }

  // Cập nhật workspace
  const { data: workspace, error: updateError } = await supabase
    .from("workspace")
    .update(updateData)
    .eq("id", id)
    .eq("owner", user.id) // Đảm bảo user là owner
    .select("*, workspace_members(*)")
    .single();
  if (updateError || !workspace) {
    console.error("Error updating workspace:", updateError, "Workspace ID:", id);
    return res.status(updateError?.status ?? 400).json({
      error: updateError?.message ?? "Error updating workspace",
    });
  }
  console.log("Updated workspace:", workspace);

  // Xử lý thành viên
  const existMembers = workspace.workspace_members || [];
  const memberData = membersArr.map(member => ({
    workspace: workspace.id,
    users: member.id,
    avg_salary: member.avg_salary,
    email: member.email,
  }));
  const newMembers = memberData.filter(
    el => !existMembers.some(e => e.users === el.users)
  );
  const updatedOldMember = memberData.filter(el =>
    existMembers.some(e => e.users === el.users && e.avg_salary !== el.avg_salary)
  );
  const deletedMembers = existMembers.filter(
    el => !memberData.some(e => e.users === el.users)
  );

  // Xóa thành viên
  for (const el of deletedMembers) {
    try {
      const { error: dError } = await supabase
        .from("workspace_members")
        .delete()
        .eq("users", el.users)
        .eq("workspace", el.workspace);
      if (dError) throw new Error(dError.message);

      const { error: diError } = await supabase
        .from("workspace_invited")
        .delete()
        .eq("users", el.users)
        .eq("workspace", el.workspace);
      if (diError) throw new Error(diError.message);

      await sendMail({
        to: el.email,
        subject: "Dahn",
        html: `${user.full_name || user.email} removed you from ${workspace.name}`,
      });
    } catch (e) {
      console.error(`Error processing deleted member ${el.users}:`, e);
    }
  }

  // Thêm thành viên mới
  if (newMembers.length > 0) {
    const { error: iError } = await supabase.from("workspace_invited").insert(newMembers);
    if (iError) {
      console.error("Error adding new members:", iError);
      return res.status(iError.status ?? 400).json({
        error: iError.message ?? "Error adding new members",
      });
    }

    for (const el of newMembers) {
      try {
        const token = jwt.sign(
          {
            salary: el.avg_salary,
            user: el.users,
            workspace: workspace.id,
            type: "invite",
          },
          process.env.AUTH_SECRET_KEY,
          { expiresIn: "3d" }
        );
        await sendMail({
          to: el.email,
          subject: "Dahn",
          html: `${user.full_name || user.email} invited you to join their workspace - ${workspace.name}. Average pay: $${el.avg_salary}/h. <a href="${process.env.FE_DOMAIN}/workspace/invite-accepted?token=${token}">Click here (expires in 3 days)</a>`,
        });
      } catch (e) {
        console.error(`Error sending invite to ${el.email}:`, e);
        // Tiếp tục với các email khác
      }
    }
  }

  // Cập nhật thành viên cũ
  for (const el of updatedOldMember) {
    try {
      const { error: omError } = await supabase
        .from("workspace_members")
        .update({ avg_salary: el.avg_salary })
        .eq("users", el.users)
        .eq("workspace", el.workspace);
      if (omError) throw new Error(omError.message);

      await sendMail({
        to: el.email,
        subject: "Dahn",
        html: `${user.full_name || user.email} updated your salary in their project - ${workspace.name}. Average pay: $${el.avg_salary}/h.`,
      });
    } catch (e) {
      console.error(`Error updating member ${el.users}:`, e);
    }
  }

  return res.status(200).json({ success: true, workspace });
});
module.exports = router;