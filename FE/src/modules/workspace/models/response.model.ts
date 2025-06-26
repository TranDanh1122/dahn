import type { User } from "@user/models/user.schema"
export interface Workspace {
    id: string,
    created_at: string,
    name: string,
    description: string,
    image: string
    workspace_members?: WorkspaceMember[],
    owner?: User,
    thumbnail?: string,
    tiny?: string
}
export interface WorkspaceMember {
    avg_salary: string,
    user: string,
    users: User
}