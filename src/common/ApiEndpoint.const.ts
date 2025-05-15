const domain = import.meta.env.VITE_AUTH0_DOMAIN
export const API_ENDPOINT = {
    signup: `https://${domain}/dbconnections/signup`,
    googleAuth: (param: URLSearchParams) => `https://${domain}/authorize?${param}`
}