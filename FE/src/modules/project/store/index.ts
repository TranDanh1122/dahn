import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project, ProjectResDataType, step1Schema } from "@project/models";
import { updateGeneralInfoAPI } from "@project/flows/project/project.api";
import { z } from "zod";
import type { HTTPError } from "ky";
import coreOptimicQueue from "@/common/ults/OptimicQueue";
interface ProjectStore {
    step: number,
    project?: Project,
    loading?: boolean,
    error?: boolean

}
const initialState: ProjectStore = {
    step: 1,
}

export const updateProjectThunk = createAsyncThunk<Project | undefined, { projectId: string; data: z.infer<typeof step1Schema> }>(
    "dahn/project/update",
    async ({ projectId, data }, thunkAPI) => {
        return new Promise((resolve, reject) => {
            coreOptimicQueue.addQuery(

                async () => {
                    try {
                        const res = await updateGeneralInfoAPI(projectId, data);
                        const json = await res.json<ProjectResDataType>();
                        if (!json.success) throw new Error(json.message)
                        resolve(json.data)
                    } catch (error) {
                        const body = await (error as HTTPError).response.json<{ message: string }>()
                        reject(thunkAPI.rejectWithValue(body.message))
                    }
                }
            )
        })

    }
);

const projectSlicer = createSlice({
    name: "dahn/project",
    initialState: initialState,
    reducers: {
        setProject: (state: ProjectStore, action: PayloadAction<Project>) => {
            state.project = action.payload
        },
        changeStep: (state: ProjectStore, action: PayloadAction<number>) => {
            state.step = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateProjectThunk.pending, (state, action) => {
            console.log(action.meta.arg, 111)
            state.loading = true
            state.error = false

            const { data } = action.meta.arg
            if (state.project)
                Object.assign(state.project, data);
        }).addCase(updateProjectThunk.fulfilled, (state, action: PayloadAction<Project | undefined>) => {
            const project = action.payload
            if (state.project)
                Object.assign(state.project, project);
            state.loading = false
        }).addCase(updateProjectThunk.rejected, (state) => {
            alert(1)
            state.error = true
            state.loading = false
        })
    }
})
export const { setProject, changeStep } = projectSlicer.actions
export default projectSlicer.reducer