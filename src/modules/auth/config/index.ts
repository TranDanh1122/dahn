const CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENTID
const CALLBACK_RESPONSE_TYPE = "token id_token"
const CALLBACK_URL = import.meta.env.VITE_AUTH0_CALLBACK
const SOCIAL_CONNECTION: Record<string, string> = {
    google: "google-oauth2",
    git: "guthib"
}
const SCOPE = "openid profile email"
const CONNECTION_USERNAME_PASS = import.meta.env.VITE_AUTH0_SIGNUP_CONNECT
export type SocialConnectionType = "google" | "github"
export const getAuthWSocicalParam = (type: SocialConnectionType) => ({
    client_id: CLIENT_ID,
    response_type: CALLBACK_RESPONSE_TYPE,
    redirect_uri: CALLBACK_URL,
    connection: SOCIAL_CONNECTION[type],
    scope: SCOPE,
    nonce: crypto.randomUUID(),
})
export const LEGACY_AUTH_PARAM = {
    client_id: CLIENT_ID,
    connection: CONNECTION_USERNAME_PASS
}
