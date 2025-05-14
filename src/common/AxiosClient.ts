import axios from 'axios'
export const AxiosClient = axios.create({
    timeout: import.meta.env.VITE_API_TIMEOUT
})