import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Project, ProjectResDataType, RoleData } from "@project/models";
import coreOptimicQueue from "@/common/ults/OptimicQueue";
import { APITimeout, upsertArrayByKey } from "@/common/ults/Tool";
import { updateRoleAPI } from "../../flows/project/project.api";
import { HTTPError } from "ky";
import type { ProjectStore } from "..";

export const updateRoleThunk = createAsyncThunk<Project | undefined, { projectId: string, data: RoleData, fallback: Project, roleId?: string }>("dahn/project/updateRole", async ({ projectId, data, roleId }, thunkAPI) => {
    return new Promise((resolve, reject) => {
        coreOptimicQueue.addQuery({
            queue: async () => {
                const res = await APITimeout(async () => {
                    const resData = await updateRoleAPI(projectId, data, roleId)
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

export const updateRoleThunkExtraReducer = {
    pending: (state: ProjectStore, action: any) => {
        state.loading = true
        state.error = coreOptimicQueue.isError()
        const { data } = action.meta.arg
        if (!state.project) return
        state.project.role = upsertArrayByKey<RoleData>(
            state.project.role || [],
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