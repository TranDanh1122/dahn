const domain = import.meta.env.VITE_SUP_URL
const proxy = import.meta.env.VITE_PROXY_API_URL
export const API_ENDPOINT = {
    //----------- Auth API -------------
    // ROPC
    signup: `${proxy}/auth/register`,
    login: `${proxy}/auth/login`,
    forgotPass: `${proxy}/auth/forgot-password`,
    resetPass: `${proxy}/auth/reset-password`,
    login_otp: `${proxy}/auth/login-otp`,
    sendOTP: `${proxy}/auth/send-otp`,
    // PKCE
    pkceAuth: (param: URLSearchParams) => `${domain}/auth/v1/authorize?${param}`,
    pkceGetToken: `${proxy}/auth/pkce-token`,
    //refresh token
    refreshToken: `${proxy}/auth/refresh-token`,
    //----------- User API -------------
    getUser: `${proxy}/auth/userinfo`,

}