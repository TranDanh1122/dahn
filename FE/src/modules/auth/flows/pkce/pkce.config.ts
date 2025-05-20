import { generateCodeVerifier, generateCodeChallenge } from "./pkce.utls"

export type SocialConnectionType = "google" | "github"
export const requestPKCEAuthParam = async (type: SocialConnectionType) => {
    const code = generateCodeVerifier()
    const hash = await generateCodeChallenge(code)
    sessionStorage.setItem("pkce_code", code)
    alert(code)
    return {
        provider: type,
        code_challenge: hash,
        code_challenge_method: "S256",
        redirect_to: 'http://localhost:5173/auth/callback',

    }
}
export const requestPKCEAccessTokenParam = (serverCode: string) => {
    const clientCode = sessionStorage.getItem("pkce_code")
    return {
        grant_type: "authorization_code",
        code_verifier: clientCode,
        code: serverCode,
        redirect_uri: 'http://localhost:5173/auth/callback',

    }
}