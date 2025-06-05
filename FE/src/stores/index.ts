import { combineReducers, configureStore } from "@reduxjs/toolkit"
import AuthStore from "@auth/stores"
import WorkspaceStore from "@workspace/store"
import { persistStore, persistReducer } from 'redux-persist'
// defaults to localStorage for web, that suck, fk suck in security, beware what you save in redux store
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'dahn',
    storage: storage,
    transforms: [{
        in: (state: unknown) => state,
        out: (state: unknown) => {
            return state;
        },
    }],
}
const combine = combineReducers({ auth: AuthStore, workspace: WorkspaceStore })
const persistedReducer = persistReducer(persistConfig, combine)

export const store = configureStore({
    reducer: {
        persist: persistedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
export const persistedStore = persistStore(store)
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch