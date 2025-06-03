import React from "react";
import { useSelector } from "react-redux";
import type { AppState } from "@/stores";
import { FolderOpenDot } from "lucide-react";
import { MenuItem } from "@workspace";
export default React.memo(function AllProjectMenuItem(): React.JSX.Element {
    const workspace = useSelector(
        (state: AppState) => state.persist.workspace.currentWorkspace
    );

    return (
        <MenuItem
            to={`/workspace/${workspace?.id}/projects`}
            icon={<FolderOpenDot className="text-neutral-500 size-4" />}
            text="All Projects"
        />
    );
});
