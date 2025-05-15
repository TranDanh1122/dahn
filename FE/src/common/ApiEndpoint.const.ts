const domain = import.meta.env.VITE_AUTH0_DOMAIN
export const API_ENDPOINT = {
    signup: `https://${domain}/dbconnections/signup`,
    login: `https://${domain}/oauth/token`,
    googleAuth: (param: URLSearchParams) => `https://${domain}/authorize?${param}`
}