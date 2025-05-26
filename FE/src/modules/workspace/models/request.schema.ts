import { z } from "zod"

export const WorkspaceFormSchema = z.object({
    name: z.coerce.string().max(50).min(3),
    thumbnail: z.coerce.string().optional(),
    description: z.string().max(250).optional(),
    members: z.array(z.object({
        email: z.string().optional(),
        avg_salary: z.string().optional()
    })).optional()
})


export type WorkspaceFormData = z.infer<typeof WorkspaceFormSchema>