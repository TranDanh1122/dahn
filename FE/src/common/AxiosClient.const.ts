import axios, { AxiosError } from 'axios'
export const AxiosClient = axios.create({
    timeout: import.meta.env.VITE_API_TIMEOUT
})
AxiosClient.interceptors.response.use((response) => response, (error: AxiosError<{ description?: string; message?: string }>) => {
    const msg =
        error.response?.data?.description ||
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
    return Promise.reject(msg)
})