import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project, ProjectResDataType, step1Schema } from "@project/models";
import { updateGeneralInfoAPI } from "@project/flows/project/project.api";
import { z } from "zod";
import { HTTPError } from "ky";
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
const timeout = async <T>(fn: () => Promise<T>, delay: number) => {
    return new Promise<T>((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error("Timeout"))
        }, delay)
        fn().then((res) => {
            clearTimeout(timer)
            resolve(res)
        }).catch((e) => {
            clearTimeout(timer)
            reject(e)
        })
    })
}
export const updateProjectThunk = createAsyncThunk<Project | undefined, { projectId: string; data: z.infer<typeof step1Schema>, fallbackData: z.infer<typeof step1Schema> }>(
    "dahn/project/update",
    async ({ projectId, data }, thunkAPI) => {
        if (thunkAPI.signal.aborted) {
            return thunkAPI.rejectWithValue("Request aborted");
        }

        return new Promise((resolve, reject) => {
            coreOptimicQueue.addQuery({
                queue: async (signal?: AbortSignal) => {
                    const dataRes = await timeout<ProjectResDataType>(async () => {
                        const res = await updateGeneralInfoAPI(projectId, data, signal || thunkAPI.signal);
                        const json = await res.json<ProjectResDataType>();
                        if (!json.success) throw new Error(json.message)
                        return json
                    }, import.meta.env.VITE_API_TIMEOUT)
                    resolve(dataRes.data)
                },
                onError: async (error) => {
                    let message = "Unknown error";

                    if (error instanceof HTTPError) {
                        const body = await error.response?.json<{ message: string }>();
                        message = body?.message || "Unknown HTTP error";
                    } else if (error instanceof Error) {
                        message = error.message;
                    }
                    thunkAPI.abort()
                    reject(thunkAPI.rejectWithValue(message))
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
        },
        setError: (state: ProjectStore, action: PayloadAction<boolean>) => {
            state.error = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateProjectThunk.pending, (state, action) => {
            state.loading = true
            const { data } = action.meta.arg
            if (state.project)
                Object.assign(state.project, data);
        }).addCase(updateProjectThunk.fulfilled, (state, action: PayloadAction<Project | undefined>) => {
            const project = action.payload
            if (state.project)
                Object.assign(state.project, project);
            state.loading = false
        }).addCase(updateProjectThunk.rejected, (state, action) => {
            state.loading = false
            state.error = coreOptimicQueue.isError()
            console.log(coreOptimicQueue.isError(), 1)
            const { fallbackData } = action.meta.arg
            if (state.project)
                Object.assign(state.project, fallbackData);

        })
    }
})
export const { setProject, changeStep } = projectSlicer.actions
export default projectSlicer.reducer