import React from "react";
import clsx from "clsx/lite"
interface TextProps extends React.ComponentProps<"p"> {
    lineClamp: string
}
export default React.memo(function Text({ lineClamp, children, ...props }: TextProps): React.JSX.Element {
    const [isExpand, setExpand] = React.useState<boolean>(false)
    const [isLineclamp, setLineclamp] = React.useState<boolean>(false)
    const textRef = React.useRef<HTMLParagraphElement>(null)

    React.useEffect(() => {
        const resizeListener = new ResizeObserver(() => {
            if (textRef.current) {
                const isOverflow = (textRef.current.scrollHeight || 0) > textRef.current.clientHeight
                setLineclamp(prev => prev != isOverflow ? isOverflow : prev)
            }
        })
        if (textRef.current) resizeListener.observe(textRef.current)
        return () => resizeListener.disconnect()
    }, [])


    if (!isLineclamp) return <p ref={textRef} {...props}>{children}</p>

    return <p
        {...props}
        ref={textRef}
        className={
            clsx("relative",
                props.className,
                isExpand && "pb-3",
                !isExpand && lineClamp
            )}>
        {children}
        <span onClick={() => setExpand(prev => !prev)}
            className={
                clsx(
                    'text-xs underline absolute cursor-pointer text-slate-900  w-full h-8 flex items-center justify-center',
                    isExpand && "right-1/2 -bottom-2 translate-x-1/2",
                    !isExpand && "right-0 -bottom-2 bg-gradient-to-b from-transparent to-50% to-white/90"
                )}>
            {isExpand ? "Collapse" : "View"}
        </span>

    </p >
})