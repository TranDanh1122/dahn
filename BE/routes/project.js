const express = require('express');
const router = express.Router();


router.post('', async (req, res) => {
    try {
        const data = req.body
        const supabase = req.supabase;
        const { data: project, error: projectError } = await supabase
            .from('project')
            .insert({
                workspaceID: data.workspaceID,
                name: data.name,
                overview: data.overview,
                description: data.description,
                type: data.type,
                client: data.client,
                techstack: data.techstack,
                isCompleted: data.isCompleted
            })
            .select()
            .single();

        if (projectError) {
            throw new Error(`Error creating project: ${projectError.message}`);
        }

        const projectId = project.id;

        if (data.environment && data.environment.length > 0) {
            const environmentsData = data.environment.map(env => ({
                ...env,
                project_id: projectId
            }));

            const { error: envError } = await supabase
                .from('project_env')
                .insert(environmentsData);

            if (envError) {
                throw new Error(`Error creating environments: ${envError.message}`);
            }
        }

        if (data.milestones && data.milestones.length > 0) {
            const milestonesData = data.milestones.map(milestone => ({
                ...milestone,
                project_id: projectId,
                startDate: milestone.startDate,
                endDate: milestone.endDate
            }));

            const { error: milestoneError } = await supabase
                .from('milestone')
                .insert(milestonesData);

            if (milestoneError) {
                throw new Error(`Error creating milestones: ${milestoneError.message}`);
            }
        }

        if (data.role && data.role.length > 0) {

            const rolesData = data.role.map(role => ({
                id: role.id,
                name: role.name,
                project: role.project,
                milestone: role.milestone,
                folder: role.folder,
                project_id: projectId
            }));

            const { data: roles, error: roleError } = await supabase
                .from('project_role')
                .insert(rolesData).select();

            if (roleError) {
                throw new Error(`Error creating roles: ${roleError.message}`);
            }
            if (!roles || roles.length === 0) {
                throw new Error("No roles returned from insert");
            }
            if (data.members && data.members.length > 0) {
                await Promise.all(
                    roles.map(async (savedRole) => {
                        const membersData = data.members
                            .filter(el => el.roleId == savedRole.id)
                            .map(member => ({
                                userid: member.userid,
                                hourlyRate: member.hourlyRate,
                                hours: member.hours,
                                note: member.note,
                                project_id: projectId,
                                role_id: savedRole.id,
                            }));

                        const { error: memberError } = await supabase
                            .from('project_member')
                            .insert(membersData);

                        if (memberError) {
                            throw new Error(`Error creating members: ${memberError.message}`);
                        }
                    })
                )
            }
        }

        if (data.document && data.document.length > 0) {
            const documentsData = data.document.map(doc => ({
                name: doc.name,
                link: doc.link,
                note: doc.note,
                userid: doc.userid,
                project_id: projectId
            }));

            const { error: docError } = await supabase
                .from('project_document')
                .insert(documentsData);

            if (docError) {
                throw new Error(`Error creating documents: ${docError.message}`);
            }
        }

        if (data.communitation && data.communitation.length > 0) {
            const [id, ...com] = data.communitation
            const communicationsData = com.map(comm => ({
                ...comm,
                project_id: projectId
            }));

            const { error: commError } = await supabase
                .from('project_communitation')
                .insert(communicationsData);

            if (commError) {
                throw new Error(`Error creating communications: ${commError.message}`);
            }
        }

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: {
                project_id: projectId,
                project: project
            }
        });

    } catch (error) {
        console.error('Error creating project:', error);

        res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
});

router.get('/:projectId', async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed'
        });
    }
    if (!req.params.projectId) {
        return res.status(400).json({
            success: false,
            message: 'Project ID is required'
        });
    }
    try {
        const projectId = req.params.projectId;
        const supabase = req.supabase
        const { data: project, error: projectError } = await supabase
            .from("project")
            .select(`
                *,
                environment:project_env(*),
                milestones:milestone(*),
                members:project_member(*, user:users!project_member_userid_fkey(*), role:project_role!project_member_role_id_fkey(*)),
                role:project_role(*),
                document:project_document(* , user:users!project_document_userid_fkey(*)),
                communitation:project_communitation(*),
                workspace(* , owner:users!workspace_owner_fkey(*))
            `)
            .eq('id', projectId)
            .single();
        if (projectError) throw new Error(`Error fetching project: ${projectError.message}`);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Project fetched successfully',
            data: project
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
})

router.delete("/:projectId", async (req, res) => {
    if (req.method != "DELETE") return res.status(405).json({ success: false, message: "Method not allowed" })
    if (!req.params.projectId) return res.status(400).json({ success: false, message: 'Project ID is required' })
    try {
        const projectId = req.params.projectId;
        const supabase = req.supabase
        const { data: project, error } = await supabase
            .from('project')
            .delete()
            .eq('id', projectId)
            .select()
            .single()
        if (error) throw new Error(error.message)
        return res.status(200).json({ success: true, message: "Project deleted", data: project })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: e.message || "Internal server error"
        })
    }
})
const checkRole = async (req, asset, role) => {
    const projectId = req.params.projectId
    const supabase = req.supabase
    const user = req.user

    const { data: project, error: projectError } = await supabase
        .from("project")
        .select(`
                id,
                workspace:workspaceID ( owner )
            `)
        .eq("id", projectId)
        .single();


    if (projectError) throw new Error(projectError.message);

    const { data: member, error: memberError } = await supabase
        .from("project_member")
        .select(`
                userid,
                role:role_id ( project )
            `)
        .eq("project_id", projectId)
        .eq("userid", user.id)
        .maybeSingle();

    if (memberError) throw new Error(memberError.message);

    const isOwner = project?.workspace?.owner === user.id;

    const matchRole = member?.role?.[asset] === role;

    if (!isOwner && !matchRole) throw new Error("You dont have permission to edit this Project");
}
router.put("/:projectId/general", async (req, res) => {
    if (req.method != "PUT") return res.status(405).json({ success: false, message: "Method not allowed" })
    if (!req.params.projectId) return res.status(400).json({ success: false, message: "Project ID is required" })
    try {
        const projectId = req.params.projectId
        const supabase = req.supabase
        const data = req.body

        await checkRole(req, "project", "admin");

        const { data: updatedProject, error } = await supabase.from("project")
            .update(data)
            .select()
            .eq("id", projectId)
            .single();
        if (error) throw new Error(error.message)

        return res.status(200).json({ success: true, message: "Project Edited", data: updatedProject })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
})
module.exports = router