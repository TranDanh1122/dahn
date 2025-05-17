import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { loginThunk } from "@auth/stores/login.thunk"
interface AuthStateData {
    access_token: string,
    user: any,
    loading : boolean,
    error: boolean
}
const initData: AuthStateData = {
    access_token: "",
    user: {},
    loading : false,
    error : false
}

const authSlicer = createSlice({
    name: "modules/auth",
    initialState: initData,
    reducers: {
        setUser : (state : AuthStateData , action: PayloadAction<any>) => {
            state.user = action.payload
        }
    },
    extraReducers: (builders) => {
        builders.addCase(loginThunk.pending , (state : AuthStateData) => {
            state.loading = true
            state.error = false
        }).addCase(loginThunk.fulfilled , (state : AuthStateData , action : PayloadAction<{access_token: string}>) => {
            state.loading  = false
            state.error = false
            state.access_token = action.payload.access_token
        }).addCase(loginThunk.rejected , (state : AuthStateData , action: PayloadAction<any>) => {
            state.error = true
            state.loading = false
            state.user = null
            throw new Error(action.payload)
        })
    }
})

export default authSlicer.reducer