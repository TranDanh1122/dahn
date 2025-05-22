import React from "react";
import { useGetPKCEToken } from "@auth/flows/pkce/pkce.service";
import { useLoaderData } from "react-router-dom";
export default function AuthCallback(): React.JSX.Element {
    const auth = useGetPKCEToken()
    const { code } = useLoaderData()

    React.useEffect(() => {
        auth.mutate(code, {
            onSuccess: () => {
                alert(1)
            }
        })
    }, [])
    return <p>Đã đăng nhập...</p>;
}