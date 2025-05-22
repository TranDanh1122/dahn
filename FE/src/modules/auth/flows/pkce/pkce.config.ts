import { generateCodeVerifier, generateCodeChallenge } from "./pkce.utls"

export type SocialConnectionType = "google" | "github"
export const requestPKCEAuthParam = async (type: SocialConnectionType) => {
    const code = generateCodeVerifier()
    const hash = await generateCodeChallenge(code)
    sessionStorage.setItem("pkce_code", code)
    return {
        provider: type,
        code_challenge: hash,
        code_challenge_method: "S256",
        redirect_to: import.meta.env.VITE_AUTH_CALLBACK
    }
}
export const requestPKCEAccessTokenParam = (serverCode: string) => {
    const clientCode = sessionStorage.getItem("pkce_code")
    return {
        grant_type: "authorization_code",
        code_verifier: clientCode,
        code: serverCode,
        redirect_uri: import.meta.env.VITE_AUTH_CALLBACK,
    }
}