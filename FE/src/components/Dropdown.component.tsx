import React from "react";
interface DropdownProps extends React.ComponentProps<"div"> {
    children?: React.ReactNode,
    dropContent: React.ReactElement<React.ComponentProps<"div">>
}
export default React.memo(function Dropdown({ children, dropContent, className }: DropdownProps): React.JSX.Element {
    return <div className={`relative ${className}`}>

        {children}

        <div className="">
            {dropContent}
        </div>
    </div>
})