import { z } from "zod"
export const AvatarSchema = z.object({
    avatar: z.coerce.string()
})
