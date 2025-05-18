const domain = import.meta.env.VITE_AUTH0_DOMAIN
export const API_ENDPOINT = {
    signup: `https://${domain}/dbconnections/signup`,
    login: `${import.meta.env.VITE_API_URL}/auth/login`,
    forgotPass: `https://${domain}/dbconnections/change_password`,
    resetPass: `${import.meta.env.VITE_API_URL}/auth/reset-password`,
    getUser: `${import.meta.env.VITE_API_URL}/auth/userinfo`,
    refreshToken: `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
    pkceAuth: (param: URLSearchParams) => `https://${domain}/authorize?${param}`,
    pkceGetToken: `${import.meta.env.VITE_API_URL}/auth/pkce-token`
}