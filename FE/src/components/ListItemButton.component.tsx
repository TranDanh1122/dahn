import React from "react";
interface ListItemButtonProps extends React.ComponentProps<"div"> {
    children?: React.ReactNode
}
export default React.memo(function ListItemButton({ children, ...props }: ListItemButtonProps): React.JSX.Element {
    return <div {...props} className={`bg-neutral-200/50 cursor-pointer hover:bg-neutral-200/20 
        border border-neutral-200
        hover:shadow-lg backdrop-blur-2xl w-full 
        aspect-auto rounded-2xl flex 
        items-center justify-center`}>
        {children}
    </div>

})