import { configureStore } from "@reduxjs/toolkit"
import { AuthStore } from "@/modules/auth"
export const store = configureStore({
    reducer: {
        auth: AuthStore
    }
})
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch