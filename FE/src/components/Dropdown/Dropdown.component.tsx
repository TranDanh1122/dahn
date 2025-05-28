import React from "react";
import { ChevronDown } from 'lucide-react'
import useDropdown from "./useDropdown.hook";
interface DropdownProps extends React.ComponentProps<"div"> {
    children?: React.ReactNode,
    dropContent: React.ReactElement
}
export default React.memo(function Dropdown({ children, dropContent, className }: DropdownProps): React.JSX.Element {
    const {dropdownRef, isShow , show } = useDropdown()
    return <div ref={dropdownRef} onClick={() => isShow(prev => !prev)} className={`relative ${className}`}>
        {children}
        {
            show && <div className="absolute bg-white shadow-md border border-neutral-300 rounded-md top-[calc(100%+4px)] left-1 w-[calc(100%-8px)] min-w-max h-max p-2">
                {dropContent}
            </div>
        }
        <ChevronDown  className = {`text-neutral-600 size-5 absolute right-2 top-1/2 -translate-y-1/2 ${show ? "rotate-180" : ""} transform-gpu transition-all ease-linear duration-200`}/>
    </div>
})