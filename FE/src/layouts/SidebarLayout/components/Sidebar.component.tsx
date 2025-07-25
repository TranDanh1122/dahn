import React from "react";
import User from "@components/User.component"
import Bell from "lucide-react/dist/esm/icons/bell"
import BookUser from "lucide-react/dist/esm/icons/book-user"
import Cog from "lucide-react/dist/esm/icons/cog"
import Search from "lucide-react/dist/esm/icons/search"
import FolderCheck from "lucide-react/dist/esm/icons/folder-check"
import ChartPie from "lucide-react/dist/esm/icons/chart-pie"
import Folder from "lucide-react/dist/esm/icons/folder"
import House from "lucide-react/dist/esm/icons/house"

import Input from "@components/Input.component";
import { WorkspaceItem, MenuItem } from "@workspace";
import AllProjectItem from "../MenuItems/AllProject.item";


export default React.memo(function Sidebar(): React.JSX.Element {
    return <div className="h-full border-r border-slate-300 shadow-lg shadow-slate-300 rounded-e-2xl">
        <div className="flex items-center justify-between p-2">
            {/* <Dropdown className="w-full"
                contentPosition="top-full -right-10"
                dropContent={<Profile className="w-[250px]" />} >
               
            </Dropdown> */}
            <User className="max-w-[200px] w-full" />
            <Bell className="size-9 p-2 rounded-md text-slate-500 shrink-0 block hover:bg-slate-100" />
        </div>
        <div className="px-2">
            <Input label="" placeholder="Search something..." className="text-sm pl-7 bg-slate-50" >
                <Search className="size-5 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2" />
            </Input>
        </div>
        <div className="space-y-1 mt-4 border-b border-b-slate-300 pb-4">
            <MenuItem icon={<House className="text-slate-500 size-4" />} text="Dashboard" to="/" />
            <MenuItem icon={<BookUser className="text-slate-500 size-4" />} text="Contact" />
            <MenuItem icon={<Cog className="text-slate-500 size-4" />} text="Setting" />
        </div>
        <WorkspaceItem />
        <div className="space-y-1 mt-4 border-b border-b-slate-300 pb-4">
            <AllProjectItem />
            <MenuItem icon={<FolderCheck className="text-slate-500 size-4" />} text="Completed" />
            <MenuItem icon={<ChartPie className="text-slate-500 size-4" />} text="Report" />
        </div>
        <div className="p-2">
            <h2 className="text-sm font-medium mb-2">Shared Workspace</h2>
            <MenuItem icon={<Folder className="text-slate-500 size-4" />} text="Eccommerce" />
            <MenuItem icon={<Folder className="text-slate-500 size-4" />} text="Vexere" />
        </div>
    </div >
}, () => true)
