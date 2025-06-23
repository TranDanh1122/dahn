import React from "react";
interface InfoProps extends React.ComponentProps<"div"> {
    label?: string,
    children: React.ReactNode
}
export default React.memo(function Infor({ label, children, ...props }: InfoProps): React.JSX.Element {
    return <div {...props} className={`flex w-full gap-2 items-center ${props.className}`}>
        {label && <h2 className="font-semibold text-sm w-1/4 line-clamp-1 shrink-0 ">{label}</h2>}
        {children}
    </div>
})