import { z } from "zod"
/**
 * Why we need so many fields???
 * Because it is all information new dev need when onboaring
 * A ton of excel/doc? No god, please! no! no!
 */
export const ProjectSchema = z.object({
    name: z.coerce.string().min(3).max(50),
    overview: z.coerce.string().min(1),
    description: z.coerce.string().optional(),
    type: z.coerce.string(),
    client: z.coerce.string().optional(),
    techstack: z.coerce.string(),
    environment: z.array(z.object({
        name: z.coerce.string(),
        demoUrl: z.coerce.string(),
        status: z.coerce.string()
    })).optional(),
    milestones: z.array(z.object({
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
        userId: z.coerce.string(),
        name: z.coerce.string(),
        role: z.coerce.string(),
        roleId: z.coerce.string().optional(),
        hourlyRate: z.coerce.number().nonnegative(),
        hours: z.coerce.number()
    })),
    document: z.array(z.object({
        name: z.coerce.string(),
        link: z.coerce.string()
    })).optional(),
    communitation: z.array(z.object({
        channel: z.coerce.string(),
        link: z.coerce.string(),
        meeting: z.enum(["daily", "weekly", "monthly", "custom"]),
        schedule: z.coerce.string()
    })).optional(),
    isCompleted: z.boolean()
})
export const initData: z.infer<typeof ProjectSchema> = {
    name: "",
    overview: "",
    techstack: "",
    type: "web_app",
    role: [],
    members: [],
    isCompleted: false
}
export const milestoneSchema = z.object({
    name: z.coerce.string().min(3).max(30),
    description: z.coerce.string(),
    startDate: z.coerce.string(),
    endDate: z.coerce.string(),
    duration: z.coerce.number(),
    process: z.coerce.number().min(0).max(100),
    status: z.coerce.string()
})

export const memberSchema = z.object({
    userId: z.coerce.string(),
    name: z.coerce.string(),
    role: z.coerce.string(),
    roleId: z.coerce.string().optional(),
    hourlyRate: z.coerce.number().nonnegative(),
    hours: z.coerce.number()
})
export const roleSchema = z.object({
    id: z.coerce.string().optional(),
    name: z.coerce.string(),
    permission: z.coerce.string()
})
export const roleSchemaInitData: z.infer<typeof roleSchema> = {
    name: "",
    permission: `{
        projects : 'admin',
        milestones : 'admin',
        statuses: 'admin', 
    }`
}