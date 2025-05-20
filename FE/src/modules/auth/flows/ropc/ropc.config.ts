
export const REFRESH_TOKEN_PARAM = {
    grant_type: "refresh_token",
}


export const RESET_PASSSWORD_PARAM =  {
    verify_code: sessionStorage.getItem("pkce_code"),
}
