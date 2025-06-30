import React from "react"
interface ComponentProps extends React.ComponentProps<"div"> {
    children?: React.ReactNode,
    img: string,
    imgAlt?: string,
    text: string
}
export default React.memo(function CircleLogoWText({ children, img, text, imgAlt, ...props }: ComponentProps): React.JSX.Element {
    return <div {...props} className={`flex items-center gap-1 hover:bg-slate-100 ${props.className} px-2 py-1 rounded-lg`}>
        <picture className="shrink-0">
            <source srcSet={img} />
            <img
                src="/images/logo.png"
                alt={imgAlt || text}
                className="object-cover rounded-full size-8 border border-slate-300 shrink-0" />
        </picture>
        <div className="w-full max-w-[150px] group shrink relative">
            <p className="line-clamp-1 font-medium cursor-pointer text-sm"> {text} </p>
            {children}
        </div>
    </div>
})