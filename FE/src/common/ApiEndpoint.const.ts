const domain = import.meta.env.VITE_AUTH0_DOMAIN
export const API_ENDPOINT = {
    signup: `https://${domain}/dbconnections/signup`,
    login: `${import.meta.env.VITE_API_URL}/auth/login`,
    resetPass : `https://${domain}/dbconnections/change_password`,
    googleAuth: (param: URLSearchParams) => `https://${domain}/authorize?${param}`

}