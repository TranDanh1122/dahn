import { z } from "zod"
/**
 * Why we need so many fields???
 * Because it is all information new dev need when onboaring
 * A ton of excel/doc? No god, please! no! no!
 */
export const ProjectSchema = z.object({
    workspaceID: z.coerce.string().min(1),
    name: z.coerce.string().min(3).max(50),
    overview: z.coerce.string().min(1).max(150),
    description: z.coerce.string().max(300).optional(),
    type: z.coerce.string(),
    client: z.coerce.string().optional(),
    techstack: z.coerce.string(),
    environment: z.array(z.object({
        id: z.coerce.string().optional(),
        name: z.coerce.string().min(1),
        demoUrl: z.coerce.string().min(1),
        status: z.coerce.string().min(1),
        readme: z.coerce.string().min(1),
        note: z.coerce.string()
    })).optional(),
    milestones: z.array(z.object({
        id: z.coerce.string().optional(),
        name: z.coerce.string().min(3).max(30),
        description: z.coerce.string(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
        duration: z.coerce.number(),
        process: z.coerce.number().min(0).max(100),
        status: z.coerce.string()
    })).optional(),
    role: z.array(z.object({
        id: z.coerce.string().optional(),
        name: z.coerce.string(),
        permission: z.coerce.string()
    })),
    members: z.array(z.object({
        id: z.coerce.string().optional(),
        userid: z.coerce.string(),
        user: z.object({
            id: z.coerce.string().min(1),
            full_name: z.coerce.string(),
            email: z.coerce.string(),
            avatar_url: z.coerce.string()
        }),
        role: z.coerce.string().min(1),
        hourlyRate: z.coerce.number().nonnegative(),
        hours: z.coerce.number().nonnegative(),
        note: z.coerce.string().optional()
    })),
    document: z.array(z.object({
        id: z.coerce.string().optional(),
        name: z.coerce.string(),
        link: z.coerce.string(),
        note: z.coerce.string(),
        userid: z.coerce.number(),
        user: z.object({
            id: z.coerce.string().min(1),
            full_name: z.coerce.string(),
            email: z.coerce.string(),
            avatar_url: z.coerce.string()
        }),
    })).optional(),
    communitation: z.array(z.object({
        id: z.coerce.string().optional(),
        channel: z.coerce.string(),
        link: z.coerce.string(),
        meeting: z.coerce.string(),
        meetingCustom: z.coerce.string().optional(),
        schedule: z.coerce.string()
    })).optional(),
    isCompleted: z.boolean()
})
export type ProjectData = z.infer<typeof ProjectSchema>
export const initData: ProjectData = {
    workspaceID: "",
    name: "",
    overview: "",
    techstack: "",
    type: "web_app",
    role: [],
    members: [],
    isCompleted: false
}
export const envSchema = z.object({
    id: z.coerce.string().optional(),
    name: z.coerce.string().min(1),
    demoUrl: z.coerce.string().min(1),
    status: z.coerce.string().min(1),
    readme: z.coerce.string().min(1),
    note: z.coerce.string()
})
export const milestoneSchema = z.object({
    id: z.coerce.string().optional(),
    name: z.coerce.string().min(3).max(30),
    description: z.coerce.string(),
    startDate: z.coerce.string(),
    endDate: z.coerce.string(),
    duration: z.coerce.number(),
    process: z.coerce.number().min(0).max(100),
    status: z.coerce.string()
})

export const memberSchema = z.object({
    id: z.coerce.string().optional(),
    userid: z.coerce.string(),
    user: z.object({
        id: z.coerce.string().min(1),
        full_name: z.coerce.string(),
        email: z.coerce.string(),
        avatar_url: z.coerce.string()
    }),
    role: z.coerce.string().min(1),
    hourlyRate: z.coerce.number().nonnegative(),
    hours: z.coerce.number().nonnegative(),
    note: z.coerce.string().optional()
})
export const roleSchema = z.object({
    id: z.coerce.string().optional(),
    name: z.coerce.string().min(1),
    permission: z.coerce.string().optional(),
    project: z.coerce.string(),
    milestone: z.coerce.string(),
    folder: z.coerce.string()
})

export const documentSchema = z.object({
    id: z.coerce.string().optional(),
    name: z.coerce.string(),
    link: z.coerce.string(),
    status: z.coerce.string(),
    userid: z.coerce.number(),
    user: z.object({
        id: z.coerce.string().min(1),
        full_name: z.coerce.string(),
        email: z.coerce.string(),
        avatar_url: z.coerce.string()
    }),
    note: z.coerce.string().optional(),
})

export const communitationSchema = z.object({
    id: z.coerce.string().optional(),
    channel: z.coerce.string(),
    link: z.coerce.string(),
    meeting: z.coerce.string(),
    meetingCustom: z.coerce.string().optional(),
    schedule: z.coerce.string().optional(),
    note: z.coerce.string().optional()
}).refine((value) => {
    if (value.meeting == "custom")
        return !(!value.meetingCustom)
    return true
}, {
    path: ["meetingCustom"]
})
export const roleSchemaInitData: z.infer<typeof roleSchema> = {
    name: "",
    permission: `{
        projects : 'admin',
        milestones : 'admin',
        statuses: 'admin', 
    }`,
    project: "admin",
    milestone: "admin",
    folder: "admin"
}