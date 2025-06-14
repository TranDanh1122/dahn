const express = require('express');
const router = express.Router();


router.post('', async (req, res) => {
    try {
        const data = req.body
        const supabase = req.supabase;
        const { data: project, error: projectError } = await supabase
            .from('project')
            .insert({
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
                name: role.name,
                permission: {
                    project: role.project,
                    milestone: role.milestone,
                    folder: role.folder
                },
                project_id: projectId
            }));

            const { data: roles, error: roleError } = await supabase
                .from('project_role')
                .insert(rolesData).select();

            if (roleError) {
                throw new Error(`Error creating roles: ${roleError.message}`);
            }
            if (data.members && data.members.length > 0) {
                roles.forEach(async (savedRole) => {
                    const membersData = data.members
                    .filter(el => el.role == savedRole.name)
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

module.exports = router