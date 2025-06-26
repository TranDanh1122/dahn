import { Dropdown } from "@components/Dropdown";
import Loading from "@components/Loading.component";
import React from "react";
import { useGetWorkspaceSvc } from "@workspace/flow/workspace/workspace.service";
import CircleLogoWText from "@components/CircleLogoWText.component";
import { useNavigate } from "react-router-dom";
import MenuItem from "@workspace/components/MenuItem.component"
import Plus from "lucide-react/dist/esm/icons/plus";
import Skeleton from "@components/Skeleton.component"
const WorkspaceList = React.lazy(() => import("@workspace/components/WorkspaceList/components/WorkspaceList.component"))
import { useSelector } from "react-redux"
import type { AppState } from "@/stores"
interface WorkspaceItemProps {
    className?: string,
    disableDropdown?: boolean
}
export default React.memo(function WorkspaceItem({ className, disableDropdown }: WorkspaceItemProps): React.JSX.Element {
    const { data, isLoading } = useGetWorkspaceSvc()
    const navigate = useNavigate()
    const { currentWorkspace } = useSelector((state: AppState) => state.persist.workspace)
    return <>
        {
            isLoading && <Skeleton className="bg-slate-300 w-full h-10" />
        }
        {
            !isLoading &&
            data &&
            data.length == 0 &&
            <MenuItem
                onClick={() => navigate("/workspace/create")}
                className=" hover:bg-blue-100!"
                icon={<Plus className="size-5 text-slate-400" />}
                text="Create new project"
            />
        }

        {
            data &&
            data.length > 0 &&
            !disableDropdown &&
            <Dropdown
                hasIcon={true}
                dropContent={
                    <React.Suspense
                        fallback={<Loading className="size-5 border-s-slate-400 mt-4" />}>
                        <WorkspaceList />
                    </React.Suspense>
                }>
                <CircleLogoWText
                    className={className}
                    text={currentWorkspace?.name || ""}
                    img={currentWorkspace?.tiny || ""}
                />
            </Dropdown>
        }
        {
            data &&
            data.length > 0 &&
            disableDropdown &&
            <CircleLogoWText
                className={className}
                text={currentWorkspace?.name || ""}
                img={currentWorkspace?.tiny || ""}
            />

        }

    </>
})