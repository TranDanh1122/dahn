import { z } from "zod"

export const WorkspaceFormSchema = z.object({
    name: z.coerce.string().length(50),
    thumbnail: z.coerce.string().optional(),
    description: z.coerce.string().length(250).optional(),
    members: z.array(z.object({
        email: z.string().email(),
        position: z.string()
    })).optional()
})

export type WorkspaceFormData = z.infer<typeof WorkspaceFormSchema>