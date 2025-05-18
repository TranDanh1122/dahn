import {  generateCodeVerifier, generateCodeChallenge } from "./pkce.utls"

const CALLBACK_RESPONSE_TYPE = "code"  // if you need token, implicit flow (not reccomend because you token will appear in url, that should be bad) use"token id_token"
const SOCIAL_CONNECTION: Record<string, string> = {
    google: "google-oauth2",
    github: "github"
}
const SCOPE = "openid profile email offline_access"
export type SocialConnectionType = "google" | "github"
export const requestPKCEAuthParam = async (type: SocialConnectionType) => {
    const code = generateCodeVerifier()
    const hash = await generateCodeChallenge(code)
    sessionStorage.setItem("pkce_code", code)
    return {
        client_id: import.meta.env.VITE_AUTH0_CLIENTID,
        response_type: CALLBACK_RESPONSE_TYPE,
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK,
        connection: SOCIAL_CONNECTION[type],
        scope: SCOPE,
        nonce: crypto.randomUUID(),
        code_challenge: hash,
        code_challenge_method: "S256",
    }
}
export const requestPKCEAccessTokenParam = (serverCode: string) => {
    const clientCode = sessionStorage.getItem("pkce_code")
    return {
        grant_type: "authorization_code",
        client_id: import.meta.env.VITE_AUTH0_CLIENTID,
        code_verifier: clientCode,
        code: serverCode,
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK
    }
}