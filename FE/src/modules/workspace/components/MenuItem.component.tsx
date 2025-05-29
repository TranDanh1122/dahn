import type { LucideIcon } from "lucide-react";
import React from "react";
interface MenuItemProps extends React.ComponentProps<"div"> {
    icon: React.ReactElement<LucideIcon>,
    text: string,
    children?: React.ReactNode,
}
export default React.memo(function MenuItem({ icon, text, onClick, children, ...props }: MenuItemProps): React.JSX.Element {
    return <div className={`p-2 rounded-md hover:bg-neutral-100 font-medium  text-neutral-700 flex items-center gap-2 cursor-pointer ${props.className}`} onClick={(e) => onClick?.(e)}>
        {icon}
        <span className="max-w-[200px] truncate text-xs">{text}</span>
        {children}
    </div>
})