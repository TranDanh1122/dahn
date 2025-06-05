import ky from "ky";

import { REFRESH_TOKEN_PARAM } from "@auth/flows/ropc/ropc.config";
import { API_ENDPOINT } from "./ApiEndpoint.const";

let isRefresh = false;
/**
 * this is all API request fail because not have access token
 */
let failedQuerys: any[] = [];

const processQueue = (error: any = null) => {
    failedQuerys.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQuerys = [];
};
/*
1. Set retry flag to tracking if request retried
2. When response, check if status 401 - unauthorize
3. 
    3.1 if retry == false => continue logic
    3.2 retried => move user to login
4. check is refreshing (if get access token from refresh token and refetch old query running)
  if this process running 
  => create promise 
  => push the trigger success/fail of this promise to array 
  => when fail  => response
  => when sucess => call with axios/ ky
  => remember, it not call here, because we just save the trigger, not triggered it
5. if not refreshing, set current request is retried 
6. isRefresh to set it refresing
7. fetch access token from refresh token (dont use client, it will loop if we fail again)
8. move to login if refresh fail
9. we have a loop here, trigger all old request with new token 
10. run this current request
11. when fetch fail, move to login, and trigger fail all old request
*/
export const AxiosClient = ky.create({
    timeout: import.meta.env.VITE_API_TIMEOUT,
    headers: {
        apikey: import.meta.env.VITE_API_KEY,
    },
    hooks: {
        beforeRequest: [
            (request) => { // 1.
                if (!request.headers.get("_retry")) {
                    request.headers.set("_retry", "false");
                }
            },
        ],
        afterResponse: [
            async (request, options, response) => {
                if (response.status == 401) { // 2.
                    if (request.headers.get("_retry") === "false") { // 3.1
                        if (isRefresh) {
                            // 4.
                            return new Promise(
                                (resolve, reject) => {
                                    failedQuerys.push({ resolve, reject });
                                })
                                .then(() => AxiosClient(request, options))
                                .catch(() => response);;
                        }

                        request.headers.set("_retry", "true"); // 5.
                        isRefresh = true; // 6.
                        try {
                            // 7.
                            const res = await fetch(API_ENDPOINT.refreshToken, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ ...REFRESH_TOKEN_PARAM }),
                                credentials: "include",
                            });
                            // 8.
                            if (res.status > 200) window.location.href = "/auth/login";
                            processQueue(); // 9.
                            return AxiosClient(request, options); //10.
                        } catch (refreshError) {
                            processQueue(refreshError);
                            window.location.href = "/auth/login"; //11
                            return response;
                        } finally {
                            isRefresh = false; // 12
                        }
                    } else {
                        // 3.2
                        window.location.href = "/auth/login";
                    }
                }
                // throw new Error(error)
                return response
            },
        ],
    },
});

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

/*
Axios Bundle size is killing my app, so, i try Ky, it still the same, but lighter
*/

/* AxiosClient.interceptors.response.use(
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
                   if (res.status > 200) window.location.href = "/auth/login"
                   processQueue()
                   return AxiosClient(request)
               } catch (refreshError) {
                   processQueue(refreshError)
                   window.location.href = "/auth/login"
                   return Promise.reject(refreshError)
               } finally {
                   isRefresh = false
               }
           } else {
               window.location.href = "/auth/login"
           }

       }
       // throw new Error(error)
       return Promise.reject(error)
   })
       */
