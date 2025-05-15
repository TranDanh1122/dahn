const CALLBACK_RESPONSE_TYPE = "token id_token"
const SOCIAL_CONNECTION: Record<string, string> = {
    google: "google-oauth2",
    github: "github"
}
const SCOPE = "openid profile email offline_access"
export type SocialConnectionType = "google" | "github"
export const getAuthWSocicalParam = (type: SocialConnectionType) => ({
    client_id: import.meta.env.VITE_AUTH0_CLIENTID,
    response_type: CALLBACK_RESPONSE_TYPE,
    redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK,
    connection: SOCIAL_CONNECTION[type],
    scope: SCOPE,
    nonce: crypto.randomUUID(),
})