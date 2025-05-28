import axios from 'axios'

import { REFRESH_TOKEN_PARAM } from '@auth/flows/ropc/ropc.config'
import { API_ENDPOINT } from './ApiEndpoint.const'
export const AxiosClient = axios.create({
    timeout: import.meta.env.VITE_API_TIMEOUT,
    headers: {
        apikey : import.meta.env.VITE_API_KEY,
    }
    
})


/**
 * Let check handle 401 interceptor, write by Chat-GPT follow my method below (so this is bullshit, please dont try it at home)
 * The problem is:
 *  - User go somewhere (like dashboard)
 *  - You fetch api with Thunk, React query...v...v but still use Axios, right?
 *  - But the screen may not have only 1 API, like dashboard, you can have chart1API, chart2API...v...v every single part in your UI need data, this maybe need UI
 *  - So, what we do now? Force user to Login? Yeah, that not bad, but you can make user "rage" if they need to login day-by-day 
 * The solution:
 *  - when login, expect access token, we have something call "refresh token"
 *  - both 2 thing only save in HTTPOnly cookies (by me) by BACKEND, beware: Both access_token and refresh token need to save in HTTPOnly cookies!!! 
 *  - Frontend can't touch this, so that mean "secure" (yeah, you know, that not enought, but now we ok with this)
 *  - Ok, now when API error, it will fallback to axios interceptor response error handler
 *  - Take it, save it to somewhere, like a array
 *  - Call API with your "refresh token", if it not working, ok now we just login again
 *  - After have new token, just use simple loop API error array, retry it with new token in cookies
 *  - If still error, you need to pray for god now
 *  - And yeah, you know, we still can have disconnect case or something like this, but maybe we can handle it in feature
 * 
 * 
 */

let isRefresh = false
/**
 * this is all API request fail because not have access token
 */
let failedQuerys: any[] = []

const processQueue = (error: any = null) => {
    failedQuerys.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve()
        }
    })
    failedQuerys = []
}

AxiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {

        const request = error.config

        if (error.response.status == 401) {
            if (!request._retry) {
                if (isRefresh) {
                    return new Promise((resolve, reject) => {
                        failedQuerys.push({ resolve, reject })
                    }).then(() => AxiosClient(request)).catch(e => Promise.reject(e))
                }
                request._retry = true
                isRefresh = true
                try {
                    const res = await fetch(API_ENDPOINT.refreshToken, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ ...REFRESH_TOKEN_PARAM }),
                        credentials: "include"
                    })
                  // if (res.status > 200) window.location.href = "/auth/login"
                    processQueue()
                    return AxiosClient(request)
                } catch (refreshError) {
                    processQueue(refreshError)
                    // window.location.href = "/auth/login"
                    return Promise.reject(refreshError)
                } finally {
                    isRefresh = false
                }
            } else {
                // window.location.href = "/auth/login"
            }

        }
        // throw new Error(error)
        return Promise.reject(error)
    })