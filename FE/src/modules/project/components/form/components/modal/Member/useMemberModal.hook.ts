import type { memberSchema } from "@project/models/request.schema";
import { z } from "zod";

export interface MemberModalProps {
    handleClose: () => void,
    onSubmit: (data: z.infer<typeof memberSchema>, index?: number) => void,
    index?: number
}