import {configureStore} from "@reduxjs/toolkit"
import AuthReducer from "@auth/stores"
export const store = configureStore({
    reducer : {
        auth : AuthReducer
    }
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch