import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { AuthStore } from "@/modules/auth"
import { persistStore, persistReducer } from 'redux-persist'
// defaults to localStorage for web, that suck, fk suck in security, beware what you save in redux store
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'dahn',
    storage: storage
}
const combine = combineReducers({ auth: AuthStore })
const persistedReducer = persistReducer(persistConfig, combine)

export const store = configureStore({
    reducer: {
        persist: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false})
})
export const persistedStore = persistStore(store)
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch