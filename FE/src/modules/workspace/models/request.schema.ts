import { FLOAT_REGEX } from "@/common/ults/Common.const"
import { z } from "zod"

export const WorkspaceFormSchema = z.object({
    name: z.coerce.string().max(50).min(3),
    thumbnail: z.coerce.string().optional(),
    description: z.string().max(250).optional(),
    members: z.array(z.object({
        id: z.string().optional(),
        email: z.string().optional(),
        avg_salary: z.string().optional()
    }).refine(({ id, email, avg_salary }) => {
        if (id && email) {          
            if (!avg_salary) return false
            return FLOAT_REGEX.test(avg_salary)
        }
    
        return true
    }, { message: "Invalid Avg. Rate", path : ["avg_salary"] })).optional()
})

export type WorkspaceFormData = z.infer<typeof WorkspaceFormSchema>
