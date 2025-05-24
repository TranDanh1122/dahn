import type { LucideIcon } from "lucide-react";
import React from "react";
interface MenuItemProps {
    icon: React.ReactElement<LucideIcon>,
    text: string,
    action?: () => void,
    children?: React.ReactNode
}
export default React.memo(function MenuItem({ icon, text, action, children }: MenuItemProps): React.JSX.Element {
    return <div className="p-2 rounded-md hover:bg-neutral-100 font-medium  text-neutral-700 flex items-center gap-2 cursor-pointer" onClick={() => action?.()}>
        {icon}
        <span className="max-w-[200px] truncate text-xs">{text}</span>
        {children}
    </div>
})