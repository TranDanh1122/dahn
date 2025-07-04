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
  // Kiểm tra phương thức
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const supabase = req.supabase;
  const user = req.user;
  const { name, description, members } = req.body;

  // Kiểm tra đầu vào
  if (!name) {
    return res.status(400).json({ message: 'Name are required' });
  }

  let membersArr = [];
  try {
    if (members) {
      membersArr = JSON.parse(members);
      membersArr = membersArr.filter(el => el.id)
      if (!Array.isArray(membersArr)) throw new Error('Members must be an array');
      if (membersArr.some(el => !el.id || !el.email || !el.avg_salary)) {
        throw new Error('Each member must have id, email, and avg_salary');
      }
    }
  } catch (e) {
    return res.status(400).json({ message: `Invalid members format: ${e.message}` });
  }

  // Kiểm tra giới hạn workspace
  const { data: oldWorkspaces, error: gError } = await supabase
    .from('workspace')
    .select()
    .eq('owner', user.id);
  if (gError) {
    console.error('Error checking workspace limit:', gError);
    return res.status(gError.status ?? 400).json({ message: gError.message ?? 'Error checking workspace limit' });
  }
  if (oldWorkspaces.length > 2) {
    return res.status(400).json({ message: 'Workspace limit per account is 3 due to free-tier database storage limits' });
  }

  // Tạo workspace
  const { data: workspace, error: insertError } = await supabase
    .from('workspace')
    .insert({ name, description, owner: user.id })
    .select()
    .single();
  if (insertError || !workspace) {
    console.error('Error creating workspace:', insertError);
    return res.status(insertError?.status ?? 400).json({ message: insertError?.message ?? 'Error creating workspace' });
  }
  console.log('Created workspace:', workspace);

  // Xử lý thành viên
  if (membersArr.length > 0) {
    const memberData = membersArr.map(member => ({
      workspace: workspace.id,
      users: member.id,
      email: member.email,
      avg_salary: member.avg_salary,
    }));

    const { error: memberError } = await supabase.from('workspace_invited').insert(memberData);
    if (memberError) {
      console.error('Error adding members:', memberError);
      return res.status(memberError.status ?? 400).json({ message: memberError.message ?? 'Error adding members' });
    }

    for (const member of membersArr) {
      try {
        const token = jwt.sign(
          {
            salary: member.avg_salary,
            user: member.id,
            workspace: workspace.id,
            type: 'invite',
          },
          process.env.AUTH_SECRET_KEY,
          { expiresIn: '3d' }
        );
        await sendMail({
          to: member.email,
          subject: 'Dahn',
          html: `${user.full_name || user.email} invited you to join their workspace. Average pay: $${member.avg_salary}/h. <a href="${process.env.FE_DOMAIN}/workspace/invite-accepted?token=${token}">Click here (expires in 3 days)</a>`,
        });
      } catch (e) {
        console.error(`Error sending email to ${member.email}:`, e);
        // Tiếp tục với email khác
      }
    }
  }

  // Xử lý upload ảnh
  if (req.file) {
    try {
      const [result] = await uploadToCloudinary(req.file.path);
      if (!result?.url) throw new Error('Invalid Cloudinary URL');
      console.log('Cloudinary result:', result);

      const { data: updatedWorkspace, error: updateError } = await supabase
        .from('workspace')
        .update({ image: result.url, tiny: result.tiny || "", thumbnail: result.thumnail || "" })
        .eq('id', workspace.id)
        .eq('owner', user.id) // Đảm bảo quyền
        .select()
        .single();
      if (updateError || !updatedWorkspace) {
        console.error('Error updating workspace image:', updateError, 'Workspace ID:', workspace.id);
        return res.status(updateError?.status ?? 400).json({
          message: updateError?.message ?? 'Error updating workspace image',
        });
      }
      console.log('Updated workspace:', updatedWorkspace);
      return res.status(200).json({ success: true, workspace: updatedWorkspace });
    } catch (e) {
      console.error('Error uploading image:', e);
      return res.status(400).json({ message: e.message ?? 'Error uploading image' });
    }
  }

  return res.status(200).json({ success: true, workspace });
});

router.get("/", async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end()
  const supabase = req.supabase
  const user = req.user
  const { data, error } = await supabase.from('workspace').select().eq("owner", user.id).limit(3)
  if (error) return res.status(error?.status ?? 400).json({ message: error?.message ?? "Error when try to fetch workspace" })
  return res.status(200).json({ success: true, data: data })
})

router.delete("/:id", async (req, res) => {
  if (req.method != "DELETE") return res.status(405).end()
  const supabase = req.supabase
  const user = req.user
  const id = req.params.id
  const { data, error } = await supabase.from('workspace').delete().eq('id', id).select().single()
  if (data.image) await deleteFromCloudinary(data.image);
  if (error) return res.status(error?.status ?? 400).json({ message: error?.message ?? "Error when try to delete workspace" })
  return res.status(200).json({ success: true, data })

})
router.post("/accepted", async (req, res) => {
  if (req.method != "POST") return res.status(405).end()
  const supabase = req.supabase
  const user = req.user
  const { token } = req.body
  try {
    const decode = jwt.verify(token, process.env.AUTH_SECRET_KEY)
    if (decode.type !== "invite") return res.status(400).json({ message: "Token type not correct" })
    const { workspace, user, salary } = decode

    const { data: oInvite, error: oError } = await supabase.from("workspace_invited").select().eq("workspace", workspace).eq("users", user).eq("accepted", true)
    if (oError) return res.status(oError.status || 400).json({ message: oError.message || "Error when try to check history" })
    if (oInvite.length > 0) return res.status(400).json({ message: "You have been accepted this invited" })

    const { error: iError } = await supabase.from("workspace_members")
      .insert({ user, workspace, avg_salary: salary }).select()
    if (iError) return res.status(iError.status ?? 400).json({ message: iError.message ?? "Error when try to add new members" })

    const { error: uError } = await supabase.from("workspace_invited").update({ accepted: true }).eq("workspace", workspace).eq("users", user)
    if (uError) return res.status(uError.status || 400).json({ message: uError.message || "Update Invite Status Error" })

    const { data, error } = await supabase.from("workspace").select().eq("id", workspace).single()
    if (error) return res.status(error.status || 400).json({ message: error.message || "Error when try to get workspace" })

    return res.status(200).json({ success: true, data })
  } catch (e) {
    return res.status(400).json({ message: "Expired token!" })
  }
})

router.get("/:id", async (req, res) => {
  if (req.method != "GET") return res.status(405).end()
  const supabase = req.supabase
  const id = req.params.id
  const { data, error } = await supabase.from("workspace").select("*, workspace_members(* , users (id , full_name, email))").eq("id", id).single()
  if (error) return res.status(error.status || 400).json({ message: error.message || "Error when try to get data" })
  return res.status(200).json(data)
})

router.put("/:id", upload.single("thumbnail"), async (req, res) => {
  // Kiểm tra phương thức
  if (req.method !== "PUT") return res.status(405).json({ message: "Method not allowed" });

  const supabase = req.supabase;
  const user = req.user;
  const id = req.params.id;
  const { name, description, thumbnail: image, members } = req.body;

  // Kiểm tra đầu vào
  if (!id) return res.status(400).json({ message: "Workspace ID is required" });
  if (!name) return res.status(400).json({ message: "Name and description are required" });

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
    return res.status(400).json({ message: `Invalid members format: ${e.message}` });
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
      message: oError?.message ?? "Workspace not found or you lack permission",
    });
  }

  // Xử lý upload ảnh
  let updateData = { name, description, image, thumbnail: "", tiny: "" };
  if (req.file) {
    try {
      const [result] = await uploadToCloudinary(req.file.path);
      console.log("Cloudinary result:", result);
      if (!result?.url) throw new Error("Invalid Cloudinary URL");
      updateData.image = result.url;
      updateData.tiny = result.tiny
      updateData.thumbnail = result.thumnail

      if (oldWorkspace.image) {
        console.log(1)
        await deleteFromCloudinary(oldWorkspace.image);
      }
    } catch (e) {
      console.error("Error uploading image:", e);
      return res.status(400).json({ message: e.message ?? "Error uploading image" });
    }
  } else if (!image) {
    updateData.image = ""
    updateData.thumbnail = ""
    updateData.tiny = ""
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
      message: updateError?.message ?? "Error updating workspace",
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
        message: iError.message ?? "Error adding new members",
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



router.get('/:workspaceID/projects', async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  try {
    const supabase = req.supabase;
    const workspaceID = req.params.workspaceID
    const { data: projects, pError } = await supabase.from("project").select().eq("workspaceID", workspaceID)
    if (pError) throw new Error(pError.message)
    return res.status(200).json({
      data: projects
    })
  } catch (error) {
    console.error('Error creating project:', error);

    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
})
module.exports = router;