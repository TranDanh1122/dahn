import { createAsyncThunk } from "@reduxjs/toolkit";
import type { EnvData, Project, ProjectResDataType } from "@project/models";
import coreOptimicQueue from "@/common/ults/OptimicQueue";
import { APITimeout, upsertArrayByKey } from "@/common/ults/Tool";
import { updateEnvAPI } from "@project/flows/project/project.api";
import { HTTPError } from "ky";
import type { ProjectStore } from "@project/store";

export const updateEnvThunk = createAsyncThunk<Project | undefined, { projectId: string, data: EnvData, fallbackData: Project }>("dahn/project/env",
    async ({ projectId, data }, thunkAPI) => {
        return new Promise((resolve, reject) => {
            coreOptimicQueue.addQuery({
                queue: async () => {
                    const dataRes = await APITimeout(async () => {
                        const res = await updateEnvAPI(projectId, data, data.id)
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

export const updateEnvThunkExtraReducer = {
    pending: (state: ProjectStore, action: any) => {
        state.loading = true
        state.error = coreOptimicQueue.isError()
        const { data } = action.meta.arg
        if (!state.project) return
        if (state.project.environment)
            state.project.environment = upsertArrayByKey<EnvData>(
                state.project.environment,
                [data],
                "id"
            )

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