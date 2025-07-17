import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project, ProjectResDataType } from "@project/models";
import coreOptimicQueue from "@/common/ults/OptimicQueue";
import { APITimeout } from "@/common/ults/Tool";
import { deleteEnvAPI } from "@project/flows/project/project.api";
import { HTTPError } from "ky";
import type { ProjectStore } from "@project/store";

export const deleteEnvThunk = createAsyncThunk<Project | undefined, { projectId: string, envId: string, fallbackData?: Project }>("dahn/project/deleteEnv",
    async ({ projectId, envId }, thunkAPI) => {
        return new Promise((resolve, reject) => {
            coreOptimicQueue.addQuery({
                queue: async () => {
                    const dataRes = await APITimeout(async () => {
                        const res = await deleteEnvAPI(projectId, envId)
                        const json = await res.json<ProjectResDataType>()
                        return json
                    }, import.meta.env.VITE_API_TIMEOUT || 10000)
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
            })
        })
    }
)

export const deleteEnvThunkExtraReducer = {
    pending: (state: ProjectStore, action: any) => {
        state.loading = true
        state.error = coreOptimicQueue.isError()
        const { envId } = action.meta.arg
        if (!state.project) return
        if (state.project.environment)
            state.project.environment = state.project.environment.filter(el => el.id != envId)
    },
    fullfilled: (state: ProjectStore, action: any) => {
        const project = action.payload
        state.error = coreOptimicQueue.isError()
        if (state.project)
            Object.assign(state.project, project);
        state.loading = false
    },
    rejected: (state: ProjectStore, action: any) => {
        state.loading = false
        state.error = coreOptimicQueue.isError()
        const { fallbackData } = action.meta.arg
        if (state.project)
            Object.assign(state.project, fallbackData);

    }
}