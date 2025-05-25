import React from "react";
import User from "@/components/User.component"
import {
    Bell,
    BookUser,
    Cog,
    Search,
    FolderOpenDot,
    FolderCheck,
    ChartPie,
    Folder
} from "lucide-react";
import Input from "@/components/Input.component";
import MenuItem from "@workspace/components/MenuItem.component";
import Dropdown from "@/components/Dropdown.component"
import CircleLogoWText from "@/components/CircleLogoWText.component"
import Loading from "@/components/Loading.component"
const WorkspaceList = React.lazy(() => import("@workspace/components/WorkspaceList.component"))

export default React.memo(function Sidebar(): React.JSX.Element {
    return <div className="h-full border-r border-neutral-300 ">
        <div className="flex items-center justify-between p-2">
            <User className="max-w-[200px] w-full" />
            <Bell className="size-9 p-2 rounded-md text-neutral-500 shrink-0 block hover:bg-neutral-100" />
        </div>
        <div className="px-2">
            <Input label="" placeholder="Search something..." className="text-sm pl-7 bg-neutral-50" >
                <Search className="size-5 text-neutral-400 absolute top-1/2 left-1 -translate-y-1/2" />
            </Input>
        </div>
        <div className="space-y-1 mt-4 border-b border-b-neutral-300 pb-4">

            <MenuItem icon={<BookUser className="text-neutral-500 size-4" />} text="Contact" />
            <MenuItem icon={<Cog className="text-neutral-500 size-4" />} text="Setting" />
        </div>
        <Dropdown dropContent={
            <React.Suspense fallback={<Loading className = "size-5 border-s-neutral-400 mt-4"/>}><WorkspaceList /></React.Suspense>
        }>
            <CircleLogoWText text="Company 1" img="" />
        </Dropdown>

        <div className="space-y-1 mt-4 border-b border-b-neutral-300 pb-4">
            <MenuItem icon={<FolderOpenDot className="text-neutral-500 size-4" />} text="All Projects" />
            <MenuItem icon={<FolderCheck className="text-neutral-500 size-4" />} text="Completed" />
            <MenuItem icon={<ChartPie className="text-neutral-500 size-4" />} text="Report" />
        </div>
        <div className="p-2">
            <h2 className="text-sm font-medium mb-2">Pinned Projects</h2>
            <MenuItem icon={<Folder className="text-neutral-500 size-4" />} text="Eccommerce" />
            <MenuItem icon={<Folder className="text-neutral-500 size-4" />} text="Vexere" />
        </div>
    </div >
})