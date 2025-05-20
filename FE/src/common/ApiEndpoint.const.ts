const domain = import.meta.env.VITE_SUP_URL
const proxy = import.meta.env.VITE_PROXY_API_URL
export const API_ENDPOINT = {
    signup: `${proxy}/auth/register`,
    login: `${proxy}/auth/login`,
    forgotPass: `${proxy}/auth/forgot-password`,
    resetPass: `${proxy}/auth/reset-password`,
    getUser: `${domain}/auth/v1/user`,
    refreshToken: `${domain}/auth/v1/token`,
    pkceAuth: (param: URLSearchParams) => `${domain}/auth/v1/authorize?${param}`,
    pkceGetToken: `${proxy}/auth/pkce-token`,
}