import React from "react";
import User from "@/components/User.component"
import { Bell, BookUser, Cog, MessageCircleMore, Search } from "lucide-react";
import Input from "@/components/Input.component";
import MenuItem from "../components/MenuItem.component";
export default React.memo(function Sidebar(): React.JSX.Element {
    return <div className="h-full border-r border-neutral-300 ">
        <div className="flex items-center justify-between p-2">
            <User className="max-w-2/3" />
            <Bell className="size-9 p-2 rounded-md text-neutral-500 shrink-0 block hover:bg-neutral-100" />
        </div>
        <div className="px-2">
            <Input label="" placeholder="Search something..." className="text-sm pl-7 bg-neutral-50" >
                <Search className="size-5 text-neutral-400 absolute top-1/2 left-1 -translate-y-1/2" />
            </Input>
        </div>

        <div className="space-y-1 mt-4 border-b border-b-neutral-300 pb-4">
            <MenuItem icon={<MessageCircleMore className="text-neutral-500 size-4" />} text="Message" >
                <p className="text-neutral-500 font-medium px-2 py-1 text-xs bg-fuchsia-100 rounded-md ml-auto">1</p>
            </MenuItem>
            <MenuItem icon={<BookUser className="text-neutral-500 size-4" />} text="Contact" />
            <MenuItem icon={<Cog className="text-neutral-500 size-4" />} text="Setting" />
        </div>

        <div>
            
        </div>
    </div>
})