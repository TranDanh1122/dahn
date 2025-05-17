const domain = import.meta.env.VITE_AUTH0_DOMAIN
export const API_ENDPOINT = {
    signup: `https://${domain}/dbconnections/signup`,
    login: `${import.meta.env.VITE_API_URL}/auth/login`,
    forgotPass: `https://${domain}/dbconnections/change_password`,
    resetPass: `${import.meta.env.VITE_API_URL}/auth/reset-password`,
    getUser: `https://${domain}/userinfo`,
    refreshToken : `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
    googleAuth: (param: URLSearchParams) => `https://${domain}/authorize?${param}`

}