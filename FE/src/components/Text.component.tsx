import React from "react";
interface TextProps extends React.ComponentProps<"p"> {
    lineChamp: string
}
export default React.memo(function Text({ lineChamp, children, ...props }: TextProps): React.JSX.Element {
    const [isExpand, setExpand] = React.useState<boolean>(false)

    return <p {...props} className={`${isExpand ? "pb-3" : lineChamp} relative ${props.className}`}>
        {children}
        <div onClick={() => setExpand(prev => !prev)}
            className={`
                text-xs underline absolute cursor-pointer text-slate-900  w-full h-8 flex items-center justify-center
                ${isExpand
                    ? "right-1/2 -bottom-2 translate-x-1/2"
                    : "right-0 bottom-0 bg-gradient-to-b from-transparent to-50% to-white/90 "}`
            }>
            {isExpand ? "Collapse" : "View"}
        </div>

    </p>
})