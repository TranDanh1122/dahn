import React from "react";
import FolderPlus from "lucide-react/dist/esm/icons/folder-plus"

interface SquareItemProps extends React.ComponentProps<"div"> {
    img?: string,
    title?: string,
    lastUpdate?: string,
    skeletonMode?: boolean
}
export default React.memo(function ListItem({ img, title, lastUpdate, className, skeletonMode, ...props }: SquareItemProps): React.JSX.Element {
    const dateString = React.useMemo(() => {
        const date = new Date(lastUpdate ?? "")
        return `${date.toLocaleDateString()}`
    }, [lastUpdate])
    if (skeletonMode) return <SkeletonMode />
    return <div {...props}
        className={`w-full cursor-pointer hover:shadow-lg aspect-auto overflow-hidden border border-slate-200 shadow rounded-2xl ${className}`}>
        <picture>
            <source srcSet={img} />
            <img src="/images/logo.png" alt={title ?? ""} className="object-cover w-full aspect-video " />
        </picture>
        <div className="py-2 px-5 flex items-center gap-4 border-t border-slate-200 ">
            <div className="p-1 bg-slate-400 rounded-md w-fit">
                <FolderPlus className="size-4 text-white cursor-pointer" />
            </div>
            <div>
                <h3 className="font-medium text-sm text-slate-600  truncate w-[180px]">{title ?? "title"}</h3>
                <p className="font-light text-sm text-slate-500">{dateString ?? "lastUpdate"}</p>
            </div>

        </div>
    </div>
})
const SkeletonMode = (): React.JSX.Element => {
    return <div
        className="w-full cursor-pointer hover:shadow-lg aspect-auto overflow-hidden border border-slate-200 shadow rounded-2xl">
        <div className="animate-pulse w-full aspect-video  bg-slate-200"></div>
        <div className="py-2 px-5 flex items-center gap-4 border-t border-slate-200 ">
            <div className="p-1 bg-slate-200 size-4 animate-pulse rounded-md w-fit"></div>
            <div className="space-y-2">
                <div className=" h-3.5 bg-slate-200 animate-pulse w-[180px]"></div>
                <div className=" h-3.5 bg-slate-200 w-[100px]"></div>
            </div>

        </div>
    </div>
}