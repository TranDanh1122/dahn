import type { Workspace } from "@workspace/models/response.model";
import type { Project } from "./request.schema";

export interface ProjectResDataType {
    message: string,
    success: boolean,
    data: Project & { workspace: Workspace }
}