import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MilestoneData, Project, ProjectResDataType } from "@project/models";
import coreOptimicQueue from "@/common/ults/OptimicQueue";
import { APITimeout, upsertArrayByKey } from "@/common/ults/Tool";
import { updateMilestoneAPI } from "@project/flows/project/project.api";
import { HTTPError } from "ky";
import type { ProjectStore } from "..";

export const updateMilestoneThunk = createAsyncThunk<Project | undefined, { projectId: string, data: MilestoneData, fallbackData?: Project }>("dahn/project/updateMilestone", async ({ projectId, data }, thunkAPI) => {
    return new Promise((resolve, reject) => {
        coreOptimicQueue.addQuery({
            queue: async () => {
                const res = await APITimeout(async () => {
                    const resData = await updateMilestoneAPI(projectId, data)
                    const json = await resData.json<ProjectResDataType>()
                    return json

                }, import.meta.env.VITE_API_TIMEOUT || 10000)
                resolve(res.data)
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
})

export const updateMilestoneThunkExtraReducer = {
    pending: (state: ProjectStore, action: any) => {
        state.loading = true
        state.error = coreOptimicQueue.isError()
        const { data } = action.meta.arg
        if (!state.project) return
        if (state.project.environment)
            state.project.milestones = upsertArrayByKey<MilestoneData>(
                state.project.milestones || [],
                [data],
                "id"
            )
    },
    fullfilled: (state: ProjectStore, action: any) => {
        const project = action.payload
        if (state.project)
            Object.assign(state.project, project);
        state.loading = false
        state.error = coreOptimicQueue.isError()
    },
    rejected: (state: ProjectStore, action: any) => {
        state.loading = false
        state.error = coreOptimicQueue.isError()
        const { fallbackData } = action.meta.arg
        if (state.project)
            Object.assign(state.project, fallbackData);

    }
}