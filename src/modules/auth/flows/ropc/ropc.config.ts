
export const LEGACY_REGISTER_PARAM = {
    client_id: import.meta.env.VITE_AUTH0_CLIENTID,
    connection: import.meta.env.VITE_AUTH0_SIGNUP_CONNECT
}
export const LEGACY_LOGIN_PARAM = {
    grant_type: "http://auth0.com/oauth/grant-type/password-realm",
    client_id: import.meta.env.VITE_AUTH0_CLIENTID,
    realm: import.meta.env.VITE_AUTH0_SIGNUP_CONNECT,
    scope: "openid profile email offline_access" //offline_access add this to get refresh token from auth0
}
