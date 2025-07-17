import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "@project/models";
import coreOptimicQueue from "@/common/ults/OptimicQueue";
import { isObjectEqual } from "@/common/ults/Tool";
import { updateProjectThunk, updateProjectThunkExtraReducer } from "./action/updateGeneralInfo.action";
import { updateEnvThunk, updateEnvThunkExtraReducer } from "./action/updateEnv.action";
export interface ProjectStore {
    step: number,
    project?: Project,
    loading?: boolean,
    error?: boolean

}
const initialState: ProjectStore = {
    step: 1,
}



const projectSlicer = createSlice({
    name: "dahn/project",
    initialState: initialState,
    reducers: {
        setProject: (state: ProjectStore, action: PayloadAction<Project>) => {
            console.log(action.payload)
            if (!isObjectEqual(state.project, action.payload)) {
                state.project = action.payload

            }
            state.error = coreOptimicQueue.isError()
        },
        changeStep: (state: ProjectStore, action: PayloadAction<number>) => {
            state.step = action.payload
        },
        setError: (state: ProjectStore, action: PayloadAction<boolean>) => {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProjectThunk.pending, updateProjectThunkExtraReducer.pending)
            .addCase(updateProjectThunk.fulfilled, updateProjectThunkExtraReducer.fullfilled)
            .addCase(updateProjectThunk.rejected, updateProjectThunkExtraReducer.rejected)
            .addCase(updateEnvThunk.pending, updateEnvThunkExtraReducer.pending)
            .addCase(updateEnvThunk.fulfilled, updateEnvThunkExtraReducer.fullfilled)
            .addCase(updateEnvThunk.rejected, updateEnvThunkExtraReducer.rejected)
    }
})
export const { setProject, changeStep } = projectSlicer.actions
export default projectSlicer.reducer