import type { Workspace } from "@workspace/models/response.model";
import type { ProjectData } from "./request.schema";

export type Project = ProjectData & { workspace: Workspace }
export interface ProjectResDataType {
    message: string,
    success: boolean,
    data: Project
}