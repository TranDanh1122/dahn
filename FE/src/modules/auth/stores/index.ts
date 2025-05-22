import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../models/response.model";
interface AuthState {
    user: User | null
}
const initialState: AuthState = {
    user: null
}
const authSlicer = createSlice({
    name: "dahn/auth",
    initialState: initialState,
    reducers: {
        setUser: (state: AuthState, action: PayloadAction<User | null>) => {
            state.user = action.payload
        }
    }
})
export default authSlicer.reducer
export const { setUser } = authSlicer.actions