import React from "react";
export default function AuthCallback(): React.JSX.Element {
    React.useEffect(() => {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.slice(1)); // remove '#'
        const accessToken = params.get('access_token');
        const idToken = params.get('id_token');
        if (accessToken && idToken) {
            // Lưu vào localStorage hoặc gọi lên service xử lý
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('id_token', idToken);
            alert("ok")
        } else {
            // lỗi, redirect về login
            alert("Loi")
        }
    }, []);

    return <p>Đang đăng nhập...</p>;
}