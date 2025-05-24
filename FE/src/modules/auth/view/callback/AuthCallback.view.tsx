import React from "react";
import { useGetPKCEToken } from "@auth/flows/pkce/pkce.service";
import { useLoaderData, useNavigate } from "react-router-dom";
export default function AuthCallback(): React.JSX.Element {
    const auth = useGetPKCEToken()
    const { code } = useLoaderData()
    const navigate = useNavigate()
    React.useEffect(() => {
        auth.mutate(code, {
            onSuccess: () => {
                navigate("/")
            }
        })
    }, [])
    return <></>;
}