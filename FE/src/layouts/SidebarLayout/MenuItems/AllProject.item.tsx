import React from "react";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
import FolderOpenDot from "lucide-react/dist/esm/icons/folder-open-dot";

import { MenuItem } from "@workspace";
export default React.memo(function AllProjectMenuItem(): React.JSX.Element {
    const workspace = useSelector(
        (state: AppState) => state.persist.workspace.currentWorkspace
    );

    return (
        <MenuItem
            to={`/workspace/${workspace?.id}`}
            icon={<FolderOpenDot className="text-slate-500 size-4" />}
            text="All Projects"
        />
    );
});
