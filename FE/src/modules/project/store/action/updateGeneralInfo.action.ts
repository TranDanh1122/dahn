import { APITimeout } from "@/common/ults/Tool";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project, ProjectResDataType, step1Schema } from "@project/models";
import coreOptimicQueue from "@/common/ults/OptimicQueue";
import { updateGeneralInfoAPI } from "@project/flows/project/project.api";
import { HTTPError } from "ky";
import type { z } from "zod";
import type { ProjectStore } from "..";

export const updateProjectThunk = createAsyncThunk<Project | undefined, { projectId: string; data: z.infer<typeof step1Schema>, fallbackData: z.infer<typeof step1Schema> }>(
    "dahn/project/update",
    async ({ projectId, data }, thunkAPI) => {
        if (thunkAPI.signal.aborted) {
            return thunkAPI.rejectWithValue("Request aborted");
        }

        return new Promise((resolve, reject) => {
            coreOptimicQueue.addQuery({
                queue: async (signal?: AbortSignal) => {
                    const dataRes = await APITimeout<ProjectResDataType>(async () => {
                        const res = await updateGeneralInfoAPI(projectId, data, signal || thunkAPI.signal);
                        const json = await res.json<ProjectResDataType>();
                        if (!json.success) throw new Error(json.message)
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
            }

            )
        })

    }
);

export const updateProjectThunkExtraReducer = {
    pending: (state: ProjectStore, action: any) => {
        state.loading = true
        const { data } = action.meta.arg
        if (state.project)
            Object.assign(state.project, data);
    },
    fullfilled: (state: ProjectStore, action: any) => {
        const project = action.payload
        if (state.project)
            Object.assign(state.project, project);
        state.loading = false
    },
    rejected: (state: ProjectStore, action: any) => {
        state.loading = false
        state.error = coreOptimicQueue.isError()
        console.log(coreOptimicQueue.isError(), 1)
        const { fallbackData } = action.meta.arg
        if (state.project)
            Object.assign(state.project, fallbackData);

    }
}