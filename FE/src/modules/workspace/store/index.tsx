import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Workspace } from "@workspace/models/response.model"
interface WorkspaceSlicerState {
    currentWorkspace?: Workspace
}

const workspaceSlicer = createSlice({
    initialState : {} as WorkspaceSlicerState,
    name : "dahn/workspace",
    reducers : {
        setWorkspace : (state : WorkspaceSlicerState , action : PayloadAction<Workspace>) => {
            state.currentWorkspace = action.payload
        }
    }
})

export const {setWorkspace} = workspaceSlicer.actions
export default workspaceSlicer.reducer