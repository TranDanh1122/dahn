import type { AuthRequestData } from "@auth/models/request.schemas"
import { postLoginAPI } from '@auth/flows/ropc/ropc.api'
import { createAsyncThunk } from "@reduxjs/toolkit"

export const loginThunk = createAsyncThunk("modules/login/thunk", async (data: Omit<AuthRequestData, "confirmPassword">, { rejectWithValue }) => {
    try {
        const res = await postLoginAPI(data)
        return res.data
    } catch (e) {
        return rejectWithValue(e)
    }
})

