import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MilestoneData, Project, ProjectResDataType } from "@project/models";
import coreOptimicQueue from "@/common/ults/OptimicQueue";
import { APITimeout, upsertArrayByKey } from "@/common/ults/Tool";
import { deleteMilestoneAPI } from "@project/flows/project/project.api";
import { HTTPError } from "ky";
import type { ProjectStore } from "..";

export const deleteMilestoneThunk = createAsyncThunk<Project | undefined, { projectId: string, milestoneId: string, fallback?: Project }>("dahn/project/deleteMilestone",
    async ({ projectId, milestoneId }, thunkAPI) => {
        return new Promise((resolve, reject) => {
            coreOptimicQueue.addQuery({
                queue: async () => {
                    console.log(1111)
                    const res = await APITimeout(async () => {
                        const resData = await deleteMilestoneAPI(projectId, milestoneId)
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

export const deleteMilestoneThunkExtraReducer = {
    pending: (state: ProjectStore, action: any) => {
        state.loading = true
        state.error = coreOptimicQueue.isError()
        const { milestoneId } = action.meta.arg
        if (!state.project) return
        if (state.project.milestones)
            state.project.milestones = state.project.milestones.filter(el => el.id != milestoneId)

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
        const { fallback } = action.meta.arg
        if (state.project)
            Object.assign(state.project, fallback);

    }
}