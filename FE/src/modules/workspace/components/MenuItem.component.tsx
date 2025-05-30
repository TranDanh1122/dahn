import type { LucideIcon } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
interface MenuItemProps extends React.ComponentProps<"a"> {
    icon: React.ReactElement<LucideIcon>,
    text: string,
    children?: React.ReactNode,
    to?: string
}
export default React.memo(function MenuItem({ icon, text, onClick, children, to, ...props }: MenuItemProps): React.JSX.Element {
    return <NavLink
        to={to}
        className={
            ({ isActive }: { isActive: boolean }) =>
                `p-2 rounded-md hover:bg-neutral-100 
                ${isActive && to ? "bg-neutral-100" : ""} 
                font-medium  text-neutral-700 
                flex items-center gap-2 
                cursor-pointer ${props.className}`
        }
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => onClick?.(e)}>
        {icon}
        <span className="max-w-[200px] truncate text-xs">{text}</span>
        {children}
    </NavLink>
})