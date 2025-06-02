import React from "react";
import User from "@components/User.component"
import {
    Bell,
    BookUser,
    Cog,
    Search,
    FolderOpenDot,
    FolderCheck,
    ChartPie,
    Folder,
    House
} from "lucide-react";
import Input from "@components/Input.component";
import { WorkspaceItem, MenuItem } from "@workspace";

export default React.memo(function Sidebar(): React.JSX.Element {
    return <div className="h-full border-r border-neutral-300 ">
        <div className="flex items-center justify-between p-2">
            {/* <Dropdown className="w-full"
                contentPosition="top-full -right-10"
                dropContent={<Profile className="w-[250px]" />} >
               
            </Dropdown> */}
            <User className="max-w-[200px] w-full" />
            <Bell className="size-9 p-2 rounded-md text-neutral-500 shrink-0 block hover:bg-neutral-100" />
        </div>
        <div className="px-2">
            <Input label="" placeholder="Search something..." className="text-sm pl-7 bg-neutral-50" >
                <Search className="size-5 text-neutral-400 absolute top-1/2 left-1 -translate-y-1/2" />
            </Input>
        </div>
        <div className="space-y-1 mt-4 border-b border-b-neutral-300 pb-4">
            <MenuItem icon={<House className="text-neutral-500 size-4" />} text="Dashboard" to="/" />
            <MenuItem icon={<BookUser className="text-neutral-500 size-4" />} text="Contact" />
            <MenuItem icon={<Cog className="text-neutral-500 size-4" />} text="Setting" />
        </div>
        <WorkspaceItem />
        <div className="space-y-1 mt-4 border-b border-b-neutral-300 pb-4">
            <MenuItem icon={<FolderOpenDot className="text-neutral-500 size-4" />} text="All Projects" />
            <MenuItem icon={<FolderCheck className="text-neutral-500 size-4" />} text="Completed" />
            <MenuItem icon={<ChartPie className="text-neutral-500 size-4" />} text="Report" />
        </div>
        <div className="p-2">
            <h2 className="text-sm font-medium mb-2">Shared Workspace</h2>
            <MenuItem icon={<Folder className="text-neutral-500 size-4" />} text="Eccommerce" />
            <MenuItem icon={<Folder className="text-neutral-500 size-4" />} text="Vexere" />
        </div>
    </div >
})
