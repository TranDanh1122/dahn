export interface SearchUserParams { 
    search : string,
    workspace?: string
}

export interface User {
    id: string;
    email: string;
    full_name: string;
    avatar_url: string;
}