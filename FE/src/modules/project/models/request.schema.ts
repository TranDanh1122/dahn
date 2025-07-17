import { z } from "zod"
/**
 * Why we need so many fields???
 * Because it is all information new dev need when onboaring
 * A ton of excel/doc? No god, please! no! no!
 */
export const ProjectSchema = z.object({
    id: z.coerce.string().optional(),
    workspaceID: z.coerce.string().min(1),
    name: z.coerce.string().min(3).max(50),
    overview: z.coerce.string().min(1).max(450),
    description: z.coerce.string().max(1000).optional(),
    type: z.coerce.string(),
    client: z.coerce.string().max(100).optional(),
    techstack: z.coerce.string(),
    environment: z.array(z.object({
        id: z.coerce.string().optional(),
        name: z.coerce.string().min(1).max(50),
        demoUrl: z.coerce.string().min(1),
        status: z.coerce.string().min(1),
        readme: z.coerce.string().min(1),
        note: z.coerce.string().max(450),
        created_at: z.coerce.string().optional()
    })).optional(),
    milestones: z.array(z.object({
        id: z.coerce.string().optional(),
        name: z.coerce.string().min(3).max(50),
        description: z.coerce.string().max(450),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
        duration: z.coerce.number(),
        process: z.coerce.number().min(0).max(100),
        status: z.coerce.string()
    })).optional(),
    role: z.array(z.object({
        id: z.coerce.string().optional(),
        name: z.coerce.string().max(50),
        project: z.coerce.string(),
        milestone: z.coerce.string(),
        folder: z.coerce.string()
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
        role: z.object({
            id: z.coerce.string().optional(),
            name: z.coerce.string().max(50),
        }).optional(),
        roleId: z.coerce.string(),
        hourlyRate: z.coerce.number().nonnegative(),
        hours: z.coerce.number().nonnegative(),
        note: z.coerce.string().max(450).optional()
    })),
    document: z.array(z.object({
        id: z.coerce.string().optional(),
        name: z.coerce.string().min(1).max(50),
        link: z.coerce.string().min(1).max(50),
        note: z.coerce.string().min(1).max(450),
        userid: z.coerce.number(),
        status: z.coerce.string(),
        user: z.object({
            id: z.coerce.string().min(1),
            full_name: z.coerce.string(),
            email: z.coerce.string(),
            avatar_url: z.coerce.string()
        }),
    })).optional(),
    communitation: z.array(z.object({
        id: z.coerce.string().optional(),
        channel: z.coerce.string().min(1).max(50),
        link: z.coerce.string().min(1).max(50),
        meeting: z.coerce.string(),
        meetingCustom: z.coerce.string().optional(),
        schedule: z.coerce.string()
    })).optional(),
    isCompleted: z.boolean()
})

export const step1Schema = z.object({
    id: z.coerce.string().optional(),
    workspaceID: z.coerce.string().min(1),
    name: z.coerce.string().min(3).max(50),
    overview: z.coerce.string().min(1).max(450),
    description: z.coerce.string().max(1000).optional(),
    type: z.coerce.string(),
    client: z.coerce.string().max(100).optional(),
    techstack: z.coerce.string(),
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
    name: z.coerce.string().min(1).max(50),
    demoUrl: z.coerce.string().min(1).max(450),
    status: z.coerce.string().min(1),
    readme: z.coerce.string().min(1).max(450),
    note: z.coerce.string().max(450)
})

export type EnvData = z.infer<typeof envSchema>
export const milestoneSchema = z.object({
    id: z.coerce.string().optional(),
    name: z.coerce.string().min(3).max(30),
    description: z.coerce.string().max(450),
    startDate: z.coerce.string(),
    endDate: z.coerce.string(),
    duration: z.coerce.number(),
    process: z.coerce.number().min(0).max(100),
    status: z.coerce.string()
})
export interface MilestoneData extends Omit<z.infer<typeof milestoneSchema>, "startDate" | "endDate"> {
    startDate: Date | string,
    endDate: Date | string
}

export const memberSchema = z.object({
    id: z.coerce.string().optional(),
    userid: z.coerce.string(),
    user: z.object({
        id: z.coerce.string().min(1),
        full_name: z.coerce.string(),
        email: z.coerce.string(),
        avatar_url: z.coerce.string()
    }),
    role: z.object({
        id: z.coerce.string().optional(),
        name: z.coerce.string().max(50),
    }).optional(),
    roleId: z.coerce.string().min(1),
    hourlyRate: z.coerce.number().nonnegative(),
    hours: z.coerce.number().nonnegative(),
    note: z.coerce.string().max(450).optional()
})
export type MemberData = z.infer<typeof memberSchema>
export const roleSchema = z.object({
    id: z.coerce.string().optional(),
    name: z.coerce.string().min(1).max(50),
    project: z.coerce.string(),
    milestone: z.coerce.string(),
    folder: z.coerce.string()
})
export type RoleData = z.infer<typeof roleSchema>
export const documentSchema = z.object({
    id: z.coerce.string().optional(),
    name: z.coerce.string().min(1).max(50),
    link: z.coerce.string().min(1).max(450),
    status: z.coerce.string(),
    userid: z.coerce.number(),
    user: z.object({
        id: z.coerce.string().min(1),
        full_name: z.coerce.string(),
        email: z.coerce.string(),
        avatar_url: z.coerce.string()
    }),
    note: z.coerce.string().min(1).max(450).optional(),
})

export type DocumentData = z.infer<typeof documentSchema>

export const communitationSchema = z.object({
    id: z.coerce.string().optional(),
    channel: z.coerce.string().min(1).max(50),
    link: z.coerce.string().min(1).max(450),
    meeting: z.coerce.string(),
    meetingCustom: z.coerce.string().optional(),
    schedule: z.coerce.string().optional(),
    note: z.coerce.string().min(1).max(450).optional()
}).refine((value) => {
    if (value.meeting == "custom")
        return !(!value.meetingCustom)
    return true
}, {
    path: ["meetingCustom"]
})

export type CommunitationData = z.infer<typeof communitationSchema>
