import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "@project/models";
interface ProjectStore {
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
            state.project = action.payload
        },
        changeStep: (state: ProjectStore, action: PayloadAction<number>) => {
            state.step = action.payload
        }
    }
})
export const { setProject, changeStep } = projectSlicer.actions
export default projectSlicer.reducer