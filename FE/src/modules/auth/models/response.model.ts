export interface User {
    id: string,
    avatar_url: string,
    email: string,
    email_verified: boolean,
    full_name: string,
    name: string,
    phone_verified: false,
    picture: string,
    provider_id: string,
    sub: string
}

export interface AuthSuccessReponse {
    success: boolean,
    user: User
}

